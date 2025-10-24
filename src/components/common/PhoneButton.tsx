import { useState, useEffect } from 'react';

interface PhoneButtonProps {
  phone?: string;
  className?: string;
}

export default function PhoneButton({
  phone = '0533 262 34 51',
  className = ''
}: PhoneButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 3 saniye sonra butonu göster
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
      
      // Buton göründükten 2 saniye sonra yazıyı göster
      const textTimer = setTimeout(() => {
        setShowText(true);
        
        // Yazı göründükten 3 saniye sonra gizle
        const hideTextTimer = setTimeout(() => {
          setShowText(false);
        }, 3000);
        
        return () => clearTimeout(hideTextTimer);
      }, 2000);
      
      return () => clearTimeout(textTimer);
    }, 3000);
    
    return () => clearTimeout(buttonTimer);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const phoneNumber = phone.replace(/\s/g, '');
  const phoneHref = `tel:${phoneNumber}`;

  // Buton henüz gösterilmeyecekse null döndür
  if (!showButton) {
    return null;
  }

  return (
    <a
      href={phoneHref}
      onClick={handleClick}
      className={`
        group fixed bottom-6 left-6 z-50
        flex items-center justify-center gap-3
        ${showText ? 'w-auto px-6' : 'w-16'} h-16 md:${showText ? 'w-auto md:px-8' : 'w-20'} md:h-20
        rounded-full
        bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500
        text-white
        shadow-2xl
        overflow-hidden
        cursor-pointer
        transform transition-all duration-500 ease-in-out
        hover:scale-110
        active:scale-55
        ${className}
      `}
      style={{
        backgroundSize: '300% 300%',
        animation: mounted ? 'gradient-shift 6s ease infinite, bounce-spring 2.4s cubic-bezier(0.22, 1, 0.36, 1) 2' : 'none',
        animationDelay: '0.1s, 0.3s',
        boxShadow: '0 10px 40px rgba(16, 185, 129, 0.5), 0 0 80px rgba(16, 185, 129, 0.4), 0 0 120px rgba(16, 185, 129, 0.2)',
      }}
      aria-label="Bizi Arayın"
    >
      {/* Glow Layer */}
      <div 
        className="absolute inset-0 rounded-full opacity-75"
        style={{
          animation: mounted ? 'glow-pulse 3.4s ease-in-out 2' : 'none',
          animationDelay: '0.35s',
        }}
      />
      
      {/* Ring Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: mounted ? 'ring-rotate 2.6s ease-in-out 2' : 'none',
          animationDelay: '0.35s',
        }}
      >
        <svg
          className="w-12 h-12 md:w-16 md:h-16 text-white opacity-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Phone Icon */}
      <svg
        className="relative w-8 h-8 md:w-10 md:h-10 z-10 transform group-hover:rotate-12 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
      </svg>

      {/* Telefon Desteği Yazısı */}
      <span
        className={`
          relative z-10 font-semibold text-sm md:text-base whitespace-nowrap
          transition-all duration-500
          ${showText ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 w-0'}
        `}
      >
        {showText && 'Telefon Desteği'}
      </span>

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

      {/* Hover Pulse Ring */}
      <span 
        className="absolute inset-0 rounded-full border-4 border-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          animation: mounted ? 'pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) 2' : 'none',
          animationDelay: '0.35s',
        }}
      />
    </a>
  );
}