import type { Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * Remark plugin: transforms ```mermaid code blocks into
 * <pre class="mermaid"> HTML nodes for client-side rendering.
 *
 * Why not rehype-mermaid: it imports mermaid-isomorphic which requires
 * Playwright at config load time and crashes on Cloudflare Pages.
 *
 * Mermaid JS is lazily loaded on the client (see Base.astro) only when
 * pre.mermaid elements are present on the page.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index == null) return;
      parent.children.splice(index, 1, {
        type: "html",
        value: `<pre class="mermaid">${node.value}</pre>`,
      });
    });
  };
}
