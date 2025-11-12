# Floating Button Zamanlama Testi

## Çalışma Mantığı

### Telefon Butonu (PhoneButton)
**Görünür:** Pazartesi-Cumartesi, 09:00-18:00
**Gizli:** Pazar tüm gün + Hafta içi 18:00-09:00

### WhatsApp Butonu (WhatsAppButton)
**Görünür:** Çalışma saatleri DIŞINDA (telefon kapalıyken)
**Gizli:** Çalışma saatleri içinde (telefon açıkken)

---

## Test Senaryoları

### Senaryo 1: Pazartesi 08:30
- ❌ Telefon: Kapalı (henüz 09:00 olmadı)
- ✅ WhatsApp: Açık (çalışma saatleri dışı)

### Senaryo 2: Pazartesi 09:00
- ✅ Telefon: Açık (çalışma saatleri başladı)
- ❌ WhatsApp: Kapalı (telefon açık)

### Senaryo 3: Pazartesi 12:00
- ✅ Telefon: Açık (çalışma saatleri içinde)
- ❌ WhatsApp: Kapalı (telefon açık)

### Senaryo 4: Pazartesi 17:59
- ✅ Telefon: Açık (henüz 18:00 olmadı)
- ❌ WhatsApp: Kapalı (telefon açık)

### Senaryo 5: Pazartesi 18:00
- ❌ Telefon: Kapalı (çalışma saatleri bitti)
- ✅ WhatsApp: Açık (çalışma saatleri dışı)

### Senaryo 6: Pazartesi 22:00
- ❌ Telefon: Kapalı (çalışma saatleri dışı)
- ✅ WhatsApp: Açık (çalışma saatleri dışı)

### Senaryo 7: Pazar 10:00
- ❌ Telefon: Kapalı (Pazar günü)
- ✅ WhatsApp: Açık (Pazar günü)

### Senaryo 8: Pazar 20:00
- ❌ Telefon: Kapalı (Pazar günü)
- ✅ WhatsApp: Açık (Pazar günü)

---

## Otomatik Geçiş Zamanları

### Sabah 09:00
- Telefon butonu belirir
- WhatsApp butonu kaybolur
- **Geçiş:** Smooth (setTimeout ile planlanmış)

### Akşam 18:00
- Telefon butonu kaybolur
- WhatsApp butonu belirir
- **Geçiş:** Smooth (setTimeout ile planlanmış)

---

## Kod Mantığı

```typescript
// Telefon için çalışma saatleri kontrolü
function checkWorkingHours(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Pazar, 1=Pazartesi, ..., 6=Cumartesi
  
  // Pazar günü kapalı
  if (day === 0) return false;
  
  // Saat kontrolü
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;
  
  // 09:00-18:00 arası açık
  return time >= 9 && time < 18;
}

// WhatsApp görünürlüğü
const showWhatsApp = !checkWorkingHours();
```

---

## Test Etme

### Manuel Test
1. Tarayıcı console'da zamanı değiştir:
```javascript
// Örnek: Pazartesi 08:30'u simüle et
const originalDate = Date;
Date = class extends originalDate {
  constructor() {
    super();
    return new originalDate('2025-11-10T08:30:00'); // Pazartesi
  }
};
```

2. Sayfayı yenile ve butonları kontrol et

### Otomatik Test
```bash
# Dev server'ı başlat
npm run dev

# Farklı saatlerde test et:
# - 08:30 (WhatsApp görünür)
# - 09:00 (Telefon görünür)
# - 18:00 (WhatsApp görünür)
# - Pazar günü (WhatsApp görünür)
```

---

## Beklenen Davranış

✅ **Doğru:**
- Sadece bir buton aynı anda görünür
- Geçişler smooth ve planlanmış
- Pazar günü WhatsApp her zaman açık
- Hafta içi 09:00-18:00 arası telefon açık

❌ **Yanlış:**
- İki buton aynı anda görünür
- Hiçbir buton görünmez
- Geçişler ani veya hatalı

---

**Son Güncelleme:** 12 Kasım 2025
