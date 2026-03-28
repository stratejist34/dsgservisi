# SEO-08 | Event Tracking & Analitik Raporlama Planı

Bu belge, `dsgservisi.com` üzerinde çalışan Google Analytics (GA4) / Tag Manager global izleme mimarisinin şemasıdır. Sitede yerleşik olan `ga-events.js` scripti ile ölçümlenen dönüşüm (conversion), huni (funnel) ve kullanıcı etkileşimi (engagement) olaylarını dokümante eder.

## 1. Temel Yapı ve Çalışma Mantığı
İzleme mimarisi, global `click` listener üzerine kurulu bir "Delegation" mantığıyla çalışır. Her tıklamaya özel bir `click_location` (hero, blog_content_body, cta_block, footer vs.) etiketi atanır, böylece dönüşümün tam olarak sayfanın neresinden geldiği ölçülür.

### Tıklama Lokasyon Haritası (`click_location`)
- `header`: Üst menü navigasyonu
- `footer`: Alt bilgi alanı
- `cta_block`: Dönüşüm kutuları
- `blog_cta_section`: Yazı içindeki vurgulu arama teklifleri
- `blog_bottom_contact`: Yazı sonu iletişim bilgileri
- `blog_content_body`: Salt metin gövdesi içindeki linkler
- `hero`: Başlangıç ekranı butonları
- `modal_popup`: Ekrana gelen "Hemen Ara" modalları
- `sidebar`: Yan menüler

---

## 2. Raporlanan Metrikler ve Event Parametreleri

### 2.1 Konum / Harita Yönlendirmeleri
Ziyaretçilerin Google Maps için tıkladıkları tüm dış linkleri izler.
- **Event Name:** `konum_linki_tiklandi`
- **Category:** `engagement`
- **Gönderilen Parametreler:**
  - `device`: 'mobile' | 'desktop'
  - `source_page`: Yönlendirmenin yapıldığı URL
  - `click_location`: Butonun sitedeki yeri
  - `link_text`: Tıklanan a-etiketinin metni

### 2.2 Telefon / Arama (Tel Intent) Eğilimleri
Masaüstü veya mobilde `tel:` linkine tıklayan ancak uygulamaya geçiş yapıp yapmadığı işletim sistemi kısıtlamaları yüzünden tam veriyolundan izlenemeyen **"arama niyetleri"**.
- **Event Name:** `call_intent_started`
- **Category:** `funnel`
- **Gönderilen Parametreler:**
  - `device`: 'mobile' | 'desktop'
  - `source_page`: Hangi yazı / fiyat sayfasından arama koptu
  - `click_location`: Hangi blok (CTA, Header vs.)
  - `link_text`: Aranan numara veya link metni

### 2.3 Kesin Telefon Onayı (Modal Button)
Mobile menüde veya Modal pencerede "Evet, Hemen Ara" final butonlarına basıldığında atılan Lead (Dönüşüm) sinyali.
- **Event Name:** `call_confirmed`
- **Category:** `conversion`
- **Gönderilen Parametreler:**
  - `device`: 'mobile' | 'desktop'
  - `source_page`: Akımın başladığı ana lokasyon

### 2.4 WhatsApp Chat Başlatma
Kullanıcıların `wa.me` dış bağlantılarıyla DM sekmesine düştüğü durumlar.
- **Event Name:** `whatsapp_button_click`
- **Category:** `conversion`
- **Gönderilen Parametreler:**
  - `device`: 'mobile' | 'desktop'
  - `click_location`: Modal içi mi, header mı, footer mı?
  - `link_text`: "Fiyat Al", "Bilgi İste" vb. A/B test metni

### 2.5 UI Etkileşim İzleyicileri (Engagement Metrics)
Sitedeki diğer güven ve dönüşüm etkileşimleri.
- `modal_konum_tiklandi`: Navigasyon modalındaki harita butonu (engagement)
- `blog_yorumlar_linki_tiklandi`: Blog yazısındaki yoruma gidiş butonu
- `header_fiyat_iste_intent`: Sağ üst "Fiyat İste" tıklaması.
- `mobil_menu_hemen_ara_intent`: Mobil hamburger menü içi arama efekti.
- `home_reviews_google_tiklandi`: Ana sayfa Google İncele butonu.
- `iletisim_harita_iframe_tiklandi`: Direkt iFrame içerisindeki haritada zoom/pan etkileşimi.

---

## 3. Dashboard KPI İhtiyaçları (GA4 / Looker Studio İzleme Planı)

Bu event mimarisi aktifken çıkartılacak raporların ve veri görsellerinin taslağı:

1. **En Çok Aratan İçerik Tablosu:** X ekseni (Sayfalar/Bloglar), Y Ekseni (`call_confirmed` & `whatsapp_button_click` total hacmi).
2. **Kopma (Drop-off) Oranı:** `call_intent_started` vs `call_confirmed` huni mantığıyla, fiyattan korkup kaçan veya sayfa ortasından ayrılan segmentin tespiti.
3. **Cihaz Ayrımı:** Arızalarına mobilden çözüm arayanların masaüstüne göre dönüşüm farkı.
4. **Isı Haritası (Tıklama Lokasyonu):** Header, hero veya yazı içi (blog_content_body) metriklerinden hangisinin *daha ucuz* maliyetle form / numara getirdiğini ölçme.

*Bu doküman `ga-events.js` versiyon 1.0.0 üzerine inşa edilmiştir. Değişiklikler yapıldıkça GA4 panelinden Event Custom Dimension atamaları mutlaka yenilenmelidir.*
