/**
 * Convert hero and service images to WebP/AVIF using Sharp
 * - Inputs:
 *    public/images/hero-bg.jpg
 *    public/images/services/*.{jpg,jpeg,png,webp}
 * - Outputs:
 *    Same folders, alongside originals: <name>.webp and <name>.avif
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const HERO = path.join(ROOT, 'public', 'images', 'hero-bg.jpg');
const SERVICES_DIR = path.join(ROOT, 'public', 'images', 'services');

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function convertOne(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = inputPath.slice(0, -ext.length);
  // Skip if output already exists (idempotent)
  const outWebp = `${base}.webp`;
  const outAvif = `${base}.avif`;

  try {
    // WebP
    if (!(await fileExists(outWebp))) {
      await sharp(inputPath)
        .webp({ quality: 72 })
        .resize(640, null, { withoutEnlargement: true })
        .toFile(outWebp);
    }
    // AVIF
    if (!(await fileExists(outAvif))) {
      await sharp(inputPath)
        .avif({ quality: 55 })
        .resize(640, null, { withoutEnlargement: true })
        .toFile(outAvif);
    }
    return { ok: true, inputPath };
  } catch (e) {
    return { ok: false, inputPath, error: e.message };
  }
}

async function convertDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((d) => d.isFile())
    .map((d) => path.join(dir, d.name))
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  let success = 0; let fail = 0;
  for (const f of files) {
    const res = await convertOne(f);
    if (res.ok) success++; else { fail++; console.warn('Convert fail:', res.inputPath, res.error); }
  }
  return { success, fail };
}

async function main() {
  let totalOk = 0; let totalFail = 0;
  // Hero
  if (await fileExists(HERO)) {
    const r = await convertOne(HERO);
    if (r.ok) totalOk++; else { totalFail++; console.warn('Convert fail (hero):', r.error); }
  } else {
    console.warn('Hero image not found:', HERO);
  }
  // Services
  if (await fileExists(SERVICES_DIR)) {
    const r = await convertDir(SERVICES_DIR);
    totalOk += r.success; totalFail += r.fail;
  }

  console.log(`✅ Image convert done. OK: ${totalOk}, Fail: ${totalFail}`);
}

main().catch((e) => {
  console.error('❌ convert-images error', e);
  process.exitCode = 1;
});


