/**
 * Optimize brand logos for WebP/AVIF and proper sizing
 * - Inputs: public/images/logos/*.png
 * - Outputs: Same folder, alongside originals: <name>.webp and <name>.avif
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const LOGOS_DIR = path.join(process.cwd(), 'public', 'images', 'logos');
const TARGET_SIZE = 120; // Max width/height for logos

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function optimizeOneLogo(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = inputPath.slice(0, -ext.length);

  const outWebp = `${base}.webp`;
  const outAvif = `${base}.avif`;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let pipeline = image;
    if (metadata.width && metadata.width > TARGET_SIZE) {
      pipeline = pipeline.resize(TARGET_SIZE, TARGET_SIZE, { fit: 'contain' });
    }

    // WebP
    if (!(await fileExists(outWebp))) {
      await pipeline
        .webp({ quality: 80 })
        .toFile(outWebp);
    }
    // AVIF
    if (!(await fileExists(outAvif))) {
      await pipeline
        .avif({ quality: 60 })
        .toFile(outAvif);
    }
    return { ok: true, inputPath };
  } catch (e) {
    return { ok: false, inputPath, error: e.message };
  }
}

async function main() {
  if (!(await fileExists(LOGOS_DIR))) {
    console.warn('Logos directory not found:', LOGOS_DIR);
    return;
  }

  const entries = await fs.readdir(LOGOS_DIR, { withFileTypes: true });
  const files = entries
    .filter((d) => d.isFile())
    .map((d) => path.join(LOGOS_DIR, d.name))
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f)); // Sadece orjinal PNG/JPG/JPEG'leri hedefle

  let success = 0; let fail = 0;
  for (const f of files) {
    const res = await optimizeOneLogo(f);
    if (res.ok) success++; else { fail++; console.warn('Optimize fail:', res.inputPath, res.error); }
  }
  console.log(`✅ Logo optimization done. OK: ${success}, Fail: ${fail}`);
}

main().catch((e) => {
  console.error('❌ optimize-logos error', e);
  process.exitCode = 1;
});
