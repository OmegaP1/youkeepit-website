// src/components/sections/Hero.js
import { DatabaseService } from '@/services/database';
import { GeometricPattern } from '@/components/backgrounds';

const FALLBACK = {
  title: 'Transform IT Equipment Transitions',
  subtitle:
    'Turn departing employee devices into valuable assets for your team while maximizing recovery and minimizing waste.',
  cta_primary: 'Start Free Trial',
  cta_secondary: 'Watch Demo',
};

async function getHeroContent() {
  try {
    const rows = await DatabaseService.getSiteContent('hero');
    const map = {};
    rows.forEach(item => {
      map[item.content_key] = item.content_value;
    });
    return { ...FALLBACK, ...map };
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return FALLBACK;
  }
}

const Hero = async () => {
  const siteContent = await getHeroContent();

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 overflow-hidden bg-white dark:bg-gray-900"
    >
      <GeometricPattern />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            {siteContent.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-600 dark:text-gray-300">
            {siteContent.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {siteContent.cta_primary}
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
            >
              {siteContent.cta_secondary}
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Trusted by 500+ companies worldwide</span>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="grid md:grid-cols-3 gap-8 opacity-80">
            <div className="p-6 rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-300 bg-white dark:bg-gray-800">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Employee Departure
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automated workflow triggers
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow-lg transform -rotate-1 hover:rotate-0 transition-all duration-300 bg-white dark:bg-gray-800">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Device Processing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure data wiping & assessment
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300 bg-white dark:bg-gray-800">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Employee Marketplace
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Staff purchase at great prices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
