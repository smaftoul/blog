import { defineConfig, presetWind4, presetTypography } from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography(),
  ],
  theme: {
    colors: {
      // Brume palette — cyber/neon/terminal aesthetic
      // Works in both dark (primary) and light (secondary) modes
      brume: {
        // Base backgrounds
        bg: "#0d0f14",         // near-black (dark mode base)
        "bg-light": "#f0f2f5", // fog white (light mode base)
        surface: "#141720",    // slightly lighter surface (dark)
        "surface-light": "#e4e8ed", // light mode surface
        // Text
        text: "#c9d1d9",       // cool grey prose text (dark)
        "text-light": "#1c2128", // near-black prose (light)
        muted: "#6e7681",      // subdued / meta text
        // Neon accents (dark mode primary, light mode toned)
        cyan: "#00ffff",       // terminal cyan glow
        "cyan-dim": "#0ea5e9", // dimmer cyan for light mode
        green: "#39ff14",      // neon green
        "green-dim": "#059669", // muted green for light mode
        // Borders / dividers
        border: "#21262d",     // dark mode subtle border
        "border-light": "#d0d7de", // light mode border
      },
    },
  },
  shortcuts: {
    "page-container": "max-w-3xl mx-auto px-4",
    "nav-link":
      "text-sm font-mono opacity-70 hover:opacity-100 transition-opacity",
    "tag-pill":
      "inline-block px-2 py-0.5 text-xs font-mono rounded border border-brume-border text-brume-muted transition-colors",
  },
  safelist: ["dark"],
});
