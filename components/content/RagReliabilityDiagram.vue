<template>
    <figure class="rag-reliability-diagram not-prose my-10 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100/70 dark:border-stone-700 dark:bg-stone-900">
        <div class="border-b border-stone-200 px-5 py-5 dark:border-stone-700 sm:px-7">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{{ kind === 'retrieval' ? 'Retrieval checkpoints' : 'Failure diagnosis' }}</p>
            <h3 class="m-0 mt-2 text-xl font-semibold leading-snug text-stone-950 dark:text-stone-50">{{ kind === 'retrieval' ? 'Two search paths, the same evidence constraints' : 'Find the first broken stage' }}</h3>
        </div>

        <div v-if="kind === 'retrieval'" class="px-5 py-6 sm:px-7">
            <div class="diagram-node">
                <h4>Verified server identity</h4>
                <p>Authenticate the caller and verify active tenant membership.</p>
            </div>

            <p class="connector"><span aria-hidden="true">↓ </span>Apply scope to both search branches</p>

            <ul class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
                <li v-for="branch in searchBranches" :key="branch.title" class="diagram-node">
                    <h4>{{ branch.title }}</h4>
                    <p>{{ branch.description }}</p>
                    <ul class="m-0 mt-3 list-disc space-y-1 border-t border-stone-200 pl-4 pt-3 text-sm leading-6 text-stone-700 dark:border-stone-700 dark:text-stone-200">
                        <li class="m-0">Tenant scope and document access</li>
                        <li class="m-0">Published, active revision</li>
                        <li class="m-0">Effective at the query date</li>
                    </ul>
                </li>
            </ul>

            <p class="connector"><span aria-hidden="true">↓ </span>Combine eligible ranked chunk IDs</p>

            <ol class="m-0 list-none p-0">
                <li v-for="(step, index) in retrievalSteps" :key="step.title" class="m-0">
                    <p v-if="index > 0" class="connector" aria-hidden="true">↓</p>
                    <div class="diagram-node">
                        <h4>{{ step.title }}</h4>
                        <p>{{ step.description }}</p>
                    </div>
                </li>
            </ol>

            <p class="m-0 mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200">
                No eligible evidence → skip generation and return the controlled insufficient-evidence response.
            </p>
        </div>

        <ol v-else class="m-0 list-none px-5 py-6 sm:px-7">
            <li v-for="(check, index) in diagnosticChecks" :key="check.stage" class="m-0">
                <p v-if="index > 0" class="connector"><span aria-hidden="true">↓ </span>Yes → check the next stage</p>
                <div class="diagram-node">
                    <p class="stage-label">{{ index + 1 }} · {{ check.stage }}</p>
                    <h4>{{ check.question }}</h4>
                    <div class="mt-3 border-l-2 border-stone-300 pl-3 dark:border-stone-600">
                        <p><strong class="font-semibold text-stone-900 dark:text-stone-100">No → {{ check.owner }}</strong></p>
                        <p>{{ check.action }}</p>
                    </div>
                </div>
            </li>
        </ol>

        <figcaption class="border-t border-stone-200 px-5 py-4 text-sm leading-6 text-stone-600 dark:border-stone-700 dark:text-stone-300 sm:px-7">
            {{ kind === 'retrieval' ? 'Access and version filters apply before text enters the prompt. Preserve source IDs through context assembly.' : 'Trace evidence through these stages in order. Citation membership alone does not establish claim support.' }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
defineProps<{ kind: 'retrieval' | 'diagnosis' }>()

const searchBranches = [
    { title: 'Semantic retrieval', description: 'Find related policy passages with the indexed embedding model.' },
    { title: 'Lexical retrieval', description: 'Match exact terms and identifiers such as AX17.' },
]

const retrievalSteps = [
    { title: 'Reciprocal rank fusion', description: 'Combine rankings without adding incompatible raw search scores.' },
    { title: 'Optional reranking', description: 'Reorder the candidate pool if evaluation shows ranking errors.' },
    { title: 'Bounded context assembly', description: 'Pack complete passages with chunk IDs, document IDs, and versions. Reserve room for instructions and the answer.' },
]

const diagnosticChecks = [
    { stage: 'Eligibility', question: 'Was the evidence authorized and current?', owner: 'Eligibility failure', action: 'Inspect tenant scope, document access, publication status, active revision, and effective dates.' },
    { stage: 'Retrieval', question: 'Was the required evidence retrieved?', owner: 'Retrieval failure', action: 'Inspect chunk context, both search branches, filtering, and candidate rankings.' },
    { stage: 'Context assembly', question: 'Did the required evidence reach the prompt?', owner: 'Context assembly failure', action: 'Inspect context selection and token-budget packing for dropped passages.' },
    { stage: 'Generation', question: 'Does the answer follow from that evidence?', owner: 'Generation or grounding failure', action: 'Inspect unsupported claims and abstention behavior; evaluate claim-level support separately from citation IDs.' },
]
</script>

<style scoped>
.diagram-node {
    @apply m-0 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-950;
}

.diagram-node h4 {
    @apply m-0 text-base font-semibold leading-6 text-stone-950 dark:text-stone-50;
}

.diagram-node p {
    @apply m-0 mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300;
}

.diagram-node .stage-label {
    @apply m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400;
}

.connector {
    @apply my-3 text-center text-sm font-medium leading-6 text-emerald-800 dark:text-emerald-300;
}
</style>
