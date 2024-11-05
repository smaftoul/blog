---
title: Other-hosted
description: Other hosted is the contrary of self-hosted
date: 2024-10-13
tags: geek
---
The project: Manage properly and nicely a domain, with code and free resources.
Called other-hosted, because it uses resources provdided for free by other company, it's the contrary of self-hosted.
So far, free also means no credit card needed: you have some free offers which requires credit cards, but here none is required.

For now, I have:
* 🌍 a domain, registrar is eu.org, free, no credit card
* 📋 a DNS zone (cloudflare)
* 📥 a catch-all MX (cloudflare)
* <i class="nf"> </i> a code repository (github)
* ⚡some CI (github actions)
* <i class="nf">󱁢</i> an OpenTofu setup and a terraform state storage (Hashicorp Cloud Platform)
* 🏃 this static blog (eleventy, cloudflare workers)

There are some pre-requisites, not exhaustively listed here, but easy to figure out, like accounts for registrar, cloudflare, github, hashicorp cloud platform.

Conceptual question related to this design is: What is more ecological, "other-hosted" or "self-hosted" ? The question is complicated, because different answers can be given.
The impact is low because either way, it does not consume much, though, this question may be a post on its own.

As I am using opentofu, I may also test other alternatives to Hashicorp Cloud Platform, like spacelift as Hashicorp turned on the dark side of opensource.
