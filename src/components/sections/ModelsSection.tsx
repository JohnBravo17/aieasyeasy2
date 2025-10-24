'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function ModelsSection() {
  const [activeCategory, setActiveCategory] = useState('featured');

  const categories = [
    { id: 'featured', name: 'Featured Models', count: 30 },
    { id: 'image', name: 'Image Generation', count: 250000 },
    { id: 'video', name: 'Video Generation', count: 50000 },
    { id: 'audio', name: 'Audio Generation', count: 12887 },
  ];

  const featuredModels = [
    { 
      name: 'FLUX.1 Pro', 
      category: 'Image Generation',
      description: 'State-of-the-art image generation model with exceptional quality and speed.',
      metrics: { speed: '0.6s', quality: '95%', popularity: 'High' }
    },
    {
      name: 'DreamShaper XL',
      category: 'Creative Art',
      description: 'Perfect for artistic and creative image generation with vibrant colors.',
      metrics: { speed: '0.8s', quality: '92%', popularity: 'High' }
    },
    {
      name: 'RealVision XL',
      category: 'Photorealism',
      description: 'Photorealistic image generation for professional and commercial use.',
      metrics: { speed: '1.2s', quality: '98%', popularity: 'Medium' }
    },
    {
      name: 'Stable Video Diffusion',
      category: 'Video Generation',
      description: 'High-quality video generation from text prompts and image conditioning.',
      metrics: { speed: '15s', quality: '90%', popularity: 'Growing' }
    },
    {
      name: 'AnimateDiff',
      category: 'Animation',
      description: 'Create smooth animations and motion sequences with AI.',
      metrics: { speed: '12s', quality: '88%', popularity: 'Medium' }
    },
    {
      name: 'ToonYou',
      category: 'Cartoon Style',
      description: 'Generate cartoon-style images and characters with consistent quality.',
      metrics: { speed: '0.7s', quality: '91%', popularity: 'High' }
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to use with{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              312,887 models
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Access a huge library of models, or bring your own. Whether that's checkpoints,
            LoRAs, ControlNet, or anything else. The whole model ecosystem at your fingertips.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">
                ({category.count.toLocaleString()})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredModels.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-600/50 transition-colors group"
            >
              {/* Model Preview Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg mb-4 flex items-center justify-center border border-gray-600">
                <div className="text-gray-400 text-sm">Model Preview</div>
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {model.name}
                </h3>
                <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                  {model.category}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                {model.description}
              </p>

              {/* Model Metrics */}
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-gray-500">Speed</div>
                  <div className="text-white font-medium">{model.metrics.speed}</div>
                </div>
                <div>
                  <div className="text-gray-500">Quality</div>
                  <div className="text-white font-medium">{model.metrics.quality}</div>
                </div>
                <div>
                  <div className="text-gray-500">Popularity</div>
                  <div className="text-white font-medium">{model.metrics.popularity}</div>
                </div>
              </div>

              {/* Try Model Button */}
              <button className="w-full mt-4 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white py-2 px-4 rounded transition-colors text-sm font-medium">
                Try Model
              </button>
            </motion.div>
          ))}
        </div>

        {/* CivitAI Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gray-800 rounded-lg p-8 border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Seamless CivitAI Integration
          </h3>
          <p className="text-gray-300 mb-6">
            Search for any model on CivitAI, copy the unique AIR ID (Artificial Intelligence
            Resource), and use it in your Runware API request. We support all the latest
            Image Gen technologies.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <code className="text-sm text-gray-300">
              {'{'}<br />
              &nbsp;&nbsp;"model": "civitai:123456@1",<br />
              &nbsp;&nbsp;"positivePrompt": "Your creative prompt here"<br />
              {'}'}
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}