import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import unocss from "@unocss/astro";

export default defineConfig({
  site: "https://maftoul.eu.org",
  output: "static",
  integrations: [unocss({ injectReset: true }), sitemap(), mdx()],
});
