/**
 * SEO utility functions for Tourvisto travel agency
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

export function generateMetaTags(data: SEOData) {
  const baseUrl = 'https://tourvisto.com';
  const image = data.image || `${baseUrl}/assets/images/hero-img.png`;
  const url = data.url || baseUrl;
  
  return [
    { title: data.title },
    { name: 'description', content: data.description },
    ...(data.keywords ? [{ name: 'keywords', content: data.keywords }] : []),
    ...(data.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    
    // Open Graph
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:type', content: data.type || 'website' },
    
    // Twitter
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:description', content: data.description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    
    // Canonical
    { rel: 'canonical', href: url },
  ];
}

export function generateStructuredData(type: 'TravelAgency' | 'Trip' | 'Service', data: any) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
  
  return baseStructuredData;
}

export const defaultSEO = {
  siteName: 'Tourvisto',
  siteDescription: 'Plan unforgettable trips with Tourvisto. Create custom itineraries, discover amazing destinations, and manage your travel bookings all in one place.',
  siteUrl: 'https://tourvisto.com',
  twitterHandle: '@tourvisto',
  defaultImage: '/assets/images/hero-img.png'
};
