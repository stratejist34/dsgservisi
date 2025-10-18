import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const logoSizes = {
  // Desktop: 77x77, Mobile: 60x60 -> 88x88 max güvenli
  'audi-logo.webp': { width: 88, height: 88 },
  'bmw-logo.webp': { width: 88, height: 88 },
  'volkswagen-logo.webp': { width: 88, height: 88 },
  'skoda-logo.webp': { width: 88, height: 88 },
  'seat-logo.webp': { width: 88, height: 88 },
  // Dikdörtgen logolar için aspect ratio koru
  'mercedes-logo.webp': { width: 88, height: 69 },
  'porsche-logo.webp': { width: 88, height: 49 },
  'land-rover-logo.webp': { width: 88, height: 46 },
};

const logoDir = path.join(process.cwd(), 'public/images/logos');

async function optimizeLogos() {
  console.log('🎯 Logo boyutları optimize ediliyor...');
  
  for (const [filename, size] of Object.entries(logoSizes)) {
    const inputPath = path.join(logoDir, filename);
    const tempPath = path.join(logoDir, `temp-${filename}`);
    
    try {
      // Dosya var mı kontrol et
      await fs.access(inputPath);
      
      console.log(`📐 ${filename}: ${size.width}x${size.height}`);
      
      // Yeniden boyutlandır ve optimize et
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ 
          quality: 90,
          effort: 6,
          lossless: false
        })
        .toFile(tempPath);
      
      // Orijinali yedekle ve yeniyi koy
      await fs.rename(inputPath, `${inputPath}.backup`);
      await fs.rename(tempPath, inputPath);
      
      console.log(`✅ ${filename} optimize edildi`);
      
    } catch (error) {
      console.log(`❌ ${filename} bulunamadı: ${error.message}`);
    }
  }
  
  console.log('🎉 Logo optimizasyonu tamamlandı!');
}

optimizeLogos().catch(console.error);
