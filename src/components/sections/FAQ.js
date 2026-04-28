// src/components/sections/FAQ.js
import { DatabaseService } from '@/services/database';
import { CodeMatrix } from '@/components/backgrounds';
import FAQAccordion from './FAQAccordion';

const FALLBACK_ITEMS = [
  {
    id: 'fallback-1',
    question: 'How quickly can we get started?',
    answer:
      'Most customers are up and running within 24 hours. Our onboarding team handles the technical setup, data migration, and team training.',
  },
  {
    id: 'fallback-2',
    question: 'Is data wiping certified and compliant?',
    answer:
      'Yes, we use NIST 800-88 compliant data destruction methods and provide certificates of destruction. We meet all major compliance standards including SOC 2, GDPR, HIPAA, and ISO 27001.',
  },
  {
    id: 'fallback-3',
    question: 'How do employees benefit from this?',
    answer:
      'Employees get access to quality, certified pre-owned devices at significant discounts (typically 40-60% below retail). They also enjoy a streamlined purchase process and quality guarantees.',
  },
  {
    id: 'fallback-4',
    question: 'What about device warranties?',
    answer:
      'All devices sold through our marketplace come with our quality guarantee. We provide a 30-day return policy and work with manufacturers to maintain remaining warranties when possible.',
  },
  {
    id: 'fallback-5',
    question: 'Can we integrate with our existing systems?',
    answer:
      'Absolutely. We offer integrations with popular HRIS systems (Workday, BambooHR, ADP), asset management tools (ServiceNow, Lansweeper), and accounting software through our REST API and pre-built connectors.',
  },
  {
    id: 'fallback-6',
    question: 'What kind of analytics do we get?',
    answer:
      "Our dashboard provides comprehensive analytics including cost savings, environmental impact, employee adoption rates, device lifecycle analytics, and ROI tracking. You'll see exactly how much value you're recovering.",
  },
];

const FALLBACK_CONTENT = {
  title: 'Frequently Asked Questions',
  description: 'Get answers to common questions about KeepMyKit',
};

async function getFAQData() {
  try {
    const [itemsData, contentRows] = await Promise.all([
      DatabaseService.getFAQItems(),
      DatabaseService.getSiteContent('faq'),
    ]);

    const content = { ...FALLBACK_CONTENT };
    contentRows.forEach(item => {
      content[item.content_key] = item.content_value;
    });

    return {
      faqItems: itemsData?.length ? itemsData : FALLBACK_ITEMS,
      siteContent: content,
    };
  } catch (error) {
    console.error('Error fetching FAQ data:', error);
    return { faqItems: FALLBACK_ITEMS, siteContent: FALLBACK_CONTENT };
  }
}

const FAQ = async () => {
  const { faqItems, siteContent } = await getFAQData();

  return (
    <section
      id="faq"
      className="relative py-20 overflow-hidden bg-white dark:bg-gray-800"
    >
      <CodeMatrix />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {siteContent.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            {siteContent.description}
          </p>
        </div>

        <FAQAccordion items={faqItems} />

        <div className="text-center mt-16">
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            Still have questions? We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@youkeepit.com"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Contact Support
            </a>
            <a
              href="#pricing"
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
