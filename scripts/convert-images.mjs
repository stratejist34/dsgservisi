/**
 * Convert all images to WebP/AVIF using Sharp (recursive)
 * - Processes: public/images/ klasöründeki tüm jpg, jpeg, png dosyaları
 * - Skips: logos/ klasörü, logo dosyaları, icon dosyaları
 * - Outputs: Aynı klasörde, orijinal dosyanın yanında: <name>.webp ve <name>.avif
 * - Responsive sizes for large images: <name>-480.{avif,webp}, <name>-768.{avif,webp}, <name>-1280.{avif,webp}
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

// Skip patterns
const SKIP_DIRS = ['logos'];
const SKIP_PATTERNS = [
  /logo/i,
  /icon/i,
  /DSG.*logo/i,
  /-logo\./i,
];

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

function shouldSkip(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(IMAGES_DIR, filePath);
  
  // Check if in skip directory
  const parts = relativePath.split(path.sep);
  if (parts.some(part => SKIP_DIRS.includes(part))) {
    return true;
  }
  
  // Check skip patterns
  if (SKIP_PATTERNS.some(pattern => pattern.test(fileName) || pattern.test(relativePath))) {
    return true;
  }
  
  return false;
}

async function getAllImageFiles(dir) {
  const files = [];
  
  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip logos directory
        if (!shouldSkip(fullPath)) {
          await scan(fullPath);
        }
      } else if (entry.isFile()) {
        // Only process source images (jpg, jpeg, png)
        if (/\.(jpg|jpeg|png)$/i.test(entry.name) && !shouldSkip(fullPath)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  await scan(dir);
  return files;
}

async function convertToWebPAndAVIF(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = inputPath.slice(0, -ext.length);
  const outWebp = `${base}.webp`;
  const outAvif = `${base}.avif`;
  
  let ok = 0; let fail = 0;
  
  try {
    // WebP
    if (!(await fileExists(outWebp))) {
      await sharp(inputPath)
        .webp({ quality: 72 })
        .toFile(outWebp);
      ok++;
    }
    
    // AVIF
    if (!(await fileExists(outAvif))) {
      await sharp(inputPath)
        .avif({ quality: 55 })
        .toFile(outAvif);
      ok++;
    }
    
    return { ok, fail };
  } catch (e) {
    return { ok, fail: 2, error: e.message };
  }
}

async function generateResponsiveImages(inputPath, sizes) {
  let ok = 0; let fail = 0;
  const ext = path.extname(inputPath).toLowerCase();
  const base = inputPath.slice(0, -ext.length);
  
  for (const w of sizes) {
    // AVIF
    const outAvif = `${base}-${w}.avif`;
    if (!(await fileExists(outAvif))) {
      try {
        await sharp(inputPath)
          .resize(w, null, { withoutEnlargement: true })
          .avif({ quality: 55 })
          .toFile(outAvif);
        ok++;
      } catch (e) {
        fail++; 
        console.warn(`❌ AVIF resize fail (${w}px):`, path.basename(inputPath), e.message);
      }
    }
    
    // WebP
    const outWebp = `${base}-${w}.webp`;
    if (!(await fileExists(outWebp))) {
      try {
        await sharp(inputPath)
          .resize(w, null, { withoutEnlargement: true })
          .webp({ quality: 72 })
          .toFile(outWebp);
        ok++;
      } catch (e) {
        fail++; 
        console.warn(`❌ WebP resize fail (${w}px):`, path.basename(inputPath), e.message);
      }
    }
  }
  
  return { ok, fail };
}

async function main() {
  console.log('🖼️  Scanning for images...');
  const allImages = await getAllImageFiles(IMAGES_DIR);
  
  console.log(`📊 Found ${allImages.length} images to process`);
  console.log('⏭️  Skipping: logos/ folder, logo files, icon files, already converted files\n');
  
  let totalOk = 0; let totalFail = 0;
  
  // Large images that need responsive versions
  const largeImagePatterns = [
    /hero-bg/i,
    /workshop/i,
  ];
  
  // Medium images (blog, etc.)
  const mediumImagePatterns = [
    /blog/i,
  ];
  
  for (const imagePath of allImages) {
    const relativePath = path.relative(IMAGES_DIR, imagePath);
    const fileName = path.basename(imagePath);
    
    // Check image size to determine if responsive versions needed
    let needsResponsive = false;
    let responsiveSizes = [];
    
    try {
      const metadata = await sharp(imagePath).metadata();
      const width = metadata.width || 0;
      
      // Large images (>1000px) get full responsive set
      if (largeImagePatterns.some(p => p.test(relativePath)) || width > 1000) {
        needsResponsive = true;
        responsiveSizes = [480, 768, 1280];
        if (width > 1500) responsiveSizes.push(1920);
      }
      // Medium images (500-1000px) get smaller responsive set
      else if (mediumImagePatterns.some(p => p.test(relativePath)) || (width > 500 && width <= 1000)) {
        needsResponsive = true;
        responsiveSizes = [480, 768];
      }
    } catch (e) {
      console.warn(`⚠️  Could not read metadata for ${fileName}:`, e.message);
    }
    
    // Convert to WebP and AVIF
    console.log(`🔄 Processing: ${relativePath}`);
    const convertResult = await convertToWebPAndAVIF(imagePath);
    totalOk += convertResult.ok;
    totalFail += convertResult.fail;
    
    if (convertResult.error) {
      console.warn(`   ❌ Error: ${convertResult.error}`);
    }
    
    // Generate responsive versions if needed
    if (needsResponsive && responsiveSizes.length > 0) {
      const responsiveResult = await generateResponsiveImages(imagePath, responsiveSizes);
      totalOk += responsiveResult.ok;
      totalFail += responsiveResult.fail;
    }
  }

  console.log(`\n✅ Image conversion complete!`);
  console.log(`   ✅ Success: ${totalOk} files`);
  if (totalFail > 0) {
    console.log(`   ❌ Failed: ${totalFail} files`);
  }
}

main().catch((e) => {
  console.error('❌ convert-images error', e);
  process.exitCode = 1;
});


