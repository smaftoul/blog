# brume

Personal site, blog, and lab for Samuel Maftoul.

brume is built with [Astro](https://astro.build), deployed as a static site on [Cloudflare Pages](https://pages.cloudflare.com), and developed with [Nix](https://nixos.org) + [Bun](https://bun.sh) for reproducibility.

## What it does

- Markdown/MDX-first blog posts and content pages
- A shared site shell with theme toggle, search, navigation, and footer
- Pagefind-powered full-text search
- Mermaid diagram support in markdown
- Cloudflare Pages headers generated at build time
- Optional feature flags for analytics and IndieWeb features

## Tech stack

- Astro
- MDX
- UnoCSS
- Pagefind
- Bun
- Nix + direnv
- GitHub Actions

## Project layout

```txt
brume/
├── src/
│   ├── components/
│   │   └── layout/        # page shell pieces (head, header, search, footer)
│   ├── config.ts          # site metadata, navigation, feature flags
│   ├── content/
│   │   ├── blog/          # blog posts (md/mdx)
│   │   └── pages/         # static pages (md/mdx)
│   ├── layouts/           # page wrappers
│   ├── lib/               # shared helpers
│   ├── pages/             # Astro routes
│   ├── styles/            # global CSS
│   └── utils/             # markdown remark helpers
├── public/                # static assets
├── astro.config.ts
├── flake.nix
├── package.json
└── README.md
```

## Getting started

```bash
cd brume
direnv allow
bun install
bun run dev
```

If you prefer to enter the flake manually:

```bash
nix develop
```

## Useful commands

- `bun run dev` — start the dev server
- `bun run build` — type-check, build, and run Pagefind
- `bun run preview` — preview the production build
- `bun run check` — run Astro type checks only

## Content

- Blog posts live in [src/content/blog/](/Users/smaftoul/workspace/perso/blog-rewrite/brume/src/content/blog)
- Static pages live in [src/content/pages/](/Users/smaftoul/workspace/perso/blog-rewrite/brume/src/content/pages)
- The contributions page is MDX-driven

## Deployment

The site is designed for Cloudflare Pages with GitHub Actions and a static build output in `dist/`.

## Notes

- Feature flags live in [src/config.ts](/Users/smaftoul/workspace/perso/blog-rewrite/brume/src/config.ts)
- Markdown processing is configured in [astro.config.ts](/Users/smaftoul/workspace/perso/blog-rewrite/brume/astro.config.ts)
- The build writes Cloudflare `_headers` during `astro build`
