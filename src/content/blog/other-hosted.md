---
title: Other-hosted
description: "How I manage a domain, DNS, email routing, IaC, and a static blog using only free tiers — no credit card, no monthly bill."
pubDatetime: 2026-07-13
tags:
  - infrastructure
  - opentofu
  - cloudflare
  - iac
featured: true
draft: false
---

The project: manage a domain, a static blog, and the infrastructure between them — entirely with code, entirely for free. No credit card. Not "free tier with a card on file" — genuinely free.

I call it _other-hosted_: the opposite of self-hosted. Instead of running hardware or paying for VMs, everything runs on resources provided for free by other companies. The constraint makes the architecture interesting.

## The stack

**Domain** — [eu.org](https://eu.org/) is a free subdomain registrar that has been running since 1996. You get a `*.eu.org` domain, no card required, renewed indefinitely as long as the DNS resolves. Mine is `maftoul.eu.org`.

**DNS and email routing** — Cloudflare's free plan handles the DNS zone and a catch-all MX that forwards any `*@maftoul.eu.org` address to a real mailbox — no mail server to run, no SPF gymnastics.

**Code and CI** — GitHub for repositories, GitHub Actions for automation. Two repos: one for blog content, one for infrastructure. The GitHub Actions free tier covers both.

**IaC** — [OpenTofu](https://opentofu.org/) manages the Cloudflare zone, DNS records, Pages project, and GitHub repository configuration. OpenTofu is the open-source fork of Terraform, started after HashiCorp switched Terraform to the Business Source License in 2023 — a restrictive licence that prohibits competing with HashiCorp. OpenTofu is community-governed under the Linux Foundation.

**State** — [Hashicorp Cloud Platform](https://app.terraform.io/) free tier stores the OpenTofu state remotely. The irony of using HCP to store state for an OpenTofu setup is not lost on me.

**Blog** — [Astro](https://astro.build/) with a custom theme built from scratch, deployed to Cloudflare Pages. The free plan includes unlimited deployments, custom domain, and HTTPS.

## How it fits together

A push to `main` in the blog repo triggers a Cloudflare Pages build automatically via its GitHub source integration. The blog is live in under a minute.

Infrastructure changes go through a pull request workflow: opening a PR runs `tofu plan` and posts the diff as a comment; merging runs `tofu apply`. Cloudflare and GitHub are both managed as code — DNS records, page rules, repository settings, all of it.

## Trade-offs

The obvious risk is dependency on third-party free tiers. Any of these services could change pricing or shut down. But the architecture is modular: replacing one piece doesn't require rebuilding everything. The IaC layer means migrating to a different DNS provider or hosting platform is a plan/apply, not a manual afternoon.

Total monthly cost: **$0.00**.
