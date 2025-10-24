'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        '1,000 free image generations',
        'Basic API access',
        'Standard models',
        'Community support',
        '24h rate limits'
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For developers and small teams',
      features: [
        'Up to 50K images/month',
        'All models available',
        'Priority processing',
        'Email support',
        'Webhook support',
        'Custom integrations'
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large scale applications',
      features: [
        'Unlimited generations',
        'Custom model hosting',
        'Dedicated infrastructure',
        'SLA guarantees',
        '24/7 phone support',
        'Custom contracts'
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const payPerUse = {
    imageGeneration: '$0.0006',
    videoGeneration: '$0.05',
    audioGeneration: '$0.002',
    imageUpscaling: '$0.001',
  };

  return (
    <section className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Simple,{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              transparent pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Choose the plan that works best for your needs. Start free and scale as you grow.
          </motion.p>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-900 rounded-lg p-8 border ${
                plan.popular
                  ? 'border-purple-600 shadow-lg shadow-purple-600/20'
                  : 'border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-white">
                  {plan.price}
                  {plan.period && <span className="text-lg text-gray-400">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-purple-400 mr-3 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pay-per-use Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-lg p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Pay-per-use Pricing</h3>
            <p className="text-gray-400">
              Only pay for what you use with our transparent, per-request pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {payPerUse.imageGeneration}
              </div>
              <div className="text-gray-300 font-medium mb-1">Image Generation</div>
              <div className="text-sm text-gray-400">per image</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400 mb-2">
                {payPerUse.videoGeneration}
              </div>
              <div className="text-gray-300 font-medium mb-1">Video Generation</div>
              <div className="text-sm text-gray-400">per second</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {payPerUse.audioGeneration}
              </div>
              <div className="text-gray-300 font-medium mb-1">Audio Generation</div>
              <div className="text-sm text-gray-400">per second</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">
                {payPerUse.imageUpscaling}
              </div>
              <div className="text-gray-300 font-medium mb-1">Image Upscaling</div>
              <div className="text-sm text-gray-400">per image</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
            >
              View detailed pricing →
            </Link>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to start building?
          </h3>
          <p className="text-gray-300 mb-8">
            Enjoy ~1000 free image generations to get started
          </p>
          <Link
            href="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}