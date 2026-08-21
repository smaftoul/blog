# Feature flags

All features requiring external service accounts are **disabled by default** and must be explicitly enabled. This allows the site to build and deploy cleanly without any external dependencies.

Flags are defined in [`src/config.ts`](../src/config.ts) under `config.features`.

---

## `goatCounter` — Analytics

| | |
|---|---|
| **Default** | `false` |
| **Requires** | GoatCounter account at [goatcounter.com](https://www.goatcounter.com/) |
| **Code** | `maftoul` |
| **Effect** | Injects `//gc.zgo.at/count.js` into every page in `Base.astro` |

**To enable:**
1. Sign up at goatcounter.com with code `maftoul`
2. Set `features.goatCounter: true` in `src/config.ts`
3. The CSP in `cloudflareHeaders()` already allows `gc.zgo.at` — no changes needed there

---

## `webmentions` — Webmention display on posts

| | |
|---|---|
| **Default** | `false` |
| **Requires** | [webmention.io](https://webmention.io/) account linked to `maftoul.eu.org` |
| **Effect** | Build-time fetch of likes/reposts/replies from webmention.io API, displayed on each post page |

**To enable:**
1. Sign in at webmention.io using IndieAuth (your domain must have `rel=me` links pointing to a supported provider — GitHub works)
2. The `<link rel="webmention">` tag is always present in `Base.astro` so incoming mentions are already being collected
3. Set `features.webmentions: true` in `src/config.ts`
4. Ensure `WEBMENTIONS_ENABLED` environment variable is also `"true"` if using CI overrides

---

## `bridgyFed` — BridgyFed ActivityPub bridge

| | |
|---|---|
| **Default** | `false` |
| **Requires** | [Bridgy Fed](https://fed.brid.gy/) account for `maftoul.eu.org` |
| **Effect** | Adds BridgyFed `rel=self` ActivityPub link in `public/.well-known/webfinger` |

**To enable:**
1. Submit `maftoul.eu.org` at [fed.brid.gy](https://fed.brid.gy/)
2. Set `features.bridgyFed: true` in `src/config.ts`
3. The `webfinger` file is always served — the flag only controls whether the ActivityPub `rel=self` link is present

---

## GitHub Actions flags (repository variables)

These control CI workflows and are set as **repository variables** in GitHub (not secrets).

| Variable | Workflow | Default |
|---|---|---|
| `MASTODON_POSSE_ENABLED` | `post-to-mastodon.yml` | not set (disabled) |
| `SCHEDULED_REBUILD_ENABLED` | `scheduled-rebuild.yml` | not set (disabled) |

**Note:** Normal deployments are automatic — Cloudflare Pages auto-deploys on every push to `main` via the GitHub source integration. No deploy hook is needed for regular publishing.

To enable POSSE:
1. Create a Mastodon application at your instance with `write:statuses` scope
2. Add secrets: `MASTODON_INSTANCE` (e.g. `https://hachyderm.io`) and `MASTODON_TOKEN`
3. Set repository variable `MASTODON_POSSE_ENABLED = true`

To enable scheduled rebuild (picks up new webmentions daily):
1. Create a Cloudflare Pages deploy hook URL in the Pages project settings
2. Add secret: `CLOUDFLARE_DEPLOY_HOOK`
3. Set repository variable `SCHEDULED_REBUILD_ENABLED = true`
