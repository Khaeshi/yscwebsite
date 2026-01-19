'use client'

import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback.tsx';
import { Piano, Violin, Guitar, Flute } from '../../config.ts'

interface Instrument {
  name: string;
  imageUrl: string;
  description: string;
}

const instruments: Instrument[] = [
  {
    name: 'Piano',
    imageUrl: Piano,
    description: 'Learn classical and contemporary piano techniques'
  },
  {
    name: 'Violin',
    imageUrl: Violin,
    description: 'Master the art of string instruments'
  },
  {
    name: 'Flute',
    imageUrl: Flute,
    description: 'Explore the beautiful sound of woodwinds'
  },
  {
    name: 'Guitar',
    imageUrl: Guitar,
    description: 'Learn rhythm and melody through percussion'
  },
  {
    name: 'Ukulele',
    imageUrl: Flute,
    description: 'Start your musical journey with this fun instrument'
  },
  {
    name: 'Cello',
    imageUrl: Violin,
    description: 'Discover the deep, rich tones of the cello'
  },
  {
    name: 'Recorder',
    imageUrl: Flute,
    description: 'Perfect for beginners and young learners'
  },
  {
    name: 'Voice',
    imageUrl: Piano,
    description: 'Develop your vocal skills and confidence'
  },
  {
    name: 'Saxophone',
    imageUrl: Guitar,
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