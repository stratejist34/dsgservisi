interface ShineBorderProps {
  className?: string;
  duration?: number;
  shineColor?: string[];
  borderWidth?: number;
}

export default function ShineBorder({
  className = '',
  duration = 14,
  shineColor = ['#1a9cb0', '#5dd3e0'],
  borderWidth = 2,
}: ShineBorderProps) {
  const gradientColors = shineColor.join(', ');
  
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${gradientColors}, transparent)`,
        backgroundSize: '200% 100%',
        animation: `shine-sweep ${duration}s linear infinite`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: `${borderWidth}px`,
      }}
    />
  );
}

