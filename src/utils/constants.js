// Navigation items
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#benefits' },
  { label: 'Contact', href: '#faq' },
]

// Footer links
export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '/security' },
    { label: 'Integrations', href: '/integrations' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Status', href: '/status' }
  ]
}

// Section IDs for scroll spy
export const SECTION_IDS = [
  'home',
  'problem', 
  'how-it-works',
  'benefits',
  'features',
  'testimonials',
  'pricing',
  'faq'
]

// Company statistics
export const COMPANY_STATS = [
  { value: '87%', label: 'Cost Reduction' },
  { value: '24hrs', label: 'Setup Time' },
  { value: '500+', label: 'Companies' }
]

// Problem statistics
export const PROBLEM_STATS = [
  {
    value: '$3,200',
    label: 'Lost Per Device',
    description: 'Average value lost when equipment is improperly disposed of or stored in warehouses.',
    color: 'text-red-500'
  },
  {
    value: '2-3',
    label: 'Weeks Delay',
    description: 'Typical time to complete equipment transitions, affecting productivity and security.',
    color: 'text-red-500'
  },
  {
    value: '73%',
    label: 'Compliance Risk',
    description: 'Companies that don\'t properly wipe data face potential security breaches and compliance issues.',
    color: 'text-red-500'
  }
]

// How it works steps
export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Upload Inventory',
    description: 'Simply upload your device inventory or integrate with existing asset management systems.',
    color: 'bg-blue-600'
  },
  {
    step: 2,
    title: 'Employee Marketplace',
    description: 'Employees browse available devices at discounted rates through our secure platform.',
    color: 'bg-green-600'
  },
  {
    step: 3,
    title: 'Secure Transfer',
    description: 'Automated data wiping, documentation, and secure handover process with full compliance tracking.',
    color: 'bg-purple-600'
  }
]

// Features list
export const FEATURES_LIST = [
  {
    title: "Enterprise Security",
    description: "Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.",
    icon: "🔒"
  },
  {
    title: "Employee Portal",
    description: "Self-service marketplace where employees can browse, purchase, and track their orders.",
    icon: "👥"
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time insights into asset recovery, cost savings, and environmental impact.",
    icon: "📊"
  },
  {
    title: "Automated Workflows",
    description: "Streamlined processes for device preparation, data wiping, and documentation.",
    icon: "⚙️"
  },
  {
    title: "Integration Ready",
    description: "Seamlessly connects with your existing HRIS, asset management, and IT systems.",
    icon: "🔗"
  },
  {
    title: "White-Label Option",
    description: "Customize the platform with your branding for a seamless employee experience.",
    icon: "🎨"
  }
]

// Testimonials
export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "IT Director, TechCorp",
    content: "YouKeepIt transformed our equipment transition process. We've recovered over $500k in value this year alone while making our employees happy.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "HR Manager, GrowthCo",
    content: "The employee marketplace is brilliant. Our staff love getting quality devices at great prices, and we've eliminated equipment storage costs.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "CFO, ScaleTech",
    content: "The ROI was immediate. We implemented YouKeepIt in one day and started seeing savings within the first week. Incredible platform.",
    rating: 5
  }
]

// Pricing plans
export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for small teams",
    features: [
      "Up to 50 devices/year",
      "Basic marketplace",
      "Email support",
      "Standard data wiping",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$999",
    period: "/month",
    description: "Most popular for growing companies",
    features: [
      "Up to 500 devices/year",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited devices",
      "Dedicated success manager",
      "Custom integrations",
      "Advanced compliance",
      "SLA guarantee",
    ],
    popular: false,
  },
];

// FAQ items
export const FAQ_ITEMS = [
  {
    question: "How quickly can we implement YouKeepIt?",
    answer: "Most companies are up and running within 24 hours. Our onboarding team guides you through the simple setup process, and integration with existing systems typically takes just a few hours."
  },
  {
    question: "What happens to sensitive data on devices?",
    answer: "We use military-grade data wiping procedures that exceed DOD 5220.22-M standards. All data destruction is certified and documented for compliance purposes."
  },
  {
    question: "How do you determine device pricing for employees?",
    answer: "Our AI-powered pricing engine considers market value, device condition, age, and specs to offer fair pricing that benefits both the company and employees."
  },
  {
    question: "Can employees finance their purchases?",
    answer: "Yes, we offer flexible payment options including payroll deduction, monthly payment plans, and third-party financing options."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer 24/7 technical support, dedicated customer success managers for Enterprise clients, and comprehensive documentation and training resources."
  }
]