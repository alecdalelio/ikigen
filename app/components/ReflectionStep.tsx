"use client";

import { useState } from 'react';
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
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 reflection-page">
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-white text-center">
            {step.title}
          </h1>
          <p className="text-sm text-zinc-400 text-center">
            Step {step.id === 'love' ? 1 : step.id === 'goodAt' ? 2 : step.id === 'worldNeeds' ? 3 : 4} of 4
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">
              {step.question}
            </h2>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step.placeholder}
              className="w-full min-h-[160px] p-4 rounded-xl bg-zinc-800 text-white placeholder-zinc-500 text-base resize-none border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              disabled={hasSubmitted}
            />
            
            {!hasSubmitted && input.trim() && (
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                >
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isLoading ? "Processing..." : "Get Insight"}</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Insight */}
          {hasSubmitted && (
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-rose-200">
                  AI Insight
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {aiInsight}
                </p>
                {step.nextRoute && (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleContinue}
                      className="px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
          <button
            onClick={handleBack}
            className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
          >
            ← {step.id === 'love' ? 'Back to home' : 'Previous'}
          </button>
          
          {hasSubmitted && (
            <button
              onClick={() => {
                setInput("");
                setHasSubmitted(false);
                setAiInsight("");
              }}
              className="text-rose-400 hover:text-rose-300 transition-colors text-sm"
            >
              Reflect again
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 