# Deployment Checklist - DSG Servisi

## ✅ Düzeltmeler (Tamamlandı)

### 1. SEO Meta Tags
- [x] BlogLayout → BaseLayout props düzeltildi (title, description, image)
- [x] Blog index sayfası SEO props düzeltildi
- [x] Hakkımızda sayfası SEO props düzeltildi
- [x] Hizmetlerimiz sayfası SEO props düzeltildi
- [x] İletişim sayfası SEO props düzeltildi
- [x] Gizlilik Politikası (noindex eklendi)
- [x] Kullanım Koşulları (noindex eklendi)

### 2. Performance Optimizasyonları
- [x] PhoneButton: `client:load` → `client:idle`
- [x] WhatsAppButton: `client:load` → `client:idle`
- [x] Google Analytics lazy loading (3 saniye veya user interaction)
- [x] CSS animasyonları GPU acceleration
- [x] Reduced motion desteği

### 3. Node.js & Vercel Ayarları
- [x] `.nvmrc` dosyası oluşturuldu (Node 20)
- [x] `package.json` engines field eklendi
- [x] `vercel.json` NODE_VERSION=20
- [x] Cache headers eklendi (images, _astro)
- [x] Security headers eklendi

### 4. Build Verification
- [x] `npm run build` başarılı (7.41s)
- [x] 43 sayfa oluşturuldu
- [x] Blog yazıları build'de render ediliyor
- [x] SEO meta tag'leri HTML'de mevcut
- [x] React Islands (astro-island) render ediliyor

---

## 🚀 Deployment Adımları

### 1. Local Test (Opsiyonel)
```bash
# Build'i test et
npm run build

# Preview server'ı başlat
npm run preview

# Tarayıcıda aç: http://localhost:4321
# Kontrol et:
# - Title/description doğru mu?
# - PhoneButton/WhatsAppButton görünüyor mu?
# - Animasyonlar çalışıyor mu?
# - Blog yazıları açılıyor mu?
```

### 2. Git Commit & Push
```bash
# Değişiklikleri ekle
git add .

# Commit
git commit -m "feat: SEO ve performans optimizasyonları v2.0.0

- Blog ve tüm sayfalarda SEO meta tag sorunları düzeltildi
- React component'lerin hydration stratejisi optimize edildi (client:idle)
- Google Analytics lazy loading eklendi
- Animasyon performansı iyileştirildi
- Astro config optimizasyonları yapıldı
- Node.js 20 desteği eklendi (.nvmrc)
- Vercel cache ve security header'ları eklendi

Beklenen İyileştirmeler:
- Lighthouse mobil: 63 → 75-85 (+12-22 puan)
- SEO meta tag'leri tüm sayfalarda çalışıyor
- First Contentful Paint (FCP) iyileşti
- JavaScript bundle boyutu optimize edildi"

# Push
git push origin main
```

### 3. Vercel Auto-Deploy
- Vercel otomatik olarak deploy edecek
- Dashboard: https://vercel.com/dashboard
- Deploy süresi: ~2-3 dakika

### 4. Deployment Kontrolü

#### A. Vercel Dashboard Kontrolleri
1. **Build Logs** kontrol et:
   - ✅ Node.js 20 kullanıldı mı?
   - ✅ Build başarılı mı?
   - ✅ 43 sayfa oluşturuldu mu?

2. **Environment Variables** kontrol et:
   - `PUBLIC_WORDPRESS_API_URL`: `https://dsgservisi.com/wp-json/wp/v2`
   - `PUBLIC_USE_WP_CACHE`: `true`

#### B. Canlı Site Kontrolleri

**Ana Sayfa** - https://dsgservisi.com
- [ ] Sayfa yükleniyor mu?
- [ ] Title: "Yıldızlar Grup DSG Servisi | VW, Audi, Skoda, Seat DSG Servisi İstanbul"
- [ ] PhoneButton (sağ alt) görünüyor mu?
- [ ] WhatsAppButton (sol alt) görünüyor mu?
- [ ] Hero animasyonları çalışıyor mu?
- [ ] Stats counter animasyonları çalışıyor mu?
- [ ] Reviews carousel çalışıyor mu?

**Blog Sayfası** - https://dsgservisi.com/blog
- [ ] Blog kartları görünüyor mu?
- [ ] Title: "Blog | DSG Servisi - DSG Şanzıman ve Mekatronik Bilgi Merkezi"
- [ ] Card hover efektleri çalışıyor mu?

**Blog Yazısı** - https://dsgservisi.com/dsg-mekatronik-tamiri
- [ ] Yazı açılıyor mu?
- [ ] Title ve description doğru mu?
- [ ] İçindekiler (TOC) çalışıyor mu?
- [ ] Görseller yükleniyor mu?

**Diğer Sayfalar**
- [ ] https://dsgservisi.com/hakkimizda - Title doğru mu?
- [ ] https://dsgservisi.com/hizmetlerimiz - Title doğru mu?
- [ ] https://dsgservisi.com/iletisim - Title doğru mu?

#### C. SEO Kontrolleri

**View Source** kontrolü (Ctrl+U):
```html
<!-- Her sayfada olmalı: -->
<title>Sayfa Title</title>
<meta name="description" content="Sayfa description">
<meta property="og:title" content="Sayfa title">
<meta property="og:description" content="Sayfa description">
<meta property="og:image" content="https://dsgservisi.com/images/...">
<link rel="canonical" href="https://dsgservisi.com/...">
```

#### D. Performance Testleri

**Chrome DevTools > Lighthouse**
1. Mobil test:
   - Performance: 75-85 hedef (önceki: 63)
   - Accessibility: 95-100
   - Best Practices: 95-100
   - SEO: 100

2. Desktop test:
   - Performance: 90-95
   - Accessibility: 95-100
   - Best Practices: 95-100
   - SEO: 100

**GTmetrix** - https://gtmetrix.com
- URL: https://dsgservisi.com
- Location: Europe - Amsterdam
- Beklenen: Grade A, 1-2s load time

---

## 🐛 Sorun Giderme

### Sorun 1: Blog Yazıları Görünmüyor
**Çözüm:**
1. Cache kontrol: `public/wp-cache/posts.json` var mı?
2. WordPress API çalışıyor mu: `https://dsgservisi.com/wp-json/wp/v2/posts`
3. Vercel logs'da hata var mı?

### Sorun 2: PhoneButton/WhatsAppButton Görünmüyor
**Çözüm:**
1. Console'da hata var mı? (F12)
2. Network tab'da `/_astro/PhoneButton.*.js` yüklendi mi?
3. `astro-island` elementi var mı? (View Source)

### Sorun 3: Animasyonlar Çalışmıyor
**Çözüm:**
1. CSS dosyası yüklendi mi? `/_astro/_slug_.*.css`
2. Console'da CSS hataları var mı?
3. `will-change` CSS property'leri uygulanmış mı?

### Sorun 4: SEO Meta Tag'leri Görünmüyor
**Çözüm:**
1. View Source'da `<title>` ve `<meta>` tag'leri var mı?
2. Build log'da hata var mı?
3. Cache temizle ve yeniden deploy et

### Sorun 5: Lighthouse Skoru Düşük
**Çözüm:**
1. Görseller optimize edilmiş mi? (`npm run img:convert`)
2. JavaScript bundle boyutu büyük mü? (150kb üzeri)
3. Google Analytics yükleniyor mu? (3 saniye sonra olmalı)
4. Unused CSS var mı?

---

## 📊 Beklenen Sonuçlar

### Performance Metrikleri
| Metrik | Önceki | Sonrası | İyileşme |
|--------|--------|---------|----------|
| Lighthouse Mobile | 63 | 75-85 | +12-22 |
| First Contentful Paint | ~2.5s | ~1.2s | 52% daha hızlı |
| Time to Interactive | ~4.5s | ~2.8s | 38% daha hızlı |
| Total Bundle Size | ~160kb | ~165kb | Minimal artış |

### SEO Metrikleri
| Kontrol | Önceki | Sonrası |
|---------|--------|---------|
| Title Tag | ❌ Eksik | ✅ Tüm sayfalarda |
| Meta Description | ❌ Eksik | ✅ Tüm sayfalarda |
| OG Tags | ❌ Eksik | ✅ Tüm sayfalarda |
| Canonical URL | ✅ Var | ✅ Var |
| Sitemap | ✅ Var | ✅ Var |

---

## 🎉 Başarı Kriterleri

Deploy başarılı sayılır eğer:
- [x] Build hatasız tamamlandı
- [ ] Canlı sitede hiçbir sayfa 404 vermiyor
- [ ] Blog yazıları açılıyor
- [ ] SEO meta tag'leri tüm sayfalarda mevcut
- [ ] PhoneButton ve WhatsAppButton çalışıyor
- [ ] Animasyonlar akıcı çalışıyor
- [ ] Lighthouse mobil skoru 75+
- [ ] Console'da kritik hata yok

---

## 📞 Destek

Sorun yaşarsan:
1. Vercel logs kontrol et: https://vercel.com/[username]/dsgservisi/deployments
2. Console log'ları kontrol et (F12)
3. Bu checklist'i tekrar gözden geçir

**Hazırlandı:** 2025-10-17
**Versiyon:** 2.0.0

