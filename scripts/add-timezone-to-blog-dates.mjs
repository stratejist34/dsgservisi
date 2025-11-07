import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Project root = scripts/.. 
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/content/blog');

/**
 * True if the datetime already has a timezone suffix (Z or ±HH:MM)
 */
function hasTimezone(datetime) {
  return /[Zz]|[+\-]\d{2}:\d{2}$/.test(datetime);
}

/**
 * Add +03:00 to datetimes like YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss (no TZ)
 */
function addTimezoneToFrontmatter(frontmatter) {
  let changed = false;

  const replacer = (match, key, quote, datetime) => {
    if (hasTimezone(datetime)) return match; // already has tz
    // Only modify if time part exists (there is a 'T')
    if (!/T\d{2}:\d{2}/.test(datetime)) return match;
    changed = true;
    return `${key}${quote}${datetime}+03:00${quote}`;
  };

  const withPublish = frontmatter.replace(
    /(publishDate:\s*)(["'])([^"']+)(["'])/,
    (m, k, q, dt, q2) => replacer(m, k, q, dt)
  );

  const withUpdated = withPublish.replace(
    /(updatedDate:\s*)(["'])([^"']+)(["'])/,
    (m, k, q, dt, q2) => replacer(m, k, q, dt)
  );

  return { text: withUpdated, changed };
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const parts = original.split(/^---\s*$/m);
  if (parts.length < 3) {
    return { changed: false };
  }
  const [prefix, frontmatter, ...rest] = parts;
  const { text, changed } = addTimezoneToFrontmatter(frontmatter);
  if (!changed) return { changed: false };
  const updated = [prefix, '---', text, '---', ...rest].join('\n');
  fs.writeFileSync(filePath, updated, 'utf8');
  return { changed: true };
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && p.endsWith('.md')) files.push(p);
  }
}

const files = [];
walk(BLOG_DIR);

let modified = 0;
for (const f of files) {
  const { changed } = processFile(f);
  if (changed) modified++;
}

console.log(`Checked ${files.length} files, modified ${modified}.`);


