"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useReflectionData } from "../hooks/useReflectionData";

export default function ReflectPage() {
  const router = useRouter();
  const { data, isLoaded } = useReflectionData();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    console.log('ReflectPage: isLoaded =', isLoaded, 'data =', data);
    
    if (!isLoaded) return;

    // Determine the appropriate step to redirect to based on progress
    let targetRoute = '/reflect/love';
    
    if (data.love && data.goodAt && data.worldNeeds && data.paidFor) {
      // All steps completed, go to summary
      targetRoute = '/reflect/summary';
      console.log('ReflectPage: All steps completed, redirecting to summary');
    } else if (data.love && data.goodAt && data.worldNeeds) {
      // Completed first 3 steps, go to paid-for
      targetRoute = '/reflect/paid-for';
      console.log('ReflectPage: Completed 3 steps, redirecting to paid-for');
    } else if (data.love && data.goodAt) {
      // Completed first 2 steps, go to world-needs
      targetRoute = '/reflect/world-needs';
      console.log('ReflectPage: Completed 2 steps, redirecting to world-needs');
    } else if (data.love) {
      // Completed first step, go to good-at
      targetRoute = '/reflect/good-at';
      console.log('ReflectPage: Completed 1 step, redirecting to good-at');
    } else {
      console.log('ReflectPage: No progress, starting with love step');
    }

    // Add a small delay to show the loading state
    const timer = setTimeout(() => {
      console.log('ReflectPage: Redirecting to', targetRoute);
      router.push(targetRoute);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoaded, data, router]);

  // Show loading state while determining redirect
  if (!isLoaded || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-zinc-400">Redirecting to reflection...</p>
        </div>
      </div>
    );
  }

  return null;
} 