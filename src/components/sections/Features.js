'use client'

import React from 'react'

const Features = () => {
  const features = [
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Military-grade encryption and compliance with SOC 2, GDPR, and industry standards."
    },
    {
      icon: "👥",
      title: "Employee Portal",
      description: "Self-service marketplace where employees can browse, purchase, and track their orders."
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Real-time insights into asset recovery, cost savings, and environmental impact."
    },
    {
      icon: "⚙️",
      title: "Automated Workflows",
      description: "Streamlined processes for device preparation, data wiping, and documentation."
    },
    {
      icon: "🔗",
      title: "Integration Ready",
      description: "Seamlessly connects with your existing HRIS, asset management, and IT systems."
    },
    {
      icon: "🎨",
      title: "White-Label Option",
      description: "Customize the platform with your branding for a seamless employee experience."
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Powerful Features
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Everything you need to manage IT equipment transitions efficiently and securely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features