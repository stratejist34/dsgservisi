## DSG Servisi Blog Yazı Kılavuzu (Saf Markdown)

Bu kılavuz, yeni yazıları yalnızca saf Markdown ile yazıp otomatik stil ve şemalardan yararlanmanız için hazırlandı. Aşağıdaki kurallara uyduğunuzda özel CSS ve JSON‑LD şemalar otomatik devreye girer.

### 1) Frontmatter (zorunlu)
```yaml
---
title: "Yazı Başlığı"
description: "140–160 karakter açıklama"
category: "Kategori"
tags: ["etiket1", "etiket2"]
slug: "slug"
publishDate: 2025-11-04
updatedDate: 2025-11-04
featuredImage: "/images/blog/slug/kapak.jpg"
imageAlt: "Görsel alt metin"
author: "DSG Servisi"
draft: false

# Opsiyonel: Service şeması (yoksa boş bırakın; otomatik fiyat çıkarımı çalışır)
# serviceName: "Hizmet Adı"
# serviceType: "Hizmet Türü"
# serviceDescription: "Kısa tanım"
# areaServed: ["İstanbul", "Beylikdüzü"]
# price: 3500                # Tek fiyat → Offer
# lowPrice: 2500             # Aralık → AggregateOffer
# highPrice: 6500
# priceCurrency: "TRY"
# offerUrl: "/slug"
---
```

### 2) Başlık Yapısı (TOC uyumlu)
- H2 (##) ana bölümler için
- H3 (###) alt başlıklar için
- H1 kullanmayın (sayfa başlığı şablondan gelir)

### 3) Vurgu Kutuları (Markdown Direktifleri)

**ÖNEMLİ:** Tüm yazılarda Markdown direktiflerini kullanın. CSS stilleri otomatik olarak uygulanır. HTML kullanmayın.

#### Uzman Tavsiyesi (Markdown):
```md
:::tip
Uzman tavsiyesi metni buraya…
:::
```

#### Vurgulu Not Kutusu (Markdown):
```md
:::note
- Madde 1
- Madde 2
:::
```

#### CTA Kutusu (Markdown):
```md
:::cta
**Ücretsiz ön kontrol**
- [📞 0533 262 34 51](tel:+905332623451)
- [WhatsApp Randevu](https://wa.me/905332623451)
- [Konum Tarifi](https://maps.app.goo.gl/vmZyp6qu3pCgE8vRA)
:::
```

#### Google Haritalar Embed (HTML):
```html
<div class="map-embed">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3402005679377!2d28.631132100000002!3d41.0178125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb185ddf5cbb%3A0x6a61d71a45b9906a!2sY%C4%B1ld%C4%B1zlar%20Grup%20Volkswagen%2C%20Audi%2C%20Porsche%2C%20Bmw%20%C3%96zel%20Servis!5e0!3m2!1str!2str!4v1759931064197!5m2!1str!2str" width="100%" height="360" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
<p>Gerçek yorumlar: <a href="https://maps.app.goo.gl/gDpUepbcoo6AwpZN7" target="_blank">Google Haritalar</a></p>
```

**NOT:** Harita embed'i için HTML kullanın, direktif (`:::map`) çalışmıyor.

### 4) Müşteri Yorumları

**ÖNEMLİ:** Her yazıda Google'dan alınan gerçek yorumlar kullanılmalıdır. Yorumlar yazıya özel, alakalı ve çeşitli olmalıdır.

#### Yorum Seçim Kriterleri:

1. **Alaka Düzeyi:** Yorum içinde yazının konusuyla ilgili anahtar kelimeler geçmeli (marka adı, arıza türü, model vb.)
2. **Çeşitlilik:** Aynı yorumlar peş peşe veya sürekli tekrar edilmemeli
3. **Dağılım:** Tüm yorumlar eşit şekilde kullanılmaya çalışılmalı
4. **Format:** HTML formatında yazılmalı

#### Yorum Kartı Formatı (HTML):
```html
<div class="review-card">
  <div class="review-avatar">İK</div>
  <div class="review-content">
    <div class="review-meta">
      <strong>İsim Soyisim</strong>
      <span class="review-stars">★★★★★</span>
      <span class="review-date">2 hafta önce</span>
    </div>
    <p class="review-text">Yorum metni buraya...</p>
  </div>
</div>
```

#### Yorumlar Bölümü Yapısı:
```markdown
## Müşteri Yorumları

<div class="review-card">
  <div class="review-avatar">AB</div>
  <div class="review-content">
    <div class="review-meta">
      <strong>Ad Soyad</strong>
      <span class="review-stars">★★★★★</span>
      <span class="review-date">1 hafta önce</span>
    </div>
    <p class="review-text">Yorum metni...</p>
  </div>
</div>

<!-- 3-5 yorum kartı eklenir -->
```

**Yorum Avatar Renkleri:** Farklı renkler kullanılabilir (opsiyonel):
- `style="background:#4285f4;"` (Mavi)
- `style="background:#34a853;"` (Yeşil)
- `style="background:#ea4335;"` (Kırmızı)
- `style="background:#fbbc04;"` (Sarı)
- `style="background:#9c27b0;"` (Mor)

### 5) Fiyatlar (otomatik çıkarım için)
- Tablo veya metinde ₺/TL/TRY ve “Fiyat/Ücret/Toplam/Price” kelimeleri geçsin.
- Örnek tablo:
```md
| İşlem | Maliyet |
| --- | ---: |
| Mekatronik revizyonu | 8.500–17.000₺ |
```

### 6) SSS / FAQ (otomatik şema)
- Başlık: tam olarak `## Sık Sorulan Sorular`
- Her soru ayrı H3 satırında, cevap altında paragraf:
```md
## Sık Sorulan Sorular
### Soru 1?
Cevap 1…
### Soru 2?
Cevap 2…
```


### 7) Görseller
- `featuredImage` için yerel yol ve anlamlı `imageAlt` yazın.
- İçerik görselleri gerekiyorsa relatif yolları tercih edin.

### 8) Stil / Ton
- Türkçe, net ve faydacı anlatım.
- Gereksiz uzun cümlelerden kaçının; madde işaretleri ve tabloları tercih edin.
- Teknik terimler sade ve açıklayıcı olsun.

### 9) Otomatik Şemalar (arkaplanda)
- Article, Breadcrumb, LocalBusiness tüm yazılarda otomatik eklenir.
- Service şeması: Frontmatter doluysa ondan, değilse fiyat tablosundan otomatik (Offer/AggregateOffer).
- FAQ şeması: `## Sık Sorulan Sorular` + H3 soru/paragraf cevap yapısından otomatik.

### 10) Kaçınılacaklar
- `:::map` direktifi kullanımı (HTML kullanın)
- H1 kullanımı (şablon sağlar)

### 11) Başlangıç Şablonu
```markdown
---
title: "Yazı Başlığı"
description: "140–160 karakter açıklama"
category: "Kategori"
tags: ["etiket1","etiket2"]
slug: "slug"
publishDate: 2025-11-04
updatedDate: 2025-11-04
featuredImage: "/images/blog/slug/kapak.jpg"
imageAlt: "Görsel alt metin"
author: "DSG Servisi"
draft: false
# (Opsiyonel) Service alanları…
---

:::tip
Uzman tavsiyesi metni buraya…
:::

:::cta
**Ücretsiz ön kontrol**
- [📞 0533 262 34 51](tel:+905332623451)
- [WhatsApp Randevu](https://wa.me/905332623451)
- [Konum Tarifi](https://maps.app.goo.gl/vmZyp6qu3pCgE8vRA)
:::

## Bölüm Başlığı
Metin…

:::note
- Madde 1
- Madde 2
:::

## Fiyatlar
| İşlem | Maliyet |
| --- | ---: |
| Örnek | 8.500–17.000₺ |

## Müşteri Yorumları

<div class="review-card">
  <div class="review-avatar">AB</div>
  <div class="review-content">
    <div class="review-meta">
      <strong>Ad Soyad</strong>
      <span class="review-stars">★★★★★</span>
      <span class="review-date">1 hafta önce</span>
    </div>
    <p class="review-text">Yorum metni buraya...</p>
  </div>
</div>

## Google Harita ve Yorumlar

<div class="map-embed">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3402005679377!2d28.631132100000002!3d41.0178125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb185ddf5cbb%3A0x6a61d71a45b9906a!2sY%C4%B1ld%C4%B1zlar%20Grup%20Volkswagen%2C%20Audi%2C%20Porsche%2C%20Bmw%20%C3%96zel%20Servis!5e0!3m2!1str!2str!4v1759931064197!5m2!1str!2str" width="100%" height="360" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
<p>Gerçek yorumlar: <a href="https://maps.app.goo.gl/gDpUepbcoo6AwpZN7" target="_blank">Google Haritalar</a></p>

## Sık Sorulan Sorular
### Soru 1?
Cevap 1…

### Soru 2?
Cevap 2…
```
