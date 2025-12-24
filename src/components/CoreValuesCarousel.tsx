// src/components/CoreValuesCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Star } from 'lucide-react';

interface CoreValue {
    subtitle: string;
    details: string;
}

interface CoreValuesCarouselProps {
    coreValues: CoreValue[];
}

const CoreValuesCarousel: React.FC<CoreValuesCarouselProps> = ({ coreValues }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);
    const valuesPerSlide = 3;
    const totalPages = Math.ceil(coreValues.length / valuesPerSlide);
    const slideRef = useRef<HTMLDivElement>(null);

    const goToPage = (pageIndex: number) => {
        if (animating) return;

        const newIndex = pageIndex * valuesPerSlide;
        setAnimating(true);

        if (slideRef.current) {
            void slideRef.current.offsetWidth; // Trigger reflow
        }

        setTimeout(() => {
            setCurrentIndex(newIndex);
            setAnimating(false);
        }, 300);
    };

    useEffect(() => {
        const handleTransitionEnd = () => {
            setAnimating(false);
        };

        if (slideRef.current) {
            slideRef.current.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                slideRef.current?.removeEventListener('transitionend', handleTransitionEnd);
            };
        }
    }, []);

    const currentPageIndex = Math.floor(currentIndex / valuesPerSlide);

    return (
        <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
            <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4">
                <strong>Core Values</strong>
            </h3>

            <div
                ref={slideRef}
                className="relative"
                style={{
                    width: '100%',
                    height: 'auto', 
                }}
            >
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${currentPageIndex * (100 / totalPages)}%)`,
                        width: `${totalPages * 100}%`,
                    }}
                >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                        <div
                            key={pageIndex}
                            style={{
                                width: `${100 / totalPages}%`,
                                boxSizing: 'border-box',
                                padding: '10px',
                            }}
                        >
                            <ul className="space-y-3 ml-6 mr-6">
                                {coreValues
                                    .slice(pageIndex * valuesPerSlide, (pageIndex + 1) * valuesPerSlide)
                                    .map((value, index) => (
                                        <li className="flex items-start gap-2" key={index}>
                                            <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                            <span>
                                                <span className="text-muted-foreground">{value.subtitle}</span>
                                                <br />
                                                <span className="text-muted-foreground leading-relaxed">{value.details}</span>
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index)}
                        className={`h-3 w-3 rounded-full mx-1 ${currentIndex === index * valuesPerSlide ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        disabled={animating}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoreValuesCarousel;