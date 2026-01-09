import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-0 transition-opacity duration-500"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, #d6d3d1 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
        
        <div className="absolute inset-0 opacity-0 dark:opacity-[0.3] transition-opacity duration-500"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, #44403c 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fafaf9_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#0c0a09_100%)]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        <FadeIn delay={0.2} direction="up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-sm mb-8 backdrop-blur-sm transition-colors duration-300">
            <span className="text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
              {t.hero.tagline}
            </span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.4} direction="up">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-stone-900 dark:text-stone-100 mb-8 leading-[1.1] transition-colors duration-300 whitespace-pre-line drop-shadow-sm">
            {t.hero.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-12 transition-colors duration-300">
            {t.hero.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.8} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="group relative px-10 py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-base font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-black dark:hover:bg-white hover:scale-105 shadow-xl shadow-stone-300/50 dark:shadow-stone-900/50 flex items-center gap-3"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 text-stone-300 dark:text-stone-600 group-hover:text-white dark:group-hover:text-stone-950" />
            </a>
            
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className="group flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 text-sm font-medium tracking-wide transition-colors py-2 px-4 cursor-pointer"
            >
              {t.hero.ctaSecondary}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
