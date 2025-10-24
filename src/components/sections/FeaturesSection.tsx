'use client';

import { motion } from 'framer-motion';
import { 
  CpuChipIcon, 
  CloudArrowUpIcon, 
  BoltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

export function FeaturesSection() {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'Custom Hardware',
      description: 'Completely unique server architecture, developed specifically for AI, which gives you ultra-fast speed at low cost.',
    },
    {
      icon: CloudArrowUpIcon,
      title: 'Advanced Orchestration',
      description: 'Featuring built-in redundancy, autoscaling, GPU auto-allocation and parallel pipeline processing.',
    },
    {
      icon: BoltIcon,
      title: "World's Fastest",
      description: 'Experience the world\'s fastest inference speeds, delivering an exceptional user experience.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Friendly Pricing',
      description: 'Benefit from industry-leading pricing, starting at as little as $0.0006/image. Yes, that\'s three zeros!',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Production Ready',
      description: 'Powering leading GenAI platforms at enormous scale, with over 2.5 billion images generated to date.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Easy Integration',
      description: 'Integrate generative media without specialized knowledge in machine learning or AI.',
    },
  ];

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
            Powered by blazing-fast,{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              low-cost infrastructure
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Launch AI features in record time with a powerful API that connects your
            application to our Sonic Inference Engine®.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:border-purple-600/50 transition-colors"
            >
              <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-8 border border-purple-600/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sun-powered. Earth-minded.
            </h3>
            <p className="text-gray-300 mb-6">
              Renewable energy powered. High-performance technology that's sustainable,
              efficient, and cost-effective.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                100% Renewable Energy
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Carbon Neutral
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Sustainable Infrastructure
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}