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

  // TEMPORARY: Force the page to render for testing
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    // TEMPORARY: Force render after 2 seconds for testing
    const timer = setTimeout(() => {
      setForceRender(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded && !forceRender) {
      // Check if user has completed all steps
      if (!data.love || !data.goodAt || !data.worldNeeds || !data.paidFor) {
        router.push('/reflect/love');
        return;
      }
    }
  }, [isLoaded, data, router, forceRender]);

  const generateFinalInsight = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: `Love: ${data.love || 'test love'}\nGood at: ${data.goodAt || 'test good at'}\nWorld needs: ${data.worldNeeds || 'test world needs'}\nCan be paid for: ${data.paidFor || 'test paid for'}`,
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

  // TEMPORARY: Show loading for 2 seconds, then force render
  if (!isLoaded && !forceRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading... (will force render in 2 seconds for testing)</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{ backgroundColor: '#000000', color: '#ffffff' }}
    >
      <div 
        className="max-w-3xl mx-auto px-6 py-12 space-y-10"
        style={{ maxWidth: '48rem', margin: '0 auto', padding: '3rem 1.5rem', backgroundColor: '#000000' }}
      >
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Your Ikigai Journey
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Complete - Here's your reflection summary and personal insight
          </p>
        </div>

        {/* Reflection Summary */}
        <div className="space-y-6">
          {REFLECTION_STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className="bg-zinc-800/80 p-6 rounded-xl border border-zinc-700 shadow-sm"
              style={{ 
                backgroundColor: 'rgba(39, 39, 42, 0.8)', 
                padding: '1.5rem', 
                borderRadius: '0.75rem', 
                border: '1px solid #3f3f46',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
              <h2 className="text-2xl font-semibold text-white">
                {step.title}
              </h2>
              <p className="text-lg text-zinc-300">
                {data[step.id] || `Test content for ${step.title}`}
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
          <div 
            className="bg-gradient-to-br from-rose-900 via-zinc-900 to-rose-950 border border-rose-800/60 rounded-xl p-6 shadow-lg"
            style={{
              background: 'linear-gradient(to bottom right, #881337, #18181b, #4c0519)',
              border: '1px solid rgba(190, 18, 60, 0.6)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 className="text-2xl font-bold text-rose-100">
              Your Ikigai
            </h2>
            <p className="italic text-lg text-rose-200">
              "{finalInsight}"
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4 pt-10">
          <button 
            onClick={() => router.push('/')}
            className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 transition"
            style={{ backgroundColor: '#27272a', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
          >
            🏠 Back Home
          </button>
          <button 
            onClick={handleStartOver}
            className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 transition"
            style={{ backgroundColor: '#27272a', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
          >
            🔄 Start Over
          </button>
        </div>
      </div>
    </div>
  );
} 