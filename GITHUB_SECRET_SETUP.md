# GitHub Secret Kurulumu

## Yeni Deploy Hook URL'i

Vercel'den aldığınız yeni deploy hook URL'i:
```
https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/FgTkove0ZF
```

## GitHub Secret'a Ekleme

### Adım 1: GitHub Secret'ı Oluştur/Güncelle

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. `VERCEL_DEPLOY_HOOK` secret'ını bul:
   - **Varsa:** **Update** tıkla
   - **Yoksa:** **New repository secret** tıkla
3. **Name:** `VERCEL_DEPLOY_HOOK`
4. **Secret:** `https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/FgTkove0ZF`
5. **Add secret** (veya **Update secret**) tıkla

### Adım 2: Eski Secret'ları Temizle (Opsiyonel)

Artık kullanılmayan secret'ları silebilirsiniz:
- `VERCEL_DEPLOY_HOOK_URL` (eski scheduled-build.yml için kullanılıyordu)

**Not:** Eğer başka workflow'larda kullanılıyorsa silmeyin.

### Adım 3: Test Et

1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Workflow'un çalışıp çalışmadığını kontrol et
4. Vercel Dashboard → **Deployments** → Yeni deploy'un göründüğünü kontrol et

## Workflow Temizliği

✅ **Scheduled Blog Build** workflow'u kaldırıldı
✅ **Scheduled redeploy (Vercel)** workflow'u kullanılacak

Artık sadece tek bir workflow var ve karışıklık yok.

## Sonuç

- ✅ Tek workflow: `scheduled-redeploy.yml`
- ✅ Tek secret: `VERCEL_DEPLOY_HOOK`
- ✅ Yeni yayın planı saatleri: 09:00, 12:50, 15:25 TR saati
- ✅ Karışıklık yok

