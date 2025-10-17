export interface InstagramPost {
  id: string;
  image: string;
  url: string;
  caption: string;
}

/**
 * Instagram kullanıcısının son postlarını çeker
 * Instagram'ın public JSON endpoint'ini kullanır (rate limit var)
 * @param username Instagram kullanıcı adı (örn: 'asyildizlar')
 * @param count Kaç post çekilecek
 */
export async function fetchInstagramPosts(
  username: string,
  count: number = 11
): Promise<InstagramPost[]> {
  try {
    // Method 1: Instagram'ın eski /?__a=1 endpoint'i dene
    const url1 = `https://www.instagram.com/${username}/?__a=1&__d=dis`;
    
    const response = await fetch(url1, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      console.warn(`⚠️ Instagram API erişim sorunu (${response.status}), fallback'e geçiliyor...`);
      return getFallbackPosts();
    }

    const data = await response.json();
    
    // Farklı API response formatlarını dene
    let edges = 
      data?.graphql?.user?.edge_owner_to_timeline_media?.edges ||
      data?.data?.user?.edge_owner_to_timeline_media?.edges ||
      data?.user?.edge_owner_to_timeline_media?.edges ||
      [];

    if (edges.length === 0) {
      console.warn(`⚠️ @${username} için post bulunamadı, fallback kullanılıyor...`);
      return getFallbackPosts();
    }

    // İlk 'count' kadar postu al
    const posts: InstagramPost[] = edges.slice(0, count).map((edge: any, index: number) => {
      const node = edge.node;
      return {
        id: node.id || `ig-${index + 1}`,
        image: node.display_url || node.thumbnail_src,
        url: `https://www.instagram.com/p/${node.shortcode}/`,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || `@${username} - Post ${index + 1}`,
      };
    });

    console.log(`✅ Instagram'dan ${posts.length} post çekildi: @${username}`);
    return posts;
  } catch (error) {
    console.error('❌ Instagram fetch hatası, fallback kullanılıyor:', error);
    return getFallbackPosts();
  }
}

/**
 * Fallback: Instagram çekilemezse placeholder fotoğraflar
 */
function getFallbackPosts(): InstagramPost[] {
  return Array.from({ length: 11 }, (_, i) => ({
    id: `fallback-${i + 1}`,
    image: `/images/instagram/${i + 1}.jpg`,
    url: 'https://www.instagram.com/asyildizlar/',
    caption: `Yıldızlar Grup DSG Servisi - ${i + 1}`,
  }));
}

