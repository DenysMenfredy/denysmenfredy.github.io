---
title: "You Probably Don't Need an AI Agent"
description: "Choose between ordinary code, LLM workflows, and agents with a practical TypeScript example, clear control boundaries, and an evaluation plan."
publishedAt: '2026-11-13T12:00:00-03:00'
tags:
  - AI Engineering
  - LLM
  - TypeScript
  - System Design
image: '/images/blog/you-probably-dont-need-an-ai-agent/cover.webp'
imageAlt: 'You probably do not need an AI agent. Does the model need to choose what happens next? An ivory and emerald editorial cover by Denys Menfredy.'
---

An AI feature can understand a messy request, retrieve context, and produce a useful result without becoming an autonomous agent.

Before adding a planning loop, ask: **Does the model need to choose what happens next?** If your application already knows the steps, a workflow may be enough.

This is an architecture argument, not a claim that most projects have been measured and found to need no agents. The examples below are illustrative engineering scenarios, not client case studies.

## The difference is who controls the next step

A workflow follows paths defined in code. An agent uses model decisions and observations to choose subsequent actions. Anthropic describes this distinction in [Building effective agents](https://www.anthropic.com/research/building-effective-agents); [LangGraph's documentation](https://docs.langchain.com/oss/python/langgraph/workflows-agents) uses the same practical boundary.

Calling a tool, using RAG, or running several model calls does not by itself establish an agent architecture. A fixed retrieve-then-answer pipeline is a workflow. A system that decides whether to search again, inspect another source, or change its approach has agentic control.

| Need | A sensible starting point | What the model decides |
| --- | --- | --- |
| Calculate eligibility from known rules | Ordinary code | Nothing |
| Extract fields from a support message | One structured LLM call | Interpretation of text |
| Retrieve policy, draft reply, request review | Explicit workflow | Content inside defined steps |
| Investigate an unfamiliar failure across logs and code | Bounded agent | Which investigation step comes next |

These are starting points. Choose from task requirements and evidence, rather than the label a framework uses.

## A CRM feature that does not need a planner

Consider a customer asking: **"Where is order ORD-2048?"**

The application already knows the sequence: interpret the message, validate the extracted fields, look up an order the user owns, and display its status. There is no useful planning problem here.

An agent with order lookup, cancellation, and refund tools would introduce decisions this read-only feature never needed. Its permissions would also exceed the feature's scope.

Use a narrow extraction contract:

```typescript
type Intent = {
  kind: "order_status" | "human";
  orderId: string | null;
};
```

Request structured output and validate it at runtime. A TypeScript type disappears at runtime. A schema can constrain fields and types; it cannot prove the model extracted the right order ID. [JSON Schema's object reference](https://json-schema.org/understanding-json-schema/reference/object) explains required and additional properties.

The following function uses the tested interfaces and validator included in the companion code:

```typescript
export async function handleSupport(
  text: string, ctx: AuthContext, deps: Dependencies
): Promise<Result> {
  if (text.trim().length === 0 || text.length > 4_000) return { kind: "human" };
  let intent: Intent;
  try {
    intent = parseIntent(await deps.extract(text));
  } catch {
    return { kind: "human" };
  }
  if (intent.kind !== "order_status" || intent.orderId === null) {
    return { kind: "human" };
  }
  try {
    const order = await deps.lookupOwnedOrder({ ...ctx, orderId: intent.orderId });
    if (!order) return { kind: "human" };
    return { kind: "status", orderId: intent.orderId, status: order.status };
  } catch {
    return { kind: "human" };
  }
}
```

`extract` makes one structured model request. `parseIntent` rejects extra fields, unknown intents, and invalid IDs. `lookupOwnedOrder` must enforce tenant, customer, and order ID together in its database query. Supply `ctx` from verified server authentication and tenant membership, never the prompt or browser payload.

The returned status comes from the order service. Missing details, malformed output, unknown or inaccessible orders, and dependency failures lead to an explicit support handoff. Operational logs should distinguish those causes without exposing them to another customer.

This is a focused component, not a complete backend. The pack includes the full validator, a parameterized SQL contract, extraction instructions, and tests. Your adapters still need provider deadlines, request cancellation, tracing, rate limits, and real authentication. Passing these tests does not measure an LLM's extraction accuracy.

### Run the companion tests

Download and extract the [companion TypeScript examples (ZIP)](/files/blog/you-probably-dont-need-an-ai-agent/companion-code.zip). The archive contains the workflow and validator, tests, extraction prompt and schema, scoped SQL lookup, evaluation cases, and source notes. From the extracted folder, use Node.js 24 to run:

```bash
node --test code/support-workflow.test.ts
```

No external packages or API credentials are needed for these mocked unit tests.

![An LLM extracts intent; server code validates it and queries an authorized order or hands the request to support.](/images/blog/you-probably-dont-need-an-ai-agent/workflow.webp)

[Open the workflow diagram at full size](/images/blog/you-probably-dont-need-an-ai-agent/workflow.webp).

## A fixed workflow can still handle sophisticated work

For invoice processing, extract candidate fields from the document, then validate totals, match the vendor, and route exceptions for review. Arithmetic and payment authorization belong in ordinary code. An agent becomes worth testing when resolving exceptions requires choosing among changing sources and investigation steps.

For a policy assistant, retrieve authorized current evidence and generate a cited answer. If the retrieval path is known, this is a RAG workflow. An agent may help when the task genuinely requires iterative investigation, with each finding determining the next search.

Complexity alone is not the deciding factor. The question is whether the **path** needs to adapt.

## When an agent earns its place

Consider: "Find why this deployment fails and propose a patch." The relevant logs, files, and commands depend on intermediate findings. A fixed checklist may miss the cause. Here, adaptive tool selection can be useful.

OpenAI's [practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) discusses use cases where conventional automation struggles. For an initial implementation, give one agent a narrow task and evaluate it against your workflow baseline.

Set explicit boundaries: allowed tools and resources, a deadline, model and tool-call budgets, completion checks, and a handoff path. Enforce authorization inside every tool. Treat retrieved text and tool output as untrusted data. A prompt is not an access-control mechanism.

For actions with external effects, separate proposing a change from executing it. Require confirmation where the product calls for it, and revalidate permissions and current state at execution. Reuse a durable operation key for retries; generating a fresh key on each attempt defeats deduplication. AWS's [idempotent API guidance](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) explains the service-side contract this requires.

## Make autonomy win a comparison

Run the workflow and agent on the same held-out tasks, with comparable access to data and tools. Repeat runs to expose variation. Keep development examples separate from the final comparison.

| Measure | What to record |
| --- | --- |
| Task success | Correct outcome and appropriate handoff, scored separately |
| Control failures | Attempted and executed unauthorized actions; duplicate effects |
| User experience | End-to-end p50/p95 latency and time to resolution |
| Economics | Total run cost, including retries and review, per successful task |
| Recoverability | Timeouts, budget exhaustion, and operator interventions |

Include missing IDs, conflicting requests, cross-tenant IDs, prompt injection, and unavailable dependencies. The companion JSONL contains 12 synthetic seed cases; expand them with representative, appropriately handled real examples before making deployment claims.

OpenAI's [evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) recommends evaluating where nondeterminism enters the system and letting evals drive a move to multiple agents.

Additional model decisions can introduce more failure points. Additional calls can also improve quality, and parallel work can reduce latency. Measure the whole system; "fewer calls" and "more agents" are both poor substitutes for results.

Keep the workflow when it meets the product's requirements. Add bounded autonomy when choosing the next action produces a measurable benefit that justifies its operating cost.

## Further reading

- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) - workflow patterns and the autonomy boundary.
- [LangGraph: Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents) - concrete control-flow patterns.
- [OpenAI: A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) - use-case selection, limits, and human intervention.
- [OpenAI: Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) - compare architectures and locate failure sources.
- [AWS: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) - prevent repeated external effects.
