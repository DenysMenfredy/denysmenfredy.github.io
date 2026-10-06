<template>
    <main class="bg-stone-50 font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <section class="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-24">
            <div>
                <p class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">About me</p>
                <h1 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
                    Full-Stack AI<br class="hidden sm:block" /> Software Engineer
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300 sm:text-xl">
                    Production web applications, backend services, and AI-powered products—with a full-stack engineering foundation.
                </p>
                <div class="mt-8 flex flex-wrap gap-3">
                    <a href="https://github.com/DenysMenfredy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus:ring-offset-stone-950">View my work</a>
                    <a href="https://linkedin.com/in/denysmenfredy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-lg border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-stone-700 dark:text-stone-100 dark:hover:border-emerald-500 dark:hover:text-emerald-400 dark:focus:ring-offset-stone-950">Connect on LinkedIn</a>
                    <NuxtLink to="/blog" class="inline-flex items-center px-3 py-3 text-sm font-semibold text-stone-600 transition hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400">Read the blog <span class="ml-2" aria-hidden="true">→</span></NuxtLink>
                </div>
            </div>
            <div class="mx-auto w-full max-w-sm">
                <div class="overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-stone-200 shadow-xl shadow-stone-900/10 dark:border-emerald-950 dark:bg-stone-800 dark:shadow-black/30">
                    <NuxtImg src="/img/me.jpeg" alt="Denys Menfredy" width="720" height="1280" class="aspect-[4/5] w-full object-cover object-center" />
                </div>
            </div>
        </section>

        <section id="about" class="border-y border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/60">
            <div class="mx-auto grid max-w-6xl gap-7 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[0.65fr_1.35fr] md:gap-16">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">About</p>
                    <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Engineering across the stack.</h2>
                </div>
                <div class="space-y-4 text-base leading-7 text-stone-600 dark:text-stone-300 sm:text-lg sm:leading-8">
                    <p>I'm Denys, a Full-Stack AI Software Engineer with around five years of experience building web applications, backend services, and AI-powered products. I work primarily with Python and TypeScript, taking features from requirements and architecture through implementation, deployment, and iteration.</p>
                    <p>At Globo, I worked on production software, including an on-demand camera streaming platform. Alongside development, I mentored junior engineers and interns, reviewed code, and helped lead technical deliveries. Those experiences shaped how I approach engineering: clear decisions, maintainable code, and attention to how a system behaves once people depend on it.</p>
                    <p>My current focus is applied AI: LLM integrations, retrieval-augmented generation, and agentic workflows built on solid software engineering foundations. I also build independent products such as Vautrin OS and use Claude Code and Codex with specifications and architecture decision records to guide implementation. On this blog, I share practical lessons about full-stack development, system design, and building reliable AI applications.</p>
                </div>
            </div>
        </section>

        <section id="skills" class="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHeading eyebrow="Skills" title="A practical, full-stack toolkit." />
            <div class="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
                <table class="w-full table-fixed border-collapse text-left">
                    <thead class="sr-only">
                        <tr><th scope="col">Area</th><th scope="col">Skills</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in skills" :key="row.area" class="border-b border-stone-200 last:border-0 dark:border-stone-800">
                            <th scope="row" class="w-[35%] px-4 py-4 align-top text-sm font-semibold text-stone-900 dark:text-stone-100 sm:w-[27%] sm:px-6">{{ row.area }}</th>
                            <td class="break-words px-4 py-4 text-sm leading-6 text-stone-600 dark:text-stone-300 sm:px-6 sm:text-base">{{ row.items }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section id="career" class="border-y border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/60">
            <div class="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
                <SectionHeading eyebrow="Career timeline" title="Roles and experience." description="A progression from early data and software roles into full-stack and applied AI engineering." />
                <ol class="mt-9 space-y-4">
                    <li v-for="company in career" :key="company.name" class="relative rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950 sm:p-7">
                        <div class="border-b border-stone-200 pb-4 dark:border-stone-800">
                            <div>
                                <h3 class="text-xl font-semibold tracking-tight">{{ company.name }}</h3>
                                <p v-if="company.context" class="mt-1 text-sm text-stone-500 dark:text-stone-400">{{ company.context }}</p>
                            </div>
                        </div>
                        <ol class="mt-5 space-y-5 border-l border-stone-200 dark:border-stone-800">
                            <li v-for="role in company.roles" :key="`${role.title}-${role.period}`" class="relative ml-5 sm:ml-6">
                                <span class="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-emerald-600 bg-stone-50 dark:border-emerald-400 dark:bg-stone-950 sm:-left-[1.85rem]" aria-hidden="true"></span>
                                <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                                    <h4 class="font-semibold text-stone-900 dark:text-stone-100">{{ role.title }}</h4>
                                    <span class="shrink-0 text-sm text-stone-500 dark:text-stone-400">{{ role.period }}</span>
                                </div>
                                <p v-if="role.description" class="mt-2 max-w-4xl text-sm leading-6 text-stone-600 dark:text-stone-300 sm:text-base">{{ role.description }}</p>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </section>

        <section id="contact" class="bg-emerald-800 text-white dark:bg-emerald-950">
            <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:px-8 sm:py-14 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Get in touch</p>
                    <h2 class="mt-2 text-3xl font-bold tracking-tight">Let’s build reliable products.</h2>
                </div>
                <div class="flex flex-wrap gap-3">
                    <a href="https://linkedin.com/in/denysmenfredy" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50">LinkedIn</a>
                    <a href="https://github.com/DenysMenfredy" target="_blank" rel="noopener noreferrer" class="rounded-lg border border-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:border-emerald-800 dark:hover:bg-emerald-900">GitHub</a>
                    <a href="mailto:denys.menfredy7@gmail.com" class="rounded-lg border border-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:border-emerald-800 dark:hover:bg-emerald-900">Email</a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'About Denys Menfredy | Full-Stack AI Software Engineer',
    description: 'Full-Stack AI Software Engineer with around five years of experience building production web, backend, cloud, and AI systems using Python and TypeScript.',
    ogTitle: 'About Denys Menfredy | Full-Stack AI Software Engineer',
    ogDescription: 'Software engineer focused on production AI, full-stack systems, LLMs, RAG, agents, backend architecture, and reliable software engineering.',
    twitterTitle: 'About Denys Menfredy | Full-Stack AI Software Engineer',
    twitterDescription: 'Software engineer focused on production AI, full-stack systems, LLMs, RAG, agents, backend architecture, and reliable software engineering.'
})

const skills = [
    { area: 'Languages', items: 'Python, TypeScript, JavaScript, SQL' },
    { area: 'Frontend', items: 'React, Next.js, Vue; API integration and application architecture' },
    { area: 'Backend', items: 'FastAPI, Flask, Node.js; REST APIs, validation, authentication, and authorization' },
    { area: 'Data and cloud', items: 'PostgreSQL, AWS; data modeling and cloud deployment' },
    { area: 'Applied AI', items: 'LLM integration, RAG, embeddings, vector search, LangChain, LangGraph, and agentic workflows' },
    { area: 'Engineering practice', items: 'System design, testing, CI/CD, observability, code review, mentoring, specifications, and architecture decision records' },
    { area: 'AI-assisted development', items: 'Claude Code and Codex; implementation guided by requirements, acceptance criteria, and human review' }
]

const career = [
    {
        name: 'Abstra',
        context: 'Consulting engagement · Bayer Partner Experience',
        roles: [
            { title: 'AI Software Engineer at Bayer', period: 'Mar 2026 – Jun 2026', description: 'Consultant in Bayer’s Partner Experience division.' }
        ]
    },
    {
        name: 'Globo',
        context: 'Full-time',
        roles: [
            { title: 'Software Engineer', period: 'May 2023 – Mar 2026', description: 'Worked on production software, including an on-demand camera streaming platform. Mentored junior engineers and interns, reviewed code, and helped lead technical deliveries.' },
            { title: 'Junior Software Engineer', period: 'Mar 2023 – May 2023' }
        ]
    },
    {
        name: 'Meta Informática Brasil',
        context: 'Full-time',
        roles: [
            { title: 'Junior Software Engineer', period: 'Sep 2022 – Mar 2023' }
        ]
    },
    {
        name: 'Mezzomo Contabilidade',
        roles: [
            { title: 'Data Scientist Intern', period: 'Jun 2021 – Jan 2022' },
        ]
    },
    {
        name: 'Universidade Federal do Pará',
        roles: [
            { title: 'AI Research Student · Part-time', period: 'Aug 2019 – Jul 2021' }
        ]
    }
]
</script>
