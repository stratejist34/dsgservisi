const isDev = import.meta.env.DEV;
const API_URL = isDev
  ? 'https://dsgservisi.com/wp-json/wp/v2'
  : 'https://api.dsgservisi.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}

export async function fetchPosts(page = 1, perPage = 12): Promise<WPPost[]> {
  try {
    const response = await fetch(
      `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}&orderby=date&order=desc`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function fetchMedia(mediaId: number): Promise<WPMedia | null> {
  try {
    const response = await fetch(`${API_URL}/media/${mediaId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await fetch(
      `${API_URL}/posts?per_page=100&_fields=slug`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    return posts.map((post: { slug: string }) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Helper function to clean WordPress content
export function cleanWPContent(content: string): string {
  return content
    .replace(/<!--(.*?)-->/gs, '') // Remove HTML comments
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .trim();
}

// Helper function to get featured image URL
export function getFeaturedImageUrl(post: WPPost): string {
  return (
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/images/default-blog.jpg'
  );
}

// Helper function to get excerpt
export function getExcerpt(post: WPPost, maxLength = 160): string {
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  return excerpt.length > maxLength
    ? excerpt.substring(0, maxLength) + '...'
    : excerpt;
}

