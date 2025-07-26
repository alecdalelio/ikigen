"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReflectionStepComponent from '../../components/ReflectionStep';
import { useReflectionData } from '../../hooks/useReflectionData';
import { REFLECTION_STEPS } from '../../types/reflection';

export default function LovePage() {
  const { data, updateData, isLoaded } = useReflectionData();
  const router = useRouter();
  const step = REFLECTION_STEPS[0]; // love step

  useEffect(() => {
    if (isLoaded && data.love) {
      // If user has already completed this step, redirect to next
      router.push('/reflect/good-at');
    }
  }, [isLoaded, data.love, router]);

  if (!isLoaded) {
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
    <ReflectionStepComponent
      step={step}
      currentValue={data.love}
      onUpdate={(value) => updateData('love', value)}
      onNext={() => router.push('/reflect/good-at')}
    />
  );
} 