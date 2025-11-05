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

#### Google Haritalar Embed (Markdown):
```md
:::map{src="https://www.google.com/maps/embed?pb=..." height="360"}
:::
```

### 4) Fiyatlar (otomatik çıkarım için)
- Tablo veya metinde ₺/TL/TRY ve “Fiyat/Ücret/Toplam/Price” kelimeleri geçsin.
- Örnek tablo:
```md
| İşlem | Maliyet |
| --- | ---: |
| Mekatronik revizyonu | 8.500–17.000₺ |
```

### 5) SSS / FAQ (otomatik şema)
- Başlık: tam olarak `## Sık Sorulan Sorular`
- Her soru ayrı H3 satırında, cevap altında paragraf:
```md
## Sık Sorulan Sorular
### Soru 1?
Cevap 1…
### Soru 2?
Cevap 2…
```


### 6) Görseller
- `featuredImage` için yerel yol ve anlamlı `imageAlt` yazın.
- İçerik görselleri gerekiyorsa relatif yolları tercih edin.

### 7) Stil / Ton
- Türkçe, net ve faydacı anlatım.
- Gereksiz uzun cümlelerden kaçının; madde işaretleri ve tabloları tercih edin.
- Teknik terimler sade ve açıklayıcı olsun.

### 8) Otomatik Şemalar (arkaplanda)
- Article, Breadcrumb, LocalBusiness tüm yazılarda otomatik eklenir.
- Service şeması: Frontmatter doluysa ondan, değilse fiyat tablosundan otomatik (Offer/AggregateOffer).
- FAQ şeması: `## Sık Sorulan Sorular` + H3 soru/paragraf cevap yapısından otomatik.

### 9) Kaçınılacaklar
- HTML kullanımı (Markdown direktifleri kullanın)
- H1 kullanımı (şablon sağlar)

### 10) Başlangıç Şablonu
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

## Sık Sorulan Sorular
### Soru 1?
Cevap 1…

### Soru 2?
Cevap 2…
```
