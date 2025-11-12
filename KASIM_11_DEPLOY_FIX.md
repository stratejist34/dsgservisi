# 11 Kasım Blog Yazıları Deployment Sorunu

**Tarih:** 12 Kasım 2025, 08:18 TR  
**Sorun:** 11 Kasım tarihli 9 adet blog yazısı lokalde görünüyor ama canlıda yok

## 🔍 Tespit

11 Kasım tarihli yazılar:
- `buyukcekmece-audi-servis.md` - 09:00 TR
- `buyukcekmece-bmw-servis.md` - 10:00 TR
- `buyukcekmece-land-rover-servis.md` - 11:00 TR
- `buyukcekmece-mercedes-servis.md` - 12:00 TR
- `buyukcekmece-porsche-servis.md` - 13:00 TR
- `buyukcekmece-seat-servis.md` - 14:00 TR
- `buyukcekmece-skoda-servis.md` - 15:00 TR
- `buyukcekmece-volkswagen-servis.md` - 16:00 TR
- `dsg-mekatronik-arizasi-belirtileri.md` - 09:00 TR

## ⚠️ Neden Görünmüyor?

**Timezone Sorunu:**
- Vercel build zamanı: UTC (Coordinated Universal Time)
- Türkiye saati: UTC+3
- 11 Kasım 16:00 TR = 11 Kasım 13:00 UTC

**Son build zamanı** 11 Kasım 13:00 UTC'den önce yapıldıysa, bu yazılar build'e dahil olmamış.

## ✅ Çözüm

### Yöntem 1: Manuel Redeploy (Hızlı)
1. GitHub'a git: https://github.com/stratejist34/dsgservisi/actions
2. "Scheduled redeploy (Vercel)" workflow'unu seç
3. "Run workflow" butonuna tıkla
4. "Run workflow" onayla
5. 2-3 dakika bekle

### Yöntem 2: Vercel Dashboard (Alternatif)
1. Vercel Dashboard'a git: https://vercel.com/dashboard
2. dsgservisi projesini seç
3. Deployments sekmesine git
4. En son deployment'ın yanındaki "..." menüsüne tıkla
5. "Redeploy" seç
6. "Redeploy" onayla

### Yöntem 3: Otomatik (Bekle)
GitHub Actions scheduled workflow otomatik çalışacak:
- **Bir sonraki çalışma:** 12:50 TR (09:50 UTC)
- O zaman tüm 11 Kasım yazıları yayınlanacak

## 🔄 Scheduled Deploy Saatleri

GitHub Actions günde 3 kez otomatik deploy tetikliyor:
- **09:00 TR** (06:00 UTC)
- **12:50 TR** (09:50 UTC) ← Bir sonraki
- **15:25 TR** (12:25 UTC)

## 📊 Kontrol

Deploy tamamlandıktan sonra:
1. https://dsgservisi.com/blog sayfasını aç
2. 11 Kasım tarihli 9 yazıyı ara
3. Kategorilere göre filtrele:
   - Audi, BMW, Land Rover, Mercedes, Porsche, Seat, Skoda, Volkswagen
   - DSG kategorisi

## 🎯 Gelecekte Önlemek İçin

**Öneri:** Blog yazılarını sabah erken saatlere (örn: 00:00 veya 06:00 TR) ayarlayın, böylece gün içinde kesinlikle yayınlanır.

Veya tüm yazıları aynı güne farklı saatler yerine **farklı günlere** yayın:
- 11 Kasım: 3 yazı (sabah)
- 12 Kasım: 3 yazı (sabah)
- 13 Kasım: 3 yazı (sabah)

Bu şekilde scheduled deploy sistemi daha güvenilir çalışır.
