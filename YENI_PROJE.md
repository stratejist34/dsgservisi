# 🚀 Yeni Proje Oluşturma - Sadece .env ile!

## ✨ Özellik: Hiçbir Kod Değişikliği Gerektirmez!

Bu template ile yeni proje oluşturmak için **sadece `.env` dosyasını düzenleyin**. 
- ❌ `astro.config.mjs` değiştirmeyin
- ❌ `package.json` değiştirmeyin  
- ❌ `constants.ts` değiştirmeyin
- ✅ Sadece `.env` dosyasını kopyalayıp düzenleyin!

---

## 📋 Adım Adım Kurulum

### 1️⃣ Template'i Kopyala (2 dakika)

```bash
# Windows PowerShell
cd "C:\Users\Emrah\Desktop\ASTRO  Projeler"
xcopy /E /I dsgservisi hyundaiservisim

cd hyundaiservisim
```

### 2️⃣ Temizlik Yap (1 dakika)

```bash
# Git geçmişini sil
rmdir /S /Q .git

# Node modules'u sil
rmdir /S /Q node_modules

# Build klasörünü sil
rmdir /S /Q dist

# Cache'leri temizle
rmdir /S /Q .astro
```

### 3️⃣ .env Dosyasını Oluştur (3 dakika)

```bash
# .env.example'ı kopyala
copy .env.example .env

# .env dosyasını aç ve düzenle
notepad .env
```

#### Düzenlenecek Değerler:

```bash
# Site Bilgileri
PUBLIC_SITE_NAME="Hyundai Servisi - Firma Adı"
PUBLIC_SITE_URL="https://hyundaiservisim.com"
PUBLIC_SITE_DESCRIPTION="Hyundai yetkili servisi - İstanbul"

# İletişim
PUBLIC_PHONE="+90 XXX XXX XXXX"
PUBLIC_WHATSAPP="+90 XXX XXX XXXX"
PUBLIC_EMAIL="info@hyundaiservisim.com"

# Adres
PUBLIC_ADDRESS="Adres bilgisi buraya"
PUBLIC_CITY="İstanbul"
PUBLIC_DISTRICT="İlçe Adı"
PUBLIC_POSTAL_CODE="34XXX"

# Sosyal Medya
PUBLIC_INSTAGRAM="https://www.instagram.com/hesap/"
PUBLIC_FACEBOOK=""

# İş Bilgileri
PUBLIC_BUSINESS_TYPE="Hyundai Yetkili Servisi"
PUBLIC_EXPERIENCE_YEARS="15"
PUBLIC_CUSTOMERS_COUNT="5000"
PUBLIC_GOOGLE_RATING="4.5"
PUBLIC_GOOGLE_REVIEWS="100"

# Çalışma Saatleri
PUBLIC_WORKING_HOURS='{"monday":"09:00-18:00","tuesday":"09:00-18:00","wednesday":"09:00-18:00","thursday":"09:00-18:00","friday":"09:00-18:00","saturday":"09:00-14:00","sunday":"Kapalı"}'

# Google Analytics (opsiyonel)
PUBLIC_GA_ID="G-XXXXXXXXXX"

# Tema Renkleri (opsiyonel - varsayılan turkuaz)
PUBLIC_PRIMARY_COLOR="#0066CC"
PUBLIC_SECONDARY_COLOR="#004C99"
PUBLIC_NAVY_COLOR="#002D5C"

# Logo Yolları (opsiyonel)
PUBLIC_LOGO_PATH="/images/hyundai-logo.webp"
PUBLIC_LOGO_ALT="Hyundai Servisi Logo"
```

### 4️⃣ Logoları Değiştir (2 dakika)

```bash
# Eski logoları sil
del public\images\"DSG Servis logosu.webp"
del public\images\"DSG Servis logosu.png"

# Yeni logoları ekle
# public/images/hyundai-logo.webp
# public/images/hyundai-logo.png
# public/favicon.ico
# public/images/og-image.jpg
```

### 5️⃣ İçerikleri Temizle (1 dakika)

```bash
# Blog yazılarını sil
del /Q src\content\blog\*

# Blog resimlerini sil
del /Q public\images\blog\*

# Instagram resimlerini sil (opsiyonel)
del /Q public\images\instagram\*
```

### 6️⃣ Bağımlılıkları Yükle (2 dakika)

```bash
npm install
```

### 7️⃣ Test Et (1 dakika)

```bash
npm run dev
# http://localhost:4321
```

**Kontrol Et:**
- ✅ Site adı değişti mi?
- ✅ Telefon numarası doğru mu?
- ✅ Adres bilgileri doğru mu?
- ✅ Logolar görünüyor mu?

### 8️⃣ Git & Deploy (3 dakika)

```bash
# Yeni git repo oluştur
git init
git add .
git commit -m "Initial commit: Hyundai Servisi"

# GitHub'a push et
git remote add origin https://github.com/kullanici/hyundaiservisim.git
git branch -M main
git push -u origin main

# Vercel'e deploy et
vercel --prod
```

**Vercel'de .env ekle:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. `.env` dosyasındaki tüm değerleri ekle
3. Redeploy et

---

## 🎨 Görünüm Değişiklikleri

### Otomatik Değişenler (.env ile)

✅ **Site Adı** - Header, Footer, Title tag'lerde
✅ **Telefon/WhatsApp** - Floating butonlarda
✅ **Adres** - Footer ve İletişim sayfasında
✅ **Sosyal Medya** - Footer'daki linkler
✅ **Çalışma Saatleri** - Footer ve İletişim sayfasında
✅ **İstatistikler** - Ana sayfadaki sayılar (müşteri, tecrübe)
✅ **Google Rating** - Ana sayfada
✅ **Meta Tags** - SEO için title, description

### Manuel Değiştirilmesi Gerekenler

❌ **Renkler** - `.env`'de `PUBLIC_PRIMARY_COLOR` ile değiştir
❌ **Logolar** - `public/images/` klasöründeki dosyaları değiştir
❌ **Hero Resimleri** - `public/images/hero-bg.jpg`, `workshop.jpg`
❌ **Hizmetler** - `src/pages/hizmetlerimiz.astro` (opsiyonel)
❌ **Markalar** - `src/utils/constants.ts` → `brands` array (opsiyonel)

---

## 📝 Blog Yazısı Ekleme

### 1. Markdown Dosyası Oluştur

```bash
src/content/blog/hyundai-bakim-fiyatlari.md
```

### 2. Frontmatter Ekle

```markdown
---
title: "Hyundai Bakım Fiyatları 2025"
description: "Hyundai periyodik bakım fiyatları ve servis ücretleri"
publishDate: 2025-11-15T10:00:00+03:00
draft: false
featured: true
featuredImage: "/images/blog/hyundai-bakim-fiyatlari.jpg"
imageAlt: "Hyundai bakım"
category: "Bakım"
tags: ["hyundai", "bakım", "fiyat"]
author: "Servis Ekibi"
---

## İçerik buraya...
```

### 3. Resmi Ekle

```bash
# Resmi kopyala
public/images/blog/hyundai-bakim-fiyatlari.jpg

# Build yap (resimler otomatik dönüşür!)
npm run build
```

**Otomatik oluşturulur:**
- `hyundai-bakim-fiyatlari-400.avif`
- `hyundai-bakim-fiyatlari-400.webp`
- `hyundai-bakim-fiyatlari-650.avif`
- `hyundai-bakim-fiyatlari-650.webp`

---

## ⚙️ Gelişmiş Özelleştirme (Opsiyonel)

### Renkleri Değiştir

`.env` dosyasında:
```bash
PUBLIC_PRIMARY_COLOR="#0066CC"      # Hyundai mavisi
PUBLIC_SECONDARY_COLOR="#004C99"    # Koyu mavi
PUBLIC_NAVY_COLOR="#002D5C"         # Çok koyu mavi
```

### Çalışma Saatlerini Değiştir

`.env` dosyasında:
```bash
PUBLIC_WORKING_HOURS='{"monday":"08:00-19:00","tuesday":"08:00-19:00","wednesday":"08:00-19:00","thursday":"08:00-19:00","friday":"08:00-19:00","saturday":"09:00-15:00","sunday":"Kapalı"}'
```

### Hizmetleri Değiştir (Manuel)

`src/pages/hizmetlerimiz.astro` dosyasını düzenle:
```astro
const services = [
  {
    title: 'Periyodik Bakım',
    description: 'Hyundai periyodik bakım hizmetleri',
    icon: '🔧',
    image: '/images/services/bakim.jpg',
  },
  // ... diğer hizmetler
];
```

### Markaları Değiştir (Manuel)

`src/utils/constants.ts` dosyasında:
```typescript
brands: [
  { name: 'Hyundai', logo: '/images/logos/hyundai-logo.webp', url: '#' },
  { name: 'Kia', logo: '/images/logos/kia-logo.webp', url: '#' },
  // ... diğer markalar
],
```

---

## 🎯 Özet: Sadece 3 Dosya!

Yeni proje için değiştirmeniz gerekenler:

1. **`.env`** - Tüm site bilgileri (5 dakika)
2. **Logolar** - `public/images/` klasöründe (2 dakika)
3. **Blog içeriği** - `src/content/blog/` klasöründe (istediğiniz zaman)

**Toplam süre: 10-15 dakika** ⚡

---

## ✅ Kontrol Listesi

- [ ] `.env` dosyası oluşturuldu ve düzenlendi
- [ ] Logolar değiştirildi
- [ ] Blog içeriği temizlendi
- [ ] `npm install` çalıştırıldı
- [ ] `npm run dev` ile test edildi
- [ ] Site adı doğru görünüyor
- [ ] Telefon numarası doğru
- [ ] Adres bilgileri doğru
- [ ] Git repo oluşturuldu
- [ ] GitHub'a push edildi
- [ ] Vercel'e deploy edildi
- [ ] Vercel'de .env eklendi

---

## 🎉 Başarılar!

Artık yeni projeniz hazır! 

**Otomatik çalışan özellikler:**
- ✅ Resim optimizasyonu (build sırasında)
- ✅ Zamanlı yazılar (tarih/saat bazlı)
- ✅ Otomatik iç linkleme
- ✅ SEO optimizasyonu
- ✅ Schema.org markup
- ✅ Responsive tasarım
- ✅ Performans optimizasyonu

**Sadece içerik ekleyin, gerisini template halleder!** 🚀
