// Call Modal — Bölgesel Gatekeeper — Vite tarafından bundle/minify/cache edilir
const modal = document.getElementById('global-call-modal');
if (modal) {
  const dialog = modal.querySelector('.call-modal__dialog');
  const backdrop = modal.querySelector('.call-modal__backdrop');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  const callNowBtn = modal.querySelector('[data-call-now]');
  let pendingHref = null;

  const openModal = (href) => {
    pendingHref = href;
    modal.classList.remove('hidden');
    modal.removeAttribute('inert');
    document.body.classList.add('call-modal-open');
    requestAnimationFrame(() => {
      dialog?.focus?.();
    });
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.setAttribute('inert', '');
    document.body.classList.remove('call-modal-open');
    pendingHref = null;
  };

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const telLink = target.closest('a[href^="tel:"]');
      if (!telLink) return;
      if (telLink.dataset.skipCallModal === 'true') return;
      if (localStorage.getItem('user-regional-status') === 'inside') return;
      event.preventDefault();
      const href = telLink.getAttribute('href');
      if (!href) return;
      openModal(href);
    },
    true,
  );

  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));
  backdrop?.addEventListener('click', closeModal);

  callNowBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    if (pendingHref) {
      window.location.href = pendingHref;
    }
    closeModal();
  });

  window.addEventListener(
    'keyup',
    (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    { passive: true },
  );

  // Gatekeeping: Auto-trigger on contact page (1x per session)
  if (window.location.pathname.includes('/iletisim')) {
    if (
      localStorage.getItem('user-regional-status') !== 'inside' &&
      !sessionStorage.getItem('contact-gate-shown')
    ) {
      setTimeout(() => {
        openModal();
        sessionStorage.setItem('contact-gate-shown', 'true');
      }, 1000);
    }
  }
}
