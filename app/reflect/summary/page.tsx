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
      <div className="ikigai-container">
        <div className="ikigai-center">
          <div className="text-center gentle-fade-in">
            <div className="mb-8">
              <div className="w-12 h-12 border-4 border-ikigai-gold/30 border-t-ikigai-warm-gold rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="ikigai-body text-lg">
              Loading your reflection journey...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ikigai-container">
      <div className="ikigai-center">
        {/* Header */}
        <div className="ikigai-section text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold rounded-full shadow-lg flex items-center justify-center gentle-fade-in">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="ikigai-heading text-4xl gentle-fade-in">
            Your Ikigai journey
          </h1>
          <p className="ikigai-body text-lg max-w-2xl mx-auto gentle-fade-in" style={{ animationDelay: '0.2s' }}>
            Complete - Here's your reflection summary and personal insight
          </p>
        </div>

        {/* Reflection Summary */}
        <div className="ikigai-section space-y-6">
          {REFLECTION_STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className="ikigai-card p-6 gentle-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <h2 className="ikigai-heading text-2xl mb-3">
                {step.title}
              </h2>
              <p className="ikigai-body text-lg">
                {data[step.id] || `Test content for ${step.title}`}
              </p>
            </div>
          ))}
        </div>

        {/* Generate Final Insight */}
        {!hasGenerated && (
          <div className="ikigai-section flex justify-center">
            <button
              onClick={generateFinalInsight}
              disabled={isLoading}
              className="ikigai-button gentle-fade-in disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{isLoading ? "Generating..." : "Discover my Ikigai"}</span>
            </button>
          </div>
        )}

        {/* Final Insight */}
        {hasGenerated && (
          <div className="ikigai-section">
            <div className="ikigai-card p-8 gentle-fade-in light-bloom soft-pulse">
              <h2 className="ikigai-heading text-2xl text-ikigai-warm-gold mb-4">
                Your Ikigai
              </h2>
              <p className="ikigai-insight text-xl">
                "{finalInsight}"
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="ikigai-section flex justify-center gap-4 pt-10">
          <button 
            onClick={() => router.push('/')}
            className="ikigai-button"
          >
            Back home
          </button>
          <button 
            onClick={handleStartOver}
            className="ikigai-button"
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
} 