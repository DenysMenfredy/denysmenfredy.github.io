"""Python 3.10+ helpers from the article; requires Pydantic 2.x.

The SQL is an integration example for PostgreSQL + pgvector, not a migration
or a complete retrieval service. Supply authenticated identity and membership
from the server. Bind parameters through the database driver, with a registered
pgvector adapter for the embedding. Validate k in the application.

Assumed columns:
  documents(id, tenant_id, status, active_version)
  chunks(id, document_id, version, body, embedding, embedding_model,
         valid_from, valid_until)
  document_acl(document_id, user_id)

This example answers current-policy questions, not historical-policy questions.
"""

from collections import defaultdict
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


RETRIEVE_SQL = """
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
"""


def rrf(*rankings: list[str], rank_constant: int = 60, limit: int = 8) -> list[str]:
    """Fuse ranked chunk IDs without comparing incompatible search scores."""
    if rank_constant < 1 or limit < 1:
        raise ValueError("rank_constant and limit must be positive")
    scores: dict[str, float] = defaultdict(float)
    for ranking in rankings:
        for rank, chunk_id in enumerate(dict.fromkeys(ranking), start=1):
            scores[chunk_id] += 1 / (rank_constant + rank)
    return sorted(scores, key=lambda cid: (-scores[cid], cid))[:limit]


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


def recall_at_k(gold_ids: set[str], retrieved_ids: list[str], k: int = 5) -> float:
    """Recall of required evidence chunks; use separate checks for abstention."""
    if not gold_ids or k < 1:
        raise ValueError("Use labeled answerable cases and a positive k")
    return len(gold_ids & set(retrieved_ids[:k])) / len(gold_ids)


if __name__ == "__main__":
    vector_ids = ["returns:v3:window", "shipping:v2:overview"]
    lexical_ids = ["returns:v3:exceptions", "returns:v3:window"]
    ranked = rrf(vector_ids, lexical_ids)
    result = checked_answer(
        {
            "status": "answered",
            "answer": "The current policy requires checking both the return window and exceptions.",
            "citations": ["returns:v3:window", "returns:v3:exceptions"],
        },
        context_ids=set(ranked),
    )
    print(result.model_dump_json(indent=2))
    print("Recall@2:", recall_at_k({"returns:v3:window", "returns:v3:exceptions"}, ranked, 2))
