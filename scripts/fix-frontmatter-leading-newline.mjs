import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/content/blog');

function normalize(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  // Remove leading BOM and blank lines before the first non-whitespace char
  const trimmedStart = original.replace(/^[\uFEFF\s\r\n]+(?=---)/, '');
  if (trimmedStart === original) return false;
  fs.writeFileSync(filePath, trimmedStart, 'utf8');
  return true;
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
  if (normalize(f)) modified++;
}
console.log(`Frontmatter normalized. Checked ${files.length}, modified ${modified}.`);


