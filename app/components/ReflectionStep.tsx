"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReflectionStep } from '../types/reflection';

interface ReflectionStepProps {
  step: ReflectionStep;
  currentValue: string;
  onUpdate: (value: string) => void;
  onNext: () => void;
}

// Placeholder suggestions for each step
const PLACEHOLDER_SUGGESTIONS = {
  love: [
    "What's something you lose track of time doing?",
    "What activities make you feel most alive?",
    "What would you do even if no one paid you?",
    "What brings you pure joy and excitement?"
  ],
  goodAt: [
    "What do people often praise you for?",
    "What skills come naturally to you?",
    "What problems do you enjoy solving?",
    "What are you known for being good at?"
  ],
  worldNeeds: [
    "What problems in the world concern you most?",
    "What would make the world a better place?",
    "What do you wish more people would do?",
    "What needs are not being met in society?"
  ],
  paidFor: [
    "What skills could people pay you to teach?",
    "What services would people value from you?",
    "What problems could you solve for others?",
    "What expertise could you monetize?"
  ]
};

export default function ReflectionStepComponent({ 
  step, 
  currentValue, 
  onUpdate, 
  onNext 
}: ReflectionStepProps) {
  const [input, setInput] = useState(currentValue);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [showNudge, setShowNudge] = useState(false);
  const router = useRouter();

  // Get step number for progress
  const stepNumber = step.id === 'love' ? 1 : step.id === 'goodAt' ? 2 : step.id === 'worldNeeds' ? 3 : 4;

  // Get placeholders for current step
  const placeholders = PLACEHOLDER_SUGGESTIONS[step.id as keyof typeof PLACEHOLDER_SUGGESTIONS] || [];

  useEffect(() => {
    // Show progress after a brief delay
    const timer = setTimeout(() => setShowProgress(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through placeholders
  useEffect(() => {
    if (placeholders.length > 1) {
      const interval = setInterval(() => {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [placeholders.length]);

  // Input validation and hints
  const getInputStats = (text: string) => {
    const trimmed = text.trim();
    const charCount = trimmed.length;
    const wordCount = trimmed.split(/\s+/).filter(word => word.length > 0).length;
    const isGibberish = /^[a-zA-Z]{1,4}$/.test(trimmed) || /^[^a-zA-Z\s]+$/.test(trimmed);
    
    return {
      charCount,
      wordCount,
      isGibberish,
      isValid: charCount >= 5 && !isGibberish,
      needsExpansion: wordCount < 10 && charCount >= 5 && !isGibberish
    };
  };

  const inputStats = getInputStats(input);
  const currentPlaceholder = placeholders[currentPlaceholderIndex] || step.placeholder;

  // Show nudge for underwritten entries
  useEffect(() => {
    if (inputStats.needsExpansion && input.trim().length > 0) {
      const timer = setTimeout(() => setShowNudge(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNudge(false);
    }
  }, [inputStats.needsExpansion, input]);

  const handleSubmit = async () => {
    if (!inputStats.isValid) return;
    
    setIsLoading(true);
    onUpdate(input.trim());
    
    try {
      const response = await fetch('/api/insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: input.trim(),
          context: step.title,
          question: step.question
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate insight');
      }

      const data = await response.json();
      setAiInsight(data.summary);
      setHasSubmitted(true);
    } catch (error) {
      console.error('Error generating insight:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('API key not configured')) {
        setAiInsight("Thank you for sharing your thoughts on this question. This reflection is helping you discover your Ikigai. Consider how this connects to your deeper purpose and life goals. (Note: AI insights are currently unavailable - please check your OpenAI API configuration.)");
      } else if (errorMessage.includes('quota exceeded') || errorMessage.includes('429')) {
        setAiInsight("Thank you for sharing your thoughts on this question. This reflection is helping you discover your Ikigai. Consider how this connects to your deeper purpose and life goals. (Note: AI insights are temporarily unavailable due to API usage limits.)");
      } else if (errorMessage.includes('model access') || errorMessage.includes('404')) {
        setAiInsight("Thank you for sharing your thoughts on this question. This reflection is helping you discover your Ikigai. Consider how this connects to your deeper purpose and life goals. (Note: AI insights are temporarily unavailable due to model access issues.)");
      } else {
        setAiInsight("Thank you for sharing your thoughts on this question. This reflection is helping you discover your Ikigai. Consider how this connects to your deeper purpose and life goals.");
      }
      setHasSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (step.nextRoute) {
      router.push(step.nextRoute);
    }
  };

  const handleBack = () => {
    if (step.id === 'love') {
      router.push('/');
    } else {
      const prevStep = step.id === 'goodAt' ? '/reflect/love' : 
                      step.id === 'worldNeeds' ? '/reflect/good-at' : 
                      '/reflect/world-needs';
      router.push(prevStep);
    }
  };

  return (
    <div className="ikigai-container page-transition">
      <div className="ikigai-center">
        {/* Progress indicator */}
        {showProgress && (
          <div className="ikigai-section">
            <div className="ikigai-progress">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`ikigai-progress-dot ${
                    num < stepNumber ? 'completed' : 
                    num === stepNumber ? 'active' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="ikigai-section">
          <div className="ikigai-card p-12 card-float">
            {/* Header */}
            <div className="text-center space-y-4 mb-8 sm:space-y-6 sm:mb-12">
              <h1 className="ikigai-heading text-3xl sm:text-4xl md:text-5xl gentle-fade-in">
                {step.title}
              </h1>
              <p className="ikigai-body text-base sm:text-lg">
                Step {stepNumber} of 4 — {stepNumber === 1 ? 'Starting Small' : 
                                       stepNumber === 2 ? 'Building Presence' : 
                                       stepNumber === 3 ? 'Finding Harmony' : 'Creating Value'}
              </p>
            </div>

            {/* Question and input area */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="ikigai-question gentle-fade-in" style={{ animationDelay: '0.2s' }}>
                  {step.question}
                </h2>
                
                <div className="ikigai-input-container">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={currentPlaceholder}
                    className="ikigai-input resize-none text-base sm:text-lg md:text-xl gentle-fade-in"
                    style={{ animationDelay: '0.4s' }}
                    disabled={hasSubmitted}
                  />
                  
                  {/* Character/word count hint */}
                  {input.trim().length > 0 && (
                    <div className={`ikigai-input-hint ${inputStats.isValid ? 'valid' : 'insufficient'}`}>
                      {inputStats.wordCount} words • {inputStats.charCount} characters
                    </div>
                  )}
                </div>

                {/* Gentle nudge for underwritten entries */}
                {showNudge && (
                  <div className="ikigai-input-nudge gentle-fade-in">
                    💭 Consider expanding on this thought. What specific examples or experiences come to mind?
                  </div>
                )}
                
                {/* Submit button */}
                {input.trim().length > 0 && (
                  <div className="flex justify-center pt-4 sm:pt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !inputStats.isValid}
                      className="ikigai-button gentle-fade-in disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 sm:space-x-4"
                      style={{ animationDelay: '0.6s' }}
                    >
                      {isLoading && (
                        <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span className="text-sm sm:text-base">{isLoading ? "Processing..." : "Get insight"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* AI Insight */}
              {hasSubmitted && (
                <div className="ikigai-card p-6 sm:p-8 md:p-10 gentle-fade-in light-bloom">
                  <div className="space-y-6 sm:space-y-8">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl text-ikigai-warm-gold">
                        Reflection insight
                      </h3>
                    </div>
                    <p className="ikigai-insight text-base sm:text-lg md:text-xl leading-relaxed">
                      {aiInsight}
                    </p>
                    {step.nextRoute && (
                      <div className="flex justify-center pt-4 sm:pt-6">
                        <button
                          onClick={handleContinue}
                          className="ikigai-button gentle-fade-in"
                        >
                          Continue journey
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="ikigai-section flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            onClick={handleBack}
            className="ikigai-nav-button gentle-fade-in flex items-center space-x-2 sm:space-x-3"
            style={{ animationDelay: '0.8s' }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{step.id === 'love' ? 'Back to home' : 'Previous'}</span>
          </button>
          
          {hasSubmitted && (
            <button
              onClick={() => {
                setInput("");
                setHasSubmitted(false);
                setAiInsight("");
                setShowNudge(false);
              }}
              className="ikigai-nav-button gentle-fade-in"
              style={{ animationDelay: '0.9s' }}
            >
              Reflect again
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 