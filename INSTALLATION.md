# 🚀 KURULUM REHBERİ - DSG SERVİSİ

## ✅ Önkoşullar

- Node.js 18.0.0 veya üzeri
- npm veya yarn package manager
- Git

## 📦 1. Proje Kurulumu

```bash
# Bağımlılıkları yükle
npm install

# veya yarn kullanıyorsanız
yarn install
```

## 🔧 2. Environment Ayarları

`.env` dosyası oluşturun:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# WordPress API Configuration
PUBLIC_WP_API_URL=https://dsgservisi.com/wp-json/wp/v2

# Site Configuration
PUBLIC_SITE_URL=https://dsgservisi.com
PUBLIC_SITE_NAME="Yıldızlar Grup DSG Servisi"

# Business Information
PUBLIC_PHONE=05332623451
PUBLIC_EMAIL=yildizlarvolkswagen@gmail.com
PUBLIC_ADDRESS="Beykent Sanayi Sitesi Meriç Sk. No: 179-180 Büyükçekmece / İSTANBUL"

# Google Configuration
PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=..."
PUBLIC_GOOGLE_PLACE_ID="ChIJ..."
PUBLIC_GOOGLE_RATING=5.0
PUBLIC_GOOGLE_REVIEW_COUNT=76

# Social Media
PUBLIC_INSTAGRAM_URL=https://instagram.com/dsgservisi
PUBLIC_FACEBOOK_URL=https://facebook.com/dsgservisi
```

## 🖼️ 3. Görselleri Ekleyin

### Gerekli Görseller:

1. **Marka Logoları** (`public/images/logos/`):
   - audi.svg
   - bmw.svg
   - dsg.svg
   - land-rover.svg
   - mercedes.svg
   - porsche.svg
   - seat.svg
   - skoda.svg
   - volkswagen.svg

2. **Hizmet Görselleri** (`public/images/services/`):
   - bakim.jpg
   - sanziman.jpg
   - fren.jpg
   - suspansiyon.jpg
   - aku.jpg
   - sogutma.jpg
   - elektrik.jpg
   - motor.jpg

3. **Genel Görseller** (`public/images/`):
   - logo.png (512x512px)
   - og-image.jpg (1200x630px)
   - hero-bg.jpg (1920x1080px)
   - workshop.jpg (1200x800px)
   - default-blog.jpg (800x600px)

## 🚀 4. Development Server

```bash
npm run dev
```

Tarayıcınızda açın: http://localhost:4321

## 🏗️ 5. Production Build

```bash
# Build oluştur
npm run build

# Build'i önizle
npm run preview
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 📤 6. Deployment

### Statik Hosting (Netlify, Vercel, Cloudflare Pages):

1. GitHub repository'nize push yapın
2. Hosting platformunda yeni proje oluşturun
3. Build komutu: `npm run build`
4. Publish directory: `dist`
5. Environment variables ekleyin

### Manuel FTP Yükleme:

```bash
# Build oluştur
npm run build

# dist/ klasöründeki tüm dosyaları public_html'e yükle
# FTP istemciniz ile veya rsync ile:
rsync -avz dist/ user@server:/path/to/public_html/
```

## 🔧 WordPress Ayarları

### Gerekli Plugins:

1. **Yoast SEO** - SEO meta tags için
2. **Advanced Custom Fields (ACF)** - Özel alanlar için (opsiyonel)

### REST API Ayarları:

WordPress Admin -> Settings -> Permalinks:
- ✅ "Post name" seçili olmalı
- ✅ REST API enabled olmalı

### CORS Ayarları (functions.php):

```php
// WordPress REST API için CORS izinleri
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

## 🧪 Test Etme

### Kontrol Listesi:

- [ ] Ana sayfa yükleniyor
- [ ] Tüm sayfalar çalışıyor (Hizmetler, Hakkımızda, İletişim, Blog)
- [ ] Telefon ve WhatsApp butonları çalışıyor
- [ ] Google Maps görüntüleniyor
- [ ] Blog yazıları WordPress'ten çekiliyor
- [ ] SEO meta tags doğru
- [ ] Responsive tasarım mobilde çalışıyor
- [ ] Tüm görseller yükleniyor
- [ ] Sayfa hızı optimum (Lighthouse 90+)

## 🐛 Sorun Giderme

### Build Hataları:

```bash
# Cache temizle
rm -rf node_modules .astro dist
npm install
npm run build
```

### WordPress API Bağlantı Sorunu:

1. `.env` dosyasındaki `PUBLIC_WP_API_URL` kontrol edin
2. WordPress REST API aktif mi kontrol edin: `https://dsgservisi.com/wp-json/wp/v2/posts`
3. CORS ayarları yapıldı mı kontrol edin

### Görseller Görünmüyor:

1. `public/images/` klasöründe görseller var mı kontrol edin
2. Dosya isimleri doğru mu kontrol edin (küçük harf, tire ile)
3. Build sonrası `dist/images/` klasörü oluştu mu kontrol edin

## 📊 Performance Optimizasyonu

### Görsel Optimizasyonu:

```bash
# TinyPNG veya ImageOptim ile görselleri sıkıştırın
# SVG görselleri SVGO ile optimize edin
```

### Lazy Loading:

Astro otomatik olarak görsellere lazy loading ekler.

### Cache Headers (Sunucu):

`.htaccess` veya nginx config ile cache headers ekleyin:

```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 📞 Destek

Sorularınız için:
- Email: yildizlarvolkswagen@gmail.com
- Telefon: 0533 262 34 51

## 📄 Lisans

© 2025 Yıldızlar Grup DSG Servisi

