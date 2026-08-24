// Site configuration — code only, no personal data here.
// Personal values (author name, bio, social URLs) are applied via
// the follow-up content commit "chore(config): site metadata and social links".

export interface Social {
  label: string;
  url: string;
  icon: string; // icon name for display (e.g. "github", "mastodon")
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: string;
  authorBio: string;
  socials: Social[];
  nav: NavItem[];
  /** Feature flags — all disabled by default, see docs/feature-flags.md */
  features: FeatureFlags;
}

export interface FeatureFlags {
  /** GoatCounter analytics — requires account at goatcounter.com */
  goatCounter: boolean;
  /** Build-time webmention fetch — requires webmention.io account */
  webmentions: boolean;
  /** BridgyFed ActivityPub links in webfinger — requires fed.brid.gy account */
  bridgyFed: boolean;
}

const config: SiteConfig = {
  title: "brume",
  description: "Writings about platform engineering, infrastructure, and other things.",
  url: "https://maftoul.eu.org",
  author: "Samuel Maftoul",
  authorBio: "SRE / Platform Engineer. I write about infrastructure, automation, NixOS, Kubernetes, Terraform, and occasionally about history, ecology, and music.",
  socials: [
    { label: "GitHub",          url: "https://github.com/smaftoul",                          icon: "github"   },
    { label: "Mastodon",        url: "https://hachyderm.io/@smaftoul",                       icon: "mastodon" },
    { label: "Mastodon (fr)",   url: "https://piaille.fr/@smaftoul",                         icon: "mastodon" },
    { label: "LinkedIn",        url: "https://www.linkedin.com/in/maftoul/",                 icon: "linkedin" },
    { label: "Spotify",         url: "https://open.spotify.com/user/smaftoul",               icon: "spotify"  },
  ],
  nav: [
    { label: "blog",        href: "/blog"        },
    { label: "about",       href: "/about"       },
    { label: "now",         href: "/now"         },
    { label: "uses",        href: "/uses"        },
    { label: "projects",    href: "/projects"    },
    { label: "contributions", href: "/contributions" },
    { label: "links",       href: "/links"       },
    { label: "inaturalist", href: "/inaturalist" },
    { label: "contact",     href: "/contact"     },
  ],
  features: {
    goatCounter: false,
    webmentions: false,
    bridgyFed: false,
  },
};

export default config;
