# Deploy Hook Yeniden Oluşturma

## Sorun

- ✅ Deploy hook HTTP 201 döndürüyor (başarılı)
- ❌ Ama Vercel'de deploy görünmüyor
- ❌ Son deploy'lar yok

## Çözüm: Deploy Hook'u Yeniden Oluştur

### Adım 1: Eski Deploy Hook'u Sil

1. Vercel Dashboard → Proje → **Settings** → **Git** → **Deploy Hooks**
2. "Planli Blog Redeploy" hook'unu bul
3. **Delete** tıkla (veya **Edit** → **Delete**)

### Adım 2: Yeni Deploy Hook Oluştur

1. Vercel Dashboard → Proje → **Settings** → **Git** → **Deploy Hooks**
2. **Create Hook** tıkla
3. **Name:** "Planli Blog Redeploy" (veya istediğiniz isim)
4. **Branch:** `main` (önemli!)
5. **Create Hook** tıkla
6. Oluşan yeni URL'i kopyala (örnek: `https://api.vercel.com/v1/integrations/deploy/prj_XXX/YYY`)

### Adım 3: GitHub Secret'ı Güncelle

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. `VERCEL_DEPLOY_HOOK` secret'ını bul
3. **Update** tıkla
4. Yeni deploy hook URL'ini yapıştır
5. **Update secret** tıkla

### Adım 4: Test Et

1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Workflow'un çalışıp çalışmadığını kontrol et
4. Vercel Dashboard → **Deployments** → Yeni deploy'un göründüğünü kontrol et

### Adım 5: Manuel Test (Opsiyonel)

Terminal'de test et:
```bash
curl -X POST "YENİ_DEPLOY_HOOK_URL_BURAYA"
```

Response:
- `{"job":{"id":"...","state":"PENDING",...}}` → ✅ Çalışıyor
- Vercel Dashboard'da yeni deploy görünmeli

## Not

Eski deploy hook muhtemelen:
- Geçersiz hale gelmiş
- Yanlış projeye bağlı
- Branch ayarı yanlış
- Veya Vercel tarafında bir sorun var

Yeni deploy hook oluşturup test edin. Bu genellikle sorunu çözer.

