# Images Klasörü

Bu klasör proje görsellerini içerir.

## Dizin Yapısı

```
images/
├── logos/              # Marka logoları
│   ├── audi.png
│   ├── bmw.png
│   ├── dsg.png
│   ├── land-rover.png
│   ├── mercedes.png
│   ├── porsche.pngsen yap
│   ├── seat.png
│   ├── skoda.png
│   └── volkswagen.png
│
├── services/           # Hizmet görselleri
│   ├── bakim.jpg
│   ├── sanziman.jpg
│   ├── fren.jpg
│   ├── suspansiyon.jpg
│   ├── aku.jpg
│   ├── sogutma.jpg
│   ├── elektrik.jpg
│   └── motor.jpg
│
├── logo.png            # Site logosu
├── og-image.jpg        # Open Graph image (1200x630px)
├── hero-bg.jpg         # Hero background
├── workshop.jpg        # Atölye görseli
└── default-blog.jpg    # Varsayılan blog görseli
```

## Gerekli Görseller

### Logolar (PNG Format - Şeffaf Arka Plan)
- Marka logoları şeffaf arka plan ile
- PNG formatında (önerilen boyut: 200x200px veya 300x300px)
- Her logo beyaz/şeffaf arka plan ile
- Optimize edilmiş dosya boyutu (max 50KB)

### Hizmet Görselleri (JPG Format)
- 800x600px önerilen boyut
- Optimize edilmiş (max 200KB)
- Kaliteli, profesyonel görünüm

### Genel Görseller
- **logo.png**: 512x512px, şeffaf arka plan
- **og-image.jpg**: 1200x630px (Facebook/Twitter paylaşım görseli)
- **hero-bg.jpg**: 1920x1080px (Hero bölümü arkaplan)
- **workshop.jpg**: 1200x800px (Hakkımızda sayfası)
- **default-blog.jpg**: 800x600px (Blog yazıları için varsayılan)

## Optimizasyon İpuçları

1. **JPG görselleri** için: TinyPNG veya ImageOptim kullanın
2. **PNG görselleri** için: TinyPNG veya Squoosh kullanın
3. **Lazy loading**: Astro otomatik olarak ekler
4. **Modern formatlar**: WebP kullanımı önerilebilir

## Notlar

- Tüm görseller telif haklarına uygun olmalı
- Marka logolar için ilgili markaların izinleri alınmalı
- Görseller optimize edilmiş halde yüklenmelidir

