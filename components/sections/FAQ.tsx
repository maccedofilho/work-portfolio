import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const faqs = t.faq.items;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
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
    <section className="py-24 bg-white dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-4 transition-colors duration-300">{t.faq.heading}</h2>
          <p className="text-stone-500 dark:text-stone-400 font-light transition-colors duration-300">{t.faq.subheading}</p>
        </FadeIn>

        <div className="space-y-4 mb-16">
          {faqs.map((faq: any, index: number) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-stone-50 dark:bg-stone-900 border-stone-300 dark:border-stone-700' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-light transition-colors duration-300 ${openIndex === index ? 'text-stone-900 dark:text-stone-100' : 'text-stone-700 dark:text-stone-300'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full border transition-all duration-300 ${openIndex === index ? 'rotate-180 border-stone-800 text-stone-800 dark:border-stone-200 dark:text-stone-200' : 'border-stone-200 text-stone-400 dark:border-stone-700 dark:text-stone-500'}`}>
                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed border-t border-stone-200/50 dark:border-stone-800/50 pt-4 transition-colors duration-300">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-12 p-8 md:p-12 bg-stone-50 dark:bg-stone-950/50 rounded-2xl border border-stone-100 dark:border-stone-800 text-center">
           <p className="text-stone-600 dark:text-stone-300 font-light mb-8 text-xl transition-colors duration-300">{t.faq.ctaText}</p>
           <button 
             onClick={scrollToContact}
             className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-sm font-medium tracking-widest rounded-full transition-all duration-300 hover:bg-black dark:hover:bg-white hover:scale-105 hover:shadow-lg shadow-stone-200/50 dark:shadow-stone-900/50"
           >
             {t.faq.ctaButton}
             <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
           </button>
        </FadeIn>

      </div>
    </section>
  );
};
