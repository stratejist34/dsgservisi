import { useEffect, useRef, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentId?: string;
}

export default function TableOfContents({ contentId = 'article-content' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const asideEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    // DOM'un hazır olmasını bekle
    const initTOC = () => {
      const content = document.getElementById(contentId);
      if (!content) {
        // Retry after a short delay if content not found
        retryTimeout = setTimeout(initTOC, 100);
        return;
      }

      const h2Elements = content.querySelectorAll('h2');
      const tocItems: TocItem[] = [];

      h2Elements.forEach((h2) => {
        // rehype-slug zaten ID eklemiş olmalı, yoksa oluştur
        let id = h2.id;
        
        if (!id && h2.textContent) {
          id = h2.textContent
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
          
          if (id) {
            h2.id = id;
          }
        }

        if (id) {
          tocItems.push({
            id,
            text: h2.textContent || '',
            level: 2,
          });
        }
      });

      setHeadings(tocItems);
      setIsInitialized(true);

      // İlk başlığı varsayılan olarak aktif yap
      if (tocItems.length > 0) {
        setActiveId(tocItems[0].id);
      }

      // Scroll tracking için IntersectionObserver
      const observerOptions = {
        rootMargin: '-120px 0px -66%',
        threshold: 0,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      }, observerOptions);

      // Tüm başlıkları gözlemle
      h2Elements.forEach((h2) => {
        if (h2.id) {
          observer?.observe(h2);
        }
      });
    };

    // DOMContentLoaded veya hemen çalıştır
    const handleDOMReady = () => {
      initTOC();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMReady);
    } else {
      // DOM zaten hazır, hemen çalıştır
      setTimeout(initTOC, 0);
    }

    // Cleanup
    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('DOMContentLoaded', handleDOMReady);
    };
  }, [contentId]);

  // Masaüstünde sticky sorunlarına karşı sabit (fixed) fallback + alt sınır pinleme
  useEffect(() => {
    // Başlıklar yüklenene kadar bekle
    if (headings.length === 0) return;

    const aside = document.querySelector('aside.toc-sticky') as HTMLElement | null;
    if (!aside) return;

    const TOP_OFFSET_PX = 80; // 5rem
    const getGridContainer = () => aside.closest('.grid') as HTMLElement | null;

    // Başlangıçta grid içindeki konuma göre left/width'i ölç
    let initialLeft = 0;
    let initialWidth = aside.offsetWidth;
    const recalcInitial = () => {
      const container = getGridContainer();
      if (!container) return;
      initialLeft = aside.offsetLeft;
      initialWidth = aside.offsetWidth;
    };
    recalcInitial();

    const applyLayout = () => {
      // Önce tüm okumaları yap (batch read)
      const windowWidth = window.innerWidth;
      const container = getGridContainer();
      const containerRect = container ? container.getBoundingClientRect() : null;
      const asideRect = aside.getBoundingClientRect();
      const asideHeight = aside.offsetHeight;
      const asideWidth = aside.offsetWidth;
      
      // Sonra tüm yazmaları yap (batch write)
      // Mobilde de sticky kullanıyoruz, sadece fixed positioning'i kaldırıyoruz
      if (windowWidth < 1024) {
        aside.classList.remove('toc-force-fixed');
        aside.style.removeProperty('left');
        aside.style.removeProperty('width');
        aside.style.removeProperty('position');
        aside.style.removeProperty('transform');
        // Mobilde sticky CSS ile çalışacak, bu yüzden opacity ve visibility'yi koruyoruz
        return;
      }

      if (!container || !containerRect) {
        // Klasik fixed - cache'lenmiş değerleri kullan
        aside.classList.add('toc-force-fixed');
        aside.style.removeProperty('position');
        aside.style.top = `${TOP_OFFSET_PX}px`;
        aside.style.left = `${asideRect.left}px`;
        aside.style.width = `${asideWidth}px`;
        aside.style.zIndex = '30';
        aside.style.opacity = '1';
        aside.style.visibility = 'visible';
        aside.style.display = 'block';
        return;
      }

      // Container altının viewport'taki konumu
      const containerBottomVp = containerRect.bottom;
      // Fixed durumunda aside'ın altının viewport'taki konumu
      const asideBottomIfFixedVp = TOP_OFFSET_PX + asideHeight;

      if (containerBottomVp <= asideBottomIfFixedVp) {
        // Container altına çarptı; container içinde absolute'a pinle
        aside.classList.remove('toc-force-fixed');
        aside.style.position = 'absolute';
        aside.style.top = `${Math.max(0, container.scrollHeight - asideHeight)}px`;
        aside.style.left = `${initialLeft}px`;
        aside.style.width = `${initialWidth}px`;
        aside.style.zIndex = '30';
        aside.style.transform = 'none';
        aside.style.opacity = '1';
        aside.style.visibility = 'visible';
        aside.style.display = 'block';
      } else {
        // Normal: fixed
        aside.classList.add('toc-force-fixed');
        aside.style.removeProperty('position');
        aside.style.top = `${TOP_OFFSET_PX}px`;
        aside.style.left = `${Math.round(containerRect.left + initialLeft)}px`;
        aside.style.width = `${initialWidth}px`;
        aside.style.zIndex = '30';
        aside.style.opacity = '1';
        aside.style.visibility = 'visible';
        aside.style.display = 'block';
      }
    };

    // İlk yüklemede hizala - biraz gecikme ile
    setTimeout(() => {
      requestAnimationFrame(applyLayout);
    }, 100);

    // Scroll/Resize/Orientation
    const onResize = () => { recalcInitial(); requestAnimationFrame(applyLayout); };
    const onScroll = () => requestAnimationFrame(applyLayout);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('scroll', onScroll as any);
    };
  }, [headings.length]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Önce okuma
      const headerOffset = 100;
      const elementRect = element.getBoundingClientRect();
      const elementPosition = elementRect.top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Sonra yazma
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Not: Başlıklar henüz toplanmamış olsa da kabı render etmeye devam et

  return (
    <>
      {/* Desktop & Mobile TOC - her zaman görünür */}
      {headings.length > 0 && (
        <div
          className="w-full bg-white border border-gray-100 rounded-xl p-6 shadow-md"
          ref={(el) => {
            if (el) {
              asideEl.current = el as any;
            }
          }}
          style={{
            maxHeight: 'calc(100vh - 8rem)',
            overflowY: 'auto',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
          }}
          role="navigation"
          aria-label="İçindekiler"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 font-heading">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              İçindekiler
            </h3>
          </div>
          <nav className="space-y-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className={`
                  text-primary hover:text-primary transition-colors text-sm font-medium block cursor-pointer py-1 px-2 rounded border-l-2 border-transparent hover:bg-primary/5 hover:border-primary
                  ${
                    activeId === heading.id
                      ? 'bg-primary/10 border-primary text-primary font-semibold toc-active'
                      : ''
                  }
                `}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
