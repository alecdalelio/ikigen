"use client";

import { useState } from "react";

export default function ReflectPage() {
  const [input, setInput] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsLoading(false);
      setHasSubmitted(true);
    }, 1500);
  };

  const mockInsights = [
    "Your passion for this activity suggests a deep connection to creativity and self-expression. This could be a key component of your Ikigai - the intersection of what you love and what you're good at.",
    "The joy you find in this suggests it aligns with your core values. Consider how this activity might connect to serving others or contributing to something larger than yourself.",
    "This reflection reveals a pattern of activities that bring you genuine satisfaction. These moments of flow and engagement are valuable clues to your life's purpose."
  ];

  const randomInsight = mockInsights[Math.floor(Math.random() * mockInsights.length)];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Reflection Journey
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Take a moment to reflect deeply on this question
            </p>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6 text-center">
                What do you love doing?
              </h2>
              
              <div className="space-y-4">
                <label htmlFor="reflection-input" className="sr-only">
                  Your reflection
                </label>
                <textarea
                  id="reflection-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Take your time to think about this... What activities bring you joy? What could you spend hours doing without getting tired? What makes you lose track of time?"
                  className="w-full h-48 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  disabled={hasSubmitted}
                />
                
                {!hasSubmitted && input.trim() && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isLoading ? "Processing..." : "Next"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AI Insight */}
            {hasSubmitted && (
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-rose-200 dark:border-rose-800">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-200">
                      AI Insight
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {randomInsight}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <a
              href="/"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              ← Back to home
            </a>
            
            {hasSubmitted && (
              <button
                onClick={() => {
                  setInput("");
                  setHasSubmitted(false);
                }}
                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors"
              >
                Reflect again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 