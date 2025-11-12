# Vercel Manuel Deploy Sorunu

## Sorun

❌ **Vercel'de manuel deploy'lar görünmüyor**
- Manuel deploy yapılıyor ama Vercel Dashboard'da görünmüyor
- Deploy hook çalışıyor (HTTP 201) ama deploy görünmüyor

## Olası Nedenler

### 1. Git Entegrasyonu Kopmuş

Vercel'deki Git entegrasyonu kopmuş olabilir.

**Kontrol:**
1. Vercel Dashboard → Proje → **Settings** → **Git**
2. **Connected Git Repository** bölümünü kontrol et:
   - Repository görünüyor mu? (`stratejist34/dsgservisi`)
   - "Disconnect" görünüyorsa → Bağlı demektir ✅
   - "Connect Git Repository" görünüyorsa → Bağlantı kopmuş ❌

**Çözüm:**
- Eğer "Connect Git Repository" görünüyorsa:
  1. **Connect Git Repository** tıkla
  2. GitHub hesabını seç
  3. `dsgservisi` repository'sini seç
  4. **Connect** tıkla

### 2. Deploy'lar Başka Bir Projeye Gidiyor

Deploy hook veya Git entegrasyonu yanlış projeye bağlı olabilir.

**Kontrol:**
1. Vercel Dashboard → Tüm projeleri kontrol et
2. Her projede **Deployments** sekmesine git
3. Son deploy'ları kontrol et
4. Manuel deploy'lar başka bir projede mi?

### 3. Vercel Hesabı/Proje Ayarları

Vercel hesabında veya proje ayarlarında sorun olabilir.

**Kontrol:**
1. Vercel Dashboard → Proje → **Settings** → **General**
2. **Project Name** doğru mu?
3. **Framework Preset** doğru mu? (Astro)
4. **Build Command** doğru mu? (`npm run build`)
5. **Output Directory** doğru mu? (`dist`)

### 4. Vercel Deploy Limitleri

Vercel'de deploy limiti dolmuş olabilir (ücretsiz planda günlük limit var).

**Kontrol:**
1. Vercel Dashboard → **Settings** → **Billing**
2. Deploy limitlerini kontrol et
3. Limit dolmuş mu?

## Çözüm Adımları

### Adım 1: Vercel Dashboard'da Projeyi Kontrol Et

1. Vercel Dashboard → Proje → **Deployments**
2. Son deploy'ları kontrol et:
   - Hiç deploy var mı?
   - En son deploy ne zaman?
   - Deploy durumu nedir? (Ready, Building, Error, Canceled)

### Adım 2: Git Entegrasyonunu Kontrol Et

1. Vercel Dashboard → Proje → **Settings** → **Git**
2. **Connected Git Repository** bölümünü kontrol et:
   - Repository: `stratejist34/dsgservisi` görünüyor mu?
   - "Disconnect" görünüyorsa → Bağlı ✅
   - "Connect Git Repository" görünüyorsa → Bağlantı kopmuş ❌

### Adım 3: Manuel Deploy Yap (Test)

1. Vercel Dashboard → Proje → **Deployments**
2. **Deploy** → **Deploy Git Commit** tıkla
3. Son commit'i seç: `75904c7` (veya daha yeni)
4. **Deploy** tıkla
5. Deploy'un başladığını ve göründüğünü kontrol et

### Adım 4: Deploy Hook'u Test Et

1. Terminal'de test et:
   ```bash
   curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/FgTkove0ZF"
   ```
2. Response: `{"job":{"id":"...","state":"PENDING",...}}` → ✅ Çalışıyor
3. Vercel Dashboard → **Deployments** → Yeni deploy görünmeli

### Adım 5: Vercel Log'larını Kontrol Et

1. Vercel Dashboard → Proje → **Deployments**
2. Son deploy'a tıkla (varsa)
3. **Build Logs** sekmesine git
4. Hata var mı kontrol et

## Sorun Giderme

### Deploy'lar Hiç Görünmüyorsa

1. **Vercel hesabını kontrol et:**
   - Doğru hesapta mısın?
   - Proje doğru hesaba bağlı mı?

2. **Proje ayarlarını kontrol et:**
   - Vercel Dashboard → Proje → **Settings** → **General**
   - Tüm ayarlar doğru mu?

3. **Git entegrasyonunu yeniden bağla:**
   - Vercel Dashboard → Proje → **Settings** → **Git**
   - **Disconnect** tıkla (varsa)
   - **Connect Git Repository** tıkla
   - Repository'yi yeniden bağla

### Deploy Başlatılıyor Ama Görünmüyorsa

1. **Build cache'i temizle:**
   - Vercel Dashboard → Proje → **Deployments**
   - **Deploy** → **Deploy Git Commit**
   - **Use existing Build Cache** seçeneğini KALDIR
   - **Deploy** tıkla

2. **Vercel'de build hatası var mı kontrol et:**
   - Vercel Dashboard → Proje → **Deployments**
   - Son deploy'a tıkla
   - **Build Logs** sekmesine git
   - Hata var mı?

## Not

Eğer hiçbir deploy görünmüyorsa, Vercel'de proje ayarlarında veya Git entegrasyonunda ciddi bir sorun var demektir. Vercel Dashboard'da ne görüyorsunuz? Deployments sekmesinde hiçbir şey yok mu?

