# Theme system

brume uses CSS custom properties for all palette values, with a dark-first design. The `html` element carries a `.dark` class; removing it switches to the light theme.

## Palette (CSS custom properties)

| Variable | Dark | Light | Role |
|---|---|---|---|
| `--bg` | `#0d0f14` | `#f0f2f5` | Page background |
| `--bg-surface` | `#141720` | `#e4e8ed` | Cards, code blocks |
| `--bg-surface2` | `#1a1f2e` | `#d8dde5` | Nested surfaces |
| `--text` | `#c9d1d9` | `#1c2128` | Body text |
| `--text-muted` | `#6e7681` | `#57606a` | Meta, captions |
| `--accent` | `#00e5ff` (cyan) | `#0969da` (blue) | Links, highlights |
| `--accent-alt` | `#39ff14` (neon green) | `#1a7f37` (muted green) | Hover accents |
| `--border` | `#21262d` | `#d0d7de` | Dividers, outlines |
| `--link` | `#00e5ff` | `#0969da` | Hyperlinks |
| `--link-hover` | `#39ff14` | `#1a7f37` | Link hover state |

Dark mode also applies a subtle scanline texture (repeating CSS gradient) for terminal feel.

## Theme switching

The theme is determined in this order:
1. `localStorage.theme` (`"dark"` or `"light"`)
2. `prefers-color-scheme` media query
3. Default: dark

An inline `<script>` in `<head>` applies the class **before paint** — no flash of incorrect theme on load.

The toggle button (header, top-right) sets `localStorage.theme` and toggles `.dark` on `<html>`.

## Adding new components

Use CSS custom properties (`var(--accent)`, `var(--text-muted)`, etc.) everywhere — never hard-code hex values in component `<style>` blocks. This ensures both themes work automatically.

---

# UnoCSS configuration

`uno.config.ts` uses `presetWind4` (the modern successor to `presetUno`) and `presetTypography`.

## Shortcuts

| Shortcut | Expands to |
|---|---|
| `page-container` | `max-w-3xl mx-auto px-4` |
| `nav-link` | `text-sm font-mono opacity-70 hover:opacity-100 transition-opacity` |
| `tag-pill` | Inline tag badge with border + hover |

## Brume palette in UnoCSS

Colors are registered under `theme.colors.brume.*` and available as utilities like `text-brume-cyan`, `border-brume-border`, etc.

> **Note:** The layout CSS uses native custom properties (`var(--accent)`) rather than UnoCSS utilities for dynamic theming — UnoCSS utilities are used in component markup for structural layout (margins, padding, flex, etc.).
