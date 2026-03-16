// Google Analytics Event Tracker — Vite tarafından bundle/minify/cache edilir
const GA_ID = import.meta.env.PUBLIC_GA_ID;
if (GA_ID) {
  window.dataLayer = window.dataLayer || [];
  const gtag = (window.gtag = function () {
    dataLayer.push(arguments);
  });
  gtag('js', new Date());
  gtag('config', GA_ID);
  gtag('config', 'AW-17636981832');

  // Lazy load GA script
  let gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  ['mousedown', 'touchstart', 'scroll', 'keydown'].forEach((event) => {
    window.addEventListener(event, loadGA, { once: true, passive: true });
  });
  setTimeout(loadGA, 6000);

  // Global Event Tracker — Funnel Logic
  document.addEventListener(
    'click',
    function (e) {
      const link = e.target.closest('a');
      const button = e.target.closest('button');
      const target = e.target;
      const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop';
      const pagePath = window.location.pathname;
      const linkText = link
        ? (link.innerText || link.getAttribute('aria-label') || 'no-text').trim().substring(0, 40)
        : 'no-text';

      // Smart Location Detection (Contextual)
      let clickLocation = 'other';
      if (target.closest('header')) clickLocation = 'header';
      else if (target.closest('footer')) clickLocation = 'footer';
      else if (target.closest('.cta') || target.closest('[class*="cta"]')) clickLocation = 'cta_block';
      else if (
        target.closest('article') ||
        target.closest('.blog-content') ||
        target.closest('.prose')
      ) {
        if (target.closest('.cta')) clickLocation = 'blog_cta_section';
        else if (
          target.closest('h2')?.innerText.includes('İletişim') ||
          target.closest('p')?.previousElementSibling?.innerText?.includes('İletişim')
        )
          clickLocation = 'blog_bottom_contact';
        else clickLocation = 'blog_content_body';
      } else if (target.closest('.hero')) clickLocation = 'hero';
      else if (target.closest('.modal') || target.closest('.call-modal')) clickLocation = 'modal_popup';
      else if (target.closest('.sidebar') || target.closest('aside')) clickLocation = 'sidebar';

      // 1. Map Link Tracking
      if (link && link.href && (link.href.includes('maps.google') || link.href.includes('maps.app.goo.gl'))) {
        if (link.classList.contains('call-modal__action--ghost')) return;
        gtag('event', 'konum_linki_tiklandi', {
          device: deviceType,
          source_page: pagePath,
          click_location: clickLocation,
          link_text: linkText,
        });
      }

      // 2. Call Intent Tracking
      if (link && link.href && link.href.startsWith('tel:')) {
        gtag('event', 'call_intent_started', {
          event_category: 'funnel',
          device: deviceType,
          source_page: pagePath,
          click_location: clickLocation,
          link_text: linkText,
        });
      }

      // 3. WhatsApp Tracking
      if (link && link.href && (link.href.includes('wa.me') || link.href.includes('whatsapp.com'))) {
        gtag('event', 'whatsapp_button_click', {
          event_category: 'conversion',
          device: deviceType,
          source_page: pagePath,
          click_location: clickLocation,
          link_text: linkText,
        });
      }

      // 4. Call Confirmed (Modal Button)
      if (button && button.hasAttribute('data-call-now')) {
        gtag('event', 'call_confirmed', {
          event_category: 'conversion',
          device: deviceType,
          source_page: pagePath,
        });
      }

      // 4b. Modal Konum
      if (
        link &&
        link.classList.contains('call-modal__action--ghost') &&
        (link.innerText.toLowerCase().includes('konum') || link.innerText.toLowerCase().includes('aç'))
      ) {
        gtag('event', 'modal_konum_tiklandi', {
          event_category: 'engagement',
          device: deviceType,
          source_page: pagePath,
        });
      }

      // 5. Blog Yorumlar
      if (link && (link.innerText.includes('Yorumları gör') || link.innerText.includes('Gerçek Yorumlar'))) {
        gtag('event', 'blog_yorumlar_linki_tiklandi', {
          source_page: window.location.pathname,
          device: deviceType,
        });
      }

      // 6. Header CTA
      if (link && link.id === 'header-cta-btn') {
        gtag('event', 'header_fiyat_iste_intent', {
          location: 'navbar',
          device: deviceType,
        });
      }
      if (link && link.id === 'mobile-menu-call-btn') {
        gtag('event', 'mobil_menu_hemen_ara_intent', {
          location: 'mobile_nav',
          device: 'mobile',
        });
      }

      // 7. Reviews Section
      if (link && link.innerText.includes("GOOGLE'DA İNCELE")) {
        gtag('event', 'home_reviews_google_tiklandi', { device: deviceType });
      }

      // 8. Iframe Maps
      const mapContainer = target.closest('.map-embed') || target.closest('.iframe-container');
      if (mapContainer) {
        gtag('event', 'iletisim_harita_iframe_tiklandi', {
          device: deviceType,
          source_page: pagePath,
          click_location: clickLocation,
        });
      }
    },
    true,
  );
}
