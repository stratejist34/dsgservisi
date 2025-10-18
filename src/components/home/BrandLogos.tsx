import { SITE_CONFIG } from '@utils/constants';

export default function BrandLogos() {
  // DSG'yi çıkar, sadece 8 marka (4x2 grid için)
  const brands = SITE_CONFIG.brands.filter(brand => brand.name !== 'DSG');
  const largerBrands = new Set(['Mercedes', 'Porsche', 'Seat', 'Skoda']);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 mt-12 md:mt-16 max-w-5xl mx-auto">
      {brands.map((brand) => (
        <a
          key={brand.name}
          href={brand.url}
          className="group relative w-16 h-16 md:w-20 md:h-20 block"
          aria-label={`${brand.name} Servisi`}
        >
          {/* Dönen Border Dairesi - 2px kalınlık */}
          <div 
            className="absolute inset-0 rounded-full z-0 group-hover:opacity-0 transition-opacity duration-300"
            style={{
              background: `conic-gradient(from 0deg, #00d4ff, #1a9cb0, #5dd3e0, #00d4ff)`,
            }}
          />

          {/* Hover - Border Kalınlaşır (3px) */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `conic-gradient(from 0deg, #00d4ff, #1a9cb0, #5dd3e0, #00d4ff)`,
            }}
          />

          {/* Logo Container ÜSTTE - Normal 2px, Hover 1px border */}
          <div className="absolute inset-[2px] group-hover:inset-[3px] flex items-center justify-center rounded-full bg-transparent cursor-pointer transition-all duration-300 z-10 p-[2px] overflow-hidden">
            {/* Inner badge: soft cyan underlight, button-like */}
            <div
              className="w-full h-full rounded-full shadow-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg,rgb(6, 133, 172) 0%, #0a4d68 100%)'
              }}
            >
              {/* Logo Image */}
              <img
                src={`${brand.logo}?v=8`}
                alt={`${brand.name} Servisi`}
                className={`object-contain opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 ${largerBrands.has(brand.name) ? 'w-[50px] h-[50px] md:w-[60px] md:h-[60px]' : 'w-[44px] h-[44px] md:w-[52px] md:h-[52px]'}`}
                style={{ filter: 'drop-shadow(0 0 1.5px rgba(20, 20, 20, 0.22))' }}
                loading="lazy"
                width={largerBrands.has(brand.name) ? 60 : 52}
                height={largerBrands.has(brand.name) ? 60 : 52}
                decoding="async"
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

