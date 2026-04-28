// src/app/page.js
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import HowItWorks from '@/components/sections/HowItWorks';
import Benefits from '@/components/sections/Benefits';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
