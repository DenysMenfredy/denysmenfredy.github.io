---
title: "From React to the LLM: Anatomy of a Production AI Feature"
description: "Follow an AI feature from the React interface through authorization, retrieval, generation, streaming, and production monitoring."
publishedAt: '2026-10-19T16:47:35-03:00'
tags:
  - Full-Stack
  - AI Engineering
  - React
  - System Design
image: '/images/blog/react-to-llm/cover.webp'
imageAlt: 'Interconnected emerald glass structures and charcoal gateways representing the layers between an interface, application backend, data, and an AI model.'
---

A “Generate reply” button looks simple. Behind it, the application has to identify the user, retrieve the right information, manage a slow dependency, and return something the interface can safely use.

Let's follow a hypothetical support assistant that drafts a reply using a ticket and company policies. A person reviews the draft before sending it. The interesting engineering decisions sit along the entire request path.

## A small architecture with clear responsibilities

For this example, use React for the interface and FastAPI for the application backend. A Next.js application can also provide an optional backend-for-frontend layer, which adapts requests to the UI. A small product may keep all server logic in one service. Separate deployments should solve a concrete need, such as an existing Python backend or independent scaling.

| Layer | Responsibility |
| --- | --- |
| React | Input, progress, cancellation, draft review, and errors |
| API | Authentication, authorization, validation, and usage limits |
| AI orchestration | Authorized context, prompt construction, model calls, and output checks |
| Storage | Tickets, policies, generation status, and saved drafts |
| Worker, when needed | Document ingestion and work that must survive the request |

Next.js [Route Handlers are public endpoints](https://nextjs.org/docs/app/guides/backend-for-frontend). Moving a model call to a server route keeps provider credentials off the browser, but that endpoint still needs access controls.

::production-ai-diagram{kind="architecture"}
::

## The API establishes the trust boundary

The browser submits a ticket ID and a drafting instruction. The backend validates the payload, authenticates the caller, and verifies access to that ticket. It derives the permitted tenant scope from verified identity and membership, rather than trusting a tenant ID in the request body.

Apply that scope to database queries, document retrieval, and any tools. [OWASP recommends checking permissions on every request](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). A server route or a model's decision cannot replace those checks.

Bound input size, request duration, and model usage. Keep credentials on the server, and return useful errors without exposing internal details.

## Context belongs to the application

Load the authorized ticket from the database. If the feature needs policy documents, retrieve relevant passages with access filters applied before content enters the prompt. Preserve document identifiers and versions so references can be checked later.

Keep instructions separate from retrieved content. Documents supply evidence, and application code decides which operations are permitted. If the available material cannot support an answer, the feature should request clarification or return a draft that explicitly identifies the missing information.

Use a fixed workflow for this bounded task. Dynamic tool selection adds another behavior to secure and evaluate, so introduce it when the feature actually needs it.

## Streaming needs an application contract

[Streaming](https://developers.openai.com/api/docs/guides/streaming-responses) lets the UI show text while generation continues. It also exposes partial output before final checks finish.

Give the interface explicit states: generating, reviewing, failed, and cancelled. For this draft feature, incremental text is provisional. Enable review only after the backend validates the complete result and saves it. If content must pass checks before anyone sees it, buffer the response instead.

Associate updates with a generation ID so an older response cannot overwrite a newer draft. React's [data-fetching guidance](https://react.dev/reference/react/useEffect) illustrates this race-condition problem.

The browser can cancel a fetch using [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). Propagate cancellation through the backend where supported, and enforce server deadlines independently. Stopping the UI alone doesn't prove upstream work stopped.

::production-ai-diagram{kind="lifecycle"}
::

## Durable state and background work

React owns the current view. The database owns saved drafts and authoritative job status. If the user reloads, the application can recover a persisted result rather than guessing from a disconnected stream.

For document ingestion or long jobs, use a worker with a durable queue and recoverable status. FastAPI's [background-task guide](https://fastapi.tiangolo.com/tutorial/background-tasks/) distinguishes small in-process tasks from work suited to separate workers. Plan for worker retries and duplicate delivery.

Keep sending a reply as a separate, authorized action. A retry of draft generation should never silently send a message. Scope any cache to the authorized context and relevant document versions.

## Validate and observe the complete feature

Validate the final output schema, referenced document IDs, and application constraints. [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) constrain format, but valid structure still permits incorrect content. Render generated text through a safe renderer.

Carry a request ID across the API, retrieval, and model call. Record timing, failures, token usage, and model/prompt versions, with sensitive data redacted. Track time to first visible text separately from total completion time.

Combine API and UI tests with [task-specific evals](https://developers.openai.com/api/docs/guides/evaluation-best-practices). Cover unsupported answers, cross-tenant access attempts, provider timeouts, and interrupted streams. Keep manual drafting available when generation fails.

Owning this feature means owning the path from a user's click to a saved, reviewable result, including what the product does when any step fails.
