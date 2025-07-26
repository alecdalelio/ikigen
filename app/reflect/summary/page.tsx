"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReflectionData } from '../../hooks/useReflectionData';

export default function SummaryPage() {
  const { data, isLoaded } = useReflectionData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalInsight, setFinalInsight] = useState("");
  const [structuredInsight, setStructuredInsight] = useState<{
    ikigai: string;
    meaning: string;
    suggestions: string[];
  } | null>(null);
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
      
      // Handle structured response for final summary
      if (responseData.structured) {
        setStructuredInsight(responseData.structured);
        setFinalInsight(responseData.summary); // Keep for backward compatibility
      } else {
        // Fallback to regular text response
        setFinalInsight(responseData.summary);
        setStructuredInsight(null);
      }
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
      setStructuredInsight(null); // Clear structured data on error
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

        {/* Final Insight - Refactored with Improved Visual Hierarchy */}
        {structuredInsight ? (
          <div className="ikigai-section space-y-6 md:space-y-10 lg:space-y-16">
            {/* Your Ikigai - Golden Bloom Card */}
            <div className="max-w-[700px] mx-auto">
              <div className="ikigai-card px-4 md:px-6 py-6 golden-bloom-card staggered-fade-in">
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold flex items-center justify-center soft-pulse">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="ikigai-heading text-xl sm:text-2xl md:text-3xl text-ikigai-warm-gold">Your Ikigai</h2>
                  </div>
                  <p className="text-2xl md:text-3xl font-['DM_Serif_Display'] font-semibold text-center text-[#5D3A00] leading-relaxed">
                    {structuredInsight.ikigai}
                  </p>
                </div>
              </div>
            </div>

            {/* Why This Matters - Wisdom Card */}
            <div className="max-w-[700px] mx-auto mt-6 md:mt-10 lg:mt-16">
              <div className="ikigai-card px-4 md:px-6 py-6 wisdom-card staggered-fade-in">
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-ikigai-gold/30 to-ikigai-warm-gold/40 flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-ikigai-warm-gold feather-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold">Why This Matters</h3>
                  </div>
                  <p className="italic text-base md:text-lg text-[#7F5539] leading-relaxed">
                    {structuredInsight.meaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Separator */}
            <div className="max-w-[700px] mx-auto mt-6 md:mt-10 lg:mt-16">
              <hr className="my-10 border-t border-[#E6D8C5]" />
            </div>

            {/* What You Might Explore Next - Redesigned Suggestion Cards */}
            <div className="max-w-[700px] mx-auto staggered-fade-in">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-ikigai-gold/30 to-ikigai-warm-gold/40 flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-ikigai-warm-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold">What You Might Explore Next</h3>
                </div>
                
                <div className="space-y-4">
                  {structuredInsight.suggestions.map((suggestion, index) => {
                    const icons = ['💼', '🎨', '🧘', '📚', '🌱', '🤝'];
                    const icon = icons[index % icons.length];
                    
                    return (
                      <div key={index} className="bg-[#FCF9F5] rounded-xl shadow-sm px-4 py-3 flex items-start gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <div className="text-3xl sm:text-4xl flex-shrink-0">
                          {icon}
                        </div>
                        <div className="flex-1 max-w-prose">
                          <p className="text-base font-normal text-[#4B3C2A] leading-relaxed">
                            {suggestion}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Closing Encouragement */}
            <div className="max-w-[700px] mx-auto mt-10">
              <p className="text-center text-[#7F5539] italic font-['DM_Serif_Display'] text-base md:text-lg leading-relaxed">
                ✨ Let this insight guide you. Choose one small action this week that brings your Ikigai to life.
              </p>
            </div>

            {/* Export Options */}
            <div className="max-w-[700px] mx-auto mt-6 md:mt-10 lg:mt-16">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 staggered-fade-in">
                <button 
                  onClick={() => {
                    const text = `Your Ikigai: ${structuredInsight.ikigai}\n\nWhy This Matters: ${structuredInsight.meaning}\n\nWhat You Might Explore Next:\n${structuredInsight.suggestions.map(s => `• ${s}`).join('\n')}`;
                    navigator.clipboard.writeText(text);
                  }}
                  className="export-button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Insight
                </button>
                
                <button 
                  onClick={() => window.print()}
                  className="export-button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Export to PDF
                </button>
              </div>
            </div>
          </div>
        ) : finalInsight ? (
          /* Fallback to original format for backward compatibility */
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
        ) : null}

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