"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReflectionData } from '../../hooks/useReflectionData';

export default function SummaryPage() {
  const { data, isLoaded } = useReflectionData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalInsight, setFinalInsight] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (!data.love || !data.goodAt || !data.worldNeeds || !data.paidFor)) {
      router.push('/reflect');
    }
  }, [data, isLoaded, router]);

  const handleGenerateInsight = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: `Love: ${data.love}\nSkill: ${data.goodAt}\nNeed: ${data.worldNeeds}\nValue: ${data.paidFor}`,
          context: 'Final Ikigai Summary',
          question: 'Based on these four reflections, what is my Ikigai?'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate insight');
      }

      const responseData = await response.json();
      setFinalInsight(responseData.summary);
    } catch (error) {
      console.error('Error generating final insight:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('API key not configured')) {
        setFinalInsight("Your Ikigai is the intersection of what you love, what you're good at, what the world needs, and what you can be paid for. This unique combination creates your purpose and reason for being. Reflect on how these four elements work together in your life. (Note: AI insights are currently unavailable - please check your OpenAI API configuration.)");
      } else if (errorMessage.includes('quota exceeded') || errorMessage.includes('429')) {
        setFinalInsight("Your Ikigai is the intersection of what you love, what you're good at, what the world needs, and what you can be paid for. This unique combination creates your purpose and reason for being. Reflect on how these four elements work together in your life. (Note: AI insights are temporarily unavailable due to API usage limits.)");
      } else if (errorMessage.includes('model access') || errorMessage.includes('404')) {
        setFinalInsight("Your Ikigai is the intersection of what you love, what you're good at, what the world needs, and what you can be paid for. This unique combination creates your purpose and reason for being. Reflect on how these four elements work together in your life. (Note: AI insights are temporarily unavailable due to model access issues.)");
      } else {
        setFinalInsight("Your Ikigai is the intersection of what you love, what you're good at, what the world needs, and what you can be paid for. This unique combination creates your purpose and reason for being. Reflect on how these four elements work together in your life.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="ikigai-container">
        <div className="ikigai-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-12 h-12 border-4 border-ikigai-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="ikigai-body text-lg">Loading your reflections...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data.love || !data.goodAt || !data.worldNeeds || !data.paidFor) {
    return null;
  }

  return (
    <div className="ikigai-container page-transition">
      <div className="ikigai-center">
        {/* Header */}
        <div className="ikigai-section">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="ikigai-title text-3xl sm:text-4xl md:text-5xl">Your Ikigai</h1>
            <p className="ikigai-body text-base sm:text-lg">The intersection of your four reflections</p>
          </div>
        </div>

        {/* Reflection Summary Cards */}
        <div className="ikigai-section space-y-4 sm:space-y-6">
          <div className="ikigai-card p-4 sm:p-6 gentle-fade-in">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="ikigai-heading text-lg sm:text-xl text-ikigai-warm-gold">What you love</h3>
                             <p className="ikigai-body text-sm sm:text-base leading-relaxed">{data.love}</p>
            </div>
          </div>

          <div className="ikigai-card p-4 sm:p-6 gentle-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="ikigai-heading text-lg sm:text-xl text-ikigai-warm-gold">What you're good at</h3>
                             <p className="ikigai-body text-sm sm:text-base leading-relaxed">{data.goodAt}</p>
            </div>
          </div>

          <div className="ikigai-card p-4 sm:p-6 gentle-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="ikigai-heading text-lg sm:text-xl text-ikigai-warm-gold">What the world needs</h3>
                             <p className="ikigai-body text-sm sm:text-base leading-relaxed">{data.worldNeeds}</p>
            </div>
          </div>

          <div className="ikigai-card p-4 sm:p-6 gentle-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="ikigai-heading text-lg sm:text-xl text-ikigai-warm-gold">What you can be paid for</h3>
                             <p className="ikigai-body text-sm sm:text-base leading-relaxed">{data.paidFor}</p>
            </div>
          </div>
        </div>

        {/* Generate Final Insight Button */}
        {!finalInsight && (
          <div className="ikigai-section">
            <div className="flex justify-center">
              <button
                onClick={handleGenerateInsight}
                disabled={isGenerating}
                className="ikigai-button gentle-fade-in disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 sm:space-x-4"
                style={{ animationDelay: '0.4s' }}
              >
                {isGenerating && (
                  <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span className="text-sm sm:text-base">{isGenerating ? "Generating..." : "Generate Final Insight"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Final Insight */}
        {finalInsight && (
          <div className="ikigai-section">
            <div className="ikigai-card p-6 sm:p-8 md:p-10 gentle-fade-in light-bloom">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold flex items-center justify-center soft-pulse">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold">Your Ikigai</h2>
                </div>
                <p className="ikigai-insight text-base sm:text-lg md:text-xl leading-relaxed">
                  {finalInsight}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="ikigai-section flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            onClick={() => router.push('/reflect/paid-for')}
            className="ikigai-nav-button gentle-fade-in flex items-center space-x-2 sm:space-x-3"
            style={{ animationDelay: '0.8s' }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous step</span>
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="ikigai-nav-button gentle-fade-in"
            style={{ animationDelay: '0.9s' }}
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
} 