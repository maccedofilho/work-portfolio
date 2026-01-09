import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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

  const navLinks = [
    { name: t.nav.services, id: 'services' },
    { name: t.nav.projects, id: 'projects' },
    { name: t.nav.philosophy, id: 'philosophy' },
    { name: t.nav.contact, id: 'contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, 'top')}
            className="z-50 flex items-center gap-4 group"
          >
             <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl border border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm transition-all duration-500 group-hover:border-stone-400 dark:group-hover:border-stone-500 group-hover:bg-white dark:group-hover:bg-stone-800 group-hover:shadow-lg group-hover:shadow-stone-200/40 dark:group-hover:shadow-stone-900/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-stone-800 dark:text-stone-200 transition-transform duration-700 group-hover:rotate-90">
                   <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                   <path d="M12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                   <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
             </div>

             <div className="flex flex-col justify-center">
               <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-none group-hover:text-black dark:group-hover:text-white transition-colors">
                 R.M.
               </span>
               <span className="text-[10px] font-medium tracking-widest text-stone-500 dark:text-stone-400 uppercase mt-0.5 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                 Systems
               </span>
             </div>
          </a>

          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300 tracking-wide cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 mx-2"></div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded text-xs font-semibold tracking-wide text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors uppercase"
                aria-label="Toggle Language"
              >
                {language === 'pt' ? 'EN' : 'PT'}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
             <button
                onClick={toggleLanguage}
                className="text-xs font-bold tracking-wide text-stone-500 dark:text-stone-400 uppercase p-2"
              >
                {language === 'pt' ? 'EN' : 'PT'}
              </button>
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-stone-500 dark:text-stone-400"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="z-50 p-2 text-stone-800 dark:text-stone-200"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-50 dark:bg-stone-950 z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-2xl font-light text-stone-800 dark:text-stone-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
