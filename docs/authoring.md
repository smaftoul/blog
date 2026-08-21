# Blog content — authoring guide

## Collection location

Posts live in `src/content/blog/`. Both `.md` and `.mdx` files are supported.

## Frontmatter schema

```yaml
---
title: My Post Title          # required — displayed as H1 and page title
description: A short summary  # required — used in post list and meta tags
pubDatetime: 2024-10-13       # required — publication date (ISO date or datetime)
modDatetime: 2024-11-01       # optional — last modified date, shown in post meta
tags:                         # optional — array of lowercase strings
  - infrastructure
  - opentofu
draft: false                  # optional (default: false) — true hides in prod builds
featured: false               # optional (default: false) — shown with accent in post list
---
```

## Writing posts

Posts support full Markdown including:
- Fenced code blocks with syntax highlighting (via Shiki, Astro default)
- Mermaid diagrams (Phase 6): ` ```mermaid ``` `
- Tables, blockquotes, inline code
- MDX: import Astro components with `.mdx` extension

## Draft posts

Setting `draft: true` excludes the post from production builds (`bun run build`) but keeps it visible in dev (`bun run dev`). This allows previewing before publishing.

## Slugs

The post URL is derived from the filename: `src/content/blog/my-post.md` → `/blog/my-post`.

## Featured posts

`featured: true` adds a cyan left-border and a ★ badge on the post list. Use sparingly for highlighted content.
