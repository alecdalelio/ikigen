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
      currentValue={data.love}
      onUpdate={(value) => updateData('love', value)}
      onNext={() => router.push('/reflect/good-at')}
    />
  );
} 