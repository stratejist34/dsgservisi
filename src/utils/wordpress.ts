const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL || 'https://dsgservisi.com/wp-json/wp/v2';

// Node-side helpers for reading cache at build time
let fsMod: typeof import('node:fs/promises') | null = null;
let pathMod: typeof import('node:path') | null = null;
const isServer = typeof window === 'undefined';

async function ensureNodeModules() {
  if (!isServer) return;
  if (!fsMod) {
    fsMod = (await import('node:fs/promises')).default;
  }
  if (!pathMod) {
    pathMod = await import('node:path');
  }
}

async function readCacheJson<T>(fileName: string, fallback: T): Promise<T> {
  try {
    if (isServer) {
      await ensureNodeModules();
      if (fsMod && pathMod) {
        const filePath = pathMod.join(process.cwd(), 'public', 'wp-cache', fileName);
        const data = await fsMod.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T;
      }
    }
    // Client-side fallback (should rarely be used)
    const res = await fetch(`/wp-cache/${fileName}`);
    if (res.ok) return (await res.json()) as T;
    return fallback;
  } catch {
    return fallback;
  }
}

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

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      } else if (response.status === 404) {
        throw new Error(`HTTP error! status: 404 - URL: ${url}`);
      } else {
        console.warn(`Request failed for ${url} (attempt ${i + 1}/${retries}): HTTP error! status: ${response.status}. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      }
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`Fetch error for ${url} (attempt ${i + 1}/${retries}): ${error}. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error; // Son denemede hata olursa fırlat
      }
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts.`);
}

export async function fetchPosts(page = 1, perPage = 12): Promise<WPPost[]> {
  try {
    const response = await fetchWithRetry(
      `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}&orderby=date&order=desc`
    );
    
    return await response.json();
  } catch (error) {
    // Koşulsuz cache fallback (build-time güvenli)
    const cached = await readCacheJson<WPPost[]>('posts.json', []);
    if (cached.length) return cached;
    console.error('Error fetching posts (no cache available):', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const response = await fetchWithRetry(`${API_URL}/posts?slug=${slug}&_embed`);
    
    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    const cached = await readCacheJson<WPPost[]>('posts.json', []);
    const found = cached.find((p) => p.slug === slug) || null;
    if (found) return found;
    console.error('Error fetching post (no cache available):', error);
    return null;
  }
}

export async function fetchMedia(mediaId: number): Promise<WPMedia | null> {
  try {
    const response = await fetchWithRetry(`${API_URL}/media/${mediaId}`);
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await fetchWithRetry(
      `${API_URL}/posts?per_page=100&_fields=slug`
    );
    
    const posts = await response.json();
    return posts.map((post: { slug: string }) => post.slug);
  } catch (error) {
    const cached = await readCacheJson<Array<{ slug: string } | WPPost>>('posts.json', []);
    if (cached.length) {
      // Hem minimal {slug} hem WPPost desteği
      return cached.map((p: any) => p.slug).filter(Boolean);
    }
    console.error('Error fetching post slugs (no cache available):', error);
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
  const remote = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const slug = post.slug;
  if (slug) {
    // En sık kullanılan uzantıları deneyerek yerel kopyayı bul
    const exts = ['webp', 'jpg', 'jpeg', 'png'];
    for (const ext of exts) {
      // Not: mevcut olup olmadığını build-time’da bilmeyiz; client tarafında 404 olursa tarayıcı bir sonrakini denemez.
      // Bu nedenle manifest yaklaşımı ideal; şimdilik basit fallback: varsayılan jpg yolu.
      // İlk tercih: jpg yolunu döndür (script çoğu durumda jpg/png indirecek)
      return `/wp-cache/images/${slug}.jpg`;
    }
  }
  return remote || '/images/default-blog.jpg';
}

// Helper function to get excerpt
export function getExcerpt(post: WPPost, maxLength = 160): string {
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  return excerpt.length > maxLength
    ? excerpt.substring(0, maxLength) + '...'
    : excerpt;
}

