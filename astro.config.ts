import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import unocss from "@unocss/astro";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { AstroIntegration } from "astro";

/**
 * Cloudflare Pages _headers integration.
 *
 * Writes dist/_headers at build time instead of using public/_headers because
 * Rolldown (Astro's bundler) misparses leading /* as a JS comment and corrupts
 * the file during the copy step.
 */
function cloudflareHeaders(): AstroIntegration {
  return {
    name: "cloudflare-headers",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const headers = `\
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://gc.zgo.at https://api.inaturalist.org; worker-src 'self'; frame-ancestors 'none'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/pagefind/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=3600

/.well-known/webfinger
  Content-Type: application/jrd+json
  Access-Control-Allow-Origin: *
`;
        const distDir = dir.pathname;
        mkdirSync(distDir, { recursive: true });
        writeFileSync(join(distDir, "_headers"), headers, "utf-8");
        console.log("[cloudflare-headers] dist/_headers written");
      },
    },
  };
}

export default defineConfig({
  site: "https://maftoul.eu.org",
  output: "static",
  integrations: [unocss({ injectReset: true }), sitemap(), mdx(), cloudflareHeaders()],
});
