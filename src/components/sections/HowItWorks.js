// src/components/sections/HowItWorks.js
import { DatabaseService } from '@/services/database';
import { WavePattern } from '@/components/backgrounds';

const FALLBACK_STEPS = [
  {
    id: 'fallback-1',
    step_number: 1,
    title: 'Upload Inventory',
    description:
      'Simply upload your device inventory or integrate with existing asset management systems.',
    color: 'bg-blue-600',
  },
  {
    id: 'fallback-2',
    step_number: 2,
    title: 'Employee Marketplace',
    description:
      'Employees browse available devices at discounted rates through our secure platform.',
    color: 'bg-green-600',
  },
  {
    id: 'fallback-3',
    step_number: 3,
    title: 'Secure Transfer',
    description:
      'Automated data wiping, documentation, and secure handover process with full compliance tracking.',
    color: 'bg-purple-600',
  },
];

const FALLBACK_CONTENT = {
  title: 'How It Works',
  description: 'Transform your IT equipment lifecycle in three simple steps',
  cta_text: 'Get Started Today',
};

async function getHowItWorksData() {
  try {
    const [stepsData, contentRows] = await Promise.all([
      DatabaseService.getHowItWorksSteps(),
      DatabaseService.getSiteContent('how_it_works'),
    ]);

    const content = { ...FALLBACK_CONTENT };
    contentRows.forEach(item => {
      content[item.content_key] = item.content_value;
    });

    return {
      steps: stepsData?.length ? stepsData : FALLBACK_STEPS,
      siteContent: content,
    };
  } catch (error) {
    console.error('Error fetching how it works data:', error);
    return { steps: FALLBACK_STEPS, siteContent: FALLBACK_CONTENT };
  }
}

const HowItWorks = async () => {
  const { steps, siteContent } = await getHowItWorksData();

  return (
    <section
      id="how-it-works"
      className="relative py-20 overflow-hidden bg-white dark:bg-gray-900"
    >
      <WavePattern />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {siteContent.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            {siteContent.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="text-center group transition-all duration-300 hover:transform hover:-translate-y-2 text-gray-600 dark:text-gray-300"
            >
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-full ${
                    step.color || 'bg-blue-600'
                  } text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  {step.step_number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform translate-x-8"></div>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#benefits"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          >
            {siteContent.cta_text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
