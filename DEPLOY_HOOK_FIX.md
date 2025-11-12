# Deploy Hook Sorunu Çözümü

## Sorun
- ✅ Workflow çalışıyor (GitHub Actions'da görünüyor)
- ❌ Vercel'de deploy olmuyor
- ✅ Deploy hook var

## Olası Nedenler

### 1. Secret'taki URL Yanlış
GitHub Actions secret'ındaki URL, Vercel'deki deploy hook URL'i ile eşleşmiyor olabilir.

### 2. Deploy Hook Geçersiz
Vercel'deki deploy hook silinmiş veya değiştirilmiş olabilir.

### 3. HTTP Response Code
Workflow log'larında HTTP response code kontrol edilmeli.

## Çözüm Adımları

### Adım 1: Workflow Log'larını Kontrol Et

1. GitHub repo → **Actions** → Son workflow run (#40)
2. **Jobs** → **redeploy** → **Trigger Vercel Deploy Hook** adımına tıkla
3. Log'larda şunları kontrol et:
   - `HTTP 200` veya `HTTP 201` → ✅ Başarılı (ama deploy olmamış, başka sorun var)
   - `HTTP 4xx` veya `HTTP 5xx` → ❌ Hata (URL yanlış veya hook geçersiz)
   - `VERCEL_DEPLOY_HOOK secret not set` → ❌ Secret eksik

### Adım 2: Vercel Deploy Hook URL'ini Kontrol Et

1. Vercel Dashboard → Proje → **Settings** → **Git** → **Deploy Hooks**
2. "Planli Blog Redeploy" hook'unun URL'ini kopyala:
   - `https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/KBcDAWFyLg`
3. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
4. `VERCEL_DEPLOY_HOOK` secret'ını kontrol et:
   - Değer aynı mı?
   - Eğer farklıysa → **Update** tıkla ve doğru URL'i yapıştır

### Adım 3: Deploy Hook'u Test Et

Terminal'de test et:
```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/KBcDAWFyLg"
```

Response:
- `{"job":{"id":"...","state":"PENDING",...}}` → ✅ Çalışıyor
- `{"error":...}` → ❌ Hata (hook geçersiz veya silinmiş)

### Adım 4: Yeni Deploy Hook Oluştur (Gerekirse)

Eğer mevcut hook çalışmıyorsa:

1. Vercel Dashboard → Proje → **Settings** → **Git** → **Deploy Hooks**
2. "Planli Blog Redeploy" hook'unu **Delete** et
3. **Create Hook** tıkla
4. İsim: "Planli Blog Redeploy"
5. Branch: `main`
6. Oluşan yeni URL'i kopyala
7. GitHub → **Settings** → **Secrets** → **Actions** → `VERCEL_DEPLOY_HOOK` → **Update**
8. Yeni URL'i yapıştır

### Adım 5: Workflow'u Tekrar Test Et

1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Workflow'un çalışıp çalışmadığını kontrol et
4. Vercel Dashboard'da yeni deploy'un tetiklendiğini kontrol et

## Not

Deploy hook çalışıyorsa (HTTP 200), ama Vercel'de deploy olmuyorsa:
- Vercel'de build hatası olabilir
- Vercel'de deploy limiti dolmuş olabilir
- Vercel hizmetinde sorun olabilir

Bu durumda Vercel Dashboard → Deployments → Logs'u kontrol et.

