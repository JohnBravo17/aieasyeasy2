'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface GenerationResult {
  taskUUID: string;
  imageURL?: string;
  processingTime?: number;
  error?: string;
}

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [settings, setSettings] = useState({
    width: 1024,
    height: 1024,
    steps: 20,
    cfgScale: 3.5,
    model: 'runware:101@1',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positivePrompt: prompt,
          negativePrompt: negativePrompt,
          width: settings.width,
          height: settings.height,
          steps: settings.steps,
          CFGScale: settings.cfgScale,
          model: settings.model,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setResult({ taskUUID: '', error: data.error || 'Generation failed' });
      }
    } catch (error) {
      setResult({ taskUUID: '', error: 'Network error occurred' });
    } finally {
      setIsGenerating(false);
    }
  };

  const presetPrompts = [
    'A futuristic city at sunset with flying cars and neon lights',
    'A majestic dragon soaring through cloudy skies',
    'A cozy coffee shop on a rainy day, warm lighting',
    'An astronaut exploring an alien planet with purple vegetation',
    'A steampunk mechanical owl with intricate gears and brass details',
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Generation{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Playground
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Experiment with AI image generation using the Runware API
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Prompt Input */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Positive Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to generate..."
                className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Negative Prompt */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Negative Prompt (Optional)
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="What to avoid in the generation..."
                className="w-full h-24 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Generation Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={settings.width}
                    onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 1024 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={settings.height}
                    onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 1024 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Steps
                  </label>
                  <input
                    type="number"
                    value={settings.steps}
                    onChange={(e) => setSettings(prev => ({ ...prev, steps: parseInt(e.target.value) || 25 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    CFG Scale
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.cfgScale}
                    onChange={(e) => setSettings(prev => ({ ...prev, cfgScale: parseFloat(e.target.value) || 7.0 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    min="1"
                    max="20"
                  />
                </div>
              </div>
            </div>

            {/* Preset Prompts */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Preset Prompts</h3>
              <div className="space-y-2">
                {presetPrompts.map((presetPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(presetPrompt)}
                    className="w-full text-left text-sm text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    {presetPrompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Generate Image
                </>
              )}
            </button>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Generated Result</h3>
            </div>

            {!result && !isGenerating && (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Your generated image will appear here</p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin h-12 w-12 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-300">Generating your image...</p>
                </div>
              </div>
            )}

            {result && result.error && (
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
                <p className="text-red-300">Error: {result.error}</p>
              </div>
            )}

            {result && result.imageURL && (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={result.imageURL}
                    alt="Generated image"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Task ID: {result.taskUUID}</span>
                  {result.processingTime && (
                    <span>Generated in {result.processingTime}ms</span>
                  )}
                </div>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors">
                  Download Image
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}