// src/components/sections/Problem.js
import { DatabaseService } from '@/services/database';
import { CircuitPattern } from '@/components/backgrounds';

const FALLBACK_STATS = [
  {
    id: 'fallback-1',
    value: '$3,200',
    label: 'Lost Per Device',
    description:
      'Average value lost when equipment is improperly disposed of or stored in warehouses.',
    color: 'text-red-500',
  },
  {
    id: 'fallback-2',
    value: '2-3',
    label: 'Weeks Delay',
    description:
      'Typical time to complete equipment transitions, affecting productivity and security.',
    color: 'text-red-500',
  },
  {
    id: 'fallback-3',
    value: '73%',
    label: 'Compliance Risk',
    description:
      "Companies that don't properly wipe data face potential security breaches and compliance issues.",
    color: 'text-red-500',
  },
];

const FALLBACK_CONTENT = {
  title: 'The Hidden Cost of IT Equipment Transitions',
  description:
    'When employees leave or upgrade devices, most companies face significant challenges',
  subtitle: "Don't let equipment transitions drain your resources",
  cta_text: 'See How We Solve This',
};

async function getProblemData() {
  try {
    const [statsData, contentRows] = await Promise.all([
      DatabaseService.getProblemStats(),
      DatabaseService.getSiteContent('problem'),
    ]);

    const content = { ...FALLBACK_CONTENT };
    contentRows.forEach(item => {
      content[item.content_key] = item.content_value;
    });

    return {
      problemStats: statsData?.length ? statsData : FALLBACK_STATS,
      siteContent: content,
    };
  } catch (error) {
    console.error('Error fetching problem data:', error);
    return { problemStats: FALLBACK_STATS, siteContent: FALLBACK_CONTENT };
  }
}

const Problem = async () => {
  const { problemStats, siteContent } = await getProblemData();

  return (
    <section
      id="problem"
      className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-800"
    >
      <CircuitPattern />

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
          {problemStats.map(stat => (
            <div
              key={stat.id}
              className="p-8 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:shadow-2xl"
            >
              <div className={`text-4xl font-bold mb-3 ${stat.color || 'text-red-500'}`}>
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {stat.label}
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
              <div
                className={`mt-4 w-12 h-1 mx-auto rounded-full ${
                  stat.color?.includes('orange') ? 'bg-orange-500' : 'bg-red-500'
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            {siteContent.subtitle}
          </p>
          <a
            href="#how-it-works"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          >
            {siteContent.cta_text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Problem;
