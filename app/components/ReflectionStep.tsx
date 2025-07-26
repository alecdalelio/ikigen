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
  const router = useRouter();

  // Get step number for progress
  const stepNumber = step.id === 'love' ? 1 : step.id === 'goodAt' ? 2 : step.id === 'worldNeeds' ? 3 : 4;

  useEffect(() => {
    // Show progress after a brief delay
    const timer = setTimeout(() => setShowProgress(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
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
    <div className="ikigai-container">
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
          <div className="ikigai-card p-12">
            {/* Header */}
            <div className="text-center space-y-6 mb-12">
              <h1 className="ikigai-heading text-5xl gentle-fade-in">
                {step.title}
              </h1>
              <p className="ikigai-body text-lg">
                Step {stepNumber} of 4 — {stepNumber === 1 ? 'Starting Small' : 
                                       stepNumber === 2 ? 'Building Presence' : 
                                       stepNumber === 3 ? 'Finding Harmony' : 'Creating Value'}
              </p>
            </div>

            {/* Question and input area */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="ikigai-question text-3xl text-center gentle-fade-in" style={{ animationDelay: '0.2s' }}>
                  {step.question}
                </h2>
                
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={step.placeholder}
                    className="ikigai-input w-full min-h-[240px] resize-none text-xl gentle-fade-in"
                    style={{ animationDelay: '0.4s' }}
                    disabled={hasSubmitted}
                  />
                  {!hasSubmitted && input.trim() && (
                    <div className="absolute bottom-6 right-6">
                      <div className="w-3 h-3 bg-ikigai-gold rounded-full soft-pulse"></div>
                    </div>
                  )}
                </div>
                
                {!hasSubmitted && input.trim() && (
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="ikigai-button gentle-fade-in disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-4"
                      style={{ animationDelay: '0.6s' }}
                    >
                      {isLoading && (
                        <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span>{isLoading ? "Processing..." : "Get insight"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* AI Insight */}
              {hasSubmitted && (
                <div className="ikigai-card p-10 gentle-fade-in light-bloom">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="ikigai-heading text-2xl text-ikigai-warm-gold">
                        Reflection insight
                      </h3>
                    </div>
                    <p className="ikigai-insight text-xl leading-relaxed">
                      {aiInsight}
                    </p>
                    {step.nextRoute && (
                      <div className="flex justify-center pt-6">
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
        <div className="ikigai-section flex justify-between items-center">
          <button
            onClick={handleBack}
            className="ikigai-body hover:text-ikigai-warm-gold transition-colors duration-300 text-xl font-medium flex items-center space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              }}
              className="ikigai-body hover:text-ikigai-warm-gold transition-colors duration-300 text-xl font-medium"
            >
              Reflect again
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 