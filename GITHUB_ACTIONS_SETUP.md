# GitHub Actions Setup - Scheduled Deploy

## Sorun
GitHub Actions scheduled workflow'ları çalışmıyor, bu yüzden planlanan blog yazıları otomatik yayınlanmıyor.

## Kontrol Listesi

### 1. GitHub Actions Workflow'larını Kontrol Et
1. GitHub repo'ya git: https://github.com/stratejist34/dsgservisi
2. **Actions** sekmesine tıkla
3. Sol menüden workflow'ları kontrol et:
   - "Scheduled redeploy (Vercel)"
   - "Scheduled Blog Build"
4. Son çalışma zamanlarını kontrol et

### 2. Secrets Kontrolü
1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Şu secret'ların olup olmadığını kontrol et:
   - ✅ `VERCEL_DEPLOY_HOOK` (scheduled-redeploy.yml için)
   - ✅ `VERCEL_DEPLOY_HOOK_URL` (scheduled-build.yml için)

### 3. Vercel Deploy Hook URL'ini Al
1. Vercel Dashboard → Proje → **Settings** → **Git** → **Deploy Hooks**
2. **Create Hook** tıkla
3. İsim ver: "GitHub Actions Deploy"
4. Oluşan URL'yi kopyala
5. GitHub → **Settings** → **Secrets** → **Actions** → **New repository secret**
   - Name: `VERCEL_DEPLOY_HOOK`
   - Value: Vercel'den aldığın URL
   - **Add secret** tıkla

### 4. Manuel Test
1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Workflow'un çalışıp çalışmadığını kontrol et
4. Vercel'de yeni deploy'un tetiklendiğini kontrol et

## GitHub Actions Limitleri

### Ücretsiz Plan
- **Public repo:** Sınırsız scheduled workflow
- **Private repo:** Aylık 2000 dakika (scheduled workflow'lar dahil)

### Pro Plan
- **Private repo:** Aylık 3000 dakika

## Workflow Saatleri

### scheduled-redeploy.yml
- 09:00 TR → 06:00 UTC
- 12:50 TR → 09:50 UTC
- 15:25 TR → 12:25 UTC

### scheduled-build.yml
- 05:00 TR → 02:00 UTC (her gün)

## Sorun Giderme

### Workflow çalışmıyor
1. Actions sekmesinde hata var mı kontrol et
2. Secrets doğru mu kontrol et
3. Workflow'lar enable mi kontrol et (Settings → Actions → General)

### Deploy tetiklenmiyor
1. Vercel Deploy Hook URL'i doğru mu kontrol et
2. Vercel Dashboard'da deploy hook aktif mi kontrol et
3. Vercel'de deploy limiti var mı kontrol et

### Scheduled workflow çalışmıyor
1. GitHub repo public mi? (Private repo'larda limit var)
2. GitHub Actions enabled mi? (Settings → Actions → General)
3. Workflow dosyaları doğru mu? (.github/workflows/*.yml)

## Alternatif Çözüm

Eğer GitHub Actions çalışmıyorsa:
1. Vercel'in otomatik deploy'ını kullan (GitHub push'ları otomatik deploy eder)
2. Manuel deploy yap (Vercel Dashboard → Deployments → Redeploy)
3. Vercel Cron Jobs kullan (Vercel Pro gerekir)

