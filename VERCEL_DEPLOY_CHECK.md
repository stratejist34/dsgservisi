# Vercel Deploy Kontrol Listesi

## Sorun
Commit'ler GitHub'a push edildi ama Vercel'de deploy olmadı.

## Hızlı Kontrol

### 1. Vercel Dashboard Kontrolü
1. Vercel Dashboard → Proje → **Deployments** sekmesine git
2. Son deploy'ları kontrol et:
   - Son commit'ler deploy edilmiş mi?
   - Hangi commit'ler deploy edilmiş?
   - Deploy durumu nedir? (Ready, Building, Error)

### 2. Vercel Git Entegrasyonu
1. Vercel Dashboard → Proje → **Settings** → **Git**
2. GitHub repository bağlı mı kontrol et
3. **Disconnect** görünüyorsa → Bağlı demektir
4. **Connect Git Repository** görünüyorsa → Bağlantı kopmuş, yeniden bağla

### 3. Manuel Deploy
1. Vercel Dashboard → Proje → **Deployments**
2. Son commit'i bul
3. **Redeploy** butonuna tıkla
4. Veya **Deploy** → **Deploy Git Commit** → Son commit'i seç

## GitHub Actions Kontrolü

### 1. Actions Sekmesi
1. GitHub repo → **Actions** sekmesine git
2. Sol menüden workflow'ları kontrol et:
   - "Scheduled redeploy (Vercel)"
   - "Scheduled Blog Build"
3. Son çalışma zamanlarını kontrol et

### 2. Secrets Kontrolü
1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Şu secret'lar var mı kontrol et:
   - ✅ `VERCEL_DEPLOY_HOOK` (scheduled-redeploy.yml için)
   - ✅ `VERCEL_DEPLOY_HOOK_URL` (scheduled-build.yml için)

### 3. Manuel Test
1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Workflow'un çalışıp çalışmadığını kontrol et

## Olası Sorunlar ve Çözümler

### Sorun 1: Vercel Otomatik Deploy Çalışmıyor
**Neden:**
- Git entegrasyonu kopmuş
- Vercel'de deploy limiti dolmuş
- Vercel hizmetinde sorun var

**Çözüm:**
1. Vercel Dashboard → Settings → Git → Repository'yi kontrol et
2. Gerekirse yeniden bağla
3. Manuel deploy yap

### Sorun 2: GitHub Actions Çalışmıyor
**Neden:**
- Secrets eksik
- Workflow'lar disabled
- GitHub Actions limiti dolmuş

**Çözüm:**
1. Secrets'ları kontrol et ve ekle
2. Workflow'ları enable et
3. Manuel olarak workflow'u tetikle

### Sorun 3: Deploy Başarısız Oluyor
**Neden:**
- Build hatası
- Environment variables eksik
- Node.js versiyonu uyumsuz

**Çözüm:**
1. Vercel Dashboard → Deployments → Son deploy → Logs'u kontrol et
2. Hata mesajını oku
3. Gerekli düzeltmeleri yap

## Hızlı Çözüm (Şimdi)

### Adım 1: Vercel'de Manuel Deploy
1. Vercel Dashboard → Proje → **Deployments**
2. **Deploy** → **Deploy Git Commit**
3. Son commit'i seç (5d5ce19)
4. **Deploy** tıkla

### Adım 2: GitHub Actions'ı Test Et
1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Çalışıp çalışmadığını kontrol et

### Adım 3: Secrets Kontrolü
1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. `VERCEL_DEPLOY_HOOK` var mı kontrol et
3. Yoksa Vercel'den Deploy Hook URL'i al ve ekle

## Vercel Deploy Hook URL'i Nasıl Alınır?

1. Vercel Dashboard → Proje → **Settings** → **Git** → **Deploy Hooks**
2. **Create Hook** tıkla
3. İsim ver: "GitHub Actions Deploy"
4. Oluşan URL'yi kopyala
5. GitHub → **Settings** → **Secrets** → **Actions** → **New repository secret**
   - Name: `VERCEL_DEPLOY_HOOK`
   - Value: Vercel'den aldığın URL
   - **Add secret** tıkla

## Sonraki Adımlar

1. ✅ Vercel'de manuel deploy yap (hemen)
2. ✅ GitHub Actions'ı test et
3. ✅ Secrets'ları kontrol et ve ekle
4. ✅ Otomatik deploy'u test et (yeni bir commit push et)

