import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TechStack } from './components/sections/TechStack';
import { Services } from './components/sections/Services';
import { Projects } from './components/sections/Projects';
import { Philosophy } from './components/sections/Philosophy';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 antialiased selection:bg-stone-200 dark:selection:bg-stone-800 selection:text-stone-900 dark:selection:text-stone-50 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <Services />
          <Projects />
          <Philosophy />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;