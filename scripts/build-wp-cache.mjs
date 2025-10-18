/**
 * Build-time WordPress cache generator
 * - Fetches all posts from WordPress REST API
 * - Writes to public/wp-cache/posts.json
 */

const API_URL = process.env.PUBLIC_WORDPRESS_API_URL || 'https://dsgservisi.com/wp-json/wp/v2';
const PROXY_URL = process.env.PUBLIC_WORDPRESS_PROXY_URL || 'https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev/wp-json/wp/v2';

function buildPostsUrl(base, page) {
  return `${base}/posts?_embed&per_page=100&page=${page}&orderby=date&order=desc`;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json,text/plain,*/*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Referer': 'https://dsgservisi.com/'
    }
  });
  return res;
}

async function fetchAllPosts() {
  // 1) İlk deneme: doğrudan API_URL
  let base = API_URL;
  let firstRes = await fetchJson(buildPostsUrl(base, 1));

  // 403/401/503 gibi engellemelerde proxy'ye fallback yap
  if (!firstRes.ok && [401, 403, 503].includes(firstRes.status)) {
    console.warn(`Primary API blocked (${firstRes.status}). Falling back to proxy...`);
    base = PROXY_URL;
    firstRes = await fetchJson(buildPostsUrl(base, 1));
  }

  if (!firstRes.ok) {
    throw new Error(`Failed to fetch posts: ${firstRes.status} ${firstRes.statusText}`);
  }

  const totalPages = Number(firstRes.headers.get('X-WP-TotalPages') || '1');
  const posts = await firstRes.json();

  const pageFetches = [];
  for (let page = 2; page <= Math.min(totalPages, 10); page++) {
    const url = buildPostsUrl(base, page);
    pageFetches.push(
      fetchJson(url).then(async (r) => (r.ok ? r.json() : []))
    );
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


