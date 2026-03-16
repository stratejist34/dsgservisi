// Scroll & Reveal System — Vite tarafından bundle/minify/cache edilir
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScript);
} else {
  setTimeout(initScript, 0);
}

function initScript() {
  let ticking = false;
  const header = document.querySelector('header');
  const progress = document.getElementById('progress');

  // Reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const step = Number(el.dataset && el.dataset.staggerStep ? el.dataset.staggerStep : 80);
        const delay = index * step;
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (el.hasAttribute('data-animate')) {
              el.classList.add('animate-in');
            } else if (el.hasAttribute('data-reveal')) {
              if (el.dataset && el.dataset.dir) {
                el.classList.add('animate-in');
              } else {
                el.classList.add('reveal--in');
              }
            }
            io.unobserve(el);
          }, delay);
        });
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );

  const allAnimateTargets = new Set();

  document.querySelectorAll('.grid').forEach((grid) => {
    grid.querySelectorAll(':scope > [data-animate], :scope > [data-reveal]').forEach((node) =>
      allAnimateTargets.add(node),
    );
  });

  document.querySelectorAll('[data-stagger-children]').forEach((container) => {
    container
      .querySelectorAll(':scope > [data-animate], :scope > [data-reveal]')
      .forEach((kid) => allAnimateTargets.add(kid));
  });

  document.querySelectorAll('[data-animate], [data-reveal]').forEach((node) => {
    const el = node;
    if (el.dataset) {
      if (!el.dataset.staggerIndex) el.dataset.staggerIndex = '0';
      if (!el.dataset.sectionOffset) el.dataset.sectionOffset = '0';
    }
    allAnimateTargets.add(el);
  });

  // Immediate IO — above-the-fold elementleri hemen göster
  const immediateIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const isLogo =
          (el.classList && el.classList.contains('logo-anim')) || (el.dataset && el.dataset.dir);

        if (!isLogo) {
          if (el.hasAttribute('data-animate')) el.classList.add('animate-in');
          if (el.hasAttribute('data-reveal')) el.classList.add('reveal--in');
          immediateIO.unobserve(el);
          return;
        }

        const step = Number(el.dataset && el.dataset.staggerStep ? el.dataset.staggerStep : 80);
        const idx = Number(el.dataset && el.dataset.staggerIndex ? el.dataset.staggerIndex : 0);
        setTimeout(() => el.classList.add('animate-in'), idx * step);
        immediateIO.unobserve(el);
      });
    },
    { threshold: 0, rootMargin: '50px' },
  );

  allAnimateTargets.forEach((el) => {
    immediateIO.observe(el);
    io.observe(el);
  });

  // Dinamik eklenen öğeler
  const mo = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        const targets =
          node.matches && node.matches('[data-animate], [data-reveal]')
            ? [node]
            : Array.from(node.querySelectorAll('[data-animate], [data-reveal]'));
        targets.forEach((el) => io.observe(el));
      });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Scroll handler — throttled with RAF
  let scrollHeight = 0;
  let windowHeight = 0;

  function cacheDimensions() {
    const run = () => {
      scrollHeight = document.documentElement.scrollHeight;
      windowHeight = window.innerHeight;
    };
    if ('requestIdleCallback' in window) {
      setTimeout(() => requestIdleCallback(run), 2000);
    } else {
      setTimeout(run, 3000);
    }
  }
  cacheDimensions();
  window.addEventListener('resize', cacheDimensions, { passive: true });

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          header?.classList.toggle('scrolled', scrollY > 20);
          if (progress && scrollHeight > 0) {
            const maxScroll = scrollHeight - windowHeight;
            const percent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
            progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}
