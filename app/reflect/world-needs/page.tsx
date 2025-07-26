"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReflectionStepComponent from '../../components/ReflectionStep';
import { useReflectionData } from '../../hooks/useReflectionData';
import { REFLECTION_STEPS } from '../../types/reflection';

export default function WorldNeedsPage() {
  const { data, updateData, isLoaded } = useReflectionData();
  const router = useRouter();
  const step = REFLECTION_STEPS[2]; // worldNeeds step

  useEffect(() => {
    if (isLoaded) {
      // Check if user has completed previous steps
      if (!data.love || !data.goodAt) {
        router.push('/reflect/love');
        return;
      }
      // If user has already completed this step, redirect to next
      if (data.worldNeeds) {
        router.push('/reflect/paid-for');
      }
    }
  }, [isLoaded, data.love, data.goodAt, data.worldNeeds, router]);

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
    <ReflectionStepComponent
      step={step}
      currentValue={data.worldNeeds}
      onUpdate={(value) => updateData('worldNeeds', value)}
      onNext={() => router.push('/reflect/paid-for')}
    />
  );
} 