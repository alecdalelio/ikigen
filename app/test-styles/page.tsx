"use client";

export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Style Test Page</h1>
        {/* Debug Test Element */}
        <div 
          className="bg-red-500 text-white p-4 mb-4"
          style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '1rem', marginBottom: '1rem' }}
        >
          🚨 DEBUG: If you see this red box, Tailwind is working! If not, there's a CSS conflict.
        </div>
        {/* Test basic Tailwind classes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Basic Tailwind Test</h2>
          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
            <p className="text-zinc-300">This should have a dark background with light text</p>
          </div>
        </div>
        {/* Test the exact classes from summary page */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Summary Page Classes Test</h2>
          <div className="bg-zinc-800/80 p-6 rounded-xl border border-zinc-700 shadow-sm"
            style={{ backgroundColor: 'rgba(39, 39, 42, 0.8)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #3f3f46', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
          >
            <h3 className="text-2xl font-semibold text-white">Test Title</h3>
            <p className="text-lg text-zinc-300">Test content that should be styled exactly like the summary page</p>
          </div>
        </div>
        {/* Test gradient */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Gradient Test</h2>
          <div className="bg-gradient-to-br from-rose-900 via-zinc-900 to-rose-950 border border-rose-800/60 rounded-xl p-6 shadow-lg"
            style={{ background: 'linear-gradient(to bottom right, #881337, #18181b, #4c0519)', border: '1px solid rgba(190, 18, 60, 0.6)', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-2xl font-bold text-rose-100">Gradient Title</h3>
            <p className="italic text-lg text-rose-200">This should have a beautiful gradient background</p>
          </div>
        </div>
        {/* Test buttons */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Button Test</h2>
          <div className="flex gap-4">
            <button className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 transition"
              style={{ backgroundColor: '#27272a', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
            >
              Test Button 1
            </button>
            <button className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition"
              style={{ backgroundColor: '#be123c', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
            >
              Test Button 2
            </button>
          </div>
        </div>
        {/* Test layout classes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Layout Test</h2>
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-10 bg-zinc-900 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">Centered Content</h3>
              <p className="text-zinc-300">This should be centered with proper spacing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 