# Writing blog posts

Add a Markdown file under `content/blog/`. Its location determines its URL: `content/blog/my-post.md` becomes `/blog/my-post`, and `content/blog/code/my-post.md` becomes `/blog/code/my-post`. Keep the file path stable after sharing a post.

Start each file with frontmatter:

```yaml
---
title: 'What I learned building a small search feature'
description: 'The indexing approach I tried, the tradeoffs I found, and what I would change next.'
publishedAt: '2026-10-06T09:00:00-03:00'
tags: ['search', 'full-stack']
---
```

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | Yes | Post title, shown on the page and in previews. |
| `description` | Yes | One or two sentences about what the reader will learn; 10–300 characters. |
| `publishedAt` | Yes | Original publication time in ISO 8601 format with a timezone. The blog sorts by this value and displays dates in Belém time. |
| `updatedAt` | No | Time of a substantive revision, in the same format. Do not change `publishedAt` when updating a post. |
| `tags` | No | A short list of topics; defaults to an empty list. |
| `image` | No | Reserved for a future post image. |

The page template renders the post title as its `h1`, so begin the Markdown body with a paragraph or an `##` heading. Check that dates and descriptions are accurate before publishing.
