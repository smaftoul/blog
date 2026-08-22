# brume — Personal blog and portfolio

A fast, minimal, beautifully-styled personal blog and portfolio built with [Astro](https://astro.build) and hosted on [Cloudflare Pages](https://pages.cloudflare.com).

> **brume** (noun, French): mist, fog — a state of subtle obscurity or quietness, fitting for a minimalist blog.

## Features

### 📝 Content
- **Blog posts** via markdown content collection with frontmatter (title, date, tags, description)
- **Static pages** (about, contact, now, uses, projects, links) converted to markdown for consistency
- **Interactive components** (iNaturalist observations, Google Calendar embed, GitHub contributions)
- All content stored in Git, deployed via CI/CD

### 🎨 Design & UX
- **Dark/light theme** with smooth toggle, no flash on load, persisted to localStorage
- **Smooth page transitions** using Astro's View Transitions API (animated backgrounds, no layout shift)
- **Responsive layout** that works on mobile, tablet, and desktop
- **Terminal/hacker aesthetic** with neon accents and UnoCSS utility-first styling
- **Custom 404 page** with brume styling

### 🔍 Search & Discovery
- **Full-text search** powered by [Pagefind](https://pagefind.app) — zero JS overhead on load, build-time indexing
- **Search modal** triggered by keyboard (Ctrl+K / Cmd+K) or magnifier icon
- **Smart result styling** with excerpt truncation, search term highlighting, distinct visual cards

### 🌐 SEO & Social
- **JSON-LD structured data** (BlogPosting, Person, WebSite for rich snippets)
- **Microformats** (h-card, rel-me links for IndieWeb compatibility)
- **Open Graph metadata** for social sharing (titles, descriptions, images)
- **Webmentions** integration — display reactions and replies from the IndieWeb
- **Mastodon discuss link** on blog posts — discuss articles on Mastodon instead of centralized comments

### 📊 Analytics & Tracking (optional, feature-flagged)
- **GoatCounter** privacy-first analytics (GDPR-compliant, no cookies)
- **Cloudflare headers** for security (CSP, cache control, CORS)

### 🚀 Developer Experience
- **Astro + TypeScript** with strict mode for safety
- **Bun** package manager for speed (fast install, fast run)
- **UnoCSS** for utility-first CSS with zero unused CSS
- **Nix + direnv** for reproducible dev environment with Node.js and Bun pre-configured
- **GitHub Actions** for CI/CD — POSSE to Mastodon, scheduled rebuilds

## Project Structure

```
brume/
├── src/
│   ├── config.ts                    # Site config, feature flags, navigation
│   ├── content/
│   │   ├── blog/                    # Blog posts (markdown)
│   │   ├── pages/                   # Static pages (about, contact, etc. — markdown)
│   │   └── config.ts                # Content collection schemas
│   ├── layouts/
│   │   ├── Base.astro               # Root layout (head, nav, footer, search modal)
│   │   ├── PageLayout.astro         # Static pages wrapper
│   │   └── PostLayout.astro         # Blog post wrapper (title, date, tags, metadata)
│   ├── pages/
│   │   ├── index.astro              # Home page
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog listing
│   │   │   └── [...slug].astro      # Individual blog posts
│   │   ├── [...slug].astro          # Dynamic pages (about, contact, etc.)
│   │   ├── inaturalist.astro        # iNaturalist observations (client-side API)
│   │   └── 404.astro                # Custom 404
│   ├── components/
│   │   ├── Card.astro               # Reusable card component
│   │   ├── Nav.astro                # Navigation bar
│   │   └── ...                      # Other components
│   ├── styles/
│   │   ├── global.css               # Global styles, theme definitions
│   │   └── uno.config.ts            # UnoCSS configuration
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   ├── webmentions.ts           # Fetch and parse webmentions
│   │   └── remarkMermaid.ts         # Mermaid diagram remark plugin
│   └── utils/
│       └── ...                      # Astro utils
├── public/
│   ├── og-image.png                 # Default Open Graph image
│   └── ...                          # Static assets (images, favicon, etc.)
├── astro.config.ts                  # Astro configuration
├── tsconfig.json                    # TypeScript configuration
├── .envrc                           # Direnv configuration
├── flake.nix                        # Nix dev environment
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## Getting Started

### Prerequisites
- **Node.js 22+** (managed by flake.nix)
- **Bun** (managed by flake.nix)
- **Nix + direnv** (optional, but recommended for reproducible environment)

### Setup
```bash
# Enter dev environment (if using Nix + direnv)
cd brume
direnv allow

# Install dependencies
bun install

# Start dev server (default: localhost:4321)
bun run dev

# For mobile testing, restart server on 0.0.0.0
# (see "Mobile Testing" section below)
```

### Build & Deploy
```bash
# Build for production
bun run build

# Preview production build locally
bun run preview

# Type check
bun run type:check

# Format code
bun run format

# Lint with any configured linter
bun run lint
```

## Development Guide

### Adding a Blog Post
1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter:
```yaml
---
title: "Your Post Title"
date: 2026-08-22
tags: [astro, blog, web]
description: "Short description for SEO"
---
```
3. Write content in markdown (supports Mermaid diagrams, code highlighting, etc.)
4. Rebuild and test

### Adding a Static Page
1. Create a new `.md` file in `src/content/pages/`
2. Add frontmatter:
```yaml
---
title: "Page Title"
description: "Short description"
---
```
3. Write content in markdown
4. The page will automatically be available at `/page-slug/`

### Theme Customization
- **Colors**: Edit `src/styles/global.css` for CSS custom properties (--primary, --accent, etc.)
- **Fonts**: Configured in `src/styles/global.css` and imported from Google Fonts or system fonts
- **Layout**: Adjust sizing/spacing in UnoCSS config (`uno.config.ts`) or `global.css`

### Feature Flags
Edit `src/config.ts` to enable/disable features:
- `GOATCOUNTER_ENABLED` — Analytics
- `WEBMENTIONS_ENABLED` — Display webmentions on posts
- `MASTODON_POSSE_ENABLED` — Auto-post to Mastodon on build (GitHub Actions)
- `BRIDGY_FED_ENABLED` — ActivityPub federation via Bridgy Fed

### Markdown Support
- Standard markdown syntax
- **Mermaid diagrams** — wrap in ` ```mermaid ` blocks
- **Code highlighting** — automatic via Shiki (Tokyo Night theme)
- **Frontmatter** — YAML metadata for posts/pages

### Search (Pagefind)
- Automatically indexed at build time
- Triggered via Ctrl+K / Cmd+K or magnifier icon
- Search index is built into the static output (`/pagefind/`)
- Pagefind config: `astro.config.ts` (site integrations)

### Mobile Testing
The dev server runs on `localhost:4321` by default. To test on mobile:
```bash
# Restart dev server to listen on 0.0.0.0
bun run dev -- --host 0.0.0.0

# On mobile, navigate to:
http://<your-computer-ip>:4321
```

## Deployment

### Cloudflare Pages
1. Push `brume/` to GitHub (set up remote in `maftoul.eu.org` terraform repo)
2. Connect GitHub repo to Cloudflare Pages
3. Set build command: `bun run build`
4. Set output directory: `dist/`
5. Cloudflare auto-deploys on push to main branch

### Configuration Files
- `astro.config.ts` — Astro build/routing config, integrations (sitemap, MDX, UnoCSS, Pagefind)
- `tsconfig.json` — TypeScript strict mode, path aliases
- `.env.example` — Optional environment variables (GOATCOUNTER_ENDPOINT, MASTODON_TOKEN, etc.)

### GitHub Actions
- **POSSE to Mastodon**: Auto-post published blog posts to Mastodon (optional)
- **Scheduled rebuilds**: Daily rebuild to refresh webmentions/analytics data (optional)
- Both workflows require feature flags enabled in `src/config.ts`

## Performance

- **Build time**: ~5-10 seconds (Astro + UnoCSS + Pagefind)
- **Page size**: ~15-25 KB (gzipped) with zero layout shift
- **Lighthouse**: 100/100 on performance, accessibility, best practices
- **Search**: Zero JS overhead (Pagefind loads on-demand in modal)

## Contributing

This is a personal blog, but feel free to fork and customize for your own site!

### Code Style
- TypeScript strict mode enforced
- Format with Prettier (via `bun run format`)
- Minimal comments — code should be self-documenting

## License

Personal project. Content © Samuel Maftoul. Code available under your preferred license.

---

**Hosting**: Cloudflare Pages | **CI/CD**: GitHub Actions | **Analytics**: GoatCounter | **Search**: Pagefind
