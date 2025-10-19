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

  const visibleDesktop = 3; // sağ kolon görünür kart sayısı
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

  const widthPctPerCard = 100 / visibleDesktop; // 33.333...

  return (
    <div className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Başlık */}
        <div className="text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
            Müşteri Yorumları
          </h2>
          <p className="text-lg text-gray-600">
            Google'da <span className="font-bold text-primary">{SITE_CONFIG.google.rating}</span> yıldız ile değerlendirildik
          </p>
        </div>

        {/* Masaüstü: 2 kolon | Mobil: tek kolon */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-start">
          {/* Sol: Google Kartı (lg:2 kolon) */}
          <div className="lg:col-span-2" data-reveal>
            <div className="relative bg-gradient-to-r from-primary/20 via-cyan/20 to-primary/20 rounded-2xl p-6 md:p-8 border border-cyan/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-2xl -z-10"></div>
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google"
                  className="h-8"
                  loading="lazy"
                  width="92"
                  height="30"
                  decoding="async"
                />
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-display font-semibold text-gray-800 mb-1">
                  {SITE_CONFIG.google.rating}
                </div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => {
                    const rating = SITE_CONFIG.google.rating;
                    const isFullStar = i < Math.floor(rating);
                    const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
                    return (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill={isFullStar ? 'currentColor' : isHalfStar ? 'url(#halfGrad)' : 'none'} stroke={!isFullStar && !isHalfStar ? 'currentColor' : 'none'} strokeWidth={!isFullStar && !isHalfStar ? '1' : '0'} viewBox="0 0 20 20">
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
                <div className="text-sm text-gray-600 font-medium">{SITE_CONFIG.google.reviewCount} değerlendirme</div>
              </div>
              <div className="border-t border-gray-200 my-5"></div>
              <div className="space-y-4">
                <p className="text-gray-800 font-semibold text-center text-sm">{SITE_CONFIG.shortName}</p>
                <a href={SITE_CONFIG.google.mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-2.5 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-300 text-sm">Google'da incele</a>
              </div>
            </div>
          </div>

          {/* Sağ: 3'lü yorum sütunu (lg:3 kolon) | Mobilde tek kart slider */}
          <div className="lg:col-span-3" data-reveal style={{ willChange: 'transform' }}>
            {/* Masaüstü görünüm */}
              <div className="hidden lg:block">
              <div className="relative overflow-hidden" style={{ willChange: 'transform' }}>
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${index * widthPctPerCard}%)`, willChange: 'transform' }}
                >
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="basis-1/3 shrink-0 px-2">
                      <div className="bg-white/90 rounded-2xl border border-gray-200 p-6 h-full">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-bold">
                            {review.initial}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-xs md:text-sm">{review.author}</h3>
                            <div className="flex gap-1 my-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobil: tek kart slider */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden" style={{ willChange: 'transform' }}>
                <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${(index % REVIEWS.length) * 100}%)` }}>
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="w-full shrink-0 px-1">
                      <div className="bg-white/90 rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-bold">
                            {review.initial}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm">{review.author}</h3>
                            <div className="flex gap-1 my-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
