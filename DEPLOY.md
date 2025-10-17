# DSG Servisi - Deployment Talimatları

## 1. GitHub'a Yükleme

### GitHub Repository Oluşturma:
1. https://github.com/new adresine gidin
2. Repository adı: `dsgservisi` (veya istediğiniz bir isim)
3. Private veya Public seçin
4. **"Initialize with README" seçmeyin** (zaten dosyalarımız var)
5. "Create repository" tıklayın

### Repository'yi Bağlama ve Push:
```bash
# GitHub'dan aldığınız URL'i kullanın (örnek):
git remote add origin https://github.com/KULLANICI_ADINIZ/dsgservisi.git
git branch -M main
git push -u origin main
```

## 2. Vercel'e Deploy Etme

### Vercel Hesabı ve Proje Kurulumu:
1. https://vercel.com/signup adresine gidin
2. GitHub ile giriş yapın
3. "New Project" tıklayın
4. GitHub repository'nizi seçin (`dsgservisi`)
5. Import yapın

### Vercel Ayarları:
**Framework Preset:** Astro
**Build Command:** `npm run build`
**Output Directory:** `dist`

### Environment Variables (Çevre Değişkenleri):
Vercel dashboard'da şunları ekleyin:
```
PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
PUBLIC_INSTAGRAM_TOKEN=your_instagram_token (opsiyonel)
```

### Deploy Butonu:
1. Tüm ayarlar tamamsa "Deploy" tıklayın
2. Build tamamlanınca siteniz yayında olacak!
3. Otomatik domain: `your-project.vercel.app`

## 3. Özel Domain Bağlama (Opsiyonel)

### Vercel'de Domain Ayarları:
1. Vercel Dashboard > Settings > Domains
2. "Add Domain" tıklayın
3. Domain adınızı girin: `dsgservisi.com`
4. Vercel size DNS kayıtlarını verecek

### Domain Sağlayıcınızda:
Vercel'in verdiği DNS kayıtlarını ekleyin:
```
Type: A Record
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 4. Sonraki Güncellemeler

Artık sadece şunları yapmanız yeterli:
```bash
git add .
git commit -m "Güncelleme mesajı"
git push
```

Vercel otomatik olarak yeni versiyonu deploy edecek! 🚀

## 5. Hızlı Kontrol Listesi

- [x] Git repository oluşturuldu
- [x] İlk commit yapıldı
- [ ] GitHub repository oluşturuldu
- [ ] GitHub'a push yapıldı
- [ ] Vercel hesabı oluşturuldu
- [ ] Vercel'e import edildi
- [ ] Environment variables eklendi
- [ ] İlk deploy tamamlandı
- [ ] Site çalışıyor mu test edildi

## 6. WordPress Bağlantısı

Blog sayfası çalışması için WordPress sitenizin REST API'si aktif olmalı:
- WordPress Admin > Settings > Permalinks > "Post name" seçili olmalı
- `https://your-wordpress-site.com/wp-json/wp/v2/posts` test edin
- CORS hatası alırsanız WordPress'e CORS plugin ekleyin

## Destek

Sorun olursa:
1. Vercel Dashboard > Logs bölümünden hataları kontrol edin
2. Build log'larını inceleyin
3. Environment variables'ın doğru olduğundan emin olun

Başarılar! 🎉

