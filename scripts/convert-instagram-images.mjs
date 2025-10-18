/**
 * Convert Instagram images to AVIF format using Sharp
 * - Input: public/images/instagram/*.{jpg,jpeg,png,webp}
 * - Output: public/images/instagram/*.avif
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const INSTAGRAM_DIR = path.join(ROOT, 'public', 'images', 'instagram');

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function convertOne(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = inputPath.slice(0, -ext.length);
  const outAvif = `${base}.avif`;

  try {
    // Skip if already converted
    if (await fileExists(outAvif)) {
      console.log(`⏭️  Skipped (already exists): ${path.basename(outAvif)}`);
      return { ok: true, inputPath, skipped: true };
    }

    // Convert to AVIF
    await sharp(inputPath)
      .avif({ quality: 60 })
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .toFile(outAvif);
    
    console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outAvif)}`);
    return { ok: true, inputPath, skipped: false };
  } catch (e) {
    console.error(`❌ Failed: ${path.basename(inputPath)} - ${e.message}`);
    return { ok: false, inputPath, error: e.message };
  }
}

async function convertDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((d) => d.isFile())
    .map((d) => path.join(dir, d.name))
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`📂 Found ${files.length} image(s) in ${path.basename(dir)}/\n`);

  let success = 0;
  let fail = 0;
  let skipped = 0;

  for (const f of files) {
    const res = await convertOne(f);
    if (res.ok) {
      if (res.skipped) skipped++;
      else success++;
    } else {
      fail++;
    }
  }

  return { success, fail, skipped };
}

async function main() {
  console.log('🖼️  Converting Instagram images to AVIF...\n');

  if (!(await fileExists(INSTAGRAM_DIR))) {
    console.error(`❌ Instagram directory not found: ${INSTAGRAM_DIR}`);
    process.exitCode = 1;
    return;
  }

  const result = await convertDir(INSTAGRAM_DIR);

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Converted: ${result.success}`);
  console.log(`   ⏭️  Skipped: ${result.skipped}`);
  console.log(`   ❌ Failed: ${result.fail}`);
  
  if (result.fail === 0) {
    console.log(`\n🎉 All images converted successfully!`);
  }
}

main().catch((e) => {
  console.error('❌ Script error:', e);
  process.exitCode = 1;
});

