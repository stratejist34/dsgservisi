import type { HowToData } from "./howto-pages";
import { BUSINESS_RATING } from "./reviews";
import { SITE_CONFIG } from "./site-config";

type BlogGraphFaqItem = {
  question: string;
  answer: string;
};

type BlogGraphConfig = {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    jobTitle: string;
    url: string;
  };
  serviceAreas: string[];
  faqItems?: BlogGraphFaqItem[];
  howtoData?: HowToData;
  priceRange?: {
    min: number;
    max: number;
  };
};

const SITE_URL = SITE_CONFIG.url;

export const BUSINESS_REF = {
  "@id": `${SITE_CONFIG.url}/#business`,
} as const;

function toAbsoluteUrl(value: string): string {
  return /^https?:\/\//i.test(value)
    ? value
    : new URL(value, SITE_URL).toString();
}

function buildCanonicalUrl(slug: string) {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
  return `${SITE_URL}/${normalizedSlug}`;
}

export function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    inLanguage: "tr-TR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blog?q={q}`,
      },
      "query-input": "required name=q",
    },
  };
}

export function buildBusinessNode() {
  return {
    "@type": ["LocalBusiness", "AutoRepair", "Organization"],
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.streetAddress,
      addressLocality: SITE_CONFIG.district,
      addressRegion: SITE_CONFIG.city,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: SITE_CONFIG.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: SITE_CONFIG.openingHours,
    priceRange: SITE_CONFIG.priceRange,
    sameAs: SITE_CONFIG.sameAs,
    areaServed: SITE_CONFIG.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/logo.png`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS_RATING.ratingValue,
      reviewCount: BUSINESS_RATING.reviewCount,
      bestRating: BUSINESS_RATING.bestRating,
      worstRating: BUSINESS_RATING.worstRating,
    },
  };
}

export function buildBlogGraph(config: BlogGraphConfig) {
  const canonicalUrl = buildCanonicalUrl(config.slug);
  const imageUrl = toAbsoluteUrl(config.image);
  const authorId = `${canonicalUrl}/#author`;
  const serviceNode: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${canonicalUrl}/#service`,
    name: config.title,
    description: config.description,
    provider: BUSINESS_REF,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS_RATING.ratingValue,
      reviewCount: BUSINESS_RATING.reviewCount,
      bestRating: BUSINESS_RATING.bestRating,
      worstRating: BUSINESS_RATING.worstRating,
    },
    areaServed: config.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    serviceType: "DSG Şanzıman Servisi",
  };

  if (config.priceRange) {
    serviceNode.offers = {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "TRY",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: config.priceRange.min,
        maxPrice: config.priceRange.max,
        priceCurrency: "TRY",
      },
    };
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": authorId,
      name: config.author.name,
      jobTitle: config.author.jobTitle,
      url: config.author.url,
      worksFor: BUSINESS_REF,
    },
    {
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}/#article`,
      url: canonicalUrl,
      headline: config.title,
      description: config.description,
      image: {
        "@type": "ImageObject",
        "@id": `${canonicalUrl}/#primaryimage`,
        url: imageUrl,
        width: 1200,
        height: 630,
        caption: config.title,
      },
      primaryImageOfPage: {
        "@id": `${canonicalUrl}/#primaryimage`,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      datePublished: config.datePublished,
      dateModified: config.dateModified,
      author: {
        "@id": authorId,
      },
      publisher: BUSINESS_REF,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".service-info-blocks", "h2", ".faq-section"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: config.title,
          item: canonicalUrl,
        },
      ],
    },
    serviceNode,
  ];

  if (config.faqItems && config.faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      mainEntity: config.faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  if (config.howtoData) {
    graph.push({
      "@type": "HowTo",
      "@id": `${canonicalUrl}/#howto`,
      name: config.howtoData.name,
      description: config.howtoData.description,
      totalTime: config.howtoData.totalTime,
      ...(config.howtoData.estimatedCost
        ? {
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: config.howtoData.estimatedCost.currency,
              minValue: config.howtoData.estimatedCost.min,
              maxValue: config.howtoData.estimatedCost.max,
            },
          }
        : {}),
      step: config.howtoData.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
