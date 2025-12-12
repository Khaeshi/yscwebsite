import { useEffect, useState } from 'react';

interface ParallaxSectionProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
}

export function ParallaxSection({ imageUrl, children, className = '', overlayOpacity = 0.5 }: ParallaxSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: 'transform',
        }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </section>
  );
}