const WEBMENTION_API = "https://webmention.io/api";

export interface WebmentionFeed {
  type: "feed";
  name: string;
  children: Webmention[];
}

export interface Webmention {
  "wm-id": number;
  "wm-property": string;
  url: string;
  author?: {
    name?: string;
    url?: string;
    photo?: string;
  };
  content?: {
    text?: string;
    html?: string;
  };
  published?: string;
}

const EMPTY_FEED: WebmentionFeed = { type: "feed", name: "", children: [] };

/**
 * Fetch webmentions for a given URL from webmention.io at build time.
 * Returns an empty feed (never throws) so a network failure does not break the build.
 */
export async function getWebmentions(targetUrl: string): Promise<WebmentionFeed> {
  const endpoint = `${WEBMENTION_API}/mentions.jf2?target=${encodeURIComponent(targetUrl)}&per-page=100`;
  try {
    const res = await fetch(endpoint);
    if (!res.ok) return EMPTY_FEED;
    return (await res.json()) as WebmentionFeed;
  } catch {
    return EMPTY_FEED;
  }
}

/** Filter a feed by wm-property type (e.g. "like-of", "repost-of", "in-reply-to"). */
export function filterByType(feed: WebmentionFeed, type: string): Webmention[] {
  return feed.children.filter((m) => m["wm-property"] === type);
}
