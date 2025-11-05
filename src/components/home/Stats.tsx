import { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '@utils/constants';

function Counter({ 
  end, 
  duration = 2000,
  suffix = '',
  prefix = '' 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
      {prefix}{count.toLocaleString('tr-TR')}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <div className="relative py-20 md:py-32 overflow-hidden" style={{ willChange: 'transform' }}>
      {/* Background with Gradient - Primary Açık Ton */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-500" />
      
      {/* Overlay Pattern - Dots */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RAKAMLARLA YILDIZLAR GRUP SERVİS
          </h2>
          <p className="text-xl text-white/90">
            15 yıldır güvenilir ve kaliteli hizmet
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" style={{ willChange: 'transform' }}>
          {/* Stat 1 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300" data-animate data-stagger-step="120">
            <Counter end={SITE_CONFIG.stats.experience} suffix="+" />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Yıl Tecrübe
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300" data-animate data-stagger-step="120">
            <Counter end={SITE_CONFIG.stats.customers} suffix="+" />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Mutlu Müşteri
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300" data-animate data-stagger-step="120">
            <Counter end={SITE_CONFIG.stats.brands} />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Markanın
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300" data-animate data-stagger-step="120">
            <Counter end={SITE_CONFIG.stats.models} />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Farklı Model için Servis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

