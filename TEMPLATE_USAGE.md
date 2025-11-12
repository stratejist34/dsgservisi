# 🚀 Astro Servis Sitesi Template - Kullanım Kılavuzu

Bu template, otomotiv servis siteleri için hazırlanmış, SEO optimize edilmiş, performanslı bir Astro template'idir.

## ✨ Özellikler

### 🎯 SEO & Performans
- ✅ **Lighthouse 100-100-100-100** hedefi
- ✅ Otomatik resim optimizasyonu (AVIF/WebP, responsive)
- ✅ Schema.org markup (LocalBusiness, Service, FAQ, Review)
- ✅ Sitemap & robots.txt
- ✅ Meta tags & Open Graph
- ✅ Google Analytics hazır

### 📝 Blog Sistemi
- ✅ Markdown ile blog yazıları
- ✅ **Zamanlı yayın** (tarih ve saat bazlı)
- ✅ **Otomatik iç linkleme** (keyword bazlı)
- ✅ Kategori sistemi
- ✅ Blog preview sayfası (planlanmış yazıları göster)
- ✅ Responsive blog kartları

### 🖼️ Resim Yönetimi
- ✅ **Build sırasında otomatik dönüştürme**
- ✅ AVIF/WebP formatları
- ✅ Responsive boyutlar (400px, 650px)
- ✅ Lazy loading
- ✅ Manuel komut gerektirmez!

### 📞 İletişim Özellikleri
- ✅ Floating telefon/WhatsApp butonları
- ✅ Çalışma saati kontrolü (gün ve saat bazlı)
- ✅ Otomatik buton değişimi
- ✅ Performans optimize edilmiş animasyonlar

### 🎨 UI/UX
- ✅ Modern, responsive tasarım
- ✅ TailwindCSS
- ✅ React componentleri (gerektiğinde)
- ✅ Smooth animasyonlar
- ✅ Instagram feed entegrasyonu

---

## 🚀 Yeni Proje Oluşturma

### 1️⃣ Template'i Kopyala

```bash
# DSG Servisi klasöründen kopyala
cd "C:\Users\Emrah\Desktop\ASTRO  Projeler"
cp -r dsgservisi yeni-proje-adi

# Veya Windows'ta
xcopy /E /I dsgservisi yeni-proje-adi
```

### 2️⃣ Temizlik Yap

```bash
cd yeni-proje-adi

# Git geçmişini sil
rm -rf .git

# Node modules'u sil (yeniden yüklenecek)
rm -rf node_modules

# Build klasörünü sil
rm -rf dist

# Cache'leri temizle
rm -rf .astro
```

### 3️⃣ Site Bilgilerini Güncelle

#### A) `src/utils/constants.ts`
```typescript
export const SITE_CONFIG = {
  name: 'Yeni Servis Adı',              // ✏️ DEĞİŞTİR
  phone: '+90 555 123 4567',             // ✏️ DEĞİŞTİR
  email: 'info@yeniservis.com',          // ✏️ DEĞİŞTİR
  address: 'Adres Bilgisi',              // ✏️ DEĞİŞTİR
  city: 'İstanbul',                      // ✏️ DEĞİŞTİR
  district: 'İlçe',                      // ✏️ DEĞİŞTİR
  // ... diğer bilgiler
};
```

#### B) `package.json`
```json
{
  "name": "yeni-proje-adi",              // ✏️ DEĞİŞTİR
  "version": "1.0.0",
  "description": "Yeni proje açıklaması" // ✏️ DEĞİŞTİR
}
```

#### C) `astro.config.mjs`
```javascript
export default defineConfig({
  site: 'https://yeniservis.com',        // ✏️ DEĞİŞTİR
  // ...
});
```

### 4️⃣ İçerikleri Temizle

```bash
# Blog yazılarını sil (örnekler kalabilir)
rm -rf src/content/blog/*

# Resimleri temizle (logolar hariç)
rm -rf public/images/blog/*
rm -rf public/images/instagram/*

# Hero resimlerini değiştir
# public/images/hero-bg.jpg
# public/images/workshop.jpg
```

### 5️⃣ Logoları Değiştir

```bash
# Logolar
public/images/DSG Servis logosu.webp     # ✏️ DEĞİŞTİR
public/images/DSG Servis logosu.png      # ✏️ DEĞİŞTİR
public/favicon.ico                       # ✏️ DEĞİŞTİR
public/images/og-image.jpg               # ✏️ DEĞİŞTİR
```

### 6️⃣ Bağımlılıkları Yükle

```bash
npm install
```

### 7️⃣ Test Et

```bash
# Development server
npm run dev
# http://localhost:4321

# Build test
npm run build
```

### 8️⃣ Git & Deploy

```bash
# Yeni git repo oluştur
git init
git add .
git commit -m "Initial commit: Yeni Servis Sitesi"

# GitHub'a push et
git remote add origin https://github.com/kullanici/yeni-repo.git
git branch -M main
git push -u origin main

# Vercel'e deploy et
vercel --prod
```

---

## 📝 Blog Yazısı Ekleme

### 1️⃣ Markdown Dosyası Oluştur

```bash
src/content/blog/yeni-yazi.md
```

### 2️⃣ Frontmatter Ekle

```markdown
---
title: "Yazı Başlığı"
description: "Yazı açıklaması (SEO için önemli)"
publishDate: 2025-11-15T10:00:00+03:00  # Tarih ve saat
draft: false
featured: true
featuredImage: "/images/blog/yeni-yazi.jpg"
imageAlt: "Resim açıklaması"
category: "Kategori Adı"
tags: ["tag1", "tag2"]
author: "Yazar Adı"
---

## İçerik buraya...
```

### 3️⃣ Resmi Ekle

```bash
# Resmi kopyala
public/images/blog/yeni-yazi.jpg

# Build yap (resimler otomatik dönüşür!)
npm run build
```

**Otomatik oluşturulur:**
- `yeni-yazi-400.avif`
- `yeni-yazi-400.webp`
- `yeni-yazi-650.avif`
- `yeni-yazi-650.webp`
- `yeni-yazi.avif`
- `yeni-yazi.webp`

### 4️⃣ Zamanlı Yayın

```markdown
---
# Bugün saat 14:00'te yayınla
publishDate: 2025-11-12T14:00:00+03:00

# Yarın saat 09:00'da yayınla
publishDate: 2025-11-13T09:00:00+03:00

# Gelecek hafta yayınla
publishDate: 2025-11-20T10:00:00+03:00
---
```

**Otomatik çalışır:**
- Saat gelmeden site'de görünmez
- Saat gelince otomatik yayınlanır
- Preview sayfasında görebilirsiniz: `/blog/preview`

### 5️⃣ Otomatik İç Linkleme

```markdown
<!-- Yazınızda bu kelimeleri kullanın -->
DSG şanzıman tamiri
Mekatronik arızası
Periyodik bakım

<!-- Otomatik link olur -->
[DSG şanzıman tamiri](/dsg-sanziman-tamiri)
[Mekatronik arızası](/dsg-mekatronik-arizasi)
```

**Ayarlar:** `src/utils/remark-internal-links.mjs`

---

## ⚙️ Özelleştirme

### Çalışma Saatleri (Telefon/WhatsApp Butonları)

`src/components/common/PhoneButton.tsx`:
```typescript
// Telefon butonu: Pazartesi-Cumartesi 09:00-18:00
if (day === 0) return false; // Pazar kapalı
return time >= 9 && time < 18;
```

### Renkler

`tailwind.config.mjs`:
```javascript
colors: {
  primary: '#5DD3E0',    // Ana renk
  secondary: '#1A9CB0',  // İkincil renk
  navy: '#0a4d5e',       // Koyu renk
}
```

### Google Analytics

`.env`:
```bash
PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Schema.org

`src/components/seo/Schema.astro`:
- LocalBusiness bilgileri
- Service bilgileri
- FAQ'ler
- Review'lar

---

## 🔧 Komutlar

```bash
# Development
npm run dev

# Build (resimler otomatik dönüşür!)
npm run build

# Preview
npm run preview

# Sadece resimleri dönüştür (opsiyonel)
npm run convert-images

# İç linkleri kontrol et
npm run check-links
```

---

## 📊 Blog Preview Sayfası

**URL:** `/blog/preview`

**Şifre:** Tarayıcıda sorulur (güvenlik için)

**Gösterir:**
- ✅ Toplam yazı sayısı
- ✅ Yayınlanmış yazılar
- ✅ Planlanmış yazılar (tarih/saat ile)
- ✅ Kategori istatistikleri

---

## 🚀 Deploy

### Vercel (Önerilen)

```bash
# Vercel CLI kur
npm i -g vercel

# Deploy et
vercel --prod
```

**Otomatik:**
- Her push'ta build
- Resimler otomatik dönüşür
- Zamanlı yazılar saat başı kontrol edilir

### Environment Variables

Vercel dashboard'da ekle:
```bash
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_WORDPRESS_API_URL=https://api.site.com/wp-json/wp/v2
```

---

## 📚 Klasör Yapısı

```
yeni-proje/
├── public/
│   ├── images/
│   │   ├── blog/           # Blog resimleri
│   │   ├── logos/          # Marka logoları
│   │   └── ...
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── blog/           # Blog componentleri
│   │   ├── common/         # Ortak componentler
│   │   ├── home/           # Ana sayfa componentleri
│   │   └── seo/            # SEO componentleri
│   ├── content/
│   │   └── blog/           # Blog yazıları (Markdown)
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
│       ├── constants.ts    # ✏️ Site bilgileri
│       ├── remark-internal-links.mjs  # İç linkleme
│       └── ...
├── scripts/
│   └── convert-images.mjs  # Resim dönüştürme
├── astro.config.mjs        # ✏️ Site URL
├── package.json            # ✏️ Proje adı
└── tailwind.config.mjs     # ✏️ Renkler
```

---

## ❓ Sık Sorulan Sorular

### Resimler otomatik dönüşmüyor?

```bash
# Manuel çalıştır
npm run convert-images

# Build sırasında otomatik çalışmalı
npm run build
```

### Zamanlı yazı görünmüyor?

- `publishDate` kontrol edin (tarih + saat)
- Saat dilimi: `+03:00` (Türkiye)
- Preview sayfasında görebilirsiniz: `/blog/preview`

### İç linkler çalışmıyor?

- `src/utils/remark-internal-links.mjs` dosyasını kontrol edin
- Keyword'leri ekleyin/güncelleyin
- Build yapın

### Telefon butonu görünmüyor?

- Çalışma saatlerini kontrol edin
- Pazar günü kapalı (varsayılan)
- `src/components/common/PhoneButton.tsx` düzenleyin

---

## 🎉 Başarılar!

Template hazır! Artık:
- ✅ Resimler otomatik optimize
- ✅ Zamanlı yazılar otomatik yayınlanır
- ✅ İç linkler otomatik oluşur
- ✅ SEO tam optimize
- ✅ Performans maksimum

**Sadece içerik ekleyin, gerisini template halleder!** 🚀
