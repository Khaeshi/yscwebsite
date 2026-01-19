import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback.tsx';

interface Instrument {
  name: string;
  imageUrl: string;
  description: string;
}

const instruments: Instrument[] = [
  {
    name: 'Piano',
    imageUrl: 'https://images.unsplash.com/photo-1766825031819-2af1a924d18d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMGtleXMlMjBpbnN0cnVtZW50fGVufDF8fHx8MTc2ODQ4NTkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Learn classical and contemporary piano techniques'
  },
  {
    name: 'Violin',
    imageUrl: 'https://images.unsplash.com/photo-1676201452253-e1c7874b89d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjBjbGFzc2ljYWwlMjBpbnN0cnVtZW50fGVufDF8fHx8MTc2ODQ4NTkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Master the art of string instruments'
  },
  {
    name: 'Flute',
    imageUrl: 'https://images.unsplash.com/photo-1645772647876-76f184a402a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHV0ZSUyMG11c2ljYWwlMjBpbnN0cnVtZW50fGVufDF8fHx8MTc2ODQ4NTkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Explore the beautiful sound of woodwinds'
  },
  {
    name: 'Ukulele',
    imageUrl: 'https://images.unsplash.com/photo-1633448543112-1e250145c123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1a3VsZWxlJTIwaW5zdHJ1bWVudHxlbnwxfHx8fDE3Njg0ODU5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Start your musical journey with this fun instrument'
  },
  {
    name: 'Cello',
    imageUrl: 'https://images.unsplash.com/photo-1643666805740-f2f9e0600a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMHN0cmluZyUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzY4NDg1OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Discover the deep, rich tones of the cello'
  },
  {
    name: 'Recorder',
    imageUrl: 'https://images.unsplash.com/photo-1541991977-fba2ec087dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRlciUyMHdvb2R3aW5kJTIwaW5zdHJ1bWVudHxlbnwxfHx8fDE3Njg0ODU5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Perfect for beginners and young learners'
  },
  {
    name: 'Voice',
    imageUrl: 'https://images.unsplash.com/photo-1629327896333-7ecec1515ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5naW5nJTIwbWljcm9waG9uZSUyMHZvaWNlfGVufDF8fHx8MTc2ODQ4NTkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Develop your vocal skills and confidence'
  },
  {
    name: 'Saxophone',
    imageUrl: 'https://images.unsplash.com/photo-1682268294570-616e9ca9791b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHh4eWxvcGhvbmUlMjBwZXJjdXNzaW9uJTIwaW5zdHJ1bWVudHxlbnwxfHx8fDE3Njg0ODU5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Learn rhythm and melody through percussion'
  }
];

export default function InstrumentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(instruments.length); // Start from first clone set
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3); // Default to 3, will update on mount
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by cloning items
  const extendedInstruments = [
    ...instruments, // Clone at start for infinite scroll left
    ...instruments, // Original items
    ...instruments  // Clone at end for infinite scroll right
  ];

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setItemsPerView(3);
      } else if (width >= 480) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Handle infinite loop logic
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      // Reset to original position when reaching clones
      if (currentIndex >= instruments.length * 2) {
        // Reached end clones, jump back to start of original
        setCurrentIndex(instruments.length);
      } else if (currentIndex < instruments.length) {
        // Reached start clones, jump forward to end of original
        setCurrentIndex(instruments.length * 2 - 1);
      }
    }, 600); // Match updated transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    setOffset(diff);
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Threshold for swipe (in pixels)
    const threshold = 50;
    
    if (offset > threshold) {
      // Swipe right - go to previous
      goToPrevious();
    } else if (offset < -threshold) {
      // Swipe left - go to next
      goToNext();
    }
    
    setOffset(0);
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div className="relative select-none">
      {/* Carousel Container */}
      <div 
        className="overflow-hidden cursor-grab active:cursor-grabbing" 
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${translateX}px))`,
            transition: (isDragging || !isTransitioning) ? 'none' : 'transform 600ms ease-in-out'
          }}
        >
          {extendedInstruments.map((instrument, index) => {
            const position = index - currentIndex;
            const centerIndex = Math.floor(itemsPerView / 2);
            const isCenter = position === centerIndex;
            const isInView = position >= 0 && position < itemsPerView;
            
            return (
              <div
                key={`${instrument.name}-${index}`}
                className="px-3 transition-all duration-300"
                style={{
                  minWidth: `${100 / itemsPerView}%`,
                  opacity: isInView ? 1 : 0.3,
                  transform: isCenter ? 'scale(1.05)' : 'scale(0.9)',
                  filter: isCenter ? 'none' : 'brightness(0.7)',
                  zIndex: isCenter ? 10 : 1
                }}
              >
                <div className="from-purple-50 to-pink-50 rounded-2xl p-6 transition-all duration-300">
                  <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-white">
                    <ImageWithFallback
                      src={instrument.imageUrl}
                      alt={instrument.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-center mb-2">{instrument.name}</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    {instrument.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint text */}
      <p className="text-center text-muted-foreground text-sm mt-6 opacity-60">
        Swipe or drag to explore instruments
      </p>
    </div>
  );
}