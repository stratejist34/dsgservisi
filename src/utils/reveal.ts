export type RevealOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};

const defaultOptions: Required<RevealOptions> = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15,
};

export function createRevealObserver(
  onReveal: (el: Element) => void,
  options: RevealOptions = {}
) {
  const opts = { ...defaultOptions, ...options };
  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        onReveal(entry.target);
        obs.unobserve(entry.target);
      }
    }
  }, opts);
  return io;
}



