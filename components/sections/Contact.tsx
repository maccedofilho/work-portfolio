import React, { useState } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { ArrowRight, Mail, Calendar, Sparkles, Video, ScrollText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    objective: '',
    details: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.objective.trim() || !formData.details.trim()) {
      setError(t.contact.form.errorRequired);
      return;
    }

    setFormStatus('submitting');
    setError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/ricardomacedev@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nome: formData.name,
          Email: formData.email,
          Objetivo: formData.objective,
          Detalhes: formData.details,
          Origem: 'ricardomacedo-site'
        })
      });

      if (!response.ok) {
        throw new Error('failed');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', objective: '', details: '' });
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setError(t.contact.form.errorSubmit);
    } finally {
      if (formStatus === 'submitting') {
        setFormStatus((prev) => (prev === 'submitting' ? 'idle' : prev));
      }
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6 tracking-tight transition-colors duration-300">
                {t.contact.heading}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg transition-colors duration-300">
                {t.contact.subheading}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="lg:col-span-7 md:pt-10">
            <FadeIn delay={0.2}>
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center p-16 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800 text-center h-full min-h-[450px]">
                  <div className="w-20 h-20 bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full flex items-center justify-center mb-6">
                    <ArrowRight size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-normal text-stone-800 dark:text-stone-100 mb-2">{t.contact.successTitle}</h3>
                  <p className="text-stone-600 dark:text-stone-400 font-light max-w-xs mx-auto">
                    {t.contact.successText}
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 font-normal transition-colors"
                  >
                    {t.contact.newMessage}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-2 group">
                      <label className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-medium ml-1 group-focus-within:text-stone-800 dark:group-focus-within:text-stone-200 transition-colors">{t.contact.form.name}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={handleChange('name')}
                        className={`w-full bg-transparent border-b p-3 pl-1 focus:outline-none transition-all duration-300 text-stone-800 dark:text-stone-200 font-light text-lg placeholder:text-stone-300/0 focus:placeholder:text-stone-300 dark:focus:placeholder:text-stone-700 ${
                          focusedField === 'name' ? 'border-stone-800 dark:border-stone-200' : 'border-stone-200 dark:border-stone-800'
                        }`}
                        placeholder={t.contact.form.namePlaceholder}
                      />
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-medium ml-1 group-focus-within:text-stone-800 dark:group-focus-within:text-stone-200 transition-colors">{t.contact.form.email}</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={handleChange('email')}
                        className={`w-full bg-transparent border-b p-3 pl-1 focus:outline-none transition-all duration-300 text-stone-800 dark:text-stone-200 font-light text-lg placeholder:text-stone-300/0 focus:placeholder:text-stone-300 dark:focus:placeholder:text-stone-700 ${
                          focusedField === 'email' ? 'border-stone-800 dark:border-stone-200' : 'border-stone-200 dark:border-stone-800'
                        }`}
                        placeholder={t.contact.form.emailPlaceholder}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-medium ml-1 group-focus-within:text-stone-800 dark:group-focus-within:text-stone-200 transition-colors">{t.contact.form.context}</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-transparent border-b border-stone-200 dark:border-stone-800 p-3 pl-1 pr-10 focus:outline-none focus:border-stone-800 dark:focus:border-stone-200 transition-colors text-stone-800 dark:text-stone-200 font-light text-lg appearance-none cursor-pointer"
                        value={formData.objective}
                        onChange={handleChange('objective')}
                      >
                        <option value="" disabled className="text-stone-300">{t.contact.form.contextPlaceholder}</option>
                        {t.contact.form.options.map((opt: string, idx: number) => (
                           <option key={idx} className="text-stone-800 dark:text-stone-900">{opt}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-medium ml-1 group-focus-within:text-stone-800 dark:group-focus-within:text-stone-200 transition-colors">{t.contact.form.details}</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.details}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleChange('details')}
                      className={`w-full bg-transparent border-b p-3 pl-1 focus:outline-none transition-all duration-300 resize-none text-stone-800 dark:text-stone-200 font-light text-lg placeholder:text-stone-300 dark:placeholder:text-stone-700 ${
                        focusedField === 'message' ? 'border-stone-800 dark:border-stone-200' : 'border-stone-200 dark:border-stone-800'
                      }`}
                      placeholder={t.contact.form.detailsPlaceholder}
                    ></textarea>
                  </div>

                  <div className="pt-8">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="group flex items-center justify-between gap-6 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-950 pl-8 pr-6 py-5 rounded-full font-light text-sm tracking-widest hover:bg-stone-800 dark:hover:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto min-w-[240px]"
                    >
                      <span>{formStatus === 'submitting' ? t.contact.form.sending : t.contact.form.button}</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-stone-300 dark:text-stone-600" />
                    </button>
                    {error && (
                      <p className="mt-4 text-sm text-amber-700 dark:text-amber-400" role="status" aria-live="polite">
                        {error}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </FadeIn>
          </div>

          <div className="lg:col-span-5 relative">
             <FadeIn delay={0.4} className="h-full">
                <div className="bg-stone-50 dark:bg-stone-950 rounded-3xl p-8 h-full border border-stone-100 dark:border-stone-800 flex flex-col justify-between shadow-sm shadow-stone-100/50 dark:shadow-stone-900/50 transition-colors duration-300">
                   
                   <div className="mb-10">
                      <h3 className="text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-medium mb-4 pl-1">{t.contact.info.direct}</h3>
                      <a href="mailto:ricardomacedev@gmail.com" className="flex items-center gap-4 group cursor-pointer p-3 -ml-3 rounded-lg hover:bg-white dark:hover:bg-stone-900 transition-all duration-300 border border-transparent hover:border-stone-200 dark:hover:border-stone-800 hover:shadow-sm">
                        <div className="w-10 h-10 bg-white dark:bg-stone-900 rounded-lg flex items-center justify-center border border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-500 group-hover:border-stone-300 dark:group-hover:border-stone-700 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors shadow-sm">
                          <Mail size={18} strokeWidth={1.5}/>
                        </div>
                        <div>
                          <p className="text-base font-medium text-stone-800 dark:text-stone-200 group-hover:text-black dark:group-hover:text-white transition-colors">ricardomacedev@gmail.com</p>
                          <p className="text-xs font-normal text-stone-500 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-400">{t.contact.info.location}</p>
                        </div>
                      </a>
                   </div>

                   <div className="flex-grow">
                      <h3 className="text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-medium mb-6 pl-1">{t.contact.info.expect}</h3>
                      
                      <div className="relative pl-1">
                        
                        <div className="relative group flex gap-5 pb-8 last:pb-0">
                           <div className="absolute left-[17px] top-8 bottom-0 w-px bg-stone-200 dark:bg-stone-800 group-last:hidden"></div>
                           
                           <div className="relative z-10 flex-shrink-0">
                              <div className="w-9 h-9 rounded-full bg-white dark:bg-stone-900 ring-1 ring-stone-200 dark:ring-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500 shadow-sm transition-all duration-300 group-hover:ring-stone-400 dark:group-hover:ring-stone-600 group-hover:scale-105 group-hover:text-stone-800 dark:group-hover:text-stone-200 group-hover:shadow-md">
                                 <Sparkles size={16} strokeWidth={1.5} />
                              </div>
                           </div>
                           
                           <div className="pt-1.5 transition-opacity duration-300">
                              <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-1 group-hover:text-black dark:group-hover:text-white transition-colors">{t.contact.info.step1Title}</h4>
                              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-[280px] group-hover:text-stone-600 dark:group-hover:text-stone-300">
                                {t.contact.info.step1Desc}
                              </p>
                           </div>
                        </div>

                        <div className="relative group flex gap-5 pb-8 last:pb-0">
                           <div className="absolute left-[17px] top-8 bottom-0 w-px bg-stone-200 dark:bg-stone-800 group-last:hidden"></div>
                           
                           <div className="relative z-10 flex-shrink-0">
                              <div className="w-9 h-9 rounded-full bg-white dark:bg-stone-900 ring-1 ring-stone-200 dark:ring-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500 shadow-sm transition-all duration-300 group-hover:ring-stone-400 dark:group-hover:ring-stone-600 group-hover:scale-105 group-hover:text-stone-800 dark:group-hover:text-stone-200 group-hover:shadow-md">
                                 <Video size={16} strokeWidth={1.5} />
                              </div>
                           </div>
                           
                           <div className="pt-1.5 transition-opacity duration-300">
                              <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-1 group-hover:text-black dark:group-hover:text-white transition-colors">{t.contact.info.step2Title}</h4>
                              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-[280px] group-hover:text-stone-600 dark:group-hover:text-stone-300">
                                {t.contact.info.step2Desc}
                              </p>
                           </div>
                        </div>

                        <div className="relative group flex gap-5">
                           
                           <div className="relative z-10 flex-shrink-0">
                              <div className="w-9 h-9 rounded-full bg-white dark:bg-stone-900 ring-1 ring-stone-200 dark:ring-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500 shadow-sm transition-all duration-300 group-hover:ring-stone-400 dark:group-hover:ring-stone-600 group-hover:scale-105 group-hover:text-stone-800 dark:group-hover:text-stone-200 group-hover:shadow-md">
                                 <ScrollText size={16} strokeWidth={1.5} />
                              </div>
                           </div>
                           
                           <div className="pt-1.5 transition-opacity duration-300">
                              <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-1 group-hover:text-black dark:group-hover:text-white transition-colors">{t.contact.info.step3Title}</h4>
                              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-[280px] group-hover:text-stone-600 dark:group-hover:text-stone-300">
                                {t.contact.info.step3Desc}
                              </p>
                           </div>
                        </div>

                      </div>
                   </div>

                   <div className="mt-10 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
                      <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 text-[11px] font-medium">
                        <Calendar size={14} />
                        <span>{t.contact.info.timezone}</span>
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
