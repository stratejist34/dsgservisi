# DSG Servisi - CRO & CTA Dönüşüm Optimizasyonu Raporu ve Çözüm Planı

Bir Dönüşüm Oranı Optimizasyonu (CRO) ve Call-To-Action (CTA) Dönüşüm Uzmanı gözüyle, mevcut mimari (Hero, Header, CTA bileşenleri ve index.astro yapısı) üzerinden gerçekleştirilen analiz raporunuz aşağıdadır. Sistem, teknik olarak çok güçlü ve premium (Cyberpunk/Tech hissiyatlı) tasarlanmış olsa da, **"Dönüşüm Hunisindeki Çatlaklar"** ve **"Bilişsel Yük"** açısından optimize edilmesi gereken kritik alanlar barındırmaktadır.

İstediğiniz 19 farklı çerçeve üzerinden detaylı strateji ve çözüm planı sunulmuştur.

---

## 1. Value Proposition Canvas (Değer Önerisi Tuvali)
Kullanıcının neden sizi seçmesi gerektiğini ve sitenin bu ihtiyaca nasıl yanıt verdiğini analiz eder.
*   **Müşteri İşleri (Customer Jobs):** Bozulan DSG şanzımanı tamir ettirmek, kazıklanmadan doğru teşhisi almak, işe gitmek için arabayı hızlıca geri almak.
*   **Ağrılar (Pains):** Yetkili servisin çok pahalı olması, sanayi ustalarına güvenememe, arızanın tekrarlaması endişesi, sürpriz maliyetler.
*   **Kazançlar (Gains):** Şeffaf fiyatlandırma, garantili işçilik, teknik olarak yetkin (mühendis düzeyinde) muhatap bulmak.
*   **Acı Kesiciler (Pain Relievers):** Sitedeki "Net Teşhis, Net Fiyat" (Sürpriz maliyetlere son) vurgusu.
*   **Kazanç Yaratıcılar (Gain Creators):** "20 yıllık uzmanlık", "SYS.DIAGNOSTIC" hissiyatıyla verilen ileri teknoloji güveni.
*   **Sorun/Kaçış Yolu:** "Net Fiyat" vadediliyor ama kullanıcıya fiyatı **göstermiyorsunuz**, sadece araması isteniyor ("FİYAT İSTE"). Fiyat aralıklarını (veya bir fiyat modülünü) görmeden aramak istemeyen kullanıcı siteden kaçar.

## 2. AARRR Framework (Korsan Metrikleri)
Dönüşüm hunisinin 5 aşaması.
*   **Acquisition (Edinme):** SEO ve reklam tabanlı trafik. Sitenin açılış hızı (Astro) ve preload yapıları edinmeyi güçlendiriyor.
*   **Activation (Aktivasyon - İlk Etkileşim):** Kullanıcı siteye giriyor, Matrix hissiyatlı tasarımı görüyor (Vaov etkisi). Fakat Hero'daki "HEMEN RANDEVU AL" (telefon açar) ve Header'daki "FİYAT İSTE" (telefon açar) aynı yere (aramaya) yönlendiriyor. Introvert (çekingen) kullanıcı için form bazlı aktivasyon eksik.
*   **Retention (Elde Tutma):** Mobil ticker (Kayan yazı) elde tutmayı uzatıyor ama okunması bitince kullanıcı sayfayı terk edebilir.
*   **Referral (Tavsiye):** Yıldızlar Grup kurumsal imajı ve 5/5 Google puanı güven veriyor.
*   **Revenue (Gelir - Nihai Dönüşüm):** Arama yapanların kaçı servise geliyor? "ONLİNE RANDEVU" butonu `/iletisim` sayfasına gidiyor. İletişim sayfasında sadece klasik form varsa, bu bir randevu deneyimi değildir, dönüşümü düşürür.

## 3. Kök Neden Analizi (5 Neden - 5 Whys)
**Sorun:** Mobil cihazlardan gelen trafiğin yüksek olmasına rağmen, sayfadaki CTA butonlarına tıklama oranlarının beklenenden düşük olma ihtimali (Varsayımsal).
1.  **Neden?** Çünkü kullanıcılar mobilde CTA butonunu anında göremiyor veya aksiyon alamıyor.
2.  **Neden?** Header'da mobilde bir CTA yok (sadece hamburger menü var), Hero'daki animasyon çok dikkat çekiyor.
3.  **Neden?** Tasarımda "Tech/Cyberpunk" tanılamalara (SYS.DIAGNOSTIC) öncelik verilmiş, dönüşüm butonu menü içine (HEMEN ARA) veya ekranın altına saklanmış.
4.  **Neden?** Estetik kaygılar ve animasyon tutkusu, kullanılabilirlik ve dönüşüm odaklı tasarımın önüne geçmiş.
5.  **Kök Neden:** Mobil kullanıcı için "Thumb Zone" (Başparmak bölgesi) içerisinde sabit (sticky) bir hızlı iletişim veya WhatsApp butonu entegrasyonu eksik. (Floating widget olsa bile Header'da kayboluyor).

## 4. Gap Analizi (Boşluk Analizi)
*   **Mevcut Durum:** 3 farklı CTA metni kullanılıyor: "FİYAT İSTE" (tel), "HEMEN RANDEVU AL" (tel), "ONLİNE RANDEVU" (/iletisim). Kullanıcının ne yapması beklendiği karmaşık.
*   **İstenen Durum:** Tekil, net ve sürtünmesiz bir ana dönüşüm eylemi (Primary CTA) ve bir adet destekleyici eylem (Secondary CTA).
*   **Boşluk (Gap):** Kullanıcı niyetine göre ayrıştırılmış huni eksikliği. "Ara" vs "Whatsapp'tan Yaz" vs "Fiyat Hesapla" (örn: basit bir vites tipi seçimi büyücüsü).
*   **Eylem:** CTA terminolojisi standardize edilmeli. "Fiyat İste" ise bir Fiyat Wizard'ına/Formuna gitmeli.

## 5. SWOT Analizi (CRO Perspektifinden)
*   **Güçlü Yönler (Strengths):** İnanılmaz hızlı altyapı (Astro), çok güçlü görsel dil, niş uzmanlık (sadece DSG), güven veren metinler.
*   **Zayıf Yönler (Weaknesses):** Bilişsel yük yüksek. Hareket eden çok fazla element var (Marquee, Scanning Line, Pulse efektleri). Dikkati CTA'den uzağa çekebilir (Vampir Etkisi).
*   **Fırsatlar (Opportunities):** Türkiye pazarında bu kalitede bir oto servis sitesi yok. "DSG Sorunu" çok acılı bir problemdir, güven verildiği an dönüşüm %80'dir. Basit bir WhatsApp teşhis hattı entegrasyonu ile dönüşüm uçurulabilir.
*   **Tehditler (Threats):** Mobil cihazlarda performans veya UI karmaşası nedeniyle yaşlı/teknolojiden uzak hedef kitlenin (45-60 yaş arası araç sahipleri) korkup çıkması.

## 6. SWOT'a Bağlı TOWS / Gap Kapatma Pratiği: Scamper
Sitedeki CTA'lere SCAMPER tekniği uygulama:
*   **S (Substitute):** Sadece "Ara" butonunu, "Şasi No ile Anında Fiyat Al" WhatsApp botu butonuna dönüştür.
*   **C (Combine):** SYS.DIAGNOSTIC animasyonu ile CTA'i birleştir. Animasyon bittiğinde "Araç Teşhis Edildi: Uzmanla Görüş" butonu çıksın.
*   **A (Adapt):** Kullanıcı aşağı kaydırdığında (Scroll), Header'daki "FİYAT İSTE" butonu yerine bir "WhatsApp" sticky butonu belirsin.
*   **M (Modify):** CTA butonlarındaki `tel:` tıklamaları bazı kullanıcıları tedirgin eder; tıklandığında bir Modal açılıp "Sizi Arayalım mı yoksa Siz mi Ararsınız?" seçeneği sunulabilir.
*   **P (Put to another use):** Diagnostik panelini sadece görsel şov değil, gerçek bir interaktif arıza tespit mini-testine dönüştürün ("Vites geçişinde silkelenme mi var?" -> Evet -> Çözüme Git).
*   **E (Eliminate):** CTA Section içindeki "Kurumsal" sayfa yönlendirmesini ana dönüşüm hunisinden kaldırın, dikkat dağıtıyor.
*   **R (Reverse):** "Kullanıcı bize ulaşsın" yerine "Biz ona 5 dakikada ulaşalım" (Callback widget).

## 7. BCG Matrisi (Ürün/Sayfa Optimizasyonu)
Site sayfalarını/özelliklerini gruplayalım:
*   **Yıldızlar (Stars):** DSG Teşhis & Tamir hizmeti (Ana gelir kaynağı). Hero alanı buraya yönlendiriyor. Maksimum bütçe ve odak (CRO) buraya verilmeli.
*   **İnekler (Cash Cows):** Standart rutin bakımlar. Sitede çok öne çıkmıyor, sürekli akar sağlar. CTA: "Özel Servis Bakım Randevusu".
*   **Soru İşaretleri (Question Marks):** "Online Randevu" sistemi. Gerçekten iletişim formunu dolduran oluyor mu? Optimize edilmezse Köpek sıfına inebilir.
*   **Köpekler (Dogs):** Sadece laf kalabalığı yapan uzun kurumsal metinler (Hakkımızda içindeki gereksiz detaylar). Ziyaret edilir ama dönüşüm getirmez.

## 8. Eisenhower Matrisi (CRO Görev Önceliklendirmesi)
*   **Acil ve Önemli (Hemen Yap):** Hero CTA ve Header CTA arasındaki `tel:` vs `/iletisim` kafa karışıklığını gidermek. Tüm butonların tutarlı bir terminolojiye sahip olmasını sağlamak. Mobil headera telefon veya whatsapp ikonu koymak.
*   **Önemli ama Acil Değil (Planla):** `/iletisim` sayfasındaki formu basit, sürtünmesiz bir "DSG Fiyat Teklif Formu" veya "Wizard" haline getirmek.
*   **Acil ama Önemli Değil (Delege Et):** Matrix kodlari veya Marquee'deki metinleri ara ara editlemek.
*   **Acil Değil ve Önemli Değil (Bırak):** Siteye daha fazla animasyon veya glow efekti eklemek (Bilişsel yükü artırır).

## 9. RICE Skorlama Modeli (Çözüm Önerileri İçin)
*Öneri: Mobilde sabit bir alt bar (Sticky Bottom Bar) "WhatsApp'tan Fiyat Sor | Hemen Ara" oluşturmak.*
*   **Reach (Erişim):** %100 (Tüm mobil kullanıcılar görecek) -> Skor: 10
*   **Impact (Etki):** Dönüşümü doğrudan artırır -> Skor: 3 (Yüksek)
*   **Confidence (Güven):** A/B testleriyle kanıtlanmış sektör standardı -> Skor: %90
*   **Effort (Efor):** 1-2 saatlik Tailwind/Astro kodlaması -> Skor: 1 (Çok düşük efor)
*   **RICE Skoru:** (10 * 3 * 0.90) / 1 = **27 (Kesinlikle yapılmalı)**

## 10. Impact-Effort Matrix (Etki - Çaba Matrisi)
*   **Hızlı Kazanımlar (Quick Wins - Yüksek Etki, Düşük Çaba):** CTA buton metinlerini birleştirmek (örn: hepsini "Whatsapp'tan Anında Fiyat Al" veya "Arızayı Anlatın, Fiyat Verelim" yapmak).
*   **Büyük Projeler (Major Projects - Yüksek Etki, Yüksek Çaba):** İletişim sayfasını "DSG Arıza Sihirbazı" (Wizard) olarak yeniden kodlamak (Adım 1: Araç Modeli, Adım 2: Belirti, Adım 3: Telefonunuz).
*   **Dolgu İşler (Fill-ins - Düşük Etki, Düşük Çaba):** Buton hover animasyon sürelerini değiştirmek.
*   **Teşekkürsüz İşler (Thankless Tasks - Düşük Etki, Yüksek Çaba):** Diagnostik panelin mobil versiyonuna gerçek veri/API bağlamak (Görsel olması şimdilik yeterli).

## 11. Kano Modeli
Kullanıcı deneyimi beklentileri:
*   **Temel Özellikler (Must-haves):** Tıklanabilir ve çalışan, anında servise bağlayan net bir telefon numarası. Hızlı açılan sayfalar.
*   **Performans Özellikleri (Performance):** WhatsApp üzerinden hızlı yanıt, "Net Fiyat" alınabilecek formlar, kolay randevu.
*   **Heyecan Vericiler (Delighters):** Hero section'daki SYS.DIAGNOSTIC arayüzü, Matrix ticker. Bu tarz detaylar müşteriyi şaşırtır ve "Bunlar teknolojiden anlıyor" algısını (Halo Effect) mükemmel yaratır. Ancak delighter'lar, Must-have'lerin (örneğin butonun ne işe yaradığının netliği) önüne geçmemelidir.

## 12. Balanced Scorecard (Dengeli Puan Kartı)
Operasyonel hedeflere CRO yaklaşımı:
1.  **Müşteri Boyutu:** Müşterinin endişesini ("Ne kadar tutar?") web sitesinin ilk saniyesinde gidermek.
2.  **İç Süreçler Boyutu:** Gelen aramaların / formların "Çöp arama" ("Yağ değişimi yapıyor musunuz?") yerine "Nitelikli Lead" (DSG tamiri) olmasını sağlayacak filtreleyici CTA metinleri kullanmak.
3.  **Öğrenme ve Gelişim:** Sitede hangi CTA'in (Arama vs Randevu) daha çok tıklandığını Event Tracking ile ölçmek.
4.  **Finansal Boyut:** UX yatırımlarının doğrudan Yüksek Kar Marjlı (Mekatronik/Volant) tamirlerine yönlendirmesini sağlamak.

## 13. KPI Çerçeve Analizi (Ölçümlenecek Temel Performans Göstergeleri)
*   **Macro CTA Click Rate:** Hero ve Navbar CTA butonlarına tıklanma oranı.
*   **Bounce Rate (Hemen Çıkma Oranı):** Görsellik çok olduğu için siteyi karmaşık bulan çıkıyor mu?
*   **Form Submission Rate:** `/iletisim` sayfasına gidip formu doldurmadan çıkanların oranı.
*   **Time-to-Action:** Kullanıcının siteye girmesiyle CTA'ye tıklaması arasında geçen süre.

## 14. OKR Çerçeve Analizi
*   **Objective (Hedef):** Ziyaretçiden "Nitelikli Randevu/Çağrı" alma oranını optimize etmek.
*   **Key Result 1:** "Hemen Ara" ve "Randevu Al" mobil tıklanma oranını %25 artırmak.
*   **Key Result 2:** İletişim sayfasından gelen form dönüşümünü aylık bazda x adetten y adede çıkarmak.
*   **Key Result 3:** Ziyaretçilerin yanlış beklenti ile arama oranını %10'un altına indirmek.

## 15. Double Diamond Framework (Tasarım Odaklı Çözüm Süreci)
*   **Discover (Keşfet):** Müşteri neden siteden çıkıyor? (Belki fiyat göremediği için, belki UX/UI ona çok oyunsu geldiği için).
*   **Define (Tanımla):** CTA'ler dağınık, her biri farklı komut veriyor (Ara, Fiyat İste, Online Randevu).
*   **Develop (Geliştir):** Alternatif CTA setleri yarat. Mobilde Sticky Bar ekle.
*   **Deliver (Sun):** Kodları uygula ve sonuçları ölç (UTM ve Event Tracking).

## 16. Six Thinking Hats (Altı Şapkalı Düşünme)
*   **Beyaz Şapka (Veri):** 3 farklı tür/hedefte CTA bağlamı var.
*   **Kırmızı Şapka (Duygu):** Site aşırı havalı ve güven veriyor, ancak kullanıcı fiyat sorarken çekinebilir ("Buraya gelirsem çok para alırlar, baksana sistem falan kurmuşlar").
*   **Siyah Şapka (Riskler):** Animasyonlar ve teknik terimler (Mekatronik, Volant) arabadan hiç anlamayan sürücüyü korkutabilir. Butonlar `tel:` yönlendirdiği için form doldurmayı bekleyen kullanıcıyı kaybedebiliriz.
*   **Sarı Şapka (Faydalar):** Teknolojik algı %100 yerleşmiş, marka bilinirliği için harika.
*   **Yeşil Şapka (Yaratıcılık):** Neden "Arıza Sesini Dinlet" veya "Sorununu Seç, Fiyatı Gör" sihirbazı yapmıyoruz?
*   **Mavi Şapka (Kontrol):** Sitedeki tüm CTA'ler standartlaşmalı, sürtünme sıfıra inmeli. A/B testi yapılmalı.

## 17. Stakeholder Analizi (Paydaş Beklentileri)
*   **Site Sahibi (Emrah):** "Bana arıza soran ama parası olan, servisime gelip arabasını bırakacak ciddi müşteri gelsin."
*   **Teknisyen/Servis:** "Gelen formda şasi numarası veya tam arıza kodu/geçmiş olsun ki direkt teşhis koyalım."
*   **Müşteri:** "Arbam titriyor, kaç para tutar, bugün yaparlar mı, garanti verirler mi? Onu bilmek istiyorum."
*   **Çatışma (Friction):** Müşteri anonim fiyat ister, servis şasi no ve kontrol ister. *Ara Bulucu CTA:* "Tahmini Fiyat Aralığı İçin WhatsApp Tanışma Hattı".

## 18. RACI Matrisi (Aksiyon Dağılımı)
| Görev | Sorumlu (R) | Onaylayan (A) | Danışılan (C) | Bilgilendirilen (I) |
| :--- | :--- | :--- | :--- | :--- |
| CTA Metinlerinin Tekilleştirilmesi | AI Ajan (Antigravity) | Emrah | SEO Uzmanı | Servis Ekibi |
| Mobil Sticky Bottom Bar Kodlaması | AI Ajan | Emrah | UI Tasarımcı | Pazarlama |
| İletişim Formunu Wizard'a Çevirme | AI Ajan | Emrah | Teknisyen (Sorular için) | Müşteri Hizmetleri |
| Tıklama Analitiklerinin Kurulması | Performans Ajansı | Emrah | AI Ajan | Servis Ekibi |

## 19. Sensitivity Analysis (Duyarlılık Analizi - Senaryo Testi)
Tasarımda bir değişkeni değiştirdiğimizde ne olur?
*   **Değişken 1:** "HEMEN RANDEVU AL" (Turuncu Buton) metnini **"ÜCRETSİZ TEŞHİS İÇİN ARA"** olarak değiştirirsek:
    *   *Etki:* Tıklama oranı (CTR) dramatik şekilde artar. Ücretsiz ("Free") kelimesi mıknatıstır.
    *   *Risk:* Çöp aramaların (sadece bedava kontrol ettirmek isteyenler) artması.
*   **Değişken 2:** Tech animasyonları kapatıp sadece araba fotosu koyarsak:
    *   *Etki:* Sayfa daha geleneksel olur, güvenilir 'usta' hissiyatı artar, 'high-tech' hissiyatı düşer. Dönüşüm metinlere kalır. Sitenin ruhu (Value Prop) kaybolur. Yapılmamalı.
*   **Değişken 3:** Telefondan ziyade WhatsApp ikonunu %50 büyütüp titreşim eklersek:
    *   *Etki:* Çağrı merkezinin yükü düşer, asenkron iletişim artar, introvert kullanıcılar (lead'ler) daha kolay toplanır. Kesinlikle yapılmalı.

---

# 🚀 EYLEM VE ÇÖZÜM PLANI (Yol Haritası)

**PHASE 1: Bilişsel Yükü Azaltma ve CTA Konsolidasyonu (İlk 48 Saat)**
1. Sitedeki mesaj karmaşasını çözün.
   - Header CTA: *Mevcut:* `FİYAT İSTE` -> *Öneri:* `ARIZA DANIŞMA HATTI` veya sadece İkonlu Numara.
   - Hero CTA: *Mevcut:* `HEMEN RANDEVU AL` -> *Öneri:* `ÜCRETSİZ TEŞHİS İSTENİZ` (veya `USTAYLA GÖRÜŞ`).
   - CTA Section: *Mevcut:* `ONLİNE RANDEVU` -> *Öneri:* `/iletisim` formuna gidiyorsa adını `FİYAT TEKLİFİ AL` yapın.
2. Mobilde Header'a erişim zor. Tasarımı bozmadan mobil ekranın en altına Sticky (Sabit) bir "Hızlı İletişim Barı" (Sol yarısı Telefon, Sağ yarısı WhatsApp) ekleyin.

**PHASE 2: Huni Geliştirme (Form to Wizard - 1. Hafta)**
1. Mevcut iletişim sayfasındaki yapıyı (veya ayrı bir `/fiyat-hesapla` sayfası oluşturarak), 3 aşamalı, oyunlaştırılmış bir Arıza Seçim sihirbazına (Wizard) çevirin.
   - Adım 1: Araç Marka/Modeliniz?
   - Adım 2: Yaşadığınız Problem? (Kavrama titremesi, vuruntu, vites geçmemesi vb.)
   - Adım 3: Fiyat teklifini göndereceğimiz numaranız?

**PHASE 3: Güven Çerçevelerini Yeniden Konumlandırma (2. Hafta)**
1. Hero altındaki bilgi bloklarında "Bizi Arayın Fiyat Verelim" yerine, alt ve üst limitleri belirten (örn: "Doğru teşhisle arızanıza özel net bütçe sunuyoruz. %X'e varan tasarruf") minik bir bilgi notu ekleyerek "Çok Pahalıdır" korkusunu (Price Fear) kırın.
2. Tech animasyonlu "SYS.DIAGNOSTIC" panelinin yanına / altına, "Canlı Arıza Tespiti İmkanı" gibi bir tooltip ekleyerek bu görsel şovun gerçekten yetkinlikle eşleştiğini, süs olmadığını ispatlayın.

***

**Uygulama Notu:** Bu rapor, istenen tüm işletme/pazarlama analiz çerçevelerini sistem mimarisine uygulayarak çıkartılmıştır. Hangi maddeleri (Örn: Mobil Sticky Bar veya Metin Değişikliği) onaylarsanız, bunları sistemde kodlamaya doğrudan başlayabilirim.
