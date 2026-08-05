import { useQuery } from "@tanstack/react-query";
import { cmsEnabled, fetchGlobal, fetchIntegrations, type CmsGlobalSlug } from "@/lib/cms";

/**
 * Copy overlay for the home and pricing pages.
 *
 * The bundled arrays in the route files stay the source of truth for layout,
 * icons and images. When a CMS is configured, matching entries (by index)
 * overwrite the text only — anything the editor leaves blank keeps the
 * bundled copy, so the page can never render empty.
 */

type Val = { value: string };

const text = (cms: unknown, fallback: string): string =>
  typeof cms === "string" && cms.trim() ? cms : fallback;

const list = (cms: Val[] | null | undefined, fallback: string[]): string[] =>
  cms?.length ? cms.map((item) => item.value) : fallback;

/** Merge a CMS array onto a bundled one, index by index. */
function overlay<T, C>(fallback: T[], cms: C[] | null | undefined, merge: (item: T, doc: C) => T): T[] {
  if (!cms?.length) return fallback;
  return fallback.map((item, index) => (cms[index] ? merge(item, cms[index]!) : item));
}

function useGlobal<T>(slug: CmsGlobalSlug) {
  const { data } = useQuery({
    queryKey: ["cms-global", slug],
    queryFn: () => fetchGlobal<T>(slug),
    enabled: cmsEnabled,
    staleTime: 60_000,
  });
  return data ?? null;
}

/* ---------------------------------- home ---------------------------------- */

type HomeGlobal = {
  hero?: {
    rating?: string;
    reviews?: string;
    headline?: string;
    sub?: string;
    primaryCta?: string;
    secondaryCta?: string;
    platforms?: string;
  };
  logos?: { heading?: string; items?: Val[] };
  featureGroups?: { heading?: string; cards?: { title?: string; body?: string }[] }[];
  showcase?: { heading?: string; items?: { title?: string; link?: string }[] };
  stories?: {
    heading?: string;
    sub?: string;
    items?: {
      business?: string;
      person?: string;
      role?: string;
      quote?: string;
      stat?: string;
      statLabel?: string;
    }[];
  };
  plans?: { name?: string; price?: string; unit?: string; tagline?: string; perks?: Val[] }[];
};

export type HomeFallback<
  FeatureGroup extends { heading: string; cards: { title: string; body: string }[] },
  Showcase extends { title: string; link: string },
  Story extends {
    business: string;
    person: string;
    role: string;
    quote: string;
    stat: string;
    statLabel: string;
  },
  Plan extends { name: string; price: string; unit: string; tagline: string; perks: string[] },
> = {
  hero: {
    rating: string;
    reviews: string;
    headline: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    platforms: string;
  };
  logos: { heading: string; items: string[] };
  featureGroups: FeatureGroup[];
  showcaseHeading: string;
  showcase: Showcase[];
  storiesHeading: string;
  storiesSub: string;
  stories: Story[];
  plans: Plan[];
};

export function useHomeContent<
  FeatureGroup extends { heading: string; cards: { title: string; body: string }[] },
  Showcase extends { title: string; link: string },
  Story extends {
    business: string;
    person: string;
    role: string;
    quote: string;
    stat: string;
    statLabel: string;
  },
  Plan extends { name: string; price: string; unit: string; tagline: string; perks: string[] },
>(fallback: HomeFallback<FeatureGroup, Showcase, Story, Plan>) {
  const cms = useGlobal<HomeGlobal>("home");
  if (!cms) return fallback;

  return {
    hero: {
      rating: text(cms.hero?.rating, fallback.hero.rating),
      reviews: text(cms.hero?.reviews, fallback.hero.reviews),
      headline: text(cms.hero?.headline, fallback.hero.headline),
      sub: text(cms.hero?.sub, fallback.hero.sub),
      primaryCta: text(cms.hero?.primaryCta, fallback.hero.primaryCta),
      secondaryCta: text(cms.hero?.secondaryCta, fallback.hero.secondaryCta),
      platforms: text(cms.hero?.platforms, fallback.hero.platforms),
    },
    logos: {
      heading: text(cms.logos?.heading, fallback.logos.heading),
      items: list(cms.logos?.items, fallback.logos.items),
    },
    featureGroups: overlay(fallback.featureGroups, cms.featureGroups, (group, doc) => ({
      ...group,
      heading: text(doc.heading, group.heading),
      cards: overlay(group.cards, doc.cards, (card, cardDoc) => ({
        ...card,
        title: text(cardDoc.title, card.title),
        body: text(cardDoc.body, card.body),
      })),
    })),
    showcaseHeading: text(cms.showcase?.heading, fallback.showcaseHeading),
    showcase: overlay(fallback.showcase, cms.showcase?.items, (item, doc) => ({
      ...item,
      title: text(doc.title, item.title),
      link: text(doc.link, item.link),
    })),
    storiesHeading: text(cms.stories?.heading, fallback.storiesHeading),
    storiesSub: text(cms.stories?.sub, fallback.storiesSub),
    stories: overlay(fallback.stories, cms.stories?.items, (story, doc) => ({
      ...story,
      business: text(doc.business, story.business),
      person: text(doc.person, story.person),
      role: text(doc.role, story.role),
      quote: text(doc.quote, story.quote),
      stat: text(doc.stat, story.stat),
      statLabel: text(doc.statLabel, story.statLabel),
    })),
    plans: overlay(fallback.plans, cms.plans, (plan, doc) => ({
      ...plan,
      name: text(doc.name, plan.name),
      price: text(doc.price, plan.price),
      unit: text(doc.unit, plan.unit),
      tagline: text(doc.tagline, plan.tagline),
      perks: list(doc.perks, plan.perks),
    })),
  };
}

/* -------------------------------- pricing --------------------------------- */

type PricingGlobal = {
  eyebrow?: string;
  heading?: string;
  sub?: string;
  plans?: {
    name?: string;
    monthly?: number;
    annualMonthly?: number;
    tagline?: string;
    cta?: string;
    perks?: Val[];
  }[];
  addOns?: { name?: string; price?: string; unit?: string; note?: string; linkLabel?: string }[];
  aiTiers?: { tier?: string; price?: string; included?: string; overage?: string }[];
  faqs?: { question?: string; answer?: string }[];
};

export function usePricingContent<
  Plan extends {
    name: string;
    monthly: number;
    annualMonthly: number;
    tagline: string;
    perks: string[];
    cta: string;
  },
  AddOn extends { name: string },
>(fallback: {
  plans: Plan[];
  addOns: AddOn[];
  aiTiers: [string, string, string, string][];
  faqs: [string, string][];
}) {
  const cms = useGlobal<PricingGlobal>("pricing");
  if (!cms) return fallback;

  return {
    plans: overlay(fallback.plans, cms.plans, (plan, doc) => ({
      ...plan,
      name: text(doc.name, plan.name),
      monthly: typeof doc.monthly === "number" ? doc.monthly : plan.monthly,
      annualMonthly:
        typeof doc.annualMonthly === "number" ? doc.annualMonthly : plan.annualMonthly,
      tagline: text(doc.tagline, plan.tagline),
      cta: text(doc.cta, plan.cta),
      perks: list(doc.perks, plan.perks),
    })),
    addOns: overlay(fallback.addOns, cms.addOns, (addOn, doc) => ({
      ...addOn,
      name: text(doc.name, addOn.name),
      ...(doc.price?.trim() ? { price: doc.price } : {}),
      ...(doc.unit?.trim() ? { unit: doc.unit } : {}),
      ...(doc.note?.trim() ? { note: doc.note } : {}),
      ...(doc.linkLabel?.trim() ? { linkLabel: doc.linkLabel } : {}),
    })),
    aiTiers: overlay(
      fallback.aiTiers,
      cms.aiTiers,
      (tier, doc) =>
        [
          text(doc.tier, tier[0]),
          text(doc.price, tier[1]),
          text(doc.included, tier[2]),
          text(doc.overage, tier[3]),
        ] as [string, string, string, string],
    ),
    faqs: overlay(
      fallback.faqs,
      cms.faqs,
      (faq, doc) => [text(doc.question, faq[0]), text(doc.answer, faq[1])] as [string, string],
    ),
  };
}

/* ------------------------------ site settings ----------------------------- */

type CmsLink = { label?: string; to?: string; description?: string };

type SiteGlobal = {
  brandName?: string;
  navGroups?: { label?: string; links?: CmsLink[] }[];
  footerColumns?: { heading?: string; links?: CmsLink[] }[];
  regions?: Val[];
  footerNote?: string;
  cta?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    proofPoints?: Val[];
  };
};

function useSite() {
  return useGlobal<SiteGlobal>("site-settings");
}

/** Header mega-menus: CMS can rename labels and repoint links; icons stay local. */
export function useHeaderMenus<
  Menu extends { label: string; groups: { heading: string; items: { label: string; to?: string }[] }[] },
>(fallback: Menu[]): Menu[] {
  const cms = useSite();
  return overlay(fallback, cms?.navGroups, (menu, doc) => {
    const flat = doc.links ?? [];
    let cursor = 0;
    return {
      ...menu,
      label: text(doc.label, menu.label),
      groups: menu.groups.map((group) => ({
        ...group,
        items: group.items.map((item) => {
          const link = flat[cursor++];
          return link
            ? { ...item, label: text(link.label, item.label), to: text(link.to, item.to ?? "") || item.to }
            : item;
        }),
      })),
    };
  });
}

/** Footer columns, coverage regions and the intro note. */
export function useFooterContent<
  Column extends { heading: string; links: { label: string; to?: string }[] },
>(fallback: { columns: Column[]; regions: string[]; note: string }) {
  const cms = useSite();
  if (!cms) return fallback;
  return {
    columns: overlay(fallback.columns, cms.footerColumns, (column, doc) => ({
      ...column,
      heading: text(doc.heading, column.heading),
      links: overlay(column.links, doc.links, (link, linkDoc) => {
        const to = text(linkDoc.to, link.to ?? "") || link.to;
        return { ...link, label: text(linkDoc.label, link.label), ...(to ? { to } : {}) };
      }),

    })),
    regions: list(cms.regions, fallback.regions),
    note: text(cms.footerNote, fallback.note),
  };
}

/** Closing CTA band copy. */
export function useCtaContent(fallback: {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
  proofPoints: string[];
}) {
  const cms = useSite();
  if (!cms?.cta) return fallback;
  const cta = cms.cta;
  return {
    eyebrow: text(cta.eyebrow, fallback.eyebrow),
    title: text(cta.title, fallback.title),
    subtitle: text(cta.subtitle, fallback.subtitle),
    primaryLabel: text(cta.primaryLabel, fallback.primaryLabel),
    secondaryLabel: text(cta.secondaryLabel, fallback.secondaryLabel),
    proofPoints: list(cta.proofPoints, fallback.proofPoints),
  };
}

/* ------------------------------ integrations ------------------------------ */

/**
 * Integrations grid. The CMS supplies the name plus a simple-icons slug; the
 * icon itself is resolved from the bundled icon set, so an unknown slug simply
 * keeps the bundled list.
 */
export function useIntegrationBrands<Brand extends { name: string }>(
  fallback: Brand[],
  resolveIcon: (slug: string) => Brand["name"] extends never ? never : unknown,
) {
  const { data } = useQuery({
    queryKey: ["cms-integrations"],
    queryFn: () => fetchIntegrations(),
    enabled: cmsEnabled,
    staleTime: 60_000,
  });
  if (!data?.length) return fallback;
  const mapped = data
    .map((doc) => {
      const icon = doc.iconSlug ? resolveIcon(doc.iconSlug) : null;
      return icon ? ({ name: doc.name, icon } as unknown as Brand) : null;
    })
    .filter((brand): brand is Brand => brand !== null);
  return mapped.length ? mapped : fallback;
}
