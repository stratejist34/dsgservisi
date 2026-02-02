import { useState, useEffect } from 'react';

interface PhoneButtonProps {
  phone?: string;
  className?: string;
  pageId?: string;
}

export default function PhoneButton({
  phone = '0533 262 34 51',
  className = '',
  pageId = 'diger_sayfalar'
}: PhoneButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    setMounted(true);

    const checkStatus = () => {
      const status = localStorage.getItem('user-regional-status');
      if (status === 'outside') {
        setIsLocked(true);
        setIsHidden(true);
      } else if (status === 'inside') {
        setIsLocked(false);
        setIsHidden(false);
      } else {
        // Not selected yet, show after delay or on event
        setIsHidden(false); // We show it initially but it will trigger modal
      }
    };

    checkStatus();

    // Listen for confirmation from other components
    const handleConfirmation = () => checkStatus();
    window.addEventListener('regional-confirmed', handleConfirmation);

    // 3 saniye sonra balonu göster
    const tooltipTimer = setTimeout(() => {
      if (!isLocked && !localStorage.getItem('user-regional-status')) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 3000);

    return () => {
      window.removeEventListener('regional-confirmed', handleConfirmation);
      clearTimeout(tooltipTimer);
    };
  }, [isLocked]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    setShowTooltip(false);
  };

  const phoneNumber = phone.replace(/\s/g, '');
  const phoneHref = `tel:${phoneNumber}`;

  if (!mounted || isHidden) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[55] flex flex-col items-center">
      {/* Tooltip / Balon */}
      {showTooltip && (
        <div
          className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-3 bg-amber-400 text-slate-950 text-sm font-bold rounded-xl shadow-[0_10px_25px_rgba(245,158,11,0.5)] whitespace-nowrap pointer-events-none z-[60]"
          style={{ animation: 'bounce-x-subtle 2s infinite ease-in-out' }}
        >
          <div className="relative">
            Sadece İstanbul Avrupa Yakası
            <div className="absolute right-[calc(100%+15px)] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-r-amber-400"></div>
          </div>
        </div>
      )}

      <a
        id="floating-call"
        href={phoneHref}
        onClick={handleClick}
        className={`
          group relative
          flex items-center justify-center
          w-16 h-16 md:w-20 md:h-20
          rounded-full
          bg-gradient-to-br from-amber-400 to-amber-500
          text-slate-950
          shadow-[0_10px_30px_rgba(245,158,11,0.4)]
          cursor-pointer
          transform transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          ${className}
        `}
        aria-label={`Sadece İstanbul Avrupa Yakası: ${phone}`}
        onMouseDown={() => { }}
      >
        {/* Pulse Rings - REMOVED for calmer look */}

        {/* Phone Icon */}
        <svg
          className="relative w-8 h-8 md:w-10 md:h-10 z-10 transform group-hover:rotate-12 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>

        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '10px',
              height: '10px',
              transform: 'translate(-50%, -50%)',
              animation: 'ripple-expand 0.6s ease-out',
            }}
          />
        ))}
      </a>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ripple-expand {
          from { width: 0; height: 0; opacity: 0.5; }
          to { width: 100px; height: 100px; opacity: 0; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce-x-subtle {
          0%, 100% { transform: translateX(0) translateY(-50%); }
          50% { transform: translateX(5px) translateY(-50%); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
