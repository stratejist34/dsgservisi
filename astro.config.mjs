import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import rehypeSlug from 'rehype-slug';
import remarkCallouts from './src/utils/remark-callouts.mjs';
import remarkInternalLinks from './src/utils/remark-internal-links.mjs';
import icon from 'astro-icon';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Otomatik resim dönüştürme integration
function autoConvertImages() {
  return {
    name: 'auto-convert-images',
    hooks: {
      'astro:build:start': async () => {
        console.log('🖼️  Converting images to AVIF/WebP...');
        try {
          execSync('node scripts/convert-images.mjs', { stdio: 'inherit' });
          console.log('✅ Image conversion complete!');
        } catch (error) {
          console.warn('⚠️  Image conversion failed:', error.message);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://dsgservisi.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('/blog/preview'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    autoConvertImages(),
    icon({
      include: {
        lucide: ['gauge', 'messages-square', 'scan-line', 'car', 'settings-2', 'users', 'sparkles'],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [remarkBreaks, remarkDirective, remarkCallouts, remarkInternalLinks],
    rehypePlugins: [rehypeSlug],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.dsgservisi.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  build: {
    inlineStylesheets: 'always',
    assets: '_assets',
  },
  compressHTML: true,
  trailingSlash: 'ignore', // GSC Case 3: Fix slash/non-slash 404 issues
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild', // Vite'ın default minifier'ı (daha hızlı)
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunk'ları ayır
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('lucide')) {
                return 'lucide-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    ssr: {
      noExternal: ['react-icons'],
    },
  },
  redirects: {
    // GSC Case 1: /blog/slug -> /slug (Duplicate Content Fix)
    '/blog/[...slug]': {
      status: 301,
      destination: '/[slug]'
    },

    // GSC Case 3: WordPress Legacy Redirects (404 Fix)
    '/category/[...slug]': { status: 301, destination: '/blog' },
    '/sepet': { status: 301, destination: '/blog' },
    '/checkout': { status: 301, destination: '/blog' },
    '/shop': { status: 301, destination: '/blog' },
    '/odeme': { status: 301, destination: '/blog' },
    '/contact': { status: 301, destination: '/iletisim' },
    '/about': { status: 301, destination: '/' },
    '/training': { status: 301, destination: '/blog' },
    '/home-2': { status: 301, destination: '/' },

    // GSC Case 3: Major Slug Mismatches & Current Site 404s
    '/zf-sanziman-yag-degisimi': { status: 301, destination: '/zf-sanziman-yagi-degisimi' },
    '/dsg-sanziman-yag-degisimi': { status: 301, destination: '/dsg-sanziman-yagi-degisimi' },
    '/istanbul-avrupa-yakasi-volkswagen-servis': { status: 301, destination: '/volkswagen-servis-avrupa-yakasi' },
    '/istanbul-avrupa-yakasi-bmw-servis': { status: 301, destination: '/bmw-servis-avrupa-yakasi' },
    '/sanziman-revizyonu': { status: 301, destination: '/dsg-sanziman-tamiri' },
    '/buyukcekmece-mercedes-servis': { status: 301, destination: '/mercedes-servis-avrupa-yakasi' },
    '/buyukcekmece-bmw-servis': { status: 301, destination: '/bmw-servis-avrupa-yakasi' },
    '/beylikduzu-volkswagen-servis': { status: 301, destination: '/volkswagen-servis-avrupa-yakasi' }
  }
});

