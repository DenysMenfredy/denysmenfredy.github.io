# You Probably Don't Need an AI Agent — companion code

These examples accompany the article at `/blog/you-probably-dont-need-an-ai-agent`.

## Run the tests

Use Node.js 24. No external packages, API credentials, or database are required for the mocked unit tests. Run this command from this directory after extracting the companion archive:

```bash
node --test code/support-workflow.test.ts
```

## Files

- `code/support-workflow.ts`: a fixed order-status workflow, runtime intent validator, and injected model/database adapter interfaces.
- `code/support-workflow.test.ts`: unit tests for validation, control flow, scoped lookup arguments, fallback behavior, and extraction-call count.
- `code/extraction-contract.json`: the JSON Schema for the extraction response. The runtime validator additionally enforces conditional values and order ID formatting.
- `code/extraction-prompt.txt`: instructions for a single structured extraction request; the customer's message is untrusted input.
- `code/lookup-owned-order.sql`: a parameterized PostgreSQL lookup contract. Supply tenant and user identity from verified server authentication and membership; bind parameters through the driver.
- `code/eval-cases.jsonl`: 12 synthetic seed cases for extraction evaluations.
- `research/resources.md`: primary-source references and editorial notes.

The tests mock the model and use an in-memory scoped store. They do not establish live extraction accuracy or database authorization. This is a focused component, with no auth provider, actual model request, database integration, HTTP server, timeout implementation, or production logs. Implement deadlines and cancellation within the provider and database adapters. Expand the synthetic evaluation cases with representative held-out examples before making deployment claims.
