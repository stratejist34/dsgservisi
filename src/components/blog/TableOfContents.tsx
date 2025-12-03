import { useEffect, useState, useRef } from 'react';

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
  const [isPinned, setIsPinned] = useState(false);
  const [width, setWidth] = useState('auto');
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Başlıkları topla
  useEffect(() => {
    const initTOC = () => {
      const content = document.getElementById(contentId);
      if (!content) return;

      const h2Elements = content.querySelectorAll('h2');
      const tocItems: TocItem[] = [];

      h2Elements.forEach((h2) => {
        let id = h2.id;
        if (!id && h2.textContent) {
          id = h2.textContent
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
          h2.id = id;
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
      if (tocItems.length > 0) setActiveId(tocItems[0].id);

      // Scrollspy
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '-100px 0px -66%', threshold: 0 }
      );

      h2Elements.forEach((h2) => {
        if (h2.id) observer.observe(h2);
      });

      return () => observer.disconnect();
    };

    initTOC();
    // View Transitions desteği
    document.addEventListener('astro:page-load', initTOC);
    return () => document.removeEventListener('astro:page-load', initTOC);
  }, [contentId]);

  // Sticky Logic (JS Based - The One That Worked)
  useEffect(() => {
    const handleScroll = () => {
      if (!placeholderRef.current || !containerRef.current) return;

      const placeholderRect = placeholderRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      
      // İçerik sütununun sınırını kontrol et
      const contentColumn = document.getElementById('blog-content-column');
      const contentRect = contentColumn?.getBoundingClientRect();
      
      // Footer kontrolü
      const footer = document.querySelector('footer');
      const footerRect = footer?.getBoundingClientRect();
      
      // 120px offset for header
      const shouldPin = placeholderRect.top <= 120;
      
      // İçerik sütununun sonuna geldiğinde dur
      let contentEndCollision = false;
      if (contentRect) {
        // İçerik sütununun alt sınırı - TOC'un yüksekliği - biraz margin
        const contentBottom = contentRect.bottom;
        const tocBottom = 120 + containerHeight + 20; // top offset + height + margin
        if (contentBottom < tocBottom) {
          contentEndCollision = true;
        }
      }
      
      // Footer kontrolü (yedek)
      let footerCollision = false;
      if (footerRect) {
        if (footerRect.top < 120 + containerHeight + 40) {
           footerCollision = true;
        }
      }

      // İçerik sütunu veya footer'a çarptıysa dur
      if (shouldPin && !contentEndCollision && !footerCollision) {
        setIsPinned(true);
        setWidth(`${placeholderRect.width}px`);
      } else {
        setIsPinned(false);
        setWidth('auto');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [headings.length]); // headings değişince yeniden hesapla

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Placeholder yer tutucu */}
      <div ref={placeholderRef} style={{ height: isPinned ? '1px' : 'auto', minHeight: '1px' }}></div>

      <aside 
        ref={containerRef}
        className={`
          w-full bg-[#0f172a] border border-white/10 rounded-xl p-5 shadow-xl transition-all duration-300
          ${isPinned ? 'fixed top-[120px] z-30' : 'relative'}
        `}
        style={{ 
          width: isPinned ? width : '100%',
          // Eğer pinned değilse normal akışta
        }}
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            İçerik Paneli
          </h3>
        </div>
        
        {headings.length > 0 ? (
          <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className={`
                  text-xs font-medium block cursor-pointer py-2.5 px-3 rounded-lg transition-all duration-200
                  ${
                    activeId === heading.id
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 translate-x-1'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        ) : (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-1/2"></div>
            <div className="h-4 bg-white/5 rounded w-2/3"></div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-[10px] text-slate-600 font-mono">
          <span>STATUS: ONLINE</span>
          <span>{headings.length} SECTIONS</span>
        </div>
      </aside>
    </>
  );
}
