'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SparklesIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-pink-900/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Announcement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/20">
              <SparklesIcon className="h-4 w-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">
                NEW: Runware raises $13M seed funding led by Insight Partners
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Flexible generative AI
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              for image and video
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Create high-quality media through a fast, affordable API. From sub-second image
            generation to advanced video inference, all powered by custom hardware and
            renewable energy. No infrastructure or ML expertise needed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/playground"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Get Started Now
            </Link>
            <Link
              href="/docs"
              className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              API Docs
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <SparklesIcon className="h-8 w-8 text-purple-400 mr-2" />
                <div className="text-3xl font-bold text-white">312,887</div>
              </div>
              <div className="text-gray-400">AI Models Available</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BoltIcon className="h-8 w-8 text-yellow-400 mr-2" />
                <div className="text-3xl font-bold text-white">0.6s</div>
              </div>
              <div className="text-gray-400">Average Generation Time</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <GlobeAltIcon className="h-8 w-8 text-green-400 mr-2" />
                <div className="text-3xl font-bold text-white">2.5B+</div>
              </div>
              <div className="text-gray-400">Images Generated</div>
            </div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-gray-800 rounded-lg p-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">REST API Example</div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "taskType": "imageInference",
  "taskUUID": "67aa2c57-3301-43ae-aa3b-dd40bbce2d33",
  "positivePrompt": "Futuristic stealth jet streaking through a neon-lit cityscape",
  "height": 1024,
  "width": 1024,
  "model": "runware:100@1",
  "steps": 25,
  "CFGScale": 4.0,
  "numberResults": 4
}`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}