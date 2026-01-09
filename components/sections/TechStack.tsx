import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { useLanguage } from '../../context/LanguageContext';

export const TechStack: React.FC = () => {
  const { t } = useLanguage();
  const benefits = t.techStack;

  return (
    <div className="py-12 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 overflow-hidden relative transition-colors duration-300">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-stone-900 to-transparent transition-colors duration-300"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-stone-900 to-transparent transition-colors duration-300"></div>

      <FadeIn delay={0.2} direction="none">
        <div className="flex w-[200%] animate-scroll">
          <div className="flex gap-16 items-center whitespace-nowrap px-8">
            {benefits.map((item: string, index: number) => (
              <span 
                key={index} 
                className="text-xl md:text-2xl font-light text-stone-400 dark:text-stone-600 select-none uppercase tracking-widest transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-16 items-center whitespace-nowrap px-8">
            {benefits.map((item: string, index: number) => (
              <span 
                key={`dup-${index}`} 
                className="text-xl md:text-2xl font-light text-stone-400 dark:text-stone-600 select-none uppercase tracking-widest transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
