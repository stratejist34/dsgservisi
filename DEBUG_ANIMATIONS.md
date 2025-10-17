# 🔍 Animasyon Debug Rehberi

## Dev Server Çalışıyor
**URL:** http://localhost:4324/

## ✅ Kontrol Edilecekler

### 1. Tarayıcı Console (F12)
1. **Chrome/Edge'i aç**
2. **F12** bas (DevTools)
3. **Console** tab'ına git
4. **Kırmızı hatalar** var mı bak

**Yaygın Hatalar:**
```
❌ Failed to load module
❌ CSS import error
❌ Unexpected token
❌ Cannot find module
```

### 2. Network Tab
1. **F12** → **Network** tab
2. **Sayfayı yenile** (Ctrl+Shift+R)
3. **Kırmızı dosyalar** var mı?

**Kontrol edilecek dosyalar:**
- `/_astro/*.css` - CSS yüklendi mi?
- `/_astro/*.js` - JavaScript yüklendi mi?
- `/images/*` - Görseller yüklendi mi?

### 3. Elements Tab - CSS Kontrolü
1. **F12** → **Elements** tab
2. **PhoneButton**'a sağ tık → **Inspect**
3. **Styles** panelde kontrol et:
   - `transition` CSS'i uygulanmış mı?
   - `hover` state çalışıyor mu?

### 4. Manuel Hover Testi
**Service Cards:**
1. **Premium Hizmetlerimiz** bölümüne scroll et
2. **Bir card'a mouse ile gel**
3. **Olması gerekenler:**
   - Card yukarı kalkar (scale 1.05)
   - Border rengi değişir (primary)
   - Görsel yakınlaşır (scale 1.10)
   - "Detaylı Bilgi" okunu göster
   - Shine efekti kayar

**Phone Button (Sağ Alt):**
1. **Hover yap**
2. **Olması gerekenler:**
   - Büyür (scale 1.05)
   - Icon döner (6deg)
   - Shadow parlar

**WhatsApp Button (Sol Alt):**
1. **Hover yap**
2. **Olması gerekenler:**
   - Büyür (scale 1.05)
   - Yavaşça float eder

---

## 🚨 Yaygın Sorunlar ve Çözümler

### Sorun 1: CSS Yüklenmiyor
**Belirti:** Hiçbir stil yok, düz HTML
**Çözüm:**
```bash
# Dev server'ı yeniden başlat
Ctrl+C
npm run dev
```

### Sorun 2: JavaScript Yüklenmiyor
**Belirti:** PhoneButton/WhatsAppButton görünmüyor
**Çözüm:**
1. Console'da hata var mı kontrol et
2. `node_modules` temizle:
```bash
rm -rf node_modules
npm install
npm run dev
```

### Sorun 3: Animasyonlar Çok Hızlı
**Belirti:** Animasyonlar var ama çok sert
**Çözüm:** Bu zaten düzelttik, ama hala hızlıysa:
- `tailwind.config.mjs` → animation sürelerini artır
- `src/styles/animations.css` → keyframe'leri yavaşlat

### Sorun 4: Hover Çalışmıyor
**Belirti:** Mouse'u üstüne getirince hiçbir şey olmuyor
**Çözüm:**
1. Elements tab'da `group` class'ı var mı?
2. `group-hover:` class'ları uygulanıyor mu?
3. CSS `transition` property'si var mı?

---

## 📋 Hızlı Test Checklist

**Ana Sayfa (http://localhost:4324/):**
- [ ] PhoneButton (sağ alt) görünüyor mu?
- [ ] WhatsAppButton (sol alt) görünüyor mu?
- [ ] Hero section yüklendi mi?
- [ ] "Premium Hizmetlerimiz" section var mı?

**PhoneButton Hover:**
- [ ] Mouse hover: Büyüyor mu?
- [ ] Icon dönüyor mu?
- [ ] Smooth geçiş var mı?

**Service Cards Hover:**
- [ ] Mouse hover: Card yukarı kalkıyor mu?
- [ ] Görsel zoom yapıyor mu?
- [ ] "Detaylı Bilgi" ok çıkıyor mu?
- [ ] Border rengi değişiyor mu?

**Background Animations:**
- [ ] "Lamp light" efekti var mı?
- [ ] Grid pattern kayıyor mu?
- [ ] Yıldız parçacıkları parlıyor mu?

---

## 🔬 Advanced Debug

### Console Komutları
Tarayıcı console'unda çalıştır:

```javascript
// Check if Tailwind classes are loaded
console.log(window.getComputedStyle(document.querySelector('.card')));

// Check if transitions are applied
document.querySelectorAll('.group').forEach(el => {
  console.log(el, window.getComputedStyle(el).transition);
});

// Check if animations are running
document.querySelectorAll('[style*="animation"]').forEach(el => {
  console.log(el, el.style.animation);
});
```

### CSS Değişkenlerini Kontrol
```javascript
// Get all CSS custom properties
const allCSS = [...document.styleSheets]
  .map(sheet => [...sheet.cssRules])
  .flat();
console.log(allCSS);
```

---

## 💡 Şimdi Ne Yapmalıyım?

### Adım 1: Tarayıcıyı Aç
```
http://localhost:4324/
```

### Adım 2: F12 Console Aç
- Kırmızı hata var mı?
- Sarı uyarı var mı?
- Hataları kopyala ve bana gönder

### Adım 3: Manuel Test
- PhoneButton'a hover yap → Ne oluyor?
- Service card'a hover yap → Ne oluyor?
- Hiçbir şey olmuyorsa → "HİÇBİR ŞEY OLMUYOR" de
- Bir şeyler oluyor ama yeterli değilse → "YAVAS AMA VAR" de

### Adım 4: Network Tab Kontrol
- F12 → Network tab
- Sayfayı yenile (Ctrl+Shift+R)
- Kırmızı (404) dosya var mı?
- Ekran görüntüsü at veya dosya isimlerini söyle

---

## 🆘 Hızlı İletişim Template

Bana şunu söyle:
```
1. Console hatası: [hata mesajı veya "yok"]
2. PhoneButton hover: [çalışıyor / çalışmıyor / yok]
3. Service cards hover: [çalışıyor / çalışmıyor / yok]
4. Background animasyon: [var / yok]
5. Network 404 hatası: [var / yok]
```

---

**Not:** Eğer **hiçbir şey çalışmıyorsa** ve **console'da hata yoksa**, o zaman CSS dosyası yüklenmemiş olabilir. Bana console'u ve network tab'ını göster.

