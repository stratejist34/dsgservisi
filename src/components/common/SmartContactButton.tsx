import { useState, useEffect } from 'react';

interface SmartContactButtonProps {
  phone?: string;
  whatsappPhone?: string;
  whatsappMessage?: string;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

// SSR-safe çalışma saatleri kontrolü
function checkWorkingHours(): boolean {
  if (typeof window === 'undefined') return false;
  const now = new Date();
  const day = now.getDay(); // 0=Sun,1=Mon,...6=Sat
  if (day === 0) return false; // Pazar kapalı
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;
  return time >= 9 && time < 18;
}

export default function SmartContactButton({
  phone = '0533 262 34 51',
  whatsappPhone = '905332623451',
  whatsappMessage,
  className = '',
  position = 'bottom-right'
}: SmartContactButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isWorkingHours, setIsWorkingHours] = useState(false);
  const [currentHour, setCurrentHour] = useState(0);

  // Mount olduğunda hemen kontrol et
  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setCurrentHour(now.getHours());
    setIsWorkingHours(checkWorkingHours());
  }, []);

  // Çalışma saatleri kontrolü - Optimize edilmiş
  useEffect(() => {
    if (!mounted) return;

    function updateStatus() {
      const now = new Date();
      setCurrentHour(now.getHours());
      setIsWorkingHours(checkWorkingHours());
    }

    function scheduleNextCheck() {
      const now = new Date();
      const currentHour = now.getHours();

      let targetHour: number;

      if (currentHour >= 9 && currentHour < 18) {
        targetHour = 18;
      } else if (currentHour < 9) {
        targetHour = 9;
      } else {
        targetHour = 9;
      }

      const targetTime = new Date();
      targetTime.setHours(targetHour, 0, 0, 0);

      if (targetTime.getTime() <= now.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(9, 0, 0, 0);
      }

      const msUntilTarget = targetTime.getTime() - now.getTime();

      return setTimeout(() => {
        updateStatus();
        scheduleNextCheck();
      }, msUntilTarget);
    }

    const timeout = scheduleNextCheck();
    return () => clearTimeout(timeout);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      setShowButton(false);
      return;
    }

    // Butonu hemen göster
    setShowButton(true);

    // Visibility ölçümleme (aramaya/WhatsApp'e başladı mı?)
    const onVisibility = () => {
      const anyWin: any = window as any;
      if (document.hidden && anyWin.__contactIntentAt) {
        const delta = Date.now() - anyWin.__contactIntentAt;
        if (delta < 5000) {
          // 5 sn içinde sekme gizlendiyse arama/WhatsApp başlatılmış olabilir
          if ((window as any).gtag) {
            // Şu anki çalışma saatlerini kontrol et
            const now = new Date();
            const currentHourNow = now.getHours();
            const isWorkingHoursNow = checkWorkingHours();

            if (isWorkingHoursNow) {
              // Telefon butonu için
              (window as any).gtag('event', 'smart_call_intent_likely', {
                delta_ms: delta,
                location: 'smart_floating_button',
                hour: currentHourNow
              });
            } else {
              // WhatsApp butonu için
              (window as any).gtag('event', 'smart_whatsapp_click_likely', {
                delta_ms: delta,
                location: 'smart_floating_button',
                hour: currentHourNow
              });
            }
          }
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibility, { passive: true } as any);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility as any);
    };
  }, [mounted]);

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

  if (!mounted || !showButton) {
    return null;
  }

  const phoneNumber = phone.replace(/\s/g, '');
  const phoneHref = `tel:${phoneNumber}`;
  const defaultWhatsAppMessage = 'Merhaba, DSG servisi hakkında bilgi almak istiyorum.';
  const finalWhatsAppMessage = whatsappMessage || defaultWhatsAppMessage;
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(finalWhatsAppMessage)}`;

  const isPhone = isWorkingHours;
  const href = isPhone ? phoneHref : whatsappUrl;

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <a
      id="smart-contact-button"
      href={href}
      onClick={handleClick}
      className={`
        group fixed ${positionClasses[position]} z-[55]
        flex items-center justify-center gap-3
        w-16 h-16 md:w-20 md:h-20
        rounded-full
        ${isPhone
          ? 'bg-gradient-to-br from-primary via-urgent to-primary-600'
          : 'bg-[#25D366]'
        }
        text-white
        shadow-2xl ring-1 ring-white/20
        overflow-hidden
        cursor-pointer
        transform transition-all duration-500 ease-in-out
        hover:scale-105
        active:scale-95
        ${className}
      `}
      style={{
        backgroundSize: isPhone ? '300% 300%' : '100%',
        animation: mounted
          ? (isPhone
            ? 'gradient-shift 6s ease infinite, bounce-spring 2.2s cubic-bezier(0.22, 1, 0.36, 1) 1'
            : 'glow-pulse 3s ease-in-out 2')
          : 'none',
        animationDelay: '0.1s, 0.25s',
        boxShadow: isPhone
          ? '0 10px 40px rgba(249, 115, 22, 0.45), 0 0 80px rgba(220, 38, 38, 0.35), 0 0 120px rgba(220, 38, 38, 0.18)'
          : '0 10px 40px rgba(37, 211, 102, 0.45), 0 0 80px rgba(37, 211, 102, 0.35)',
      }}
      aria-label={isPhone ? `Bizi arayın: ${phone}` : 'WhatsApp ile iletişim'}
      target={isPhone ? undefined : '_blank'}
      rel={isPhone ? undefined : 'noopener noreferrer'}
      onMouseDown={() => {
        // visibility ölçümleme için işaretle
        (window as any).__contactIntentAt = Date.now();
      }}
    >
      {/* Glow Layer - Sadece telefon için */}
      {isPhone && (
        <div
          className="absolute inset-0 rounded-full opacity-75"
          style={{
            animation: mounted ? 'glow-pulse 3.4s ease-in-out 2' : 'none',
            animationDelay: '0.35s',
          }}
        />
      )}

      {/* Icon */}
      {isPhone ? (
        <svg
          className="relative w-8 h-8 md:w-10 md:h-10 z-10 transform group-hover:rotate-12 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      ) : (
        <svg
          className="relative w-8 h-8 md:w-10 md:h-10 z-10 transform group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )}

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
