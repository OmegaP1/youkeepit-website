// src/components/sections/Benefits.js
import { DatabaseService } from '@/services/database';
import { ParticleField } from '@/components/backgrounds';

const FALLBACK_BENEFITS = [
  {
    id: 'fallback-1',
    title: 'Cost Reduction',
    description:
      'Reduce IT equipment disposal costs by up to 87% while generating revenue from device sales.',
    value: '87%',
    label: 'Cost Savings',
    color: 'text-blue-600',
  },
  {
    id: 'fallback-2',
    title: 'Quick Setup',
    description:
      'Get started in less than 24 hours with our streamlined onboarding process.',
    value: '24hrs',
    label: 'Setup Time',
    color: 'text-green-600',
  },
  {
    id: 'fallback-3',
    title: 'Employee Satisfaction',
    description:
      'Happy employees get quality devices at great prices while supporting sustainability.',
    value: '95%',
    label: 'Satisfaction Rate',
    color: 'text-purple-600',
  },
  {
    id: 'fallback-4',
    title: 'Compliance Ready',
    description:
      'Built-in security features ensure GDPR, SOC 2, and industry compliance requirements.',
    value: '100%',
    label: 'Compliance',
    color: 'text-red-600',
  },
];

const FALLBACK_CONTENT = {
  title: 'Why Choose KeepMyKit?',
  description:
    'Discover the advantages that make us the preferred choice for IT equipment management',
  cta_text: 'Explore Features',
};

const ICON_MAP = {
  'Cost Reduction': '💰',
  'Quick Setup': '⚡',
  'Employee Satisfaction': '😊',
  'Compliance Ready': '🔒',
  'Enterprise Security': '🛡️',
  'Automated Workflows': '⚙️',
  'Analytics Dashboard': '📊',
  'Integration Ready': '🔗',
};

function getIcon(title) {
  return ICON_MAP[title] || '✨';
}

function getIconWrapperClasses(color) {
  if (color?.includes('blue')) {
    return 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-500/30';
  }
  if (color?.includes('green')) {
    return 'bg-green-50 dark:bg-green-900/30 border-2 border-green-100 dark:border-green-500/30';
  }
  if (color?.includes('purple')) {
    return 'bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-100 dark:border-purple-500/30';
  }
  return 'bg-red-50 dark:bg-red-900/30 border-2 border-red-100 dark:border-red-500/30';
}

async function getBenefitsData() {
  try {
    const [benefitsData, contentRows] = await Promise.all([
      DatabaseService.getBenefits(),
      DatabaseService.getSiteContent('benefits'),
    ]);

    const content = { ...FALLBACK_CONTENT };
    contentRows.forEach(item => {
      content[item.content_key] = item.content_value;
    });

    return {
      benefits: benefitsData?.length ? benefitsData : FALLBACK_BENEFITS,
      siteContent: content,
    };
  } catch (error) {
    console.error('Error fetching benefits data:', error);
    return { benefits: FALLBACK_BENEFITS, siteContent: FALLBACK_CONTENT };
  }
}

const Benefits = async () => {
  const { benefits, siteContent } = await getBenefitsData();

  return (
    <section
      id="benefits"
      className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-800"
    >
      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {siteContent.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            {siteContent.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(benefit => (
            <div
              key={benefit.id}
              className="p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl group bg-white/90 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700"
            >
              <div className="mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl transition-all duration-300 group-hover:scale-110 ${getIconWrapperClasses(
                    benefit.color
                  )}`}
                >
                  <div className={benefit.color || 'text-blue-600'}>
                    {getIcon(benefit.title)}
                  </div>
                </div>
              </div>

              <div className={`text-4xl font-bold mb-3 ${benefit.color || 'text-blue-600'}`}>
                {benefit.value}
              </div>

              <div
                className={`text-sm font-medium mb-4 uppercase tracking-wide ${
                  benefit.color || 'text-blue-600'
                }`}
              >
                {benefit.label}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {benefit.title}
              </h3>

              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#features"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          >
            {siteContent.cta_text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
