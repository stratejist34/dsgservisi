/**
 * Optimize brand logos for WebP/AVIF and proper sizing
 * - Inputs: public/images/logos/*.png
 * - Outputs: Same folder, alongside originals: <name>.webp and <name>.avif
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const LOGOS_DIR = path.join(process.cwd(), 'public', 'images', 'logos');
const MAIN_LOGO_PATH = path.join(process.cwd(), 'public', 'images', 'logo.png');
const TARGET_SIZE_BRAND_LOGOS = 120; // Max width/height for brand logos
const TARGET_SIZE_MAIN_LOGO = 48; // Max width/height for main logo

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function optimizeOneImage(inputPath, targetSize) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = inputPath.slice(0, -ext.length);

  const outWebp = `${base}.webp`;
  const outAvif = `${base}.avif`;

  try {
    const originalImage = sharp(inputPath);
    const metadata = await originalImage.metadata();

    let resizedImage = originalImage;
    if (metadata.width && metadata.width > targetSize) {
      resizedImage = originalImage.resize(targetSize, targetSize, { fit: 'contain' });
    }

    // Optimize original format and overwrite
    if (ext === '.png') {
      const optimizedBuffer = await resizedImage.clone().png({ quality: 80 }).toBuffer();
      await fs.writeFile(inputPath, optimizedBuffer);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      const optimizedBuffer = await resizedImage.clone().jpeg({ quality: 80 }).toBuffer();
      await fs.writeFile(inputPath, optimizedBuffer);
    }

    // WebP
    if (!(await fileExists(outWebp))) {
      await resizedImage.clone()
        .webp({ quality: 80 })
        .toFile(outWebp);
    }
    // AVIF
    if (!(await fileExists(outAvif))) {
      await resizedImage.clone()
        .avif({ quality: 60 })
        .toFile(outAvif);
    }
    return { ok: true, inputPath };
  } catch (e) {
    return { ok: false, inputPath, error: e.message };
  }
}

async function main() {
  let totalOk = 0; let totalFail = 0;

  // Optimize main logo
  if (await fileExists(MAIN_LOGO_PATH)) {
    console.log(`Optimizing main logo: ${MAIN_LOGO_PATH}`);
    const res = await optimizeOneImage(MAIN_LOGO_PATH, TARGET_SIZE_MAIN_LOGO);
    if (res.ok) totalOk++; else { totalFail++; console.warn('Optimize fail (main logo):', res.inputPath, res.error); }
  }

  // Optimize brand logos
  if (await fileExists(LOGOS_DIR)) {
    console.log(`Optimizing brand logos in: ${LOGOS_DIR}`);
    const entries = await fs.readdir(LOGOS_DIR, { withFileTypes: true });
    const files = entries
      .filter((d) => d.isFile())
      .map((d) => path.join(LOGOS_DIR, d.name))
      .filter((f) => /\.(png|jpg|jpeg)$/i.test(f)); // Sadece orjinal PNG/JPG/JPEG'leri hedefle

    for (const f of files) {
      const res = await optimizeOneImage(f, TARGET_SIZE_BRAND_LOGOS);
      if (res.ok) totalOk++; else { totalFail++; console.warn('Optimize fail:', res.inputPath, res.error); }
    }
  }

  console.log(`✅ Logo optimization done. OK: ${totalOk}, Fail: ${totalFail}`);
}

main().catch((e) => {
  console.error('❌ optimize-logos error', e);
  process.exitCode = 1;
});
