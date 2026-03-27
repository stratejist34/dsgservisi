Performans Denetimi Raporu — DSG Servisi
Tarih: 2026-03-16 | Astro: 4.15.4 | Platform: Vercel Static

1. Genel Yargı
Sınıf: Kısmen bozulmuş static Astro + Teknik borç birikimi

Proje temelde SSG (Static Site Generation) ile çalışıyor ve hiçbir SSR/edge function tetiklenmiyor. Bu iyi. Ancak çok sayıda "iyi niyetle yapılmış ama yanlış uygulanmış" optimizasyon kararı var. Özellikle hero image preload'u tüm sayfalarda aktif, bu tek başına ciddi bir performans regresyonu. Dört font ailesi dış CDN'den yükleniyor. Inline JS ve CSS'in miktarı, her sayfanın HTML boyutunu şişiriyor ve browser cache'ini devre dışı bırakıyor. client:only="react" yanlış kullanılmış. Bunlar tek tek küçük görünür ama toplamda anlamlı request ve parsing maliyeti yaratıyor.

Proje "çalışıyor" ama peak verimde değil.

2. En Kritik 10 Sorun
SORUN 1 — Hero Görseli Tüm Sayfalarda fetchpriority="high" ile Preload Ediliyor
Kanıt: BaseLayout.astro:96-116


<link rel="preload" href="/images/hero-bg-480.avif" as="image"
  media="(max-width: 480px)" fetchpriority="high" />
<link rel="preload" href="/images/hero-bg-768.avif" as="image"
  media="(min-width: 481px) and (max-width: 1024px)" fetchpriority="high" />
<link rel="preload" href="/images/hero-bg-1920.avif" as="image"
  media="(min-width: 1025px)" fetchpriority="high" />
Hero görseli sadece index.astro'daki Hero.astro component'inde kullanılıyor. Ama bu preload BaseLayout'ta tanımlı — yani her blog yazısı, her kategori sayfası, iletişim sayfası, hakkımızda sayfası bu üç görseli fetchpriority="high" ile preload ediyor. Yüksek öncelikli bir görselin browser'a "önce bunu indir" demesi, o sayfanın gerçek LCP görselini (blog featured image gibi) geciktiriyor.

Edge request etkisi: Her homepage dışı sayfa ziyaretinde 1 gereksiz AVIF indirilir (tahminen 50-300KB). İlk ziyarette cache yok, direkt indirilir.
Etki puanı: 9/10
Düzeltme zorluğu: Düşük (preload'ı BaseLayout'tan çıkar, sadece index.astro'ya taşı)
Teknik borç riski: Düşük
Önerilen çözüm: <slot name="head" /> zaten var. BaseLayout'taki preload'ları kaldır, index.astro'dan bu slot aracılığıyla ver.
Beklenen fayda: Yüksek — blog ve servis sayfalarında LCP süresi düşer, yanlış prioritize edilmiş bandwidth serbest kalır.
SORUN 2 — 4 Font Ailesi, Dış CDN, Toplamda 12+ Ağ İsteği
Kanıt: BaseLayout.astro:75-91


Oswald: 400, 500, 600, 700 → 4 weight
Inter: 400, 600, 700 → 3 weight
Rajdhani: 500, 600, 700 → 3 weight
Titillium Web: 600 → 1 weight
= 11 font dosyası + 1 CSS isteği = 12 Google Fonts isteği
Async loading (media="print" trick) render'ı bloklamıyor, bu doğru. Ama 12 external request yine de:

fonts.googleapis.com → DNS + TCP + TLS + CSS request
fonts.gstatic.com × 11 → her font dosyası için ayrı request
FOUT (Flash of Unstyled Text) riski — display=swap ile kaçınılmaz
Self-host edilmemiş → Vercel CDN cache'inin dışında, her kullanıcı bu requestleri yapıyor
Etki puanı: 8/10
Düzeltme zorluğu: Orta (font download + @font-face CSS + path güncelleme)
Teknik borç riski: Düşük
Önerilen çözüm: Fontu ikiye indir (başlıklar için 1, body için 1), fontsource veya manuel self-host. /public/fonts/ altına yükle, @font-face ile sun, font-display: swap koru.
Beklenen fayda: Yüksek — 12 external request → 0 external request.

SORUN 3 — inlineStylesheets: 'always' — Her Sayfa CSS Taşıyor, Hiçbiri Cache'lenmiyor
Kanıt: astro.config.mjs:82


build: {
  inlineStylesheets: 'always',
}
Bu ayar tüm CSS'i her sayfanın HTML'ine gömer. Sonuç:

Tailwind + component CSS + reveal.css + global.css → hepsi her sayfanın <style> tag'lerinde
Tahmini ek yük: sayfa başına 15–50KB ek HTML (Tailwind purge ile değişir)
Browser bu CSS'i cache'leyemez — her sayfada yeniden parse eder
30 sayfa × 30KB = tekrar eden veri transferi
cssCodeSplit: true ile birleşince Vite CSS chunk'larını ayırıyor ama hepsi inline ediliyor. Bu iki ayar çelişkili bir yön belirliyor.

Etki puanı: 7/10
Düzeltme zorluğu: Düşük (ayarı değiştir)
Teknik borç riski: Düşük
Önerilen çözüm: inlineStylesheets: 'auto' kullan. Astro küçük component CSS'lerini inline'lar, büyükleri external dosya olarak çıkarır ve bunlar hash'li isimlerle _assets/ altında, immutable cache ile sunulur.
Beklenen fayda: Orta-yüksek — tekrar eden sayfa ziyaretlerinde CSS re-parse sıfırlanır, transfer byte düşer.

SORUN 4 — Hero Image Preload ile Çelişen: client:only="react" LazyFloatingWidgets'ta
Kanıt: BaseLayout.astro:381


<LazyFloatingWidgets client:only="react" ... />
client:only Astro'da client:load gibi davranır — React runtime sayfa yüklenir yüklenmez initialize edilir. Component içi lazy loading (React.lazy + useState) gecikmeli yüklüyor ama React bundle (React + ReactDOM ≈ 130-150KB gzip'siz) sayfa load'unda indirilir ve execute edilir.

Eğer Stats ve Reviews client:visible ile geciktirilerek React'ın yüklenmesi erteleniyorsa, bu widget client:only ile o erteleyi iptal ediyor. Homepage'de Stats zaten fold yakınında olduğu için pratik fark küçük olabilir (varsayım), ama blog sayfalarında (React sadece TOC için gerekli) fark netleşiyor.

Etki puanı: 6/10 (blog sayfaları için 7/10)
Düzeltme zorluğu: Düşük
Teknik borç riski: Düşük
Önerilen çözüm: client:idle kullan. React zaten başka component'lar için yüklenecek, ama idle zamanında başlayacak.
Beklenen fayda: Orta — özellikle blog sayfalarında INP ve TBT iyileşir.

SORUN 5 — GA Event Tracker + Scroll/Reveal Script Tüm Sayfalarda Inline, Cache Yok
Kanıt: BaseLayout.astro:586-1016

Üç büyük <script is:inline> bloğu var:

Widget trigger (~15 satır)
Scroll/Reveal + IntersectionObserver + MutationObserver (~200 satır)
Call modal logic (~80 satır)
GA event tracker (~120 satır) — her click'i dinliyor, gtag() çağırıyor
Toplam: ~415 satır inline JS, her HTML sayfasında tekrar ediyor. is:inline Vite tarafından işlenmez, minify edilmez (bağımsız olarak). Browser her sayfa yüklenişinde bu kodu parse eder — cache edilemez.

Ayrıca 'AW-17636981832' (Google Ads conversion ID) hardcoded. Env var değil.

Etki puanı: 6/10
Düzeltme zorluğu: Orta (external dosya + is:inline kaldırma)
Teknik borç riski: Orta (inline script'ler zamanla büyümeye devam eder)
Önerilen çözüm: Büyük script bloklarını src/scripts/ altına .js dosyası olarak çıkar. Astro <script src="..."> ile import et — Vite bundle'lar, minify eder, hash'ler, immutable cache'le sunar.
Beklenen fayda: Orta — parse time azalır, cache aktif olur, kod yönetimi iyileşir.

SORUN 6 — TableOfContents client:load + Scroll Handler'da getBoundingClientRect()
Kanıt: [slug].astro:199 + TableOfContents.tsx:83-113


// Her scroll event'te:
const placeholderRect = placeholderRef.current.getBoundingClientRect();
const containerHeight = containerRef.current.offsetHeight;
const contentRect = contentColumn?.getBoundingClientRect();
const footerRect = footer?.getBoundingClientRect();
İki sorun:

client:load — sayfa yüklenir yüklenmez React hydrate eder, TOC genellikle ekranda görünmez (sayfanın sağ kenarı). client:visible veya client:idle daha uygun.
Scroll handler throttle'sız getBoundingClientRect() çağrıları forced layout reflow yaratır. Her scroll tick'inde layout hesaplanır. Comment: "JS Based - The One That Worked" — bu CSS sticky'nin çalışmadığına işaret ediyor, yani workaround. Jank üretir.
Etki puanı: 7/10 (tüm blog sayfaları etkileniyor)
Düzeltme zorluğu: Orta
Teknik borç riski: Yüksek (kırılgan workaround)
Önerilen çözüm: Kısa vadede client:idle'a geç ve scroll handler'ı requestAnimationFrame ile throttle et. Uzun vadede CSS sticky implementasyonunu doğru layout ile dene.
Beklenen fayda: Yüksek — blog sayfalarında INP ve scroll smoothness iyileşir.

SORUN 7 — İki IntersectionObserver + Sürekli Aktif MutationObserver
Kanıt: BaseLayout.astro:602 ve 671, 720-733

Her sayfada io ve immediateIO olmak üzere iki IntersectionObserver yaratılıyor ve her ikisi de aynı elementleri observe ediyor. Ayrıca MutationObserver tüm document.body'yi childList: true, subtree: true ile izliyor — bu React render'larını da kapsar.

React component mount/unmount yaptığında MutationObserver tetiklenir ve her yeni eklenen elementi IntersectionObserver'a ekler. Bu gereksiz.

Etki puanı: 4/10
Düzeltme zorluğu: Orta
Teknik borç riski: Orta
Önerilen çözüm: Tek IO kullan, immediateIO'yu rootMargin: "50px" yerine mevcut IO'ya merge et. MutationObserver kapsamını sınırla veya React componentleri data-reveal kullanmıyorsa kaldır.
Beklenen fayda: Düşük-orta.

SORUN 8 — Dual Redirect Sistemi: Vercel + Astro Config
Kanıt: vercel.json:3-12 + astro.config.mjs:127-147


// vercel.json — Vercel edge'de çalışır:
"/blog/:slug" → "/:slug"
"/category/:slug" → "/blog"

// astro.config.mjs — build output'a derlenir (de Vercel edge'e gider):
"/sanziman-revizyonu" → "/dsg-sanziman-tamiri"
Her iki redirect seti de Vercel edge'de çalışır. Farklı yerlerde tanımlı olduğu için:

Bakım karmaşıklığı: Redirect nerede? İkisine de bakman gerekir.
Chain riski: Eğer astro.config.mjs'teki bir destination, vercel.json'daki bir source'a denk gelirse 301→301 chain oluşur.
Şu anki setlerde belirgin bir chain yok (kanıtım var, chain yok). Ama sistem büyüdükçe risk artar.

Etki puanı: 4/10
Düzeltme zorluğu: Düşük (sadece consolidate et)
Teknik borç riski: Yüksek (ölçeklendirilemeyen yapı)
Önerilen çözüm: Tüm redirect'leri tek yerde topla. Vercel deployları için vercel.json tercih edilir (daha az build bağımlılığı, daha hızlı güncellenebilir). Astro config'deki redirect'leri vercel.json'a taşı.
Beklenen fayda: Düşük (edge request'e etkisi yok), teknik borç azalması yüksek.

SORUN 9 — autoConvertImages() Her Build'de Çalışıyor
Kanıt: astro.config.mjs:18-33


'astro:build:start': async () => {
  execSync('node scripts/convert-images.mjs', { stdio: 'inherit' });
}
Her build'de tüm görseller yeniden convert ediliyor. execSync senkron → build thread'ini bloklar. Eğer 50+ görsel varsa (public/images/blog/ altında çok sayıda dosya var), bu her deploy'da dakikalarca ek süre ekleyebilir. Ayrıca kaynak görsel değişmemişse, aynı görseli tekrar tekrar dönüştürmek anlamsız.

Etki puanı: 5/10 (build süresi, dolaylı olarak deploy güvenilirliği)
Düzeltme zorluğu: Orta
Teknik borç riski: Orta
Önerilen çözüm: Script'e hash/checksum kontrolü ekle — sadece değişen kaynakları convert et. Ya da görselleri pre-commit hook'ta convert edip commit'le, build'den tamamen çıkar.
Beklenen fayda: Orta — build süresi azalır.

SORUN 10 — server.headers Production'da Etkisiz
Kanıt: astro.config.mjs:87-91


server: {
  headers: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
},
Bu ayar yalnızca astro dev (geliştirme sunucusu) için geçerlidir. Vercel deployment'ta hiçbir etkisi yoktur. Production cache headers'ı vercel.json veya Vercel dashboard üzerinden yönetilir. Bu ayar, gerçek cache davranışı hakkında yanlış bir güven duygusu yaratıyor.

Etki puanı: 2/10 (kendisi zararsız, yanıltıcı)
Düzeltme zorluğu: Düşük (sil)
Teknik borç riski: Orta (yanlış anlaşılma riski)
Önerilen çözüm: Kaldır. Statik asset cache'ini vercel.json headers bölümüne ekle:


{ "source": "/_assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
Beklenen fayda: Düşük (doğruluk), ama kritik cache davranışını vercel.json'a taşımanın yan etkisi olarak orta.

3. Gereksiz Edge Request Kaynakları
Kaynak	Gerçek Sorun mu?	Ne Kadar Etkili?
Hero AVIF preload (tüm sayfalar)	Evet, kritik	Yüksek — her non-homepage sayfa görsel indirir
Google Fonts (12 request)	Evet	Orta — external, Vercel sayması yok ama user bandwidth ve latency etkili
Vercel /_vercel/image endpoint	Kısmen	İlk request edge function → cache'lenir. Sorun değil, 5 size × 2 format = 10 variant per image
Redirect chains riski	Potansiyel, şimdilik yok	Düşük şimdilik
Sitemap (dinamik)	Normal	Static XML dosyası, edge cache'lenir
/public/images/ (hash'siz)	Kısmen sorun	ETag ile revalidate → her ziyaret küçük request
GA + GTM	External, Vercel'e düşmez	Yok (Vercel edge'i etkilemez)
Favicon (3 format)	Normal davranış	Düşük — browser sadece 1 tanesini indirir
robots.txt, sitemap	Normal	Tamamen cache'lenir
/_assets/ JS/CSS	Normal, iyi	Hash'li, immutable — edge cache mükemmel
Inline script parse	Runtime (CPU)	Parse cost her sayfada, network değil
MutationObserver (React render'lar)	Runtime	CPU, network değil
4. CDN Perspektifi
Şu anki durum: Vercel static site olarak tüm içeriği global edge'den sunuyor. HTML, JS, CSS, AVIF hepsi Vercel CDN'inde.

Harici CDN (Cloudflare gibi) eklenirse ne değişir?

Request Türü	Mevcut (Vercel)	CDN Sonrası
Statik HTML	Vercel edge	Cloudflare → Vercel (stale varsa Cloudflare, yoksa Vercel)
/_assets/*.js	Vercel edge, immutable	Cloudflare cache hit → Vercel'e düşmez
/public/images/*.avif	Vercel edge, ETag	Cloudflare cache'de kalır uzun süre
Redirect (301)	Vercel edge	Cloudflare, Vercel'e iletmeden redirect yapabilir
GA/GTM	External	External (değişmez)
Google Fonts	External	External (değişmez)
Tahmini iyileşme potansiyeli (varsayım — trafik verisi olmadan kesin söylenemez):

Vercel edge request azalması: %20–50 (Cloudflare'in cache hit oranına bağlı)
Türkiye trafiği için latency: Cloudflare'in İstanbul PoP'u varsa marginal iyileşme, Vercel'in de global edge'i var
Maliyet farkı: Cloudflare free tier, Vercel bandwidth ücretini azaltabilir (büyük hacimde anlamlı)
Bu sitenin trafik hacminde (yerel işletme): Harici CDN eklemek erken optimizasyon. Önce yukarıdaki 10 sorunu düzelt, sonra CDN değerlendirmeye al.
5. Static-first Düzeltme Planı
Hemen Yapılacaklar (1 saat veya az)
Hero preload'u BaseLayout'tan çıkar → index.astro <slot name="head"> ile uygula.
client:only="react" → client:idle (LazyFloatingWidgets)
inlineStylesheets: 'always' → 'auto' (astro.config.mjs)
server.headers bloğunu sil (astro.config.mjs)
TableOfContents: client:load → client:idle
AnimatedServiceList: client:load → client:visible
Orta Vadeli Düzeltmeler (1–3 gün)
Font self-hosting: 4 aile → 2 aile, self-host, /public/fonts/
Inline script'leri external dosyaya çıkar: GA tracker + reveal script → src/scripts/ → Astro <script> ile import
TableOfContents scroll handler'ını requestAnimationFrame ile throttle et
Redirect'leri tek yerde topla (vercel.json)
vercel.json headers'ına /_assets/ için immutable cache ekle
Refactor Gerektirenler (daha büyük iş)
autoConvertImages() → checksum-based incremental conversion
TableOfContents sticky: CSS sticky ile yeniden dene (layout sorununu çöz)
Dual IntersectionObserver → tek IO ile merge et
MutationObserver kapsamını daralt
6. Uygulanabilir Kod Değişiklikleri
Değişiklik 1: Hero Preload'u Sadece Anasayfaya Taşı
BaseLayout.astro:96-116 — Kaldır:


{/* KALDIR — sadece index.astro'ya taşınacak */}
<link rel="preload" href="/images/hero-bg-480.avif" ... />
<link rel="preload" href="/images/hero-bg-768.avif" ... />
<link rel="preload" href="/images/hero-bg-1920.avif" ... />
src/pages/index.astro — Ekle:


<BaseLayout title={...} description={...}>
  <Fragment slot="head">
    <link rel="preload" href="/images/hero-bg-480.avif" as="image"
      media="(max-width: 480px)" fetchpriority="high" />
    <link rel="preload" href="/images/hero-bg-768.avif" as="image"
      media="(min-width: 481px) and (max-width: 1024px)" fetchpriority="high" />
    <link rel="preload" href="/images/hero-bg-1920.avif" as="image"
      media="(min-width: 1025px)" fetchpriority="high" />
  </Fragment>
  ...
Neden daha iyi: Blog, servis, iletişim sayfaları gereksiz görsel yüklemez. Blog LCP (featured image) artık rakipsiz.

Değişiklik 2: astro.config.mjs — Üç Satır Düzeltme

// ÖNCE:
build: {
  inlineStylesheets: 'always',
  assets: '_assets',
},
server: {
  headers: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
},

// SONRA:
build: {
  inlineStylesheets: 'auto',  // CSS external dosya → cache'lenebilir
  assets: '_assets',
},
// server.headers kaldırıldı (dev-only, production'da etkisiz)
Değişiklik 3: Hydration Direktifleri

// [src/layouts/BaseLayout.astro:381] — ÖNCE:
<LazyFloatingWidgets client:only="react" ... />

// SONRA:
<LazyFloatingWidgets client:idle ... />

// [src/pages/[slug].astro:199] — ÖNCE:
<TableOfContents client:load contentId="article-content" />

// SONRA:
<TableOfContents client:idle contentId="article-content" />

// [src/pages/hizmetlerimiz.astro:71] — ÖNCE:
<AnimatedServiceList client:load />

// SONRA:
<AnimatedServiceList client:visible />
Değişiklik 4: vercel.json — Statik Asset Cache + Redirect Consolidation

{
  "headers": [
    {
      "source": "/_assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
Değişiklik 5: TableOfContents Scroll Throttle
TableOfContents.tsx:79-136 — Scroll handler'ı throttle et:


// ÖNCE:
window.addEventListener('scroll', handleScroll);

// SONRA:
let rafId: number | null = null;
const throttledScroll = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    handleScroll();
    rafId = null;
  });
};
window.addEventListener('scroll', throttledScroll, { passive: true });
Ayrıca { passive: true } eksik — eklenmeli.

7. Ölçüm Planı
Değişiklikleri deploy etmeden önce şu baseline metrikleri al:

Vercel Dashboard / Analytics
Edge request sayısı / gün
Bandwidth / gün
Cache hit rate (varsa)
Tarayıcı DevTools (Bir Blog Sayfasında)
Network sekmesi: Toplam request sayısı, toplam transfer byte, image request sayısı
hero-bg-*.avif isteği var mı? → Olmaması lazım (Sorun 1 fix sonrası)
Kaç adet fonts.gstatic.com isteği? → Sıfır olması lazım (Sorun 2 fix sonrası)
/_assets/*.css mı yoksa <style> mi? → Harici dosya olmalı (Sorun 3 fix sonrası)
Lighthouse (Mobile, Throttled 4G)
Metrik	Şu An (Tahmini)	Hedef
LCP	2.5–4s (blog)	< 2s
TBT	100–300ms	< 100ms
INP	150–300ms	< 150ms
CLS	< 0.1 (iyi)	Koru
TTFB	< 200ms (static)	Koru
WebPageTest (İstanbul veya Almanya)
First View vs Repeat View farkı — inlineStylesheets: 'auto' sonrası Repeat View iyileşmeli
Font yükleme waterfall'u — self-host sonrası external waterfall kaybolmalı
Request waterfall'da hero AVIF blog sayfasında görünmemeli
Request/Visitor Oranı (Varsa Analytics)
Beklenen: Statik site için 5–15 request/visitor
Yüksekse (20+): Cache miss veya bot trafiği araştır
8. Sonuç
Düşük Asılı Meyveler (Hemen, Yüksek Etki)
Hero preload'u BaseLayout'tan çıkar → Tüm non-homepage sayfalarda LCP iyileşir, bandwidth israfı sona erer.
inlineStylesheets: 'auto' → CSS cache'lenir, HTML boyutu düşer.
Hydration direktiflerini düzelt (client:only → client:idle, client:load → client:idle/visible) → TBT ve INP iyileşir.
Gizli Riskler
server.headers — Yanlış bir güven duygusu yaratıyor; production'da cache davranışı yönetilmiyor sanılıyor.
Dual redirect sistemi — Şu an çalışıyor, ama ilk redirect çakışmasında debug edilmesi zor.
autoConvertImages() build'de — Görsel sayısı büyüdükçe build süresi uzar, hata sessizce geçiliyor.
MutationObserver (body, subtree: true) — React mount/unmount'larını izliyor; yavaş sayfada gizlice CPU yiyor.
Yanlış Ama Çalışıyor Görünen Alanlar
"NUCLEAR PERFORMANCE OPTIMIZATION" yorumu ile client:only="react" — Tam tersi; React'ı ertelemek yerine anında başlatıyor.
Scroll+Reveal ile iki IO + MutationObserver — Karmaşık ama sadece animasyon için gereksiz fazla. Çalışıyor ama kırılgan.
autoConvertImages() integration — Build'de hata olursa catch ile sessizce geçiliyor; yanlış format servisi fark edilmeyebilir.
Yüksek Faydalı Düzeltmeler (Öncelik Sırası)
Hero preload fix (15 dakika, en yüksek etki)
inlineStylesheets: 'auto' (1 dakika)
Font self-hosting + aile azaltma (en büyük uzun vadeli kazanım, 1-2 gün)
Hydration direktif güncellemeleri (30 dakika)
GA/Reveal script'lerini external dosyaya çıkarma (2-4 saat)
İlk 3 Uygulanacak Değişiklik
#1 — Hero Preload'u BaseLayout'tan Çıkar → index.astro'ya Taşı
Dosya: src/layouts/BaseLayout.astro:96-116 (sil) + src/pages/index.astro (slot="head" ile ekle)
Süre: 15 dakika
Etki: Her blog/servis/iletişim sayfasında 1 gereksiz AVIF indirilmez. Blog LCP, featured image için rekabet etmez.

#2 — inlineStylesheets: 'auto' ve server.headers Kaldır
Dosya: astro.config.mjs:82-91
Süre: 5 dakika + 1 deploy
Etki: CSS artık hash'li dosya olarak sunulur, immutable cache alır. Tekrar ziyaretlerde CSS re-parse sıfırlanır. HTML boyutu düşer.

#3 — Font Self-Hosting (2 Aile)
Mevcut: 4 aile, 12 Google Fonts isteği/sayfa
Hedef: 2 aile (Inter body için, Oswald/Titillium başlık için — birini seç), self-host, 0 external font request
Dosyalar: /public/fonts/ + BaseLayout.astro:75-91
Süre: 1-2 gün
Etki: 12 external ağ isteği → 0. FOUT azalır. Sayfa hızı ölçümlerde en çarpıcı değişim buradan gelir.