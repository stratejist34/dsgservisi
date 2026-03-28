# SEO ve Yapay Zeka (AIO/GEO) Uygulama Planı
Hedef: 2026 Google Türkiye AI Mode ve LLM Optimization (GPT, Claude, Gemini vs.)

## Faz 1: Teknik Temellerin Atılması (Hız ve Taranabilirlik)
*Büyük dil modelleri veriyi saniyeler içinde işlemelidir. Yavaş DOM ve hatalı JS hydration indekslemeyi engeller.*

- [x] **Görev 1.1:** `BaseLayout.astro` içerisindeki Hero görsel preload linklerini kaldır, yalnızca `index.astro` içine taşı. *(Kazanım: Tüm alt sayfalarda Gereksiz AVIF indirmesi duracak, crawler hızı artacak)*
- [x] **Görev 1.2:** `astro.config.mjs` içindeki `inlineStylesheets: 'always'` ayarını `auto` olarak değiştir. *(Kazanım: AI botları parse ederken devasa inline CSS'ler ile boğuşmayacak, HTML text-to-code oranı artacak)*
- [x] **Görev 1.3:** Google fontlarını local'e çek, sayfa başı yapılan 12 dış bağlantı isteğini sıfırla.
- [x] **Görev 1.4:** Hydration düzeltmeleri: React widget'larındaki `client:load` ve `client:only="react"` tanımlarını, `client:idle` veya `client:visible` olarak değiştir. *(Kazanım: TBT sıfıra inecek, botlar içeriği okurken script bloklaması yaşamayacak)*

## Faz 2: Yapısal Veri (Schema.org) ve Semantic Web
*Yapay zeka sitenizi okumaz, veritabanı gibi sorgular. Schema bunun anahtarıdır.*

- [x] **Görev 2.1:** Kapsamlı `FAQPage` Schema kurulumu. (Servis fiyatları, arıza belirtileri vb. sorular için).
- [x] **Görev 2.2:** `Article` ve `ProfilePage` Schema kurulumu. Yazar (Author) tanımlarını jenerik "DSG" isminden, gerçek usta/mühendis isimleri ve uzmanlık bilgileriyle (E-E-A-T) değiştirmek.
- [x] **Görev 2.3:** `LocalBusiness` Markup güncellemesi. (Garanti politikaları, açık/net servis hizmet alanı tanımları JSON-LD'ye eklenecek).

## Faz 3: LLM (GEO) İçerik ve Dil Optimizasyonu
*Generative Engine Optimization (GEO) kurallarına göre içerik düzenlemesi.*

- [ ] **Görev 3.1:** Blog (`[slug].astro`) sayfalarındaki H2 ve H3 başlıklarını soru (Sorgu) formatına dönüştürmek (Örn: "Mekatronik Nedir?" -> "DSG Şanzıman Mekatronik Arıza Belirtileri Nelerdir?").
- [ ] **Görev 3.2:** "Maddeler Halinde Hap Bilgi" (Bulleted Summaries) eklenmesi. Her blog yazısının veya hizmet sayfasının en üstüne LLM'lerin anında çekip özetleyebileceği `TL;DR` kutuları tasarlamak.
- [ ] **Görev 3.3:** Tabloların artırılması. AI modelleri düz metin yerine tabloları referans (citation) vermeyi tercih eder. Maliyetler, arıza kodları (P189C vb.) ve çözümleri tablo formatına geçirilmesi.
- [ ] **Görev 3.4:** Pazarlama (marketing) fluff kelimelerinin silinmesi. "Dünyanın en iyisi", "Rakipsiz fiyat" yerine AI'ın sevdiği objektif verilere dayalı ("15 yıllık tecrübe", "%98 onarım başarısı") dil kullanımı (Ayrıca yasal ve Threat Modeling gereği).

## Faz 4: Otorite İnşası (E-E-A-T)
*Google AI, yanıtını güvenilir (Authoritative) bir kaynakla desteklemek zorundadır.*

- [ ] **Görev 4.1:** "Hakkımızda" (`hakkimizda.astro`) sayfasını, uzmanlık kanıtları (sertifikalar, usta eğitim geçmişi) ve şeffaf adres/şirket bilgileri ile güçlendirmek.
- [ ] **Görev 4.2:** Teknik arıza tanımlarında (Örn; P17BF hatası) yetkili servis dokümantasyonlarına veya global şanzıman veri standartlarına dış bağlantı (external link) vererek bilimselliği kanıtlamak.

## Faz 5: Kullanıcı Deneyimi ve Dönüşüm (HEART & KPI)
*AI'dan gelen trafik, hızlı aksiyon almak ister.*

- [ ] **Görev 5.1:** Hızlı fiyat teklifi/arıza teşhir arayüzünün görünür kılınması.
- [ ] **Görev 5.2:** Vercel metrikleri (Analytics) ve GSC üzerinden "Zero-click" ve Clicks/Impressions (Özellikle Chrome AI rollout sonrası 2026 Mart sonu için) izleme panellerinin ayarlanması.
