---
title: "RAG Is Easy to Demo. Making RAG Reliable Is Hard."
description: "Practical RAG engineering with Python and SQL: current evidence, access controls, hybrid retrieval, citation checks, and measurable failure modes."
publishedAt: '2026-10-21T15:00:00-03:00'
tags:
  - RAG
  - AI Engineering
  - Python
  - System Design
image: '/images/blog/rag-reliability/cover.webp'
imageAlt: 'Emerald glass sheets arranged like source documents in charcoal supports, with one amber sheet highlighting evidence that needs scrutiny.'
---

A RAG demo answers a few questions from a clean PDF. A production feature has to select evidence that is relevant, current, and authorized, then produce an answer that actually follows from it.

Consider a CRM support assistant answering: **“Can I return an opened AX17 after 21 days?”** For this worked example, the fictional current policy allows 14 days and excludes opened items. An older revision allows 30 days.

A plausible answer can fail in several ways: retrieve the old policy, miss the AX17 exception, or use another customer's private document. Those failures need different fixes.

The following snippets are focused components, using Python 3.10+, Pydantic 2, and PostgreSQL with pgvector. They aren't a complete API or ingestion service.

Download the [companion Python file](/files/blog/rag-reliability/rag_examples.py), which includes the SQL, helpers, and a runnable example. Save it as `rag_examples.py`, then run:

```bash
python -m pip install "pydantic>=2,<3"
python rag_examples.py
```

The bundled example exercises rank fusion, citation membership, and evidence recall locally; it does not connect to a database or call a model.

## Preserve context and document lifecycle

Split around meaningful sections. Keep the product, region, policy heading, and exceptions available together. A chunk saying “30 days” is ambiguous without its policy and effective date. Anthropic's [Contextual Retrieval](https://www.anthropic.com/research/contextual-retrieval) describes this loss of context during chunking.

Store stable chunk IDs, document IDs, revision numbers, effective dates, and the embedding model. Build a new revision completely before atomically switching the active version. Apply withdrawal and deletion to every search index.

This example answers current-policy questions. Historical questions require selecting the revision applicable to the requested date.

## Retrieve only eligible evidence

The server establishes identity and verifies active tenant membership. Both semantic and lexical retrieval must enforce the same document permissions and version filters. Unauthorized text must never enter the model context.

Here is a parameterized query for an explicit document-access model. `documents` holds publication status and the active revision; `chunks` holds content, vectors, revision, and effective dates; `document_acl` grants users document access:

```sql
SELECT c.id, c.body, c.document_id, c.version
FROM chunks AS c
JOIN documents AS d ON d.id = c.document_id
WHERE d.tenant_id = %(tenant_id)s
  AND d.status = 'published'
  AND c.version = d.active_version
  AND c.embedding_model = %(embedding_model)s
  AND c.valid_from <= %(as_of)s
  AND (c.valid_until IS NULL OR c.valid_until > %(as_of)s)
  AND EXISTS (
      SELECT 1 FROM document_acl AS a
      WHERE a.document_id = d.id AND a.user_id = %(user_id)s
  )
ORDER BY c.embedding <=> %(embedding)s::vector
LIMIT %(k)s
```

Supply `tenant_id` and `user_id` from verified server identity. Bind a pgvector-adapted embedding through the [database driver](https://www.psycopg.org/psycopg3/docs/basic/params.html), use the indexed embedding model, and validate the server's `k` limit.

[PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) can add another enforcement layer. Check service-role privileges because owners and bypass roles can evade those policies.

Measure retrieval after filters. [pgvector documents](https://github.com/pgvector/pgvector#filtering) that approximate indexes can return too few matches after filtering. Compare against an exact-search baseline before tuning scan settings or changing index layout.

::rag-reliability-diagram{kind="retrieval"}
::

## Combine lexical and semantic retrieval

Semantic search may find general return policies while lexical search catches a specific identifier like `AX17`. Retrieve candidates from both, then combine their ranked chunk IDs. Reciprocal rank fusion avoids adding incompatible raw scores:

```python
from collections import defaultdict

def rrf(*rankings: list[str], rank_constant: int = 60, limit: int = 8) -> list[str]:
    """Fuse ranked chunk IDs without comparing incompatible search scores."""
    if rank_constant < 1 or limit < 1:
        raise ValueError("rank_constant and limit must be positive")
    scores: dict[str, float] = defaultdict(float)
    for ranking in rankings:
        for rank, chunk_id in enumerate(dict.fromkeys(ranking), start=1):
            scores[chunk_id] += 1 / (rank_constant + rank)
    return sorted(scores, key=lambda cid: (-scores[cid], cid))[:limit]
```

The rank constant and result limit are starting values to evaluate. A similarity score is not a calibrated probability that an answer is correct.

If evals show ranking errors, try a reranker on the candidate pool. It adds latency, so measure the trade-off. Pack complete, relevant passages within a token budget that reserves room for instructions and the answer. Recheck evidence coverage after packing: a relevant retrieved chunk can still disappear before generation.

## Check citations and support abstention

Request a structured response that can explicitly report insufficient evidence. Validate it against the IDs of chunks **actually included in the prompt**:

```python
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

class Answer(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    status: Literal["answered", "insufficient_evidence"]
    answer: str = Field(min_length=1, max_length=4000)
    citations: list[str]

def checked_answer(raw: dict, context_ids: set[str]) -> Answer:
    """Check citation membership, not factual support or semantic grounding."""
    result = Answer.model_validate(raw)
    if result.status == "insufficient_evidence":
        return Answer(
            status="insufficient_evidence",
            answer="I don't have enough current, authorized evidence.",
            citations=[],
        )
    if not result.citations or not set(result.citations) <= context_ids:
        raise ValueError("Answer must cite chunks actually sent to the model")
    return result
```

If retrieval produces no eligible evidence, skip generation and return the controlled insufficient-evidence response. Map validation failures to a safe fallback or review path.

This check establishes citation membership only. A model can cite a real passage that contradicts its answer. Evaluate claim-level support separately, and resolve citation links from server-owned metadata.

Retrieved documents are untrusted input. [OWASP's prompt-injection guidance](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) explains why prompt wording alone cannot enforce permissions. Keep tool access and consequential actions under application control.

## Measure where relevance was lost

Maintain labeled cases containing the question, authorized scope, required evidence, and expected behavior. For answerable cases, measure evidence recall independently of generation:

```python
def recall_at_k(gold_ids: set[str], retrieved_ids: list[str], k: int = 5) -> float:
    """Recall of required evidence chunks; use separate checks for abstention."""
    if not gold_ids or k < 1:
        raise ValueError("Use labeled answerable cases and a positive k")
    return len(gold_ids & set(retrieved_ids[:k])) / len(gold_ids)
```

Use revision-specific chunk IDs in the labels. Define acceptable evidence alternatives when multiple passages support the answer. Recall measures coverage; also inspect ranking and irrelevant context. Unanswerable cases need separate abstention checks.

| Scenario | What the evaluation should catch |
| --- | --- |
| Opened AX17 after 21 days | Current return window and opened-item exclusion reach the prompt |
| The same question in Portuguese | Retrieval preserves the same policy meaning |
| An attempted cross-tenant lookup | Unauthorized chunks never reach context or cache output |
| A withdrawn or superseded policy | Retrieval and cached answers respect the update |
| No documented exception | The assistant avoids inventing an exception |

[Task-specific evals](https://developers.openai.com/api/docs/guides/evaluation-best-practices) should run when chunking, embeddings, retrieval, prompts, or models change. Compare retrieval coverage, answer support, abstention, latency, and cost rather than relying on one aggregate score.

::rag-reliability-diagram{kind="diagnosis"}
::

## Keep production evidence inspectable

Trace chunk IDs, document versions, retrieval ranks, context selection, and model/prompt versions. Redact sensitive content. Record retrieval and generation latency separately.

For cached answers, check authorization before serving a hit. Include corpus and permission revisions in cache scoping, and invalidate on relevant changes. A good answer can become wrong when a policy changes or access is revoked.

When an answer fails, locate the first broken stage. That gives you a concrete engineering change to evaluate, instead of another prompt edit made on intuition.
