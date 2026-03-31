import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '@utils/constants';

interface Review {
  id: string;
  author: string;
  initial: string;
  rating: number;
  text: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'İsmail Susam',
    initial: 'İ',
    rating: 5,
    text: 'Ben ilk defa geçen sene arabama bakım yaptırdım çok memnunum profesyonel ekip herkese tavsiye ediyorum.',
    date: '2024-10-18',
  },
  {
    id: '2',
    author: 'Enzo Ferrari',
    initial: 'E',
    rating: 5,
    text: 'Allah razı olsun motor inecek denilen üç dört tane servise götürüp hala düzelmeyen arabamı bir saat içinde tamir edip canavar gibi yaptı usta. Gönül rahatlığıyla tavsiye ederim.',
    date: '2024-09-26',
  },
  {
    id: '3',
    author: 'Furkan Kaplan',
    initial: 'F',
    rating: 5,
    text: 'Ömer usta ve Genç ekibine çok Teşekkür ediyorum. 1 saat içinde sorunu çözdüler. Yetkili servise gideceğime buraya giderim daha iyi. Muhasebedeki abladan tutun çıraklara kadar herkes çok güzel ilgilendi.',
    date: '2024-08-17',
  },
  {
    id: '4',
    author: 'Ali Köse',
    initial: 'A',
    rating: 5,
    text: 'Hiçbir tereddüt etmeden aracınızı ne sorunu olursa bırakacağınız, her zaman destek alabileceğiniz lüzumsuz şekilde iş yapmayan ne gerekiyorsa yapan bir ekip.',
    date: '2024-06-06',
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const visibleDesktop = 3;
  const maxStart = Math.max(0, REVIEWS.length - visibleDesktop);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        if (prev >= maxStart) {
          setDir(-1);
          return prev - 1;
        }
        if (prev <= 0 && dir === -1) {
          setDir(1);
          return prev + 1;
        }
        return prev + dir;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [dir, maxStart]);

  const widthPctPerCard = 100 / visibleDesktop;

  return (
    <section className="section bg-slate-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10">
        {/* Başlık */}
        <div className="text-center mb-12" data-reveal>
          <span className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-2 block">Müşteri Deneyimi</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            MÜŞTERİ YORUMLARI
          </h2>
          <p className="text-lg text-slate-400">
            Google'da <span className="font-bold text-amber-500">{SITE_CONFIG.google.rating}</span> yıldız ile değerlendirildik
          </p>
        </div>

        {/* Masaüstü: 2 kolon | Mobil: tek kolon */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-start">
          {/* Sol: Google Kartı (lg:2 kolon) */}
          <div className="lg:col-span-2" data-reveal>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
              <div className="flex justify-center mb-4 bg-white/90 rounded-lg py-2 px-4 w-fit mx-auto">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google"
                  className="h-6"
                  loading="lazy"
                  width="92"
                  height="30"
                  decoding="async"
                />
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-display font-bold text-white mb-1">
                  {SITE_CONFIG.google.rating}
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => {
                    const rating = SITE_CONFIG.google.rating;
                    const isFullStar = i < Math.floor(rating);
                    const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
                    return (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill={isFullStar ? 'currentColor' : isHalfStar ? 'url(#halfGrad)' : 'none'} stroke={!isFullStar && !isHalfStar ? 'currentColor' : 'none'} strokeWidth={!isFullStar && !isHalfStar ? '1' : '0'} viewBox="0 0 20 20">
                        {isHalfStar && (
                          <defs>
                            <linearGradient id="halfGrad">
                              <stop offset="50%" stopColor="currentColor" />
                              <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                          </defs>
                        )}
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  })}
                </div>
                <div className="text-sm text-slate-400 font-mono">{SITE_CONFIG.google.reviewCount} DEĞERLENDİRME</div>
              </div>
              <div className="border-t border-white/10 my-5"></div>
              <div className="space-y-4">
                <p className="text-slate-300 font-semibold text-center text-sm">{SITE_CONFIG.shortName}</p>
                <a href={SITE_CONFIG.google.mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-all duration-300 text-sm shadow-lg shadow-amber-500/20">
                  GOOGLE'DA İNCELE
                </a>
              </div>
            </div>
          </div>

          {/* Sağ: 3'lü yorum sütunu */}
          <div className="lg:col-span-3" data-reveal style={{ willChange: 'transform' }}>
            {/* Masaüstü görünüm */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden" style={{ willChange: 'transform' }}>
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${index * widthPctPerCard}%)`, willChange: 'transform' }}
                >
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="basis-1/3 shrink-0 px-3">
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 h-full hover:border-amber-500/30 transition-colors duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold font-mono">
                            {review.initial}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-sm">{review.author}</h3>
                            <div className="flex gap-0.5 my-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-white/10 pl-3">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobil görünüm */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden" style={{ willChange: 'transform' }}>
                <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${(index % REVIEWS.length) * 100}%)` }}>
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="w-full shrink-0 px-1">
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold font-mono">
                            {review.initial}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-sm">{review.author}</h3>
                            <div className="flex gap-0.5 my-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-white/10 pl-3">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
