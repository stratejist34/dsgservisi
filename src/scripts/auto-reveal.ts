import { createRevealObserver } from '@/utils/reveal';

if (typeof window !== 'undefined') {
  const onReveal = (el: Element) => {
    el.classList.add('reveal--in');
  };
  const io = createRevealObserver(onReveal);
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}



