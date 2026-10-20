<template>
    <figure class="production-ai-diagram not-prose my-10 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100/70 dark:border-stone-700 dark:bg-stone-900">
        <div class="border-b border-stone-200 px-5 py-5 dark:border-stone-700 sm:px-7">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{{ kind === 'architecture' ? 'Request architecture' : 'UI lifecycle' }}</p>
            <h3 class="m-0 mt-2 text-xl font-semibold leading-snug text-stone-950 dark:text-stone-50">{{ kind === 'architecture' ? 'From click to saved draft' : 'Provisional text becomes a reviewable draft' }}</h3>
        </div>

        <div v-if="kind === 'architecture'" class="px-5 py-6 sm:px-7">
            <ol class="request-path">
                <li v-for="step in requestPath" :key="step.title" class="diagram-node">
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.description }}</p>
                </li>
            </ol>

            <p class="connector"><span aria-hidden="true">↓ </span>Authorized scope enters orchestration</p>

            <section class="rounded-xl border border-emerald-700/25 bg-emerald-50/60 p-4 dark:border-emerald-400/30 dark:bg-emerald-950/30">
                <h4 class="m-0 mb-4 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Inside the FastAPI workflow</h4>
                <ol class="m-0 list-none space-y-3 p-0">
                    <li v-for="(step, index) in workflow" :key="step.title" class="diagram-node flex gap-3">
                        <span aria-hidden="true" class="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{{ index + 1 }}</span>
                        <div class="min-w-0">
                            <h5>{{ step.title }}</h5>
                            <p>{{ step.description }}</p>
                        </div>
                    </li>
                </ol>
            </section>

            <div class="return-path mt-4 rounded-lg border border-emerald-700/25 px-4 py-3 dark:border-emerald-400/30">
                <p class="m-0 text-sm font-semibold leading-6 text-emerald-800 dark:text-emerald-300"><span aria-hidden="true">↩ </span>Response: FastAPI → optional BFF → React</p>
                <p class="m-0 mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">Stream provisional text and report the final generation status through the API.</p>
            </div>

            <aside class="mt-5 rounded-xl border border-dashed border-stone-300 p-4 dark:border-stone-600" aria-label="Separate background ingestion branch">
                <h4 class="m-0 text-sm font-semibold text-stone-900 dark:text-stone-100">Separate branch: document ingestion</h4>
                <p class="m-0 mt-2 text-sm leading-6 text-stone-700 dark:text-stone-200">Documents → durable queue → worker → policy store</p>
                <p class="m-0 mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">Feeds policy retrieval in step 1. Runs independently of the interactive request.</p>
            </aside>
        </div>

        <div v-else class="px-5 py-6 sm:px-7">
            <div class="diagram-node">
                <h4>Generating</h4>
                <p>Streamed text is provisional. Review stays disabled.</p>
            </div>

            <p class="connector"><span aria-hidden="true">↓ </span>Complete output received</p>

            <div class="diagram-node">
                <h4>Backend validates and saves</h4>
                <p>The UI remains in generating until the result passes checks and the draft is persisted.</p>
            </div>

            <p class="connector"><span aria-hidden="true">↓ </span>Validation and saving succeed</p>

            <div class="diagram-node success-node">
                <h4>Reviewing</h4>
                <p>Enable human review of the saved draft. Sending is a separate authorized action.</p>
            </div>

            <div class="mt-5 border-t border-stone-200 pt-5 dark:border-stone-700">
                <p class="m-0 mb-3 text-sm font-semibold text-stone-700 dark:text-stone-200">Other outcomes while generating</p>
                <ul class="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                    <li class="diagram-node">
                        <h4><span aria-hidden="true">↳ </span>Failed</h4>
                        <p>A provider, stream, validation, or save error prevents review. Keep manual drafting available.</p>
                    </li>
                    <li class="diagram-node">
                        <h4><span aria-hidden="true">↳ </span>Cancelled</h4>
                        <p>The user stops generation. Propagate cancellation where supported; keep server deadlines.</p>
                    </li>
                </ul>
            </div>
        </div>

        <figcaption class="border-t border-stone-200 px-5 py-4 text-sm leading-6 text-stone-600 dark:border-stone-700 dark:text-stone-300 sm:px-7">
            {{ kind === 'architecture' ? 'Authorization precedes retrieval. Provider credentials and access checks stay on the server.' : 'Associate every update with its generation ID so an older response cannot overwrite the current draft.' }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
defineProps<{ kind: 'architecture' | 'lifecycle' }>()

const requestPath = [
    { title: 'React', description: 'Ticket ID and drafting instruction.' },
    { title: 'Next.js BFF (optional)', description: 'Adapt the request for the interface.' },
    { title: 'FastAPI', description: 'Authenticate, authorize ticket access, and validate input.' },
]

const workflow = [
    { title: 'Database & policy retrieval', description: 'Load the authorized ticket and relevant policy passages. Apply tenant access filters before prompting.' },
    { title: 'LLM provider', description: 'Build the prompt with authorized context and call the model using server credentials.' },
    { title: 'Validate & save the draft', description: 'Check output structure, document references, and application constraints; persist the accepted draft.' },
]
</script>

<style scoped>
.diagram-node {
    @apply m-0 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-950;
}

.diagram-node h4,
.diagram-node h5 {
    @apply m-0 text-base font-semibold leading-6 text-stone-950 dark:text-stone-50;
}

.diagram-node p {
    @apply m-0 mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300;
}

.connector {
    @apply my-3 text-center text-sm font-medium leading-6 text-emerald-800 dark:text-emerald-300;
}

.request-path {
    @apply m-0 grid list-none gap-7 p-0 sm:grid-cols-3;
}

.request-path li {
    @apply relative;
}

.request-path li:not(:last-child)::after {
    content: '↓';
    @apply absolute -bottom-7 left-1/2 flex h-7 items-center text-emerald-700 dark:text-emerald-400;
    transform: translateX(-50%);
}

.success-node {
    @apply border-emerald-700/30 bg-emerald-50 dark:border-emerald-400/40 dark:bg-emerald-950/50;
}

@media (min-width: 640px) {
    .request-path li:not(:last-child)::after {
        content: '→';
        @apply -right-7 bottom-auto left-auto top-1/2 w-7 justify-center;
        transform: translateY(-50%);
    }
}
</style>
