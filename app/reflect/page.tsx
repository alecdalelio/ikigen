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
      targetRoute = '/reflect/summary';
    } else if (data.love && data.goodAt && data.worldNeeds) {
      targetRoute = '/reflect/paid-for';
    } else if (data.love && data.goodAt) {
      targetRoute = '/reflect/world-needs';
    } else if (data.love) {
      targetRoute = '/reflect/good-at';
    }

    const timer = setTimeout(() => {
      console.log('ReflectPage: Redirecting to', targetRoute);
      router.push(targetRoute);
    }, 800);

    return () => clearTimeout(timer);
  }, [isLoaded, data, router]);

  if (!isLoaded || isRedirecting) {
    return (
      <div className="ikigai-container">
        <div className="ikigai-center">
          <div className="text-center gentle-fade-in">
            <div className="mb-8">
              <div className="w-16 h-16 border-4 border-ikigai-gold/30 border-t-ikigai-warm-gold rounded-full animate-spin mx-auto"></div>
            </div>
            <h2 className="ikigai-heading text-2xl mb-4">
              Preparing your journey
            </h2>
            <p className="ikigai-body text-lg">
              Finding your path to Ikigai...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 