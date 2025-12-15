import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.tsx';
import { ArrowLeft } from 'lucide-react';

interface ParallaxHeroProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  stats?: { number: string; label: string }[];
  showBackButton?: boolean;
}

export function ParallaxHero({ imageUrl, title, subtitle, stats, showBackButton = false }: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setScrollY(window.scrollY);
      } catch (error) {
        console.error('Scroll handling error:', error);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
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
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80" />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {showBackButton && (
          <a href="/">
            <Button variant="ghost" className="mb-6 text-white hover:text-yellow-300 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </a>
        )}
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-white">Professional Program</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
              {title}
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats?.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}