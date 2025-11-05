import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // Temel Bilgiler
    title: z.string().describe('Blog yazısının başlığı'),
    description: z.string().optional().describe('Kısa açıklama/özet'),
    publishDate: z.coerce.date().describe('Yayın tarihi'),
    updatedDate: z.coerce.date().optional().describe('Güncelleme tarihi'),
    
    // Görsel
    featuredImage: z.string().optional().describe('Öne çıkan görsel URL'),
    imageAlt: z.string().optional().describe('Görsel alt metni'),
    
    // Kategorilendirme
    category: z.string().optional().describe('Ana kategori (DSG, Bakım, Genel vb.)'),
    tags: z.array(z.string()).optional().default([]).describe('Etiketler'),
    
    // Yazar
    author: z.string().optional().default('DSG Servisi').describe('Yazar adı'),
    authorImage: z.string().optional().describe('Yazar profil görseli'),
    
    // Durum
    draft: z.boolean().default(false).describe('Taslak mı?'),
    featured: z.boolean().default(false).describe('Öne çıkan yazı mı?'),
    
    // SEO
    seoTitle: z.string().optional().describe('SEO başlığı'),
    seoDescription: z.string().optional().describe('SEO açıklaması'),
    ogImage: z.string().optional().describe('Open Graph görseli'),
    canonicalUrl: z.string().optional().describe('Canonical URL'),
    
    // İçerik Metadata
    readingTime: z.number().optional().describe('Okuma süresi (dakika)'),
    relatedPosts: z.array(z.string()).optional().describe('İlgili yazı slug\'ları'),
  }),
});

export const collections = { blog };
