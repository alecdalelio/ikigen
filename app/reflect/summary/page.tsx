"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReflectionData } from '../../hooks/useReflectionData';
import { REFLECTION_STEPS } from '../../types/reflection';

export default function SummaryPage() {
  const { data, clearData, isLoaded } = useReflectionData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [finalInsight, setFinalInsight] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Check if user has completed all steps
      if (!data.love || !data.goodAt || !data.worldNeeds || !data.paidFor) {
        router.push('/reflect/love');
        return;
      }
    }
  }, [isLoaded, data, router]);

  const generateFinalInsight = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: `Love: ${data.love}\nGood at: ${data.goodAt}\nWorld needs: ${data.worldNeeds}\nCan be paid for: ${data.paidFor}`,
          context: 'Ikigai Summary',
          question: 'Based on these four areas, what is my Ikigai?'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate insight');
      }

      const responseData = await response.json();
      setFinalInsight(responseData.summary);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating final insight:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('API key not configured')) {
        setFinalInsight("Congratulations on completing your Ikigai reflection journey! You've explored what you love, what you're good at, what the world needs, and what you can be paid for. Your Ikigai lies at the intersection of these four areas. Consider how you might bring these elements together in your life and work. (Note: AI insights are currently unavailable - please check your OpenAI API configuration.)");
      } else if (errorMessage.includes('quota exceeded') || errorMessage.includes('429')) {
        setFinalInsight("Congratulations on completing your Ikigai reflection journey! You've explored what you love, what you're good at, what the world needs, and what you can be paid for. Your Ikigai lies at the intersection of these four areas. Consider how you might bring these elements together in your life and work. (Note: AI insights are temporarily unavailable due to API usage limits.)");
      } else if (errorMessage.includes('model access') || errorMessage.includes('404')) {
        setFinalInsight("Congratulations on completing your Ikigai reflection journey! You've explored what you love, what you're good at, what the world needs, and what you can be paid for. Your Ikigai lies at the intersection of these four areas. Consider how you might bring these elements together in your life and work. (Note: AI insights are temporarily unavailable due to model access issues.)");
      } else {
        setFinalInsight("Congratulations on completing your Ikigai reflection journey! You've explored what you love, what you're good at, what the world needs, and what you can be paid for. Your Ikigai lies at the intersection of these four areas. Consider how you might bring these elements together in your life and work.");
      }
      setHasGenerated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    clearData();
    router.push('/reflect/love');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 reflection-page">
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-white text-center">
            Your Ikigai Journey
          </h1>
          <p className="text-sm text-zinc-400 text-center">
            Complete - Here's your reflection summary
          </p>
        </div>

        {/* Reflection Summary */}
        <div className="space-y-4">
          {REFLECTION_STEPS.map((step, index) => (
            <div key={step.id} className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
              <h3 className="text-lg font-medium text-white mb-2">
                {step.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                {data[step.id]}
              </p>
            </div>
          ))}
        </div>

        {/* Generate Final Insight */}
        {!hasGenerated && (
          <div className="flex justify-center">
            <button
              onClick={generateFinalInsight}
              disabled={isLoading}
              className="px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{isLoading ? "Generating..." : "Discover My Ikigai"}</span>
            </button>
          </div>
        )}

        {/* Final Insight */}
        {hasGenerated && (
          <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-xl p-6 border border-rose-800/50">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-rose-200 text-center">
                Your Ikigai
              </h3>
              <p className="text-zinc-300 leading-relaxed text-center">
                {finalInsight}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
          <button
            onClick={() => router.push('/')}
            className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
          >
            ← Back to home
          </button>
          
          <button
            onClick={handleStartOver}
            className="text-rose-400 hover:text-rose-300 transition-colors text-sm"
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
} 