# Git Güvenlik Sorunu

## Durum

Vercel log'larında `/.git/config` için 404 hatası görünüyor:
```
GET /.git/config 404
```

Bu, birisi sitenin `.git/config` dosyasına erişmeye çalışmış demek.

## Güvenlik Kontrolü

### 1. .git Klasörü Production'da Olmamalı

`.git` klasörü production build'inde olmamalı. Vercel zaten `.git` klasörünü build'e dahil etmez, ama kontrol edelim.

**Kontrol:**
1. `dist` klasöründe `.git` var mı?
2. `public` klasöründe `.git` var mı?
3. Vercel build log'larında `.git` dosyaları build ediliyor mu?

### 2. .gitignore Kontrolü

`.gitignore` dosyasında `.git` zaten ignore edilmiş olmalı.

**Kontrol:**
- `.gitignore` dosyasında `.git/` var mı?

### 3. Vercel Build Ayarları

Vercel otomatik olarak `.git` klasörünü build'e dahil etmez, ama kontrol edelim.

**Kontrol:**
1. Vercel Dashboard → Proje → **Settings** → **Build & Development Settings**
2. **Build Command** kontrol et
3. **Output Directory** kontrol et

## Çözüm

### Adım 1: .gitignore Kontrolü

`.gitignore` dosyasında `.git/` olduğundan emin ol:
```
.git/
```

### Adım 2: Build Test

Local'de build yap ve kontrol et:
```bash
npm run build
ls -la dist/ | grep .git
```

Eğer `.git` görünüyorsa → Sorun var ❌
Eğer `.git` görünmüyorsa → Normal ✅

### Adım 3: Vercel Build Log Kontrolü

1. Vercel Dashboard → Proje → **Deployments**
2. Son deploy'a tıkla
3. **Build Logs** sekmesine git
4. `.git` dosyaları build ediliyor mu kontrol et

### Adım 4: Güvenlik Headers (Opsiyonel)

Eğer endişeleniyorsanız, `vercel.json`'a güvenlik header'ları ekleyebilirsiniz (zaten var).

## Not

**404 hatası normal:**
- `.git/config` dosyası production'da yok
- Birisi erişmeye çalışmış ama 404 aldı
- Bu güvenlik açığı değil, normal davranış ✅

**Asıl sorun:**
- Vercel'de otomatik deploy çalışmıyor
- Git entegrasyonunu kontrol etmemiz gerekiyor

## Sonraki Adımlar

1. ✅ `.gitignore` kontrolü yap
2. ✅ Local build test yap (`.git` var mı?)
3. ✅ Vercel build log kontrolü yap
4. ✅ Git entegrasyonunu kontrol et (asıl sorun)

