import type { CollectionEntry } from 'astro:content';

/**
 * Content Collections için utility fonksiyonları
 */

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Blog yazısının yayınlanmış olup olmadığını kontrol eder
 * (draft değil ve publishDate geçmiş/şu anki tarih)
 */
export function isPublishedPost(data: BlogPost['data']): boolean {
  if (data.draft) return false;
  const publishDate = data.publishDate instanceof Date 
    ? data.publishDate 
    : new Date(data.publishDate);
  const now = new Date();
  return publishDate <= now;
}

/**
 * Blog yazısının öne çıkan görsel URL'ini alır
 */
export function getBlogFeaturedImage(post: BlogPost): string {
  // 1) Frontmatter override
  if (post.data.featuredImage) return post.data.featuredImage;
  // 2) Slug tabanlı standart isimlendirme: /images/blog/{slug}.webp
  //    (OG için uyumlu ve yaygın destekli format)
  const safeSlug = String(post.slug).replace(/\/+$/, '');
  return `/images/blog/${safeSlug}.jpg`;
}

/**
 * Blog yazısının özetini alır
 */
export function getBlogExcerpt(post: BlogPost, maxLength = 160): string {
  const description = post.data.description || '';
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
}

/**
 * Blog yazısının kategorisini alır
 */
export function getBlogCategory(post: BlogPost): string {
  return post.data.category || 'Genel';
}

/**
 * Kategori logosu URL'ini alır
 */
export function getCategoryLogo(category: string): string | null {
  const categoryLower = category.toLowerCase().replace(/\s+/g, '-');
  const logoMap: Record<string, string> = {
    'audi': '/images/logos/audi-logo.webp',
    'bmw': '/images/logos/bmw-logo.webp',
    'mercedes': '/images/logos/mercedes-logo.webp',
    'land-rover': '/images/logos/land-rover-logo.webp',
    'porsche': '/images/logos/porsche-logo.webp',
    'seat': '/images/logos/seat-logo.webp',
    'skoda': '/images/logos/skoda-logo.webp',
    'volkswagen': '/images/logos/volkswagen-logo.webp',
    'dsg': '/images/logos/dsg.png',
    'zf': '/images/DSG Servis logosu.webp', // ZF için de DSG logosu kullan
  };
  return logoMap[categoryLower] || null;
}

/**
 * Tüm kategori slug'larını döndürür
 */
export function getCategorySlugs(): string[] {
  return ['audi', 'bmw', 'mercedes', 'land-rover', 'porsche', 'seat', 'skoda', 'volkswagen', 'dsg', 'zf'];
}

/**
 * Kategoriye göre blog sayfası linkini oluşturur
 */
export function getCategoryLink(category: string): string {
  const categorySlug = getCategorySlug(category);
  return `/${categorySlug}`;
}

/**
 * Kategori adından slug oluşturur
 */
export function getCategorySlug(category: string): string {
  const slugMap: Record<string, string> = {
    'Audi': 'audi',
    'BMW': 'bmw',
    'Mercedes': 'mercedes',
    'Land Rover': 'land-rover',
    'Porsche': 'porsche',
    'Seat': 'seat',
    'Skoda': 'skoda',
    'Volkswagen': 'volkswagen',
    'DSG': 'dsg',
    'ZF': 'zf',
  };
  return slugMap[category] || category.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Kategori slug'ından kategori adını bulur
 */
export function getCategoryFromSlug(slug: string): string | null {
  const categoryMap: Record<string, string> = {
    'audi': 'Audi',
    'bmw': 'BMW',
    'mercedes': 'Mercedes',
    'land-rover': 'Land Rover',
    'porsche': 'Porsche',
    'seat': 'Seat',
    'skoda': 'Skoda',
    'volkswagen': 'Volkswagen',
    'dsg': 'DSG',
    'zf': 'ZF',
  };
  return categoryMap[slug.toLowerCase()] || null;
}

/**
 * Kategori için SEO bilgilerini döndürür
 */
export function getCategorySEO(category: string): { title: string; description: string } {
  const seoMap: Record<string, { title: string; description: string }> = {
    'Audi': {
      title: 'Audi Özel Servis İstanbul | DSG Şanzıman, Motor, Bakım | Yıldızlar Grup',
      description: 'Audi DSG/S‑Tronic, motor, elektronik ve quattro arızalarında uzman özel servis. A3, A4, A5, A6, Q3, Q5, Q7, Q8 için ekonomik ve garantili çözümler. İstanbul Büyükçekmece.',
    },
    'BMW': {
      title: 'BMW Özel Servis İstanbul | ZF Şanzıman, Motor, Bakım | Yıldızlar Grup',
      description: 'BMW ZF şanzıman, motor, turbo ve elektronik arızalarında uzman özel servis. 1-3-5-7 Serisi ve X1-X3-X5-X6 için ekonomik ve garantili çözümler. İstanbul Büyükçekmece.',
    },
    'Mercedes': {
      title: 'Mercedes Özel Servis İstanbul | 7G-Tronic, Motor, Bakım | Yıldızlar Grup',
      description: 'Mercedes özel servis: 7G-Tronic şanzıman, motor, turbo, elektronik arıza tamiri. C, E, A, CLA, GLC, GLE Serisi bakım. Büyükçekmece İstanbul.',
    },
    'Land Rover': {
      title: 'Land Rover Özel Servis İstanbul | ZF Şanzıman, Hava Süspansiyon | Yıldızlar Grup',
      description: 'Land Rover özel servis: ZF şanzıman, motor, turbo, hava süspansiyon, elektronik arıza tamiri. Range Rover, Discovery, Evoque bakım. Büyükçekmece İstanbul.',
    },
    'Porsche': {
      title: 'Porsche Özel Servis İstanbul | PDK Şanzıman, Motor, Bakım | Yıldızlar Grup',
      description: 'Porsche özel servis: PDK şanzıman, motor, turbo, elektronik arıza tamiri. 911, Cayenne, Macan, Panamera bakım. Büyükçekmece İstanbul.',
    },
    'Seat': {
      title: 'Seat Özel Servis İstanbul | DSG Şanzıman, Motor, Bakım | Yıldızlar Grup',
      description: 'Seat özel servis: DSG şanzıman, motor, turbo, elektronik arıza tamiri. Leon, Ibiza, Arona, Ateca, Tarraco bakım. Büyükçekmece İstanbul.',
    },
    'Skoda': {
      title: 'Skoda Özel Servis İstanbul | DSG Şanzıman, Motor, Bakım | Yıldızlar Grup',
      description: 'Skoda özel servis: DSG şanzıman, motor, turbo, elektronik arıza tamiri. Octavia, Superb, Kodiaq, Karoq bakım. Büyükçekmece İstanbul.',
    },
    'Volkswagen': {
      title: 'Volkswagen Özel Servis İstanbul | DSG, ZF Şanzıman, Motor, Bakım | Yıldızlar Grup',
      description: 'Volkswagen özel servis: DSG, ZF şanzıman, motor, turbo, fren, elektronik arıza tamiri. Golf, Polo, Passat, Tiguan bakım. Büyükçekmece İstanbul.',
    },
    'DSG': {
      title: 'DSG Şanzıman Tamiri ve Bakım | Mekatronik, Kavrama, Yağ Değişimi | Yıldızlar Grup',
      description: 'DSG şanzıman tamiri, mekatronik onarımı, kavrama değişimi, yağ değişimi ve bakım hizmetleri. Volkswagen, Audi, Seat, Skoda uzmanı. İstanbul Büyükçekmece.',
    },
    'ZF': {
      title: 'ZF Şanzıman Tamiri ve Bakım | Yağ Değişimi, Onarım | Yıldızlar Grup',
      description: 'ZF otomatik şanzıman tamiri, yağ değişimi ve bakım hizmetleri. BMW, Land Rover, Mercedes uzmanı. İstanbul Büyükçekmece.',
    },
  };
  
  return seoMap[category] || {
    title: `${category} | DSG Servisi`,
    description: `${category} kategorisindeki blog yazıları ve hizmetlerimiz.`,
  };
}

/**
 * Blog yazısının okuma süresini hesaplar (yaklaşık)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // HTML etiketlerini kaldır
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Blog yazılarını tam zaman damgasına göre sıralar (en yeni önce).
 * Aynı milisaniyede yayınlanmışsa ikinci anahtar olarak slug (ters) kullanılır.
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateA = a.data.publishDate instanceof Date
      ? a.data.publishDate
      : new Date(a.data.publishDate);
    const dateB = b.data.publishDate instanceof Date
      ? b.data.publishDate
      : new Date(b.data.publishDate);

    const diff = dateB.getTime() - dateA.getTime();
    if (diff !== 0) return diff;
    // Tam eşitse, stabil sonuç için slug'a göre ters sırala
    return b.slug.localeCompare(a.slug);
  });
}

/**
 * Blog yazılarını öne çıkanlara göre filtreler
 */
export function filterFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => post.data.featured === true);
}

/**
 * Kategoriye göre blog yazılarını filtreler
 */
export function filterPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter(post => post.data.category === category);
}

/**
 * Etikete göre blog yazılarını filtreler
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => 
    post.data.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * İlgili blog yazılarını bulur
 */
export function findRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  const related: BlogPost[] = [];
  
  // Önce manuel olarak belirtilen ilgili yazıları al
  if (currentPost.data.relatedPosts) {
    for (const slug of currentPost.data.relatedPosts) {
      const found = allPosts.find(p => p.slug === slug);
      if (found && found.slug !== currentPost.slug) {
        related.push(found);
      }
    }
  }
  
  // Aynı kategoriye sahip yazıları bul
  if (related.length < limit && currentPost.data.category) {
    const sameCategory = allPosts.filter(
      p => p.data.category === currentPost.data.category && 
           p.slug !== currentPost.slug &&
           !related.find(r => r.slug === p.slug)
    );
    related.push(...sameCategory.slice(0, limit - related.length));
  }
  
  // Ortak etiketlere sahip yazıları bul
  if (related.length < limit && currentPost.data.tags) {
    const sameTags = allPosts.filter(
      p => p.slug !== currentPost.slug &&
           !related.find(r => r.slug === p.slug) &&
           p.data.tags?.some(tag => currentPost.data.tags?.includes(tag))
    );
    related.push(...sameTags.slice(0, limit - related.length));
  }
  
  return related.slice(0, limit);
}

/**
 * Tüm kategorileri ve sayılarını alır
 */
export function getCategoriesWithCounts(posts: BlogPost[]): Array<{ name: string; count: number }> {
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const category = post.data.category || 'Genel';
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });
  
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Tüm etiketleri ve sayılarını alır
 */
export function getTagsWithCounts(posts: BlogPost[]): Array<{ name: string; count: number }> {
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * HTML içerikten fiyat aralığını çıkarır (tablodan ya da metinden)
 * Öncelik: "fiyat/ücret/price" geçen tablolar. Bulunamazsa genel metinden dene.
 * Dönen değerler Service şeması için uygundur.
 */
export function extractPriceRangeFromHtml(html: string): { lowPrice: number; highPrice: number; priceCurrency: string } | null {
  if (!html) return null;

  const currencyCandidates = [
    { re: /(₺|TL|TRY)/i, code: 'TRY' },
    { re: /(USD|\$)/i, code: 'USD' },
    { re: /(EUR|€)/i, code: 'EUR' },
  ];

  const numberRe = /\b(?:\d{1,3}(?:[\.\s]\d{3})+|\d+)(?:[\.,]\d{2})?\b/g; // 1.234,56 | 1234 | 12 345

  const normalizeNumber = (raw: string): number => {
    // Türkçe formatlarını normalize et: binlik ayırıcı . veya boşluk; ondalık ,
    let s = raw.replace(/\s+/g, '');
    // Eğer virgül ve nokta birlikteyse: 1.234,56 → 1234.56
    if (/,\d{1,2}$/.test(s)) {
      s = s.replace(/\./g, '').replace(/,(\d{1,2})$/, '.$1');
    } else {
      // Sadece binlik ayırıcıları kaldır
      s = s.replace(/[\.\s]/g, '');
    }
    const n = Number(s);
    return isNaN(n) ? NaN : n;
  };

  const pickCurrency = (segment: string): string | null => {
    for (const c of currencyCandidates) {
      if (c.re.test(segment)) return c.code;
    }
    return null;
  };

  const extractFromSegment = (segment: string) => {
    const nums = (segment.match(numberRe) || [])
      .map(normalizeNumber)
      .filter((n) => !isNaN(n) && n > 0 && n < 10_000_000);
    if (nums.length === 0) return null;
    const low = Math.min(...nums);
    const high = Math.max(...nums);
    const cur = pickCurrency(segment) || 'TRY';
    return { lowPrice: low, highPrice: high, priceCurrency: cur };
  };

  // 1) Fiyat geçen tablolar
  const tableRe = /<table[\s\S]*?<\/table>/gi;
  const tables = html.match(tableRe) || [];
  for (const tbl of tables) {
    // Tetikleyici anahtar kelimeler: fiyat/ücret/price/toplam veya para birimi
    if (/(fiyat|ücret|price|toplam|₺|TL|TRY)/i.test(tbl)) {
      // Önce para birimi içeren satırlardan çıkarmayı dene
      const rowRe = /<tr[\s\S]*?<\/tr>/gi;
      const rows = tbl.match(rowRe) || [];
      const candidateRows = rows.filter(r => /(₺|TL|TRY)/i.test(r));
      const perRowRanges = candidateRows
        .map(r => extractFromSegment(r))
        .filter(Boolean) as Array<{ lowPrice: number; highPrice: number; priceCurrency: string }>;
      if (perRowRanges.length > 0) {
        const lows = perRowRanges.map(x => x.lowPrice);
        const highs = perRowRanges.map(x => x.highPrice);
        const low = Math.min(...lows);
        const high = Math.max(...highs);
        // Para birimi: ilk satırdan al, yoksa TRY
        const cur = perRowRanges[0].priceCurrency || pickCurrency(tbl) || 'TRY';
        return { lowPrice: low, highPrice: high, priceCurrency: cur };
      }
      // Satır bazlı bulunamazsa tüm tablo üzerinden dene
      const r = extractFromSegment(tbl);
      if (r) return r;
    }
  }

  // 2) Genel HTML (fallback)
  const r = extractFromSegment(html);
  return r;
}

/**
 * HTML içerikten FAQ çiftlerini çıkarır.
 * Desenler:
 *  - <h2> Sık Sorulan Sorular ... </h2> ...
 *    - <h3> Soru </h3><p> Cevap ... </p>
 *    - veya <p><strong>Soru</strong></p><p>Cevap ...</p>
 */
export function extractFaqsFromHtml(html: string): Array<{ question: string; answer: string }> {
  if (!html) return [];

  const norm = html.replace(/\r/g, '');
  // H2 başlığını bul: Sık Sorulan Sorular (türkçe karakter esnek karşılaştırma)
  const h2Re = /<h2[^>]*>\s*([^<]*)\s*<\/h2>/ig;
  let match: RegExpExecArray | null;
  let faqSectionStart = -1;
  while ((match = h2Re.exec(norm))) {
    const title = (match[1] || '').toLowerCase();
    if (/s[ıi]k\s*sorulan\s*sorular/.test(title)) {
      faqSectionStart = match.index + match[0].length;
      break;
    }
  }
  if (faqSectionStart === -1) return [];

  // Bölümü bir sonraki h2'ye kadar al
  const rest = norm.slice(faqSectionStart);
  const nextH2Idx = rest.search(/<h2[^>]*>/i);
  const section = nextH2Idx >= 0 ? rest.slice(0, nextH2Idx) : rest;

  const strip = (s: string) => s
    .replace(/<[^>]+>/g, ' ') // etiketleri sil
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  const faqs: Array<{ question: string; answer: string }> = [];

  // 1) h3 soru + içerik
  const h3BlockRe = /<h3[^>]*>\s*([\s\S]*?)\s*<\/h3>\s*([\s\S]*?)(?=<h3|<h2|$)/ig;
  let m: RegExpExecArray | null;
  while ((m = h3BlockRe.exec(section))) {
    const q = strip(m[1]);
    const a = strip(m[2]);
    if (q && a) faqs.push({ question: q, answer: a });
  }

  // 2) <p><strong> Soru </strong></p> + takip eden blok
  if (faqs.length === 0) {
    const strongBlockRe = /<p[^>]*>\s*<(strong|b)>\s*([\s\S]*?)\s*<\/\1>\s*<\/p>\s*([\s\S]*?)(?=<p>\s*<(strong|b)>|<h2|$)/ig;
    let s: RegExpExecArray | null;
    while ((s = strongBlockRe.exec(section))) {
      const q = strip(s[2]);
      const a = strip(s[3]);
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // 3) Son çare: satır bazlı kaba ayrıştırma (çok gevşek)
  if (faqs.length === 0) {
    // Question satırları: ? ile biten kalın başlıklar veya tek satır <p>
    const paraRe = /<p[^>]*>[\s\S]*?<\/p>/ig;
    const paras = section.match(paraRe) || [];
    for (let i = 0; i < paras.length; i++) {
      const text = strip(paras[i]);
      if (text.endsWith('?') && i + 1 < paras.length) {
        const answer = strip(paras[i + 1]);
        if (text && answer) faqs.push({ question: text, answer });
        i++;
      }
    }
  }

  // 4) Tüm Q/A'ları döndür
  return faqs;
}

