import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { ArrowUpRight, MessageSquare, Box, Monitor, Settings } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();

  const solutions = [
    { ...t.projects.items[0], icon: MessageSquare },
    { ...t.projects.items[1], icon: Box },
    { ...t.projects.items[2], icon: Monitor },
    { ...t.projects.items[3], icon: Settings }
  ];

  return (
    <section id="projects" className="py-24 md:py-32 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-20 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 mb-6 transition-colors duration-300">
            {t.projects.heading}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 font-light text-lg transition-colors duration-300">
            {t.projects.subheading}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group relative bg-white dark:bg-stone-900 p-8 h-full rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-600 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/60 dark:hover:shadow-stone-900/60 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] uppercase tracking-widest font-medium rounded-full transition-colors duration-300">
                      {solution.category}
                    </span>
                    <div className="text-stone-300 dark:text-stone-600 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors duration-500">
                       <solution.icon size={24} strokeWidth={1} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-light text-stone-800 dark:text-stone-100 mb-4 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-8 transition-colors duration-300">
                    {solution.description}
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-50 dark:border-stone-800 group-hover:border-stone-100 dark:group-hover:border-stone-700 transition-colors">
                  <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors cursor-pointer text-sm font-medium tracking-wide">
                    <span>{t.projects.cta}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
