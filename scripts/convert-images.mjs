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
const HERO_JPG = path.join(ROOT, 'public', 'images', 'hero-bg.jpg');
const HERO_AVIF = path.join(ROOT, 'public', 'images', 'hero-bg.avif');
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
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

  let success = 0; let fail = 0;
  for (const f of files) {
    const res = await convertOne(f);
    if (res.ok) success++; else { fail++; console.warn('Convert fail:', res.inputPath, res.error); }
  }
  return { success, fail };
}

async function main() {
  let totalOk = 0; let totalFail = 0;
  // Hero responsive AVIF set
  const heroInput = (await fileExists(HERO_JPG)) ? HERO_JPG : (await fileExists(HERO_AVIF)) ? HERO_AVIF : null;
  if (heroInput) {
    const heroBase = path.join(ROOT, 'public', 'images', 'hero-bg');
    const heroSizes = [480, 768, 1280, 1920];
    for (const w of heroSizes) {
      const out = `${heroBase}-${w}.avif`;
      if (!(await fileExists(out))) {
        try {
          await sharp(heroInput).resize(w, null, { withoutEnlargement: true }).avif({ quality: 55 }).toFile(out);
          totalOk++;
        } catch (e) {
          totalFail++; console.warn('Hero resize fail:', w, e.message);
        }
      }
    }
    // also ensure base hero-bg.avif exists
    if (!(await fileExists(`${heroBase}.avif`))) {
      try {
        await sharp(heroInput).avif({ quality: 55 }).toFile(`${heroBase}.avif`);
        totalOk++;
      } catch (e) {
        totalFail++; console.warn('Hero base avif fail:', e.message);
      }
    }
  } else {
    console.warn('Hero image not found:', HERO_JPG, 'or', HERO_AVIF);
  }
  // Services
  if (await fileExists(SERVICES_DIR)) {
    // generate 320/480/640 avif for each service asset
    const entries = await fs.readdir(SERVICES_DIR, { withFileTypes: true });
    const files = entries
      .filter((d) => d.isFile())
      .map((d) => path.join(SERVICES_DIR, d.name))
      .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
    const sizes = [320, 480, 640];
    for (const input of files) {
      const ext = path.extname(input);
      const base = input.slice(0, -ext.length);
      for (const w of sizes) {
        const out = `${base}-${w}.avif`;
        if (await fileExists(out)) continue;
        try {
          await sharp(input).resize(w, null, { withoutEnlargement: true }).avif({ quality: 55 }).toFile(out);
          totalOk++;
        } catch (e) {
          totalFail++; console.warn('Service resize fail:', input, w, e.message);
        }
      }
    }
  }

  console.log(`✅ Image convert done. OK: ${totalOk}, Fail: ${totalFail}`);
}

main().catch((e) => {
  console.error('❌ convert-images error', e);
  process.exitCode = 1;
});


