import { AnimatedList } from '@components/ui/AnimatedList';

const services = [
  'DSG Volant Değişimi',
  'DSG Yağ Değişimi',
  'DSG Kavrama Değişimi',
  'DSG Mekatronik Kart',
  'DSG Şanzıman Revizyon',
  'Audi S-Tronic Bakımı',
  'Multitronic Revizyon',
  'Porsche PDK Bakımı',
  'BMW Steptronic Servis',
  'Mercedes 7G-Tronic',
];

interface ServiceItemProps {
  name: string;
}

function ServiceItem({ name }: ServiceItemProps) {
  return (
    <div className="w-full group relative">
      <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer bg-slate-800/50 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-150 group-hover:shadow-[0_0_10px_#f59e0b] transition-all duration-300"></div>
        <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
          {name}
        </span>
        <svg 
          className="w-5 h-5 ml-auto text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </div>
    </div>
  );
}

export default function AnimatedServiceList() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <AnimatedList delay={975} className="w-full">
        {services.map((service, idx) => (
          <ServiceItem key={idx} name={service} />
        ))}
      </AnimatedList>
      
      {/* Fade Gradients - Dark Mode */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0f172a] to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
