/**
 * Optional: Download images referenced inside post.content.rendered
 * - Parses posts.json
 * - Finds <img src="..."> urls
 * - Downloads to public/wp-cache/content/{slug}/{index}.jpg
 * - Rewrites the HTML to use local paths and writes posts.local.json
 */

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const POSTS_JSON = path.join(process.cwd(), 'public', 'wp-cache', 'posts.json');
const OUT_DIR = path.join(process.cwd(), 'public', 'wp-cache', 'content');

function getImgUrlsFromHtml(html) {
  const urls = [];
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const url = m[1];
    if (typeof url === 'string' && url.startsWith('http')) urls.push(url);
  }
  return Array.from(new Set(urls));
}

function extFromUrl(url) {
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
  const raw = await readFile(POSTS_JSON, 'utf-8');
  const posts = JSON.parse(raw);
  await mkdir(OUT_DIR, { recursive: true });

  const updated = [];

  for (const post of posts) {
    const slug = post.slug;
    const html = post?.content?.rendered || '';
    const urls = getImgUrlsFromHtml(html);
    if (urls.length === 0) { updated.push(post); continue; }
    const dir = path.join(OUT_DIR, slug);
    await mkdir(dir, { recursive: true });
    let idx = 1;
    let newHtml = html;
    for (const url of urls) {
      const ext = extFromUrl(url);
      const local = `/wp-cache/content/${slug}/${idx}.jpg`;
      try {
        await download(url, path.join(dir, `${idx}.jpg`));
        newHtml = newHtml.split(url).join(local);
        idx++;
      } catch (e) {
        console.warn(`Skip content image for ${slug}: ${e.message}`);
      }
    }
    updated.push({ ...post, content: { ...post.content, rendered: newHtml } });
  }

  await writeFile(path.join(path.dirname(POSTS_JSON), 'posts.local.json'), JSON.stringify(updated, null, 2), 'utf-8');
  console.log('✅ Rewrote content images where possible -> posts.local.json');
}

main().catch((e) => {
  console.error('❌ content images error', e);
  process.exitCode = 1;
});


