import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'vite-plugin-compression';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import rehypeSlug from 'rehype-slug';
import remarkCallouts from './src/utils/remark-callouts.mjs';
import remarkInternalLinks from './src/utils/remark-internal-links.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  vite: {
    plugins: [
      // Gzip compression
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // 1KB üzeri dosyalar
        deleteOriginFile: false,
        compressionOptions: {
          level: 9, // Maximum compression
        }
      }),
      // Brotli compression (daha iyi sıkıştırma)
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false
      })
    ],
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Production'da console.log'ları kaldır
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        format: {
          comments: false, // Yorumları kaldır
        },
      },
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
    env: {
      PUBLIC_WORDPRESS_API_URL: process.env.PUBLIC_WORDPRESS_API_URL || 'https://api.dsgservisi.com/wp-json/wp/v2'
    }
  },
});

