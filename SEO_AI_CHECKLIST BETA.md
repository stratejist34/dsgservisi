# SEO ve AI Uygulama Checklist

Bu dosya, `betaozelservis.com` için SEO ve AI discoverability uygulama planının operasyonel todo listesidir.

Kullanım:
- Bu liste sprint bazlıdır.
- Her görev, ID ile takip edilir.
- Bir görev tamamlandığında kutucuğu işaretleyin.
- Sonraki adımlarda bu dosyadaki başlıklardan birini alıp uygulama planı çıkarıp adım adım ilerleyeceğiz.

Durum legend:
- `[ ]` Yapılacak
- `[x]` Tamamlandı
- `[-]` Beklemede

## Sprint 1 | Gün 1-15

- [-] SEO-01 | Cloudflare ve `robots.txt` AI bot politikasını iş hedefiyle hizala
  Owner: SEO Lead + DevOps
  Deadline: Gün 3
  Dependency: Yok
  DoD: Canlı `robots.txt` onaylı; hangi botlar açık/kapalı net dokümante edildi.
  Durum:
  - [x] Repo tarafında hedef `robots.txt` politikası hazırlandı
  - [x] Uygulama runbook dosyası oluşturuldu
  - [x] Cloudflare managed robots override kapatıldı
  - [-] Canlı `robots.txt` temiz, fakat hedef policy deploy edilmedi

- [ ] SEO-02 | Canlı `robots.txt`, sitemap ve Search Console uyum kontrolü yap
  Owner: Technical SEO
  Deadline: Gün 4
  Dependency: SEO-01
  DoD: Sitemap erişilebilir; robots ve indexation sinyalleri birbiriyle tutarlı.
  Durum:
  - [x] Canlı `sitemap.xml` 200 dönüyor
  - [x] `robots.txt` içinde sitemap referansı mevcut
  - [-] Canlı `robots.txt` deploy edilen yeni policy'yi henüz yansıtmıyor
  - [-] Search Console yeniden tarama adımı deploy sonrası yapılacak

- [x] SEO-03 | Tüm site için tekil NAP master source oluştur
  Owner: SEO Lead + Ops
  Deadline: Gün 5
  Dependency: Yok
  DoD: Telefon, adres, çalışma saatleri ve servis alanı tek kaynaktan yönetiliyor.
  Durum:
  - [x] `lib/business-info.ts` oluşturuldu
  - [x] Telefon, sabit hat, WhatsApp, adres ve mesai bilgileri tek kaynaktan tanımlandı
  - [x] Header, footer, iletişim, hero, sticky bar, akü yüzeyleri ve CTA bileşenleri merkezi kaynağa bağlandı
  - [x] İçerik gövdesindeki hatalı NAP varyasyonları `SEO-04` ile temizlendi

- [x] SEO-04 | Placeholder veya tutarsız NAP geçen içerikleri temizle
  Owner: Content Lead
  Deadline: Gün 8
  Dependency: SEO-03
  DoD: Hiçbir sayfada sahte veya tutarsız iletişim bilgisi kalmadı.
  Durum:
  - [x] `data/posts.json` içindeki hatalı telefon linkleri `tel:+905332081400` formatına çekildi
  - [x] Placeholder `Gebze Organize Sanayi Bölgesi` adresi temizlendi
  - [x] Eski `İçmeler/Tuzla/İstanbul` adres varyasyonları standardize edildi
  - [x] Eski çalışma saati varyasyonları tek standarda çekildi
  - [x] Gerçekte sunulmayan `7/24` destek ifadeleri kaldırıldı
  - [x] Envanter dosyası güncellendi: `SEO_04_NAP_CLEANUP_INVENTORY.md`

- [x] SEO-05 | Ana sayfa için `Organization`, `AutoRepair`, `LocalBusiness` schema ekle
  Owner: Frontend Dev
  Deadline: Gün 10
  Dependency: SEO-03
  DoD: Ana sayfa JSON-LD valid; kurum ve servis varlığı net okunuyor.
  Durum:
  - [x] Ana sayfa için `Organization` schema eklendi
  - [x] Ana sayfa için `AutoRepair + LocalBusiness` schema katmanı eklendi
  - [x] Schema, merkezi NAP kaynağına bağlandı
  - [x] Ana sayfa metadata ve sosyal metadata metinleri temizlendi

- [x] SEO-06 | İletişim sayfası için local schema ve metadata düzeltmeleri yap
  Owner: Frontend Dev
  Deadline: Gün 10
  Dependency: SEO-03
  DoD: Adres, telefon, saatler, servis alanı ve metadata tam ve doğru.
  Durum:
  - [x] İletişim sayfası metadata metinleri temizlendi
  - [x] `ContactPage + LocalBusiness + AutoRepair` schema katmanı eklendi
  - [x] Adres, telefon ve çalışma saatleri merkezi NAP kaynağına bağlandı
  - [x] İletişim bileşenindeki bozuk Türkçe karakterler temizlendi

- [x] SEO-07 | Hizmetler ve Hakkımızda sayfalarına güven blokları ekle
  Owner: Content Lead + Frontend Dev
  Deadline: Gün 12
  Dependency: SEO-03
  DoD: Garanti, süreç, uzmanlık, ekipman ve marka kapsamı blokları yayında.
  Durum:
  - [x] `Hizmetler` sayfasına güven ve süreç odaklı bloklar eklendi
  - [x] `Hakkımızda` sayfasına garanti, süreç, ekipman ve marka kapsamı blokları güçlendirildi
  - [x] `ServicesSection` metinleri temiz Türkçe ile yeniden yazıldı
  - [x] Bu yüzeylerdeki bozuk Türkçe karakterler temizlendi

- [x] SEO-08 | Arama, WhatsApp, form ve yol tarifi event tracking planını hazırla
  Owner: Analytics Lead
  Deadline: Gün 15
  Dependency: Yok
  DoD: Event isimleri, tetikleme mantığı ve dashboard ihtiyacı netleştirildi.
  Status: DONE 2026-03-29 — `src/scripts/ga-events.js` yapısı `docs/SEO_08_EVENT_TRACKING_PLAN.md` içinde belgelendirildi. Tıklama, WhatsApp, harita ve arama hunisi dashboard metrikleri kurgulandı.

## Sprint 2 | Gün 16-45

- [x] SEO-09 | 2025 fiyat ve ticari içerik envanterini çıkar ve önceliklendir
  Owner: SEO Lead
  Deadline: Gün 17
  Dependency: Yok
  DoD: Trafik ve lead potansiyeline göre sıralı sayfa listesi hazır.
  Durum:
  - [x] 60 post tierlara ayrıldı (Tier 1: 15 fiyat, Tier 2: 21 teknik, Tier 3: 24 lokasyon)
  - [x] SEO-10 ilk dalga 10 sayfa belirlendi (MB, BMW, VW, Audi, DSG öncelikli)
  - [x] Tüm sayfalarda ortak eksikler (schema, FAQ, iç link) sütunlandı
  - [x] Envanter dosyası: `SEO_09_CONTENT_INVENTORY.md`

- [x] SEO-10 | Kritik fiyat sayfalarını `2026 + evergreen` yapısına dönüştür
  Owner: Content Lead
  Deadline: Gün 28
  Dependency: SEO-09
  DoD: Başlık, H1, intro, fiyat metodolojisi ve güncellenme tarihi yenilendi.
  Durum:
  - [x] 13 fiyat sayfası: title, yoastTitle, yoastDescription, H1 → 2026 güncellendi
  - [x] DSG intro metinleri "2025 güncel fiyatlarıyla" → 2026 düzeltildi
  - [x] Polo intro "2025 yılında" → 2026 düzeltildi
  - [x] VW H2 "Bakım Planı 2025" → 2026 düzeltildi
  - [x] Motor Yağ Kaçağı: yoastTitle, H1, H2, intro → 2026 güncellendi
  - [x] Yağ Değişimi sayfası: title tarifsiz (evergreen), yoastTitle/H1/H2 → 2026
  - [x] Land Rover + Porsche periyodik sayfaları zaten 2026 tarihli, değiştirilmedi

- [x] SEO-11 | Para sayfalarına `Service`, `FAQPage`, `Breadcrumb` schema ekle
  Owner: Frontend Dev
  Deadline: Gün 30
  Dependency: SEO-10
  DoD: Kritik ticari sayfaların hepsinde valid schema mevcut.
  Durum:
  - [x] `app/[slug]/page.tsx` `@graph` yapısına geçirildi
  - [x] Tüm post sayfalarına `BreadcrumbList` schema eklendi
  - [x] Tüm post sayfalarına `Service` schema eklendi (provider: AutoRepair, areaServed: BUSINESS_INFO)
  - [x] İçerikten `?` ile biten h3/h4 başlıkları otomatik `FAQPage` schema'ya çevriliyor
  - [x] `S: Soru?` / `C: Cevap` formatı destekleniyor, max 5 FAQ item
  - [x] `BUSINESS_INFO` merkezi kaynağından besleniyor

- [x] SEO-12 | Para sayfalarına belirti, risk, çözüm süresi, garanti ve CTA blokları ekle
  Owner: Content Lead
  Deadline: Gün 32
  Dependency: SEO-10
  DoD: İlk dalgada en az 10 para sayfası yeni bloklarla yayında.
  Durum:
  - [x] `lib/service-blocks.ts` oluşturuldu — 10 sayfa için belirti/risk/süre/garanti verisi
  - [x] `components/ServiceInfoBlock.tsx` oluşturuldu — 4 kartlı görsel blok (amber/rose/blue/emerald)
  - [x] `app/[slug]/page.tsx`'e entegre edildi — hero ile içerik arasına otomatik ekleniyor
  - [x] Slug eşleşmesi yoksa blok görünmüyor (gereksiz sayfalarda çıkmaz)

- [x] SEO-13 | Marka, arıza, fiyat, hizmet ve ürün bağlantılarını iç link mimarisine dönüştür
  Owner: SEO Lead + Content Lead
  Deadline: Gün 35
  Dependency: SEO-10
  DoD: Her kritik sayfada en az 3-5 bağlamsal iç link var.
  Durum:
  - [x] 13 öncelikli sayfada iç link sayımı yapıldı (6–37 arası)
  - [x] 17 bozuk iç link düzeltildi: /yag-degisimi-fiyatlari-2025 (x10), /solenoid→/selenoid, /periyodik-bakim (x2), /otomatik-sanziman-yag-degisimi, /motor-bakimi, /sanziman-bakimi, /tuzla-skoda-servis
  - [x] Seat sayfasındaki 2 self-referencing link kaldırıldı
  - [x] DSG mekatronik ve kavrama sayfalarındaki dış linkler iç linke çevrildi (dsgservisi.com → site içi)
  - [x] DSG sayfalarına VW/Audi/SEAT/Skoda periyodik bakım bağlantıları eklendi (5→9 link)
  - [x] Tüm 13 sayfada broken link kalmadı (doğrulandı)

- [x] SEO-14 | FAQ benzeri tüm içerikleri standart soru-cevap yapısına getir
  Owner: Content Ops
  Deadline: Gün 38
  Dependency: Yok
  DoD: İlk 20 öncelikli sayfada standart FAQ yapısı tamamlandı.
  Durum:
  - [x] 20 öncelikli sayfanın FAQ sayımı yapıldı: 19/20 zaten ≥3 FAQ içeriyordu
  - [x] bmw-sanziman-tamiri (0 FAQ) → 4 soruluk FAQ bölümü eklendi (ZF yağ değişimi, sarsıntı nedeni, DCT vs ZF, garanti)
  - [x] Tüm 20 sayfa ≥3 FAQ maddesiyle DoD'u karşılıyor (doğrulandı)

- [ ] SEO-15 | Search Console yeniden tarama ve index coverage kontrolü yap
  Owner: Technical SEO
  Deadline: Gün 45
  Dependency: SEO-10, SEO-11
  DoD: Kritik güncellenen sayfalar yeniden tarandı; hata ve kapsama durumu izlendi.

## Sprint 3 | Gün 46-75

- [x] SEO-16 | Duplicate lokasyon ve marka sayfalarının cluster analizini yap
  Owner: SEO Lead
  Deadline: Gün 48
  Dependency: Yok
  DoD: Merge, rewrite veya keep kararı verilen net cluster listesi hazır.
  Durum:
  - [x] 25 lokasyon sayfası analiz edildi — gerçek duplicate yok, sorun thin content
  - [x] 3 stub sayfa tespit edildi (< 300w): gebze-audi (92w), pendik-vw (174w), gebze-vw (206w)
  - [x] 5 zayıf sayfa tespit edildi (300–699w): SEO-18'de yerel blok alacak
  - [x] 17 sayfa KEEP kararıyla işaretlendi (≥700w)
  - [x] SEO_16_CLUSTER_ANALYSIS.md oluşturuldu

- [x] SEO-17 | En sorunlu duplicate sayfaları birleştir veya yeniden konumlandır
  Owner: Content Lead + Frontend Dev
  Deadline: Gün 60
  Dependency: SEO-16
  DoD: İlk dalgada 5-10 problemli cluster çözüldü.
  Durum:
  - [x] gebze-volkswagen-servis: 206w → 621w (motor aileleri, şanzıman, fiyat tablosu, 3 FAQ, 2 yorumla genişletildi)
  - [x] pendik-volkswagen-servis: 174w → 583w (Kurtköy/Kaynarca lokal farklılık, fiyat tablosu, FAQ eklendi)
  - [x] gebze-audi-servis: 92w → 613w (H1 eklendi, S-tronic/quattro bölümleri, fiyat tablosu, 3 FAQ eklendi)
  - [x] 3 sayfanın title/yoastTitle/yoastDescription 2026 olarak güncellendi
  - [x] Merge/redirect gerekmedi — true duplicate yok

- [x] SEO-18 | Korunan lokasyon sayfalarına gerçek lokal fark blokları ekle
  Owner: Content Lead
  Deadline: Gün 62
  Dependency: SEO-16
  DoD: Her korunan lokasyon sayfasında özgün lokal veri ve fark blokları var.
  Durum:
  - [x] pendik-land-rover: H2→H1, 3 FAQ eklendi, Sabiha Gökçen lokal blok (375→491w)
  - [x] kurtkoy-land-rover: 3×H2→H1, Meta Bilgiler temizlendi, 3 FAQ + Kurtköy lokal blok (441→504w)
  - [x] tuzla-seat: 2025→2026, çalışma saatleri düzeltildi (07:50–20:30), İçmeler–Aydınlı lokal blok (602→633w)
  - [x] pendik-skoda: 2025→2026, çalışma saatleri düzeltildi, Pendik–Kurtköy lokal blok (616→648w)
  - [x] tuzla-audi: Kırık div yapısı temizlendi, Meta Bilgiler silindi, proper H3/H4 + lokal blok (697→640w)

- [x] SEO-19 | Ürün sayfalarına `Product` ve `Offer` schema altyapısını kur
  Owner: Frontend Dev
  Deadline: Gün 58
  Dependency: Yok
  DoD: Tüm ürün şablonları schema açısından hazır ve valid.
  Status: DONE 2026-03-28 — app/urun/[slug]/page.tsx'e Product + Offer + BreadcrumbList @graph schema eklendi. Fiyat varsa numericPrice, yoksa undefined; priceValidUntil 2026-12-31; seller AutoRepair LocalBusiness olarak tanımlandı.

- [x] SEO-20 | Ürün içeriklerini karar sayfası seviyesine çıkar
  Owner: Content Lead
  Deadline: Gün 70
  Dependency: SEO-19
  DoD: Uyumluluk, garanti, montaj, teslimat, sık sorular ve kullanım senaryoları eklendi.
  Status: DONE 2026-03-28 — Teknik özellikler tablosu (Ah, CCA, seri, uyum, parça), uyumlu araçlar listesi, 4 soruluk seri bazlı FAQ bölümü eklendi. FAQPage schema @graph'a dahil edildi. parseProductSpecs() fonksiyonu ile slug'dan Ah/CCA otomatik ayrıştırma yapılıyor.

- [x] SEO-21 | Ürün metadata ve sosyal paylaşım alanlarını ürüne özelleştir
  Owner: Frontend Dev
  Deadline: Gün 65
  Dependency: SEO-19
  DoD: Generic başlık ve açıklama kalan ürün sayfası yok.
  Status: DONE 2026-03-28 — buildMetaDescription() fonksiyonu eklendi; AGM/EFB/SLI için ayrı lokasyon+CTA içerikli açıklamalar üretiliyor. Başlık: AGM/EFB "Akü"yle biten isimler için " Fiyatı" suffix'i eklendi. OG image'e width/height/alt eklendi.

- [x] SEO-22 | Marka arşivlerini gerçek topic hub yapısına dönüştür
  Owner: SEO Lead + Content Lead
  Deadline: Gün 75
  Dependency: SEO-13
  DoD: Her hub, servis, fiyat, arıza ve ürün sayfalarına mantıklı geçiş sağlıyor.
  Status: DONE 2026-03-28 — categorizePostsByType() ile dinamik hub navigasyonu eklendi (Servis bölgeleri / Bakım ve fiyat / Teknik rehberler 3-sütun). CollectionPage + BreadcrumbList JSON-LD schema eklendi. Slug bazlı heuristic (-servis / fiyat+bakim / diğer) tüm 8 marka için otomatik çalışıyor.

## Sprint 4 | Gün 76-90

- [x] SEO-23 | Review ve proof mimarisini kaynaklı ve güvenilir hale getir
  Owner: Product Marketing + Frontend Dev
  Deadline: Gün 82
  Dependency: SEO-03
  DoD: Review blokları doğrulanabilir kaynak mantığıyla sunuluyor.
  Status: DONE 2026-03-29 — `Reviews.tsx` içine JSON-LD yapısında AutoRepair + AggregateRating ve Review elemanları kodlandı. Müşteri veri setinden dinamik parse edip sunuyor. Yıldızlı SERP snippet elde etme mimarisi kuruldu.

- [ ] SEO-24 | Para sayfalarına vaka analizi ve case study blokları ekle
  Owner: Content Lead
  Deadline: Gün 85
  Dependency: SEO-12
  DoD: En az 8 yüksek niyetli sayfada gerçek vaka veya iş emri bazlı anlatım var.

- [ ] SEO-25 | 90 ve 180 günlük freshness governance takvimi kur
  Owner: SEO Lead + Content Ops
  Deadline: Gün 86
  Dependency: SEO-09
  DoD: İçerik refresh SLA, owner ve takip sistemi tanımlı.

- [ ] SEO-26 | Organik, AI referral ve lead KPI dashboard'unu yayına al
  Owner: Analytics Lead
  Deadline: Gün 88
  Dependency: SEO-08
  DoD: Form, arama, WhatsApp ve yol tarifi KPI'ları tek panelden izlenebiliyor.

- [ ] SEO-27 | Q2 için entity graph ve knowledge base tasarım planını hazırla
  Owner: SEO Strategist
  Deadline: Gün 90
  Dependency: SEO-22
  DoD: Sonraki çeyrek için onaylı mimari plan ve öncelik listesi hazır.

## Kritik Sayfa Grupları

- [ ] DSG ve mekatronik fiyat sayfaları
- [ ] Periyodik bakım fiyat sayfaları
- [x] Lokasyon bazlı servis sayfaları (Büyükçekmece, Beylikdüzü, Esenyurt) - Yeni Eklendi
- [-] Ürün detay sayfaları
- [x] Ana sayfa
- [x] İletişim
- [x] Hizmetler
- [x] Hakkımızda
- [-] Marka hub sayfaları

## Operasyonel Kontrol Listesi

- [ ] Her yeni ticari sayfada güncellenme tarihi olsun
- [ ] Her para sayfasında net CTA olsun
- [ ] Her para sayfasında FAQ bölümü olsun
- [ ] Her para sayfasında en az 3 iç link olsun
- [ ] Her para sayfasında schema valid olsun
- [ ] Her ürün sayfasında uyumluluk bilgisi olsun
- [ ] Her lokal sayfada gerçek lokal fark olsun
- [ ] Her sayfada NAP bilgisi master source ile uyumlu olsun
- [ ] Her review veya proof alanı doğrulanabilir kaynak mantığına dayansın

## KPI Takip Listesi

- [ ] Non-brand organik click
- [ ] Ticari sorgu görünürlüğü
- [ ] AI referral sessions
- [ ] Cited-source appearances
- [ ] Form lead rate
- [ ] Call click-through rate
- [ ] WhatsApp start rate
- [ ] Yol tarifi tıklama oranı
- [ ] Schema pass rate
- [ ] NAP doğruluk oranı

## Sonraki Çalışma Şekli

- [ ] Bu dosyadan bir başlık veya görev grubu seç
- [ ] Seçilen başlık için uygulama planı çıkar
- [ ] Kod ve içerik değişikliklerini adım adım uygula
- [ ] Test ve doğrulamayı tamamla
- [ ] Dosyadaki ilgili görevleri işaretle
