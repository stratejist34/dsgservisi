import { useState, useEffect } from 'react';

interface PhoneButtonProps {
  phone?: string;
  className?: string;
}

// SSR-safe çalışma saatleri kontrolü
function checkWorkingHours(): boolean {
  if (typeof window === 'undefined') return false; // SSR'da false döndür
  const now = new Date();
  const day = now.getDay(); // 0=Sun,1=Mon,...6=Sat
  if (day === 0) return false; // Pazar kapalı
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;
  return time >= 9 && time < 18;
}

export default function PhoneButton({
  phone = '0533 262 34 51',
  className = ''
}: PhoneButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  // SSR-safe initial state - client-side'da hemen kontrol et
  const [isWorkingHours, setIsWorkingHours] = useState(false);

  // Mount olduğunda hemen kontrol et
  useEffect(() => {
    setMounted(true);
    setIsWorkingHours(checkWorkingHours());
  }, []);

  // Çalışma saatleri kontrolü - Optimize edilmiş (sadece kritik saatlerde: 09:00 ve 18:00)
  useEffect(() => {
    if (!mounted) return;
    
    function updateWorkingHours() {
      setIsWorkingHours(checkWorkingHours());
    }
    
    // Sadece kritik saatlerde kontrol et (09:00 ve 18:00)
    function scheduleNextCheck() {
      const now = new Date();
      const currentHour = now.getHours();
      
      let targetHour: number;
      
      // Şu anki saat 09:00-18:00 arasındaysa, 18:00'ı bekle
      // Değilse, 09:00'ı bekle
      if (currentHour >= 9 && currentHour < 18) {
        targetHour = 18;
      } else if (currentHour < 9) {
        targetHour = 9;
      } else {
        // 18:00 sonrası, yarın 09:00'ı bekle
        targetHour = 9;
      }
      
      const targetTime = new Date();
      targetTime.setHours(targetHour, 0, 0, 0);
      
      // Eğer hedef saat geçmişse, yarınki saatini hesapla
      if (targetTime.getTime() <= now.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(9, 0, 0, 0);
      }
      
      const msUntilTarget = targetTime.getTime() - now.getTime();
      
      return setTimeout(() => {
        updateWorkingHours();
        scheduleNextCheck(); // Bir sonraki kontrolü planla
      }, msUntilTarget);
    }
    
    const timeout = scheduleNextCheck();

    return () => {
      clearTimeout(timeout);
    };
  }, [mounted]);

  useEffect(() => {
    // Mount olmamışsa veya çalışma saatleri dışındaysa butonu gösterme
    if (!mounted || !isWorkingHours) {
      setShowButton(false);
      return;
    }
    
    // Biraz daha erken göster (dönüşüm için)
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
      
      // İlk kısa gösterim
      const textTimer = setTimeout(() => {
        setShowText(true);
        const hideTextTimer = setTimeout(() => {
          setShowText(false);
        }, 2200);
        return () => clearTimeout(hideTextTimer);
      }, 1200);
      
      return () => clearTimeout(textTimer);
    }, 1500);
    
    // Düşük frekanslı döngü: her 18 sn'de 2.2 sn göster
    const cycle = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % 4);
      setShowText(true);
      setTimeout(() => setShowText(false), 2200);
    }, 18000);

    // Visibility ölçümleme (aramaya başladı mı?)
    const onVisibility = () => {
      const anyWin: any = window as any;
      if (document.hidden && anyWin.__callIntentAt) {
        const delta = Date.now() - anyWin.__callIntentAt;
        if (delta < 5000) {
          // 5 sn içinde sekme gizlendiyse arama başlatılmış olabilir
          if ((window as any).gtag) {
            (window as any).gtag('event', 'turkuaz_tel_butonu_olasi_arama', { 
              delta_ms: delta,
              location: 'floating_button'
            });
          }
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibility, { passive: true } as any);

    return () => {
      clearTimeout(buttonTimer);
      clearInterval(cycle);
      document.removeEventListener('visibilitychange', onVisibility as any);
    };
  }, [isWorkingHours, mounted]);

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

  // Çalışma saatleri dışındaysa veya buton henüz gösterilmeyecekse null döndür
  if (!isWorkingHours || !showButton) {
    return null;
  }

  const phrases = ['Hemen Ara', 'Ustaya Sor', 'Destek Hattı', 'Hemen Fiyat Al'];

  return (
    <a
      id="floating-call"
      href={phoneHref}
      onClick={handleClick}
      className={`
        group fixed bottom-6 right-6 z-[55]
        flex items-center justify-center gap-3
        ${showText ? 'w-auto px-6' : 'w-16'} h-16 md:${showText ? 'w-auto md:px-8' : 'w-20'} md:h-20
        rounded-full
        bg-gradient-to-br from-[#00e5ff] via-[#33ecff] to-[#00bcd4]
        text-white
        shadow-2xl ring-1 ring-white/20
        overflow-hidden
        cursor-pointer
        transform transition-all duration-200 ease-out
        hover:scale-105
        active:scale-95
        ${className}
      `}
      style={{
        boxShadow: '0 8px 24px rgba(93, 211, 224, 0.4), 0 4px 12px rgba(26, 156, 176, 0.3)',
      }}
      aria-label={`Bizi arayın: ${phone}`}
      onMouseDown={() => {
        // gtag click event (varsa)
        // @ts-ignore
        if (window.gtag) {
          // @ts-ignore
          window.gtag('event', 'turkuaz_tel_butonu', { location: 'floating_button' });
        }
        // visibility ölçümleme için işaretle
        (window as any).__callIntentAt = Date.now();
      }}
    >
      {/* Basit pulse efekti - sadece hover'da */}
      <div 
        className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

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
          transition-all duration-300
          ${showText ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 w-0'}
        `}
      >
        {showText && phrases[phraseIndex]}
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

    </a>
  );
}
