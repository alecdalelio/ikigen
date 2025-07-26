"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReflectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first step of the reflection flow
    router.push('/reflect/love');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
        <p className="text-zinc-400">Redirecting to reflection...</p>
      </div>
    </div>
  );
} 