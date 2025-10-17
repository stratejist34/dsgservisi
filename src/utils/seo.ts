import { SITE_CONFIG } from './constants';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

export function generateSEO(props: SEOProps = {}) {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://dsgservisi.com';
  
  const seo = {
    title: props.title 
      ? `${props.title} | ${SITE_CONFIG.name}` 
      : SITE_CONFIG.name,
    description: props.description || SITE_CONFIG.description,
    image: props.image 
      ? `${siteUrl}${props.image}` 
      : `${siteUrl}/images/og-image.jpg`,
    url: props.url ? `${siteUrl}${props.url}` : siteUrl,
    type: props.type || 'website',
    article: props.article,
  };

  return seo;
}

export function generateSchema(type: string, data: any = {}) {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://dsgservisi.com';
  
  const baseSchema = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        '@type': 'AutoRepair',
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        url: siteUrl,
        telephone: SITE_CONFIG.phoneFormatted,
        email: SITE_CONFIG.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: SITE_CONFIG.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.coordinates.latitude,
          longitude: SITE_CONFIG.coordinates.longitude,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SITE_CONFIG.google.rating,
          reviewCount: SITE_CONFIG.google.reviewCount,
        },
        sameAs: [
          SITE_CONFIG.socialMedia.instagram,
          SITE_CONFIG.socialMedia.facebook,
        ],
      };

    case 'LocalBusiness':
      return {
        ...baseSchema,
        '@type': 'LocalBusiness',
        '@id': siteUrl,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        url: siteUrl,
        telephone: SITE_CONFIG.phoneFormatted,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: SITE_CONFIG.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.coordinates.latitude,
          longitude: SITE_CONFIG.coordinates.longitude,
        },
      };

    case 'WebSite':
      return {
        ...baseSchema,
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/blog?s={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'BreadcrumbList':
      return {
        ...baseSchema,
        '@type': 'BreadcrumbList',
        itemListElement: data.items || [],
      };

    case 'Article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
      };

    default:
      return baseSchema;
  }
}

