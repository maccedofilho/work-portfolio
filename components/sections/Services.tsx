import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Cpu, Workflow, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      ...t.services.items[0],
      icon: Cpu,
    },
    {
      ...t.services.items[1],
      icon: Workflow,
    },
    {
      ...t.services.items[2],
      icon: Layers,
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-white dark:bg-stone-900 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <FadeIn className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 mb-4 transition-colors duration-300">
              {t.services.heading}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed transition-colors duration-300">
              {t.services.subheading}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={0.2 * index} className="group">
              <div className="relative h-full p-8 md:p-10 bg-stone-50 dark:bg-stone-950/40 hover:bg-white dark:hover:bg-stone-900 rounded-2xl transition-all duration-500 border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 hover:shadow-2xl hover:shadow-stone-200/50 dark:hover:shadow-stone-900/50 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-stone-200/50 dark:bg-stone-800/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10 w-14 h-14 bg-white dark:bg-stone-900 rounded-2xl flex items-center justify-center mb-8 text-stone-700 dark:text-stone-300 shadow-sm border border-stone-100 dark:border-stone-800 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <service.icon strokeWidth={1.5} size={26} className="group-hover:text-stone-900 dark:group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="relative z-10 text-xl font-medium text-stone-800 dark:text-stone-100 mb-4 transition-colors duration-300">{service.title}</h3>
                <p className="relative z-10 text-stone-600 dark:text-stone-400 font-light leading-relaxed text-sm md:text-base transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
