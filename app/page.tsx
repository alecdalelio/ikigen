import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="ikigai-container page-transition homepage-animated">
      <div className="ikigai-center">
        {/* Header */}
        <div className="ikigai-section">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="ikigai-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl gentle-fade-in">
              Discover Your Ikigai
            </h1>
            <p className="ikigai-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto gentle-fade-in" style={{ animationDelay: '0.2s' }}>
              Find your purpose at the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.
            </p>
          </div>
        </div>

        {/* Ikigai Diagram */}
        <div className="ikigai-section">
          <div className="ikigai-venn gentle-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="ikigai-venn-petal">
              <Link href="/reflect/love" className="block">
                <div className="ikigai-circle love p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">Love</h3>
                  <p className="ikigai-body text-sm sm:text-base">What you love doing</p>
                </div>
              </Link>
            </div>

            <div className="ikigai-venn-petal">
              <Link href="/reflect/good-at" className="block">
                <div className="ikigai-circle skill p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">Skill</h3>
                  <p className="ikigai-body text-sm sm:text-base">What you're good at</p>
                </div>
              </Link>
            </div>

            <div className="ikigai-venn-petal">
              <Link href="/reflect/world-needs" className="block">
                <div className="ikigai-circle need p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">Need</h3>
                  <p className="ikigai-body text-sm sm:text-base">What the world needs</p>
                </div>
              </Link>
            </div>

            <div className="ikigai-venn-petal">
              <Link href="/reflect/paid-for" className="block">
                <div className="ikigai-circle value p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="ikigai-heading text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">Value</h3>
                  <p className="ikigai-body text-sm sm:text-base">What you can be paid for</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="ikigai-section">
          <div className="text-center space-y-6 sm:space-y-8">
            <p className="ikigai-body text-base sm:text-lg md:text-xl gentle-fade-in" style={{ animationDelay: '0.6s' }}>
              Begin your journey of self-discovery and find your unique purpose in life.
            </p>
            <div className="flex justify-center gentle-fade-in" style={{ animationDelay: '0.8s' }}>
              <Link href="/reflect/love" className="ikigai-button">
                Begin your journey
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="ikigai-section">
          <div className="flex justify-center space-x-4 sm:space-x-8">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-ikigai-gold rounded-full soft-pulse"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-ikigai-warm-gold rounded-full soft-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-ikigai-gold rounded-full soft-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="particle-1"></div>
        <div className="particle-2"></div>
      </div>
    </div>
  );
}
