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
    <div ref={ref} className="font-tech text-5xl md:text-6xl lg:text-7xl font-bold text-white tabular-nums tracking-tighter">
      {prefix}{count.toLocaleString('tr-TR')}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <div className="relative py-20 bg-slate-950 border-y border-white/5 overflow-hidden">
      {/* Tech Background - Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
             backgroundSize: '50px 50px'
           }} 
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8" data-animate>
          <div>
            <span className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-2 block">Servis Metrikleri</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              PERFORMANS VERİLERİ
            </h2>
          </div>
          <div className="text-right hidden md:block">
             <div className="text-xs text-slate-500 font-mono">LAST UPDATE: {new Date().toLocaleDateString('tr-TR')}</div>
             <div className="text-xs text-green-500 font-mono flex items-center justify-end gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               SYSTEM ONLINE
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Stat 1 */}
          <div className="group" data-animate data-stagger-step="100">
            <div className="text-slate-500 text-xs font-mono mb-2 group-hover:text-amber-500 transition-colors">TOTAL EXPERIENCE</div>
            <Counter end={SITE_CONFIG.stats.experience} suffix="" />
            <div className="mt-2 text-lg font-semibold text-slate-300">Yıl Tecrübe</div>
            <div className="w-full bg-white/10 h-0.5 mt-4 group-hover:bg-amber-500/50 transition-colors"></div>
          </div>

          {/* Stat 2 */}
          <div className="group" data-animate data-stagger-step="100">
            <div className="text-slate-500 text-xs font-mono mb-2 group-hover:text-amber-500 transition-colors">HAPPY CUSTOMERS</div>
            <Counter end={SITE_CONFIG.stats.customers} suffix="+" />
            <div className="mt-2 text-lg font-semibold text-slate-300">Mutlu Müşteri</div>
            <div className="w-full bg-white/10 h-0.5 mt-4 group-hover:bg-amber-500/50 transition-colors"></div>
          </div>

          {/* Stat 3 */}
          <div className="group" data-animate data-stagger-step="100">
            <div className="text-slate-500 text-xs font-mono mb-2 group-hover:text-amber-500 transition-colors">BRANDS SERVED</div>
            <Counter end={SITE_CONFIG.stats.brands} />
            <div className="mt-2 text-lg font-semibold text-slate-300">Marka Uzmanlığı</div>
            <div className="w-full bg-white/10 h-0.5 mt-4 group-hover:bg-amber-500/50 transition-colors"></div>
          </div>

          {/* Stat 4 */}
          <div className="group" data-animate data-stagger-step="100">
            <div className="text-slate-500 text-xs font-mono mb-2 group-hover:text-amber-500 transition-colors">MODELS SUPPORTED</div>
            <Counter end={SITE_CONFIG.stats.models} />
            <div className="mt-2 text-lg font-semibold text-slate-300">Farklı Model</div>
            <div className="w-full bg-white/10 h-0.5 mt-4 group-hover:bg-amber-500/50 transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
