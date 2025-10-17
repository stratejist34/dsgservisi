# Google Analytics ve Search Console Kurulum Rehberi

## 🎯 AMAÇ
Web sitesine Google Analytics ve Google Search Console entegrasyonu eklemek.

---

## 1️⃣ GOOGLE ANALYTICS KURULUMU

### A) Google Analytics Hesabı Oluştur

1. **Google Analytics**'e git: https://analytics.google.com
2. **Başlat** butonuna tıkla
3. **Hesap Oluştur** → Hesap adı gir (ör: "DSG Servisi")
4. **İleri**

### B) Özellik Oluştur

1. **Özellik adı:** DSG Servisi Web
2. **Zaman dilimi:** (GMT+03:00) İstanbul
3. **Para birimi:** TRY
4. **İleri**

### C) İşletme Bilgileri

1. Sektör ve işletme boyutu seç
2. **Oluştur** butonuna tıkla
3. Şartları kabul et

### D) Veri Akışı Oluştur

1. **Web** seçeneğini seç
2. **URL:** https://dsgservisi.com
3. **Akış adı:** DSG Servisi Web
4. **Akış oluştur**

### E) Ölçüm Kimliğini Kopyala

**📋 Ölçüm Kimliği (Measurement ID):** `G-XXXXXXXXXX` formatında olacak

Bu kodu Vercel'e ekleyeceğiz!

---

## 2️⃣ GOOGLE SEARCH CONSOLE KURULUMU

### A) Search Console'a Git

**👉 https://search.google.com/search-console**

### B) Özellik Ekle

1. **Özellik ekle** butonuna tıkla
2. **URL öneki** seçeneğini seç
3. **URL:** https://dsgservisi.com
4. **Devam**

### C) Mülkiyeti Doğrula

**HTML etiketi** yöntemini seç:

```html
<meta name="google-site-verification" content="ABC123XYZ..." />
```

**📋 Doğrulama Kodu:** `content=""` içindeki değeri kopyala (ör: `ABC123XYZ...`)

Bu kodu da Vercel'e ekleyeceğiz!

---

## 3️⃣ VERCEL'DE ENVIRONMENT VARIABLES EKLEME

### Adımlar:

1. **Vercel Dashboard**'a git: https://vercel.com/dashboard
2. **dsgservisi** projesine tıkla
3. **Settings** → **Environment Variables**
4. Aşağıdaki değişkenleri ekle:

---

### Eklenecek Environment Variables:

#### 1. WordPress API URL (Zaten var, kontrol et)
```
Name: PUBLIC_WORDPRESS_API_URL
Value: https://api.dsgservisi.com/wp-json/wp/v2
Environment: Production, Preview, Development
```

#### 2. Google Analytics ID (YENİ)
```
Name: PUBLIC_GA_ID
Value: G-XXXXXXXXXX  (Google Analytics'ten aldığın)
Environment: Production
```

#### 3. Google Search Console Verification (YENİ)
```
Name: PUBLIC_GSC_VERIFICATION
Value: ABC123XYZ...  (Search Console'dan aldığın)
Environment: Production
```

#### 4. Site URL (Zaten var, kontrol et)
```
Name: PUBLIC_SITE_URL
Value: https://dsgservisi.com
Environment: Production, Preview, Development
```

---

## 4️⃣ VERCEL'DE REDEPLOY

Environment variables ekledikten sonra:

1. **Deployments** sekmesine git
2. En son deployment'ın sağındaki **⋮** (üç nokta) butonuna tıkla
3. **Redeploy** → **Use existing Build Cache** seçeneğini KALDIR
4. **Redeploy** butonuna tıkla

---

## 5️⃣ DOĞRULAMA

### A) Google Analytics Test

1. **2-3 dakika** bekle (deployment tamamlansın)
2. **Tarayıcıda** https://dsgservisi.com aç
3. **Google Analytics Dashboard**'a git
4. **Raporlar** → **Gerçek zamanlı** → Aktif kullanıcılar **1** görmeli ✅

### B) Google Search Console Test

1. **Search Console**'a geri dön
2. **Doğrula** butonuna tıkla
3. **Mülkiyet doğrulandı** mesajı görmeli ✅

### C) Sayfa Kaynak Kodunu Kontrol

1. https://dsgservisi.com → Sağ tık → **Sayfa Kaynağını Görüntüle**
2. `gtag` veya `googletagmanager` ara → Bulmalısın ✅
3. `google-site-verification` ara → Meta tag bulmalısın ✅

---

## 6️⃣ BLOG YAZILARINI GÖRME SORUNU

### Neden Görünmüyor?

WordPress API URL'si değişti ama Vercel'de **eski build** var!

### Çözüm: Redeploy

Yukarıdaki **Adım 4**'teki gibi redeploy yap. **Build Cache KULLANMA!**

---

## 📊 ENVIRONMENT VARIABLES ÖZET

```env
# Production Ortamı
PUBLIC_WORDPRESS_API_URL=https://api.dsgservisi.com/wp-json/wp/v2
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GSC_VERIFICATION=ABC123XYZ...
PUBLIC_SITE_URL=https://dsgservisi.com
```

---

## 🔍 SORUN GİDERME

### Blog Yazıları Görünmüyor
✅ **Çözüm:** Vercel'de redeploy yap (build cache olmadan)

### Analytics Çalışmıyor
1. Environment variable adı `PUBLIC_GA_ID` olmalı ✅
2. Value `G-` ile başlamalı ✅
3. Production ortamına eklenmiş olmalı ✅
4. Redeploy yapıldı mı? ✅

### Search Console Doğrulamıyor
1. Environment variable adı `PUBLIC_GSC_VERIFICATION` olmalı ✅
2. Sadece kod içerisindeki value olmalı (meta tag değil) ✅
3. Production ortamına eklenmiş olmalı ✅
4. Redeploy yapıldı mı? ✅

---

## ✅ TAMAMLANDI KONTROLÜ

- [ ] Google Analytics hesabı oluşturuldu
- [ ] Ölçüm Kimliği (G-XXXXXXXXXX) alındı
- [ ] Google Search Console hesabı oluşturuldu
- [ ] Doğrulama kodu alındı
- [ ] Vercel'de 4 environment variable eklendi
- [ ] Vercel'de redeploy yapıldı (build cache olmadan)
- [ ] Google Analytics gerçek zamanlı veri gösteriyor
- [ ] Google Search Console mülkiyet doğrulandı
- [ ] Blog yazıları görünüyor

---

## 🚀 SONRAKI ADIMLAR

### Google Analytics
- **Hedefler** tanımla (telefon tıklama, WhatsApp tıklama, form gönderimi)
- **Olaylar** (Events) kurulumu yap
- **Raporları** düzenli kontrol et

### Google Search Console
- **Sitemap gönder:** https://dsgservisi.com/sitemap-index.xml
- **URL İnceleme** ile sayfaları test et
- **Performans** raporunu takip et

### SEO
- **Meta açıklamalar** optimize et
- **Alt text** ekle tüm görsellere
- **İç linkler** ekle
- **Schema markup** kontrol et

---

## 📞 HIZLI YARDIM

**Vercel Dashboard:** https://vercel.com/dashboard  
**Google Analytics:** https://analytics.google.com  
**Google Search Console:** https://search.google.com/search-console  

**Sorun mu var?** Bana söyle, hemen çözelim! 🚀

