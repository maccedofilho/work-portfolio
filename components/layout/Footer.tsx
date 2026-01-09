import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="text-lg font-normal tracking-tight text-stone-800 dark:text-stone-100 block mb-1 transition-colors duration-300">R.M.</span>
          <p className="text-stone-500 dark:text-stone-500 text-sm font-light transition-colors duration-300">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-sm font-normal transition-colors">LinkedIn</a>
          <a href="#" className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-sm font-normal transition-colors">GitHub</a>
          <a href="#" className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-sm font-normal transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};
