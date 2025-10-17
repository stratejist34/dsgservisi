/**
 * Build-time WordPress cache generator
 * - Fetches all posts from WordPress REST API
 * - Writes to public/wp-cache/posts.json
 */

const API_URL = process.env.PUBLIC_WORDPRESS_API_URL || 'https://dsgservisi.com/wp-json/wp/v2';

async function fetchAllPosts() {
  const firstUrl = `${API_URL}/posts?_embed&per_page=100&page=1&orderby=date&order=desc`;
  const firstRes = await fetch(firstUrl, { headers: { 'Accept': 'application/json' } });
  if (!firstRes.ok) {
    throw new Error(`Failed to fetch posts: ${firstRes.status} ${firstRes.statusText}`);
  }
  const totalPages = Number(firstRes.headers.get('X-WP-TotalPages') || '1');
  const posts = await firstRes.json();

  const pageFetches = [];
  for (let page = 2; page <= Math.min(totalPages, 10); page++) {
    const url = `${API_URL}/posts?_embed&per_page=100&page=${page}&orderby=date&order=desc`;
    pageFetches.push(fetch(url).then(r => r.ok ? r.json() : []));
  }
  const pages = await Promise.all(pageFetches);
  const all = posts.concat(...pages);
  return all;
}

async function main() {
  try {
    const posts = await fetchAllPosts();
    const fs = await import('node:fs/promises');
    const path = await import('node:path');

    const outDir = path.join(process.cwd(), 'public', 'wp-cache');
    await fs.mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, 'posts.json');

    await fs.writeFile(outFile, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`✅ Wrote ${posts.length} posts to public/wp-cache/posts.json`);
  } catch (err) {
    console.error('❌ Cache build failed:', err);
    process.exitCode = 1;
  }
}

main();


