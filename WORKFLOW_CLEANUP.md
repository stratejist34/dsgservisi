# GitHub Actions Workflow Temizliği

## Mevcut Durum

İki farklı workflow var:
1. **Scheduled Blog Build** - 461 workflow run
2. **Scheduled redeploy (Vercel)** - 41 workflow run

Bu karışıklığa neden oluyor.

## Workflow Analizi

### 1. Scheduled Blog Build (`scheduled-build.yml`)
- **Amaç:** Her gün 02:00 UTC (05:00 TR) otomatik deploy
- **Secret:** `VERCEL_DEPLOY_HOOK_URL`
- **Durum:** 461 kez çalışmış (çok aktif)

### 2. Scheduled redeploy (Vercel) (`scheduled-redeploy.yml`)
- **Amaç:** Yeni yayın planına göre günde 3 kez deploy (09:00, 12:50, 15:25 TR)
- **Secret:** `VERCEL_DEPLOY_HOOK`
- **Durum:** 41 kez çalışmış (yeni)

## Sorun

- İki farklı workflow aynı işi yapıyor (Vercel deploy tetikleme)
- Farklı secret'lar kullanıyorlar
- Karışıklık yaratıyor

## Çözüm: Workflow'ları Birleştir

### Seçenek 1: Tek Workflow Kullan (Önerilen)

**Scheduled redeploy (Vercel)** workflow'unu kullan, **Scheduled Blog Build**'i kaldır.

**Neden:**
- Yeni yayın planına göre ayarlanmış
- Daha spesifik saatler (09:00, 12:50, 15:25)
- Daha az çalışıyor (gereksiz deploy yok)

### Seçenek 2: İki Workflow'u Birleştir

Her iki workflow'u tek bir workflow'da birleştir.

## Adım Adım Temizlik

### Adım 1: Yeni Deploy Hook URL'ini GitHub Secret'a Ekle

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. `VERCEL_DEPLOY_HOOK` secret'ını bul (veya oluştur)
3. **Update** (veya **New repository secret**) tıkla
4. **Name:** `VERCEL_DEPLOY_HOOK`
5. **Secret:** `https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/FgTkove0ZF`
6. **Add secret** (veya **Update secret**) tıkla

### Adım 2: Eski Workflow'u Kaldır (Önerilen)

**Scheduled Blog Build** workflow'unu kaldır:

1. `.github/workflows/scheduled-build.yml` dosyasını sil
2. Commit ve push yap:
   ```bash
   git rm .github/workflows/scheduled-build.yml
   git commit -m "chore: Eski scheduled-build.yml workflow'unu kaldır"
   git push
   ```

### Adım 3: scheduled-redeploy.yml'i Güncelle (Opsiyonel)

Eğer her gün sabah 05:00'te de deploy istiyorsanız, `scheduled-redeploy.yml`'e ekle:

```yaml
on:
  schedule:
    # Her gün 05:00 TR -> 02:00 UTC (eski scheduled-build.yml'den)
    - cron: '0 2 * * *'
    # Yeni yayın planı: 09:00, 12:50, 15:25 (TR saati)
    - cron: '0 6 * * *'   # 09:00 TR
    - cron: '50 9 * * *'  # 12:50 TR
    - cron: '25 12 * * *' # 15:25 TR
```

### Adım 4: Test Et

1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Workflow'un çalışıp çalışmadığını kontrol et
4. Vercel Dashboard → **Deployments** → Yeni deploy'un göründüğünü kontrol et

## Önerilen Yapı

### Tek Workflow: `scheduled-redeploy.yml`

```yaml
name: Scheduled redeploy (Vercel)

on:
  schedule:
    # Yeni yayın planı: 09:00, 12:50, 15:25 (TR saati)
    - cron: '0 6 * * *'   # 09:00 TR -> 06:00 UTC
    - cron: '50 9 * * *'  # 12:50 TR -> 09:50 UTC
    - cron: '25 12 * * *' # 15:25 TR -> 12:25 UTC
  workflow_dispatch: {}

jobs:
  redeploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        env:
          HOOK: ${{ secrets.VERCEL_DEPLOY_HOOK }}
        run: |
          if [ -z "$HOOK" ]; then
            echo "VERCEL_DEPLOY_HOOK secret not set" >&2
            exit 1
          fi
          code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$HOOK")
          echo "HTTP $code"
          if [ "$code" -ge 200 ] && [ "$code" -lt 300 ]; then
            echo "Triggered successfully"
          else
            echo "Failed to trigger" >&2
            exit 1
          fi
```

## Not

- **Scheduled Blog Build** workflow'u kaldırılırsa, sadece yeni yayın planı saatlerinde deploy olacak
- Eğer her gün sabah 05:00'te de deploy istiyorsanız, `scheduled-redeploy.yml`'e ekleyin
- Tek workflow kullanmak daha temiz ve yönetilebilir

