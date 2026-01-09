import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { CheckCircle2, ArrowDown, Database, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Philosophy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-stone-50 dark:bg-stone-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-1">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 mb-8 transition-colors duration-300">
                {t.philosophy.heading}
              </h2>
              <p className="text-stone-700 dark:text-stone-400 font-light leading-relaxed mb-8 text-lg transition-colors duration-300">
                {t.philosophy.text}
              </p>
              
              <div className="space-y-6">
                {t.philosophy.list.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle2 className="text-stone-400 dark:text-stone-600 mt-1 flex-shrink-0 transition-colors duration-300" size={20} strokeWidth={1.5} />
                    <div>
                      <h4 className="text-stone-800 dark:text-stone-200 font-normal mb-1 transition-colors duration-300">{item.title}</h4>
                      <p className="text-stone-600 dark:text-stone-500 font-light text-sm transition-colors duration-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="order-2 relative flex justify-center lg:justify-end">
             <FadeIn direction="up" delay={0.2} className="w-full max-w-md">
                <div className="relative">
                   <div className="absolute inset-0 bg-stone-200 dark:bg-stone-900/50 rounded-2xl transform translate-x-3 translate-y-3 -z-10 transition-colors duration-300 blur-sm"></div>
                   
                   <div className="bg-white dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-xl shadow-stone-200/50 dark:shadow-stone-900/50 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-8 border-b border-stone-100 dark:border-stone-800 pb-4 transition-colors duration-300">
                        <span className="text-xs font-normal uppercase tracking-widest text-stone-400 dark:text-stone-500">{t.philosophy.diagram.label}</span>
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-stone-700 transition-colors duration-300"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-stone-700 transition-colors duration-300"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-4 p-4 bg-stone-50/50 dark:bg-stone-950/30 rounded-lg border border-stone-100 dark:border-stone-800 transition-colors duration-300 hover:bg-stone-50 dark:hover:bg-stone-950/50">
                           <div className="w-10 h-10 bg-white dark:bg-stone-900 rounded flex items-center justify-center border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 shadow-sm transition-colors duration-300">
                              <Database size={20} strokeWidth={1.5} />
                           </div>
                           <div>
                              <div className="text-sm font-normal text-stone-900 dark:text-stone-100 transition-colors duration-300">{t.philosophy.diagram.input}</div>
                              <div className="text-xs text-stone-500 dark:text-stone-500 font-light transition-colors duration-300">{t.philosophy.diagram.inputSub}</div>
                           </div>
                        </div>

                        <div className="flex justify-center py-1">
                           <ArrowDown size={14} className="text-stone-300 dark:text-stone-700 transition-colors duration-300" />
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white dark:bg-stone-800 rounded-lg border border-stone-300 dark:border-stone-600 shadow-lg shadow-stone-100 dark:shadow-stone-900/50 relative overflow-hidden transition-colors duration-300">
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-stone-900 dark:bg-stone-100 transition-colors duration-300"></div>
                           <div className="absolute right-0 top-0 w-20 h-20 bg-stone-100 dark:bg-stone-700 rounded-full blur-2xl opacity-50 -mr-10 -mt-10 animate-pulse-slow"></div>

                           <div className="relative z-10 w-10 h-10 bg-stone-100 dark:bg-stone-700 rounded flex items-center justify-center text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-600 transition-colors duration-300">
                              <Cpu size={20} strokeWidth={1.5} className="animate-[pulse_3s_ease-in-out_infinite]" />
                           </div>
                           <div className="relative z-10">
                              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 transition-colors duration-300">{t.philosophy.diagram.process}</div>
                              <div className="text-xs text-stone-600 dark:text-stone-300 font-light transition-colors duration-300">{t.philosophy.diagram.processSub}</div>
                           </div>
                        </div>

                        <div className="flex justify-center py-1">
                           <ArrowDown size={14} className="text-stone-300 dark:text-stone-700 transition-colors duration-300" />
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-stone-50/50 dark:bg-stone-950/30 rounded-lg border border-stone-100 dark:border-stone-800 transition-colors duration-300 hover:bg-stone-50 dark:hover:bg-stone-950/50">
                           <div className="w-10 h-10 bg-white dark:bg-stone-900 rounded flex items-center justify-center border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 shadow-sm transition-colors duration-300">
                              <Zap size={20} strokeWidth={1.5} />
                           </div>
                           <div>
                              <div className="text-sm font-normal text-stone-900 dark:text-stone-100 transition-colors duration-300">{t.philosophy.diagram.output}</div>
                              <div className="text-xs text-stone-500 dark:text-stone-500 font-light transition-colors duration-300">{t.philosophy.diagram.outputSub}</div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
             </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
