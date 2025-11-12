# Environment Variables Temizliği

## WordPress Environment Variables

### Durum
✅ **WordPress API artık kullanılmıyor** - Astro Content Collections kullanılıyor
✅ **Kodda WordPress API referansı yok** - Sadece `astro.config.mjs`'de tanımlı ama kullanılmıyor

### Silebileceğiniz Environment Variables

Vercel Dashboard → Proje → **Settings** → **Environment Variables**'dan şunları silebilirsiniz:

1. **`PUBLIC_WORDPRESS_API_URL`** ✅ Güvenle silinebilir
   - Eski WordPress API entegrasyonu için kullanılıyordu
   - Artık Astro Content Collections kullanılıyor
   - Kodda hiçbir yerde kullanılmıyor

2. **`PUBLIC_WORDPRESS_PROXY_URL`** ✅ Güvenle silinebilir (varsa)
   - Cloudflare Worker proxy için kullanılıyordu
   - Artık gerekli değil

### Korumalı Environment Variables

**SİLMEYİN:**
- `PUBLIC_SITE_URL` - Site URL'i için kullanılıyor
- `PUBLIC_GA_ID` - Google Analytics için (varsa)
- `PUBLIC_GSC_VERIFICATION` - Google Search Console için (varsa)
- Diğer `PUBLIC_*` değişkenleri (site konfigürasyonu için)

### Temizlik Adımları

1. Vercel Dashboard → Proje → **Settings** → **Environment Variables**
2. `PUBLIC_WORDPRESS_API_URL` bulun
3. **Delete** tıklayın
4. `PUBLIC_WORDPRESS_PROXY_URL` varsa onu da silin
5. **Save** tıklayın
6. **Redeploy** yapın (opsiyonel, ama önerilir)

### Not

`astro.config.mjs`'de hala tanımlı:
```javascript
env: {
  PUBLIC_WORDPRESS_API_URL: process.env.PUBLIC_WORDPRESS_API_URL || 'https://api.dsgservisi.com/wp-json/wp/v2'
}
```

Bu tanım zararsız (fallback değer var), ama isterseniz kaldırabilirsiniz. Kodda kullanılmadığı için hiçbir etkisi olmaz.

## Deploy Hook Sorunu

### Sorun
- ✅ Workflow çalışıyor
- ❌ Vercel'de deploy olmuyor
- ✅ Deploy hook var

### Çözüm

1. **Workflow log'larını kontrol et:**
   - GitHub repo → **Actions** → Son workflow run
   - **Trigger Vercel Deploy Hook** adımına tıkla
   - HTTP response code'u kontrol et:
     - `HTTP 200` → ✅ Hook çalışıyor (başka sorun var)
     - `HTTP 4xx/5xx` → ❌ Hook geçersiz veya URL yanlış

2. **Secret'ı kontrol et:**
   - GitHub repo → **Settings** → **Secrets** → **Actions**
   - `VERCEL_DEPLOY_HOOK` secret'ının değeri:
     - `https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/KBcDAWFyLg`
   - Vercel'deki deploy hook URL'i ile eşleşiyor mu kontrol et

3. **Deploy hook'u test et:**
   ```bash
   curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/KBcDAWFyLg"
   ```
   - Response: `{"job":{"id":"...","state":"PENDING",...}}` → ✅ Çalışıyor
   - Response: `{"error":...}` → ❌ Hook geçersiz

4. **Yeni deploy hook oluştur (gerekirse):**
   - Vercel Dashboard → **Settings** → **Git** → **Deploy Hooks**
   - Eski hook'u sil, yeni oluştur
   - GitHub secret'ını güncelle

