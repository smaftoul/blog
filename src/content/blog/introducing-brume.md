---
title: Introducing brume
description: A personal website, portfolio, and technical playground built with Astro, UnoCSS, Nix flakes, Cloudflare Pages, and Terraform.
pubDatetime: 2026-08-22
featured: false
tags:
  - astro
  - unocss
  - cloudflare
  - terraform
  - nix
  - sops
  - github-actions
---

brume is my website: a blog, a portfolio, and a small lab. I wanted something that feels polished and intentional, but still small enough that I can understand the whole thing end to end.

## Why Astro

Astro was a natural fit. I am comfortable building systems, but I am not a frontend specialist, so I wanted something that stays close to HTML, ships static output, and lets me compose content and layout without dragging me into client-side complexity. Astro gives me that: Markdown stays Markdown, pages stay declarative, and I only add interactivity where it is useful.

The structure is simple:

```text
src/content/blog   -> blog posts
src/content/pages  -> standalone pages
src/pages          -> routes and custom pages
src/layouts        -> shared page layouts
```

That keeps the site content-first, while still leaving room for the details that make it feel finished: theme switching, page transitions, a search index, Mermaid diagrams, and generated metadata like JSON-LD.

Astro also rides on top of Vite, which is a practical win for me: fast startup, quick rebuilds, hot reloading, and a mature plugin ecosystem. That keeps the editing loop snappy without turning the site into a client-heavy app.

## Why UnoCSS

I use UnoCSS instead of Tailwind. Both are utility-first, but UnoCSS generates only what I use and makes it easy to add shortcuts and custom rules. For a personal site, that keeps the CSS lean while still giving me enough control to tune the result. The config lives in [uno.config.ts](https://github.com/smaftoul/blog/blob/astro-rewrite/uno.config.ts), and Astro wires it in from [astro.config.ts](https://github.com/smaftoul/blog/blob/astro-rewrite/astro.config.ts).

## Small details that make it feel finished

The rest of the site follows the same idea. The theme is dark-first and driven by CSS custom properties. It switches before paint, so the page does not flash the wrong theme on load. Optional features such as analytics, webmentions, and Bridgy Fed are behind feature flags and disabled by default, so the site builds cleanly without relying on external services unless I explicitly turn them on.

There is also a scheduled rebuild workflow for webmentions, so the site can refresh its mentions without me having to touch content. That is the sort of small automation I like: boring when it works, invisible when it should be.

## Infrastructure and deployment

The blog lives in [smaftoul/blog](https://github.com/smaftoul/blog), while the infrastructure sits in [smaftoul/maftoul.eu.org](https://github.com/smaftoul/maftoul.eu.org). That repo manages the Cloudflare zone, the Pages project, and the GitHub resources with Terraform/OpenTofu.

When I open a PR there, Terraform produces a compact Markdown plan comment instead of a raw terminal dump. The comment is readable, collapsible, diff-colored, and updated in place as the branch evolves. A good example is [this plan comment](https://github.com/smaftoul/maftoul.eu.org/pull/3#issuecomment-5381856533). I prefer that to a wall of `terraform plan` output because it is easier to review and easier to keep in sync with the branch.

I also like the apply-before-merge flow: once the plan looks right, I comment `/apply`, the change is applied, and only then does the PR merge. For Terraform-style automation, that feels like the safest loop: review first, apply the reviewed change, then merge once it has actually succeeded.

## Same tools locally and in CI

The reproducibility story matters just as much as the deployment story. Nix flakes define the toolchain, so local development and CI use the same software, the same commands, and the same behavior. The flake exposes the commands I use everywhere:

```bash
nix run '.#plan'
nix run '.#apply'
```

`direnv` loads the flake locally, `sops` keeps secrets encrypted in the repo, and `age` provides the decryption key material. The same wrapper can decrypt `.env` and run OpenTofu both on my machine and in automation. That is the part I like most: no special one-off setup, no hidden drift between laptop and runner, and much less “works on my machine.”

I also use Bun for the blog side of the stack. It is fast and modern, and it fits the project well, even if Cloudflare Pages does not support it natively and the infra side still uses the npm build path in CI.

```nix
packages = with pkgs; [
  opentofu
  git
  openssh
  gnupg
  sops
  age
];
```

```nix
set -a && source <(${pkgs.sops}/bin/sops --decrypt .env) && set +a
${pkgs.opentofu}/bin/tofu "$@"
```

So brume is not just a blog. It is my website, my portfolio, and a small lab where I can keep the whole stack honest: content, design, deployment, infrastructure, secrets, and automation. It uses the same technologies I rely on at work, but in a place where I can be a little more playful and opinionated.
