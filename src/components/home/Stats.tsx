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
    <div className="relative py-20 md:py-32 overflow-hidden">
      {/* Background with Gradient - Koyu Turkuaz Ton */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a3d4d 0%, #0a4d68 50%, #0a3d4d 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      />
      
      {/* Overlay Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RAKAMLARLA YILDIZLAR GRUP SERVİS
          </h2>
          <p className="text-xl text-white/90">
            15 yıldır güvenilir ve kaliteli hizmet
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Stat 1 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <Counter end={SITE_CONFIG.stats.experience} suffix="+" />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Yıl Tecrübe
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <Counter end={SITE_CONFIG.stats.customers} suffix="+" />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Mutlu Müşteri
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <Counter end={SITE_CONFIG.stats.brands} />
            <div className="mt-4 text-lg md:text-xl font-semibold text-white/90">
              Markanın
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
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

