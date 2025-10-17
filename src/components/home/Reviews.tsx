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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Tek kart gösteriyoruz
  const maxIndex = REVIEWS.length - 1;

  // Auto-scroll effect - her 5 saniyede bir değişir
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, maxIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
            Müşteri Yorumları
          </h2>
          <p className="text-lg text-gray-600">
            Google'da <span className="font-bold text-primary">{SITE_CONFIG.google.rating}</span> yıldız ile değerlendirildik
          </p>
        </div>

        {/* Vertical Layout: Google Card Top + Review Carousel Bottom */}
        <div className="max-w-3xl mx-auto space-y-8">
          
        {/* GOOGLE CARD - ÜST */}
        <div className="w-full">
          <div className="bg-gradient-to-r from-primary/20 via-cyan/20 to-primary/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-cyan/30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-2xl -z-10"></div>
              {/* Google Logo */}
              <div className="flex justify-center mb-4">
                <img 
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                  alt="Google"
                  className="h-8"
                  loading="lazy"
                  width="92"
                  height="30"
                />
              </div>

              {/* Rating & Stars */}
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
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill={isFullStar ? "currentColor" : isHalfStar ? "url(#halfGrad)" : "none"}
                        stroke={!isFullStar && !isHalfStar ? "currentColor" : "none"}
                        strokeWidth={!isFullStar && !isHalfStar ? "1" : "0"}
                        viewBox="0 0 20 20"
                      >
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
                <div className="text-sm text-gray-600 font-medium">
                  {SITE_CONFIG.google.reviewCount} değerlendirme
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-5"></div>

              {/* Info */}
              <div className="space-y-4">
                <p className="text-gray-800 font-semibold text-center text-sm">
                  {SITE_CONFIG.shortName}
                </p>
                <a
                  href={SITE_CONFIG.google.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-sm"
                >
                  Google'da incele
                </a>
              </div>
            </div>
          </div>

          {/* REVIEW CAROUSEL - TEK KART ALT */}
          <div className="w-full relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="w-full flex-shrink-0"
                  >
                    <div className="relative bg-gradient-to-r from-primary/20 via-cyan/20 to-primary/20 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border-2 border-cyan/30">
                             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-2xl -z-10"></div>
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            {review.initial}
                          </div>
                        </div>

                        <div className="flex-1">
                          {/* Author */}
                          <h4 className="font-bold text-lg text-gray-900">{review.author}</h4>
                          {/* Rating */}
                          <div className="flex gap-1 my-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {/* Date */}
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {review.text}
                      </p>

                      {/* Google Badge */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>Google'da yayınlandı</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Önceki yorum"
              >
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Sonraki yorum"
              >
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Yorum ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
