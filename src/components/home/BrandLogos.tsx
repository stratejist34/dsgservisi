import { SITE_CONFIG } from '@utils/constants';

export default function BrandLogos() {
  // DSG'yi çıkar, sadece 8 marka (4x2 grid için)
  const brands = SITE_CONFIG.brands.filter(brand => brand.name !== 'DSG');

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
              animation: 'rotate-continuous 3s linear infinite',
            }}
          />

          {/* Hover - Border Kalınlaşır (3px) */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `conic-gradient(from 0deg, #00d4ff, #1a9cb0, #5dd3e0, #00d4ff)`,
              animation: 'rotate-continuous 2s linear infinite',
            }}
          />

          {/* Logo Container ÜSTTE - Normal 2px, Hover 1px border */}
          <div className="absolute inset-[2px] group-hover:inset-[3px] flex items-center justify-center rounded-full bg-navy cursor-pointer transition-all duration-300 z-10">
            {/* Logo Image - Hover'da scale */}
            <img
              src={brand.logo}
              alt={`${brand.name} Servisi`}
              className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              loading="lazy"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

