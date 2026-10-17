<template>
    <figure class="not-prose my-10 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100/70 dark:border-stone-700 dark:bg-stone-900">
        <div class="border-b border-stone-200 px-5 py-5 dark:border-stone-700 sm:px-7">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{{ diagram.eyebrow }}</p>
            <h3 class="m-0 mt-2 text-xl font-semibold leading-snug text-stone-950 dark:text-stone-50">{{ diagram.title }}</h3>
        </div>

        <ol class="m-0 list-none px-5 py-6 sm:px-7">
            <li v-for="(step, index) in diagram.steps" :key="step.title" class="relative m-0 flex gap-4 pb-5 last:pb-0">
                <span v-if="index < diagram.steps.length - 1" aria-hidden="true" class="absolute bottom-0 left-4 top-8 w-px bg-emerald-700/25 dark:bg-emerald-400/30" />
                <span aria-hidden="true" class="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-700/25 bg-emerald-50 text-xs font-semibold text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-950 dark:text-emerald-300">{{ index + 1 }}</span>
                <div class="min-w-0 flex-1 pt-0.5">
                    <h4 class="m-0 text-base font-semibold leading-6 text-stone-950 dark:text-stone-50">{{ step.title }}</h4>
                    <p class="m-0 mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">{{ step.description }}</p>
                    <p v-if="step.branch" class="m-0 mt-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm leading-6 text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300">
                        <span aria-hidden="true" class="mr-1 text-emerald-700 dark:text-emerald-400">↳</span>{{ step.branch }}
                    </p>
                </div>
            </li>
        </ol>

        <figcaption class="border-t border-stone-200 px-5 py-4 text-sm leading-6 text-stone-600 dark:border-stone-700 dark:text-stone-300 sm:px-7">
            <span v-if="kind === 'feedback'" aria-hidden="true" class="mr-1 text-emerald-700 dark:text-emerald-400">↻</span>{{ diagram.caption }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
const props = defineProps<{ kind: 'checkpoints' | 'feedback' }>()

type EvaluationStep = { title: string; description: string; branch?: string }
type EvaluationDiagram = { eyebrow: string; title: string; steps: EvaluationStep[]; caption: string }

const diagrams: Record<'checkpoints' | 'feedback', EvaluationDiagram> = {
    checkpoints: {
        eyebrow: 'Evaluation checkpoints',
        title: 'From request to confirmed booking',
        steps: [
            { title: 'Interpret the request', description: 'Identify the service, date, and time.', branch: 'Missing details → ask for clarification.' },
            { title: 'Select the tool', description: 'Choose the appropriate booking operation.' },
            { title: 'Validate the arguments', description: 'Check required fields; enforce availability, permissions, and booking rules in application code.', branch: 'Invalid request → explain the constraint.' },
            { title: 'Execute the tool', description: 'Run the authorized operation.', branch: 'Tool error → report the failure.' },
            { title: 'Verify the outcome', description: 'Inspect the persisted booking before confirming success.', branch: 'No booking → do not claim confirmation.' },
        ],
        caption: 'Evaluate each step and the resulting application state. A convincing reply alone is not evidence of success.',
    },
    feedback: {
        eyebrow: 'Continuous evaluation',
        title: 'Turn production failures into regression cases',
        steps: [
            { title: 'Capture production traces', description: 'Sample real behavior with sensitive data redacted.' },
            { title: 'Review failures', description: 'Identify what happened and label the expected behavior.' },
            { title: 'Update the dataset', description: 'Add reviewed cases to future regression checks.' },
            { title: 'Evaluate the candidate', description: 'Compare against the baseline on the same held-out cases.' },
            { title: 'Decide whether to release', description: 'Apply release thresholds and investigate individual failures.' },
        ],
        caption: 'After release, return to production traces and repeat the loop.',
    },
}

const diagram = computed(() => diagrams[props.kind])
</script>
