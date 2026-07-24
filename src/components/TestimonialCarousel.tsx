"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const colorStyles: any = {
    yellow: { bg: "bg-[#fef08a] border-[#fde047]", pinBg: "bg-red-400 border-red-500", iconBg: "bg-gray-900" },
    blue: { bg: "bg-[#bfdbfe] border-[#93c5fd]", pinBg: "bg-blue-500 border-blue-600", iconBg: "bg-brand-blue" },
    pink: { bg: "bg-[#fbcfe8] border-[#f9a8d4]", pinBg: "bg-pink-500 border-pink-600", iconBg: "bg-brand-magenta" },
    green: { bg: "bg-[#bbf7d0] border-[#86efac]", pinBg: "bg-emerald-500 border-emerald-600", iconBg: "bg-emerald-600" },
    orange: { bg: "bg-[#fed7aa] border-[#fdba74]", pinBg: "bg-orange-500 border-orange-600", iconBg: "bg-orange-600" },
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 touch-pan-y">
          {testimonials.map((t, index) => {
            const s = colorStyles[t.color || 'yellow'];
            // Add subtle random rotation to make them look like real post-its
            const rotations = ["-rotate-2", "rotate-3", "-rotate-1", "rotate-2", "-rotate-3"];
            const transform = rotations[index % rotations.length];
            // Staggered top margin
            const margins = ["mt-0", "mt-4", "mt-2", "mt-6", "mt-1"];
            const mt = margins[index % margins.length];

            return (
              <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 py-8">
                <div className={`${s.bg} ${mt} text-gray-800 p-8 md:p-10 shadow-[5px_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_20px_30px_rgba(0,0,0,0.15)] transition-all flex flex-col h-full transform ${transform} hover:rotate-0 hover:-translate-y-2 relative border cursor-grab active:cursor-grabbing`}>
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full shadow-md border flex items-center justify-center ${s.pinBg}`}>
                    <div className="w-2 h-2 rounded-full opacity-50 bg-white"></div>
                  </div>
                  
                  <div className="flex items-center mb-6 mt-2">
                    <div className="flex text-amber-500 mr-4">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} className="fill-current h-5 w-5" />)}
                    </div>
                  </div>
                  <p className="text-xl italic text-gray-800 mb-8 flex-grow font-serif leading-relaxed line-clamp-6">
                    &quot;{t.content}&quot;
                  </p>
                  <div className="flex items-center border-t border-black/10 pt-4">
                    <div className={`w-12 h-12 text-white rounded-full mr-4 flex items-center justify-center font-bold ${s.iconBg}`}>
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{t.authorName}</h3>
                      <p className="text-sm font-medium text-gray-700">{t.authorLocation}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-200/50 to-transparent"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={scrollPrev} 
          disabled={!prevBtnEnabled}
          className="w-12 h-12 rounded-full border-2 border-brand-blue flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollNext} 
          disabled={!nextBtnEnabled}
          className="w-12 h-12 rounded-full border-2 border-brand-blue flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
