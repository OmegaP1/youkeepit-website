// src/components/sections/Features.js
import { DatabaseService } from '@/services/database';
import { GradientMesh } from '@/components/backgrounds';

const FALLBACK_FEATURES = [
  {
    id: 'fallback-1',
    title: 'Enterprise Security',
    description:
      'Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.',
    icon: '🔒',
  },
  {
    id: 'fallback-2',
    title: 'Employee Portal',
    description:
      'Self-service marketplace where employees can browse, purchase, and track their orders.',
    icon: '👥',
  },
  {
    id: 'fallback-3',
    title: 'Analytics Dashboard',
    description:
      'Real-time insights into asset recovery, cost savings, and environmental impact.',
    icon: '📊',
  },
  {
    id: 'fallback-4',
    title: 'Automated Workflows',
    description:
      'Streamlined processes for device preparation, data wiping, and documentation.',
    icon: '⚙️',
  },
  {
    id: 'fallback-5',
    title: 'Integration Ready',
    description:
      'Seamlessly connects with your existing HRIS, asset management, and IT systems.',
    icon: '🔗',
  },
  {
    id: 'fallback-6',
    title: 'White-Label Option',
    description:
      'Customize the platform with your branding for a seamless employee experience.',
    icon: '🎨',
  },
];

const FALLBACK_CONTENT = {
  title: 'Powerful Features',
  description:
    'Everything you need to manage IT equipment transitions efficiently and securely.',
};

async function getFeaturesData() {
  try {
    const [featuresData, contentRows] = await Promise.all([
      DatabaseService.getFeatures(),
      DatabaseService.getSiteContent('features'),
    ]);

    const content = { ...FALLBACK_CONTENT };
    contentRows.forEach(item => {
      content[item.content_key] = item.content_value;
    });

    return {
      features: featuresData?.length ? featuresData : FALLBACK_FEATURES,
      siteContent: content,
    };
  } catch (error) {
    console.error('Error fetching features data:', error);
    return { features: FALLBACK_FEATURES, siteContent: FALLBACK_CONTENT };
  }
}

const Features = async () => {
  const { features, siteContent } = await getFeaturesData();

  return (
    <section
      id="features"
      className="relative py-20 overflow-hidden bg-white dark:bg-gray-900"
    >
      <GradientMesh />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {siteContent.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            {siteContent.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => (
            <div
              key={feature.id}
              className="p-6 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl group bg-gray-50/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
            >
              <div className="mb-4">
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 opacity-80 dark:opacity-90">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>

              <div className="mt-4 w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12 bg-blue-600 dark:bg-blue-500"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            Ready to experience these powerful features?
          </p>
          <a
            href="#pricing"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Explore Pricing Plans
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
