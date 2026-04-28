// src/components/sections/Pricing.js
import { DatabaseService } from '@/services/database';
import { GeometricPattern } from '@/components/backgrounds';

const FALLBACK_PLANS = [
  {
    id: 'fallback-starter',
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 50 devices',
      'Basic employee portal',
      'Email support',
      'Standard data wiping',
      'Basic analytics',
    ],
    is_popular: false,
  },
  {
    id: 'fallback-pro',
    name: 'Professional',
    price: '$149',
    period: '/month',
    description: 'Ideal for growing organizations',
    features: [
      'Up to 200 devices',
      'Advanced employee portal',
      'Priority support',
      'Certified data destruction',
      'Advanced analytics',
      'API integrations',
      'Custom branding',
    ],
    is_popular: true,
  },
  {
    id: 'fallback-enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored for large organizations',
    features: [
      'Unlimited devices',
      'White-label solution',
      'Dedicated support',
      'Enterprise integrations',
      'Custom workflows',
      'Advanced security',
      'SLA guarantees',
    ],
    is_popular: false,
  },
];

const FALLBACK_CONTENT = {
  title: 'Simple, Transparent Pricing',
  description: 'Choose the plan that fits your organization size and needs',
};

async function getPricingData() {
  try {
    const [plansData, contentRows] = await Promise.all([
      DatabaseService.getPricingPlans(),
      DatabaseService.getSiteContent('pricing'),
    ]);

    const content = { ...FALLBACK_CONTENT };
    contentRows.forEach(item => {
      content[item.content_key] = item.content_value;
    });

    return {
      pricingPlans: plansData?.length ? plansData : FALLBACK_PLANS,
      siteContent: content,
    };
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return { pricingPlans: FALLBACK_PLANS, siteContent: FALLBACK_CONTENT };
  }
}

const Pricing = async () => {
  const { pricingPlans, siteContent } = await getPricingData();

  return (
    <section
      id="pricing"
      className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <GeometricPattern />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {siteContent.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            {siteContent.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl border relative transition-all duration-200 hover:transform hover:-translate-y-1 ${
                plan.is_popular
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 border-blue-200 dark:border-blue-500 shadow-2xl shadow-blue-200/20 dark:shadow-blue-500/20'
                  : 'bg-white/90 dark:bg-gray-800/80 hover:shadow-lg dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-lg text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {(plan.features || []).map(feature => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            Need a custom solution? Contact our sales team for enterprise pricing.
          </p>
          <a
            href="#faq"
            className="inline-block px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
          >
            View FAQ
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
