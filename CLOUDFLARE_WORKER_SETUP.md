# 🚀 CLOUDFLARE WORKERS PROXY KURULUM REHBERİ

## 🎯 AMAÇ
Hostinger Mod_Security engelini bypass etmek için Cloudflare Workers proxy kullanacağız.

---

## 📋 KURULUM ADIMLARI

### 1️⃣ CLOUDFLARE HESABI OLUŞTUR

1. **Cloudflare'e Git:** https://dash.cloudflare.com/sign-up
2. **Ücretsiz hesap oluştur** (email + şifre)
3. **Email doğrulaması yap**

---

### 2️⃣ WORKERS & PAGES'A GİR

1. **Cloudflare Dashboard** → Sol menüden **Workers & Pages**
2. **"Create application"** butonuna tıkla
3. **"Create Worker"** seçeneğini seç

---

### 3️⃣ WORKER OLUŞTUR

1. **Worker Name:** `wordpress-proxy-dsgservisi`
2. **Subdomain:** `wordpress-proxy.dsgservisi` (otomatik oluşacak)
3. **"Create Worker"** butonuna tıkla

---

### 4️⃣ KODU YAPIŞTIR

**Mevcut kodu sil** ve `cloudflare-worker.js` dosyasındaki kodu yapıştır.

**Worker URL:** `https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev`

---

### 5️⃣ CUSTOM DOMAIN AYARLA (OPSIYONEL)

Daha profesyonel görünüm için:

1. **Workers & Pages** → Worker'ına tıkla
2. **Settings** → **Triggers**
3. **Custom Domains** → **Add Custom Domain**
4. **Domain:** `wordpress-proxy.dsgservisi.com`
5. **DNS'te CNAME kaydı ekle:**
   ```
   Type: CNAME
   Name: wordpress-proxy
   Target: wordpress-proxy-dsgservisi.dsgservisi.workers.dev
   ```

---

### 6️⃣ TEST ET

**Terminal'de test et:**

```bash
# Posts endpoint test
curl https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev/wp-json/wp/v2/posts

# Site info test  
curl https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev/wp-json/
```

**Tarayıcıda test et:**
- https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev/wp-json/wp/v2/posts
- JSON response görmeli ✅

---

### 7️⃣ VERCEL'DE ENV VARIABLE GÜNCELLE

1. **Vercel Dashboard** → https://vercel.com/dashboard
2. **dsgservisi** projesine tıkla
3. **Settings** → **Environment Variables**
4. `PUBLIC_WORDPRESS_API_URL` değerini güncelle:

```
PUBLIC_WORDPRESS_API_URL = https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev/wp-json/wp/v2
```

5. **Save** → **Redeploy** yap

---

## 🔧 ALTERNATİF: WRANGLER CLI

**Terminal'de kurulum:**

```bash
# Wrangler CLI kur
npm install -g wrangler

# Cloudflare'e login ol
wrangler login

# Worker oluştur
wrangler generate wordpress-proxy-dsgservisi

# Kodu yapıştır ve deploy et
wrangler deploy
```

---

## ✅ BAŞARILI OLDUĞUNDA

1. ✅ **Worker URL çalışıyor:** https://wordpress-proxy-dsgservisi.dsgservisi.workers.dev/wp-json/wp/v2/posts
2. ✅ **JSON response alıyorsun**
3. ✅ **Vercel'de redeploy yaptın**
4. ✅ **Blog yazıları görünüyor:** https://dsgservisi.com/blog

---

## 🚨 SORUN GİDERME

### "Worker not found" hatası
→ Worker adını kontrol et, doğru URL kullan

### "CORS error" hatası  
→ Worker kodunda CORS headers kontrol et

### "500 Internal Server Error"
→ Worker logs kontrol et (Cloudflare Dashboard → Workers → Logs)

### "404 Not Found"
→ WordPress URL'ini kontrol et (`https://dsgservisi.com/wp-json/wp/v2`)

---

## 🎯 SONUÇ

Bu çözüm ile:
- ✅ **Mod_Security bypass** edilir
- ✅ **Vercel build** çalışır  
- ✅ **Blog yazıları** görünür
- ✅ **Ücretsiz** (Cloudflare free tier)
- ✅ **Hızlı** (Global CDN)

**HEMEN BAŞLA! →** https://dash.cloudflare.com/sign-up 🚀
