/**
 * Build-time WordPress images downloader
 * - Reads public/wp-cache/posts.json
 * - Downloads featured images to public/wp-cache/images/{slug}.{ext}
 */

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const POSTS_JSON = path.join(process.cwd(), 'public', 'wp-cache', 'posts.json');
const OUT_DIR = path.join(process.cwd(), 'public', 'wp-cache', 'images');

function getExtensionFromUrl(url) {
  try {
    const clean = url.split('?')[0].split('#')[0];
    const ext = clean.substring(clean.lastIndexOf('.') + 1).toLowerCase();
    if (!ext || ext.length > 5 || /[^a-z0-9]/.test(ext)) return 'jpg';
    return ext;
  } catch {
    return 'jpg';
  }
}

async function download(url, filePath) {
  const res = await fetch(url, { headers: { 'Accept': 'image/*' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = new Uint8Array(await res.arrayBuffer());
  await writeFile(filePath, buf);
}

async function main() {
  try {
    const buf = await readFile(POSTS_JSON, 'utf-8');
    const posts = JSON.parse(buf);
    await mkdir(OUT_DIR, { recursive: true });

    const concurrency = 5;
    let active = 0;
    let index = 0;
    let downloaded = 0;

    async function next() {
      if (index >= posts.length) return;
      const post = posts[index++];
      const img = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      if (!img) return next();
      const ext = getExtensionFromUrl(img);
      // Varsayılanı .jpg olarak kaydet ki frontend tek yoldan erişsin
      const outFile = path.join(OUT_DIR, `${post.slug}.jpg`);
      active++;
      try {
        await download(img, outFile);
        downloaded++;
      } catch (e) {
        console.warn(`Skip image for ${post.slug}: ${e.message}`);
      } finally {
        active--;
        await next();
      }
    }

    const starters = Math.min(concurrency, posts.length);
    await Promise.all(Array.from({ length: starters }, () => next()));
    console.log(`✅ Downloaded ${downloaded} featured images to public/wp-cache/images/`);
  } catch (err) {
    console.error('❌ Image cache build failed:', err);
    process.exitCode = 1;
  }
}

main();


