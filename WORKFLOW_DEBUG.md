# Workflow Debug - #40 Analizi

## Sorun

Workflow #40 **eski CRON saatlerini** kullanıyor (commit `850abdf`):
- 10:00, 12:00, 13:00, 15:00, 16:00, 17:00, 19:00 TR saati

**Yeni saatler** (commit `9775320`):
- 09:00, 12:50, 15:25 TR saati

## Kontrol Edilmesi Gerekenler

### 1. Workflow Log'ları

GitHub repo → **Actions** → **Scheduled redeploy (Vercel) #40** → **redeploy** job'ına tıkla → **Trigger Vercel Deploy Hook** adımına tıkla

**Kontrol et:**
- `HTTP 200` veya `HTTP 201` → ✅ Hook çalışıyor (ama deploy olmamış, başka sorun var)
- `HTTP 4xx` veya `HTTP 5xx` → ❌ Hook geçersiz veya URL yanlış
- `VERCEL_DEPLOY_HOOK secret not set` → ❌ Secret eksik
- `Failed to trigger` → ❌ Hook çalışmıyor

### 2. Workflow Versiyonu

Workflow #40 **eski versiyonu** kullanıyor (`850abdf`). Yeni versiyon (`9775320`) henüz çalışmamış olabilir.

**Kontrol:**
- Son workflow run'ların hangi commit'i kullandığını kontrol et
- Yeni commit'lerde workflow güncellenmiş mi kontrol et

### 3. Secret Kontrolü

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → `VERCEL_DEPLOY_HOOK`

**Kontrol et:**
- Secret var mı?
- Değeri doğru mu? (`https://api.vercel.com/v1/integrations/deploy/prj_ELtSqVeehAzFAAyX3CvwRFgFVlqb/KBcDAWFyLg`)

## Çözüm

### Adım 1: Workflow Log'larını Kontrol Et

Workflow #40'ın log'larında HTTP response code'unu bul:
- Eğer `HTTP 200` → Hook çalışıyor, başka sorun var
- Eğer `HTTP 4xx/5xx` → Hook geçersiz, secret'ı kontrol et

### Adım 2: Yeni Workflow Versiyonunu Test Et

1. GitHub repo → **Actions** → **Scheduled redeploy (Vercel)**
2. **Run workflow** → **Run workflow** tıkla
3. Bu yeni versiyonu kullanacak (commit `9775320` veya daha yeni)
4. Log'ları kontrol et

### Adım 3: Secret'ı Güncelle (Gerekirse)

Eğer secret yanlışsa:
1. Vercel Dashboard → **Settings** → **Git** → **Deploy Hooks**
2. "Planli Blog Redeploy" hook'unun URL'ini kopyala
3. GitHub → **Settings** → **Secrets** → **Actions** → `VERCEL_DEPLOY_HOOK` → **Update**
4. Yeni URL'i yapıştır

## Not

Workflow #40 **manuel tetiklenmiş** görünüyor (scheduled değil). Bu yüzden eski saatler kullanılmış olabilir. Yeni scheduled workflow'lar yeni saatleri kullanacak.

