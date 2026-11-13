# Research notes: You Probably Don't Need an AI Agent

Reviewed: November 13, 2026. Primary sources only. This is an architecture argument, not a survey or a claim about the percentage of projects needing agents.

| Resource | Read for | Used in the post |
| --- | --- | --- |
| [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Definitions, simple patterns, cost/latency tradeoffs | Workflow versus adaptive control |
| [LangGraph: Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents) | Predetermined paths and dynamic tool choice | Architecture comparison |
| [OpenAI: A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) | Use-case fit, scoped tools, stopping conditions, intervention | When an agent is justified |
| [OpenAI: Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Datasets, failure isolation, architecture comparisons | Eval-driven autonomy |
| [AWS: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) | Stable request identifiers and server-side guarantees | External effects and retries |
| [JSON Schema: Object](https://json-schema.org/understanding-json-schema/reference/object) | Required fields and rejecting extra properties | Shape checks at runtime |

## Editorial interpretation

The recommendation to make autonomy win a comparison is the author's synthesis of these sources and ordinary system design. Examples use fictional order IDs and synthetic fixtures. No client outcomes, savings, benchmarks, or success rates are asserted. The article does not claim that RAG, tool calling, or a framework alone determines whether a system is an agent.

Anthropic's article was originally published in December 2024 and now notes that tooling has changed. We use its architectural distinction, not its historical tool recommendations. No SDK-specific code or model name is required by the companion example.
