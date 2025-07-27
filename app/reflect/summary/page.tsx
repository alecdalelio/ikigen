"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReflectionData } from '../../hooks/useReflectionData';
import jsPDF from 'jspdf';


export default function SummaryPage() {
  const { data, isLoaded, clearData } = useReflectionData();
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

  const handleDownloadPDF = () => {
    if (!structuredInsight) return;

    const doc = new jsPDF();
    
    // Set font and colors
    doc.setFont('helvetica');
    doc.setTextColor(93, 58, 0); // Dark brown color
    
    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Ikigai', 105, 30, { align: 'center' });
    
    // Your Ikigai section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Ikigai', 20, 50);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const ikigaiLines = doc.splitTextToSize(structuredInsight.ikigai, 170);
    doc.text(ikigaiLines, 20, 60);
    
    // Why This Matters section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Why This Matters', 20, 90);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const meaningLines = doc.splitTextToSize(structuredInsight.meaning, 170);
    doc.text(meaningLines, 20, 100);
    
    // What You Might Explore Next section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('What You Might Explore Next', 20, 140);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    let yPosition = 150;
    structuredInsight.suggestions.forEach((suggestion, index) => {
      const suggestionLines = doc.splitTextToSize(`• ${suggestion}`, 170);
      doc.text(suggestionLines, 20, yPosition);
      yPosition += suggestionLines.length * 7 + 5;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated with Ikigen - Discover Your Purpose', 105, 280, { align: 'center' });
    
    // Download the PDF
    doc.save('your-ikigai.pdf');
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
    <div className="ikigai-container page-transition summary-page">
      <div className="ikigai-center">
        {/* Header */}
        <div className="ikigai-section">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="ikigai-title text-3xl sm:text-4xl md:text-5xl">Your Ikigai</h1>
            <p className="ikigai-body text-base sm:text-lg">The intersection of your four reflections</p>
          </div>
        </div>

        {/* Reflection Summary - Grouped Container */}
        <div className="ikigai-section">
          <div className="max-w-[700px] mx-auto">
            <div className="ikigai-card px-6 md:px-8 py-8 gentle-fade-in reflection-group">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="ikigai-heading text-xl sm:text-2xl text-ikigai-warm-gold mb-2">Your Reflections</h2>
                  <p className="ikigai-body text-sm sm:text-base text-[#7F5539]/80">The foundation of your Ikigai journey</p>
                </div>
                
                <div className="grid gap-6">
                  <div className="reflection-item">
                    <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold mb-3">What you love</h3>
                    <p className="ikigai-body text-base sm:text-lg leading-relaxed text-[#5C4033]">{data.love}</p>
                  </div>

                  <div className="reflection-item">
                    <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold mb-3">What you're good at</h3>
                    <p className="ikigai-body text-base sm:text-lg leading-relaxed text-[#5C4033]">{data.goodAt}</p>
                  </div>

                  <div className="reflection-item">
                    <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold mb-3">What the world needs</h3>
                    <p className="ikigai-body text-base sm:text-lg leading-relaxed text-[#5C4033]">{data.worldNeeds}</p>
                  </div>

                  <div className="reflection-item">
                    <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold mb-3">What you can be paid for</h3>
                    <p className="ikigai-body text-base sm:text-lg leading-relaxed text-[#5C4033]">{data.paidFor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Separator */}
        {!finalInsight && (
          <div className="ikigai-section">
            <div className="max-w-[700px] mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E6D8C5] to-transparent"></div>
                <div className="w-3 h-3 rounded-full bg-[#E6D8C5]"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E6D8C5] to-transparent"></div>
              </div>
            </div>
          </div>
        )}

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

        {/* Insight Separator */}
        {structuredInsight && (
          <div className="ikigai-section">
            <div className="max-w-[700px] mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E6D8C5] to-transparent"></div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E6D8C5] to-transparent"></div>
              </div>
            </div>
          </div>
        )}

        {/* Final Insight - Refactored with Improved Visual Hierarchy */}
        {structuredInsight ? (
          <div className="ikigai-section space-y-6 md:space-y-10 lg:space-y-16">
            {/* Your Ikigai - Enhanced Insight Card */}
            <div className="max-w-[700px] mx-auto">
              <div className="ikigai-card px-8 md:px-10 py-10 ikigai-insight-card staggered-fade-in">
                <div className="space-y-8">
                  <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold flex items-center justify-center soft-pulse">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="ikigai-heading text-2xl sm:text-3xl md:text-4xl text-ikigai-warm-gold">Your Ikigai</h2>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-['DM_Serif_Display'] font-semibold text-[#5D3A00] leading-relaxed">
                      {structuredInsight.ikigai}
                    </p>
                  </div>
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

            {/* What You Might Explore Next - Refactored Elegant Layout */}
            <div className="max-w-[700px] mx-auto mt-12 md:mt-16 lg:mt-20" aria-labelledby="suggestions-heading">
              <div className="space-y-8 md:space-y-10">
                <div className="flex items-center space-x-4 sm:space-x-6 mb-8 sm:mb-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-ikigai-gold/30 to-ikigai-warm-gold/40 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-ikigai-warm-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 id="suggestions-heading" className="ikigai-heading text-xl sm:text-2xl md:text-3xl text-ikigai-warm-gold">What You Might Explore Next</h3>
                </div>
                
                {/* Individual suggestion cards without outer container */}
                <div className="space-y-8 md:space-y-10">
                  {structuredInsight.suggestions.map((suggestion, index) => {
                    const icons = ['💼', '🎨', '🧘', '📚', '🌱', '🤝'];
                    const icon = icons[index % icons.length];
                    
                    return (
                      <div 
                        key={index} 
                        className="suggestion-card-refined"
                        aria-label={`Suggestion ${index + 1}: ${suggestion}`}
                        style={{ animationDelay: `${0.3 * index}s` }}
                      >
                        {/* Emoji positioned above text, centered */}
                        <div className="flex justify-center mb-6">
                          <div className="suggestion-emoji-container">
                            <span className="suggestion-emoji">
                              {icon}
                            </span>
                          </div>
                        </div>
                        {/* Text content with improved typography */}
                        <div className="text-center">
                          <p className="suggestion-text-refined">
                            {suggestion}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Closing Encouragement with Floating Sparkle */}
            <div className="max-w-[700px] mx-auto mt-16 md:mt-20 lg:mt-24 relative">
              <div className="floating-sparkle"></div>
              <p className="text-center text-[#7F5539] italic font-['DM_Serif_Display'] text-lg md:text-xl leading-relaxed">
                ✨ Let this insight guide you. Choose one small action this week that brings your Ikigai to life.
              </p>
            </div>

            {/* Action Buttons - Refined Layout */}
            <div className="max-w-[700px] mx-auto mt-16 md:mt-20 lg:mt-24">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                <button
                  onClick={() => router.push('/reflect/paid-for')}
                  className="action-button-refined secondary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous step</span>
                </button>
                
                <button 
                  onClick={handleDownloadPDF}
                  className="action-button-refined primary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                
                <button
                  onClick={() => {
                    clearData();
                    router.push('/');
                  }}
                  className="action-button-refined secondary"
                >
                  <span>Start over</span>
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


      </div>
    </div>
  );
} 