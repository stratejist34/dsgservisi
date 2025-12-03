import { SITE_CONFIG } from '@utils/constants';

export default function BrandLogos() {
  // DSG'yi çıkar, sadece 8 marka (4x2 grid için)
  const brands = SITE_CONFIG.brands.filter(brand => brand.name !== 'DSG');
  const largerBrands = new Set(['Mercedes', 'Porsche', 'Seat', 'Skoda']);

  return (
    <div className="grid grid-cols-4 gap-6 md:gap-x-8 md:gap-y-6 mt-4 md:mt-6 max-w-xs md:max-w-md mx-auto">
      {brands.map((brand, i) => {
        // Masaüstünde tek satır (8 kolon): merkez EN HIZLI, kenarlar EN YAVAŞ
        const dir = i < 4 ? 'ltr' : 'rtl';
        const distFromEdge = Math.min(i, 7 - i); // 0..3
        const staggerIndex = 3 - distFromEdge; // merkez (3,4) -> 0 (hızlı), kenar -> 3 (yavaş)
        return (
        <a
          key={brand.name}
          href={brand.url}
          className="group relative w-16 h-16 md:w-20 md:h-20 block logo-anim"
          aria-label={`${brand.name} Servisi`}
          data-reveal
          data-dir={dir}
          data-stagger-index={String(staggerIndex)}
          data-stagger-step="240"
        >
          {/* Dönen Border Dairesi - 1px kalınlık (Normalde sönük) */}
          <div 
            className="absolute inset-0 rounded-full z-0 transition-all duration-300 opacity-30 group-hover:opacity-0"
            style={{
              background: `conic-gradient(from 0deg, #475569, #1e293b, #475569)`,
            }}
          />

          {/* Hover - Border Parlar ve Kalınlaşır */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 blur-[2px] group-hover:blur-none"
            style={{
              background: `conic-gradient(from 0deg, #F59E0B, #D97706, #F59E0B)`,
            }}
          />

          {/* Logo Container ÜSTTE */}
          <div className="absolute inset-[1px] group-hover:inset-[2px] flex items-center justify-center rounded-full bg-[#0f172a] cursor-pointer transition-all duration-300 z-10 border border-white/5 group-hover:border-transparent">
            {/* Logo Image */}
            <img
              src={`${brand.logo}?v=8`}
              alt={`${brand.name} Servisi`}
              className={`object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${largerBrands.has(brand.name) ? 'w-[50px] h-[50px] md:w-[60px] md:h-[60px]' : 'w-[44px] h-[44px] md:w-[52px] md:h-[52px]'}`}
              loading="lazy"
              width={largerBrands.has(brand.name) ? 60 : 52}
              height={largerBrands.has(brand.name) ? 60 : 52}
              decoding="async"
            />
          </div>
        </a>
        );
      })}
    </div>
  );
}

