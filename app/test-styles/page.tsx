"use client";

import Link from "next/link";

export default function TestStylesPage() {
  return (
    <div className="ikigai-container">
      <div className="ikigai-center">
        {/* Header */}
        <div className="ikigai-section text-center space-y-8">
          <h1 className="ikigai-title text-6xl gentle-fade-in">
            Ikigai Design System
          </h1>
          <p className="ikigai-body text-2xl max-w-3xl mx-auto leading-relaxed gentle-fade-in" style={{ animationDelay: '0.2s' }}>
            A showcase of the enhanced meditative design tokens, components, and animations inspired by Japanese Ikigai philosophy
          </p>
        </div>

        {/* Color Palette */}
        <section className="ikigai-section space-y-8">
          <h2 className="ikigai-heading text-4xl text-center">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Cream", class: "bg-ikigai-cream", text: "text-ikigai-brown" },
              { name: "Brown", class: "bg-ikigai-brown", text: "text-white" },
              { name: "Warm White", class: "bg-ikigai-warm-white", text: "text-ikigai-brown" },
              { name: "Gold", class: "bg-ikigai-gold", text: "text-ikigai-brown" },
              { name: "Warm Gold", class: "bg-ikigai-warm-gold", text: "text-white" },
              { name: "Love", class: "bg-ikigai-love", text: "text-ikigai-brown" },
              { name: "Skill", class: "bg-ikigai-skill", text: "text-ikigai-brown" },
              { name: "Need", class: "bg-ikigai-need", text: "text-ikigai-brown" },
              { name: "Value", class: "bg-ikigai-value", text: "text-ikigai-brown" },
            ].map((color) => (
              <div key={color.name} className={`${color.class} ${color.text} p-8 rounded-joy text-center ikigai-card`}>
                <div className="ikigai-heading font-medium text-lg">{color.name}</div>
                <div className="text-sm opacity-80 ikigai-body">ikigai-{color.name.toLowerCase().replace(' ', '-')}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="ikigai-section space-y-8">
          <h2 className="ikigai-heading text-4xl text-center">Typography</h2>
          <div className="space-y-8">
            <div className="ikigai-card p-8">
              <h3 className="ikigai-heading text-2xl mb-4">Ikigai Title</h3>
              <h1 className="ikigai-title text-5xl">
                This is an Ikigai title
              </h1>
            </div>
            <div className="ikigai-card p-8">
              <h3 className="ikigai-heading text-2xl mb-4">Ikigai Question</h3>
              <p className="ikigai-question text-3xl">
                What brings you joy and fulfillment?
              </p>
            </div>
            <div className="ikigai-card p-8">
              <h3 className="ikigai-heading text-2xl mb-4">Ikigai Insight</h3>
              <p className="ikigai-insight text-xl">
                This is an example of the insight styling with a left border and italic text, representing the wisdom gained through reflection.
              </p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="ikigai-section space-y-8">
          <h2 className="ikigai-heading text-4xl text-center">Components</h2>
          
          {/* Circle Cards */}
          <div className="space-y-6">
            <h3 className="ikigai-heading text-2xl text-center">Ikigai Circle Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="ikigai-circle p-8 text-center love">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl ikigai-heading text-white">L</span>
                </div>
                <h4 className="ikigai-heading text-xl mb-2">Love</h4>
                <p className="ikigai-body">What you love doing</p>
              </div>
              <div className="ikigai-circle p-8 text-center skill">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl ikigai-heading text-white">S</span>
                </div>
                <h4 className="ikigai-heading text-xl mb-2">Skill</h4>
                <p className="ikigai-body">What you're good at</p>
              </div>
              <div className="ikigai-circle p-8 text-center need">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl ikigai-heading text-white">N</span>
                </div>
                <h4 className="ikigai-heading text-xl mb-2">Need</h4>
                <p className="ikigai-body">What the world needs</p>
              </div>
              <div className="ikigai-circle p-8 text-center value">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl ikigai-heading text-white">V</span>
                </div>
                <h4 className="ikigai-heading text-xl mb-2">Value</h4>
                <p className="ikigai-body">What you can be paid for</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-6">
            <h3 className="ikigai-heading text-2xl text-center">Ikigai Buttons</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="ikigai-button gentle-fade-in">
                Primary action
              </button>
              <button className="ikigai-button gentle-fade-in">
                Continue journey
              </button>
              <button className="ikigai-button gentle-fade-in">
                Get insight
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-6">
            <h3 className="ikigai-heading text-2xl text-center">Progress Indicator</h3>
            <div className="ikigai-progress">
              <div className="ikigai-progress-dot completed"></div>
              <div className="ikigai-progress-dot active"></div>
              <div className="ikigai-progress-dot"></div>
              <div className="ikigai-progress-dot"></div>
            </div>
          </div>

          {/* Input Component */}
          <div className="space-y-6">
            <h3 className="ikigai-heading text-2xl text-center">Input Component</h3>
            <div className="max-w-2xl mx-auto">
              <textarea
                placeholder="Share your thoughts here..."
                className="ikigai-input w-full min-h-[200px] resize-none"
              />
            </div>
          </div>

          {/* Venn Diagram Layout */}
          <div className="space-y-6">
            <h3 className="ikigai-heading text-2xl text-center">Ikigai Venn Layout</h3>
            <div className="ikigai-venn max-w-2xl mx-auto">
              {[
                { title: "Love", type: "love" },
                { title: "Skill", type: "skill" },
                { title: "Need", type: "need" },
                { title: "Value", type: "value" },
              ].map((domain, i) => (
                <div
                  key={domain.title}
                  className={`ikigai-circle p-6 text-center gentle-fade-in ${domain.type}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold mx-auto mb-3 flex items-center justify-center">
                    <span className="text-lg ikigai-heading text-white">
                      {domain.title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm ikigai-heading">{domain.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Animations */}
        <section className="ikigai-section space-y-8">
          <h2 className="ikigai-heading text-4xl text-center">Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-center">
              <h3 className="ikigai-heading text-xl">Gentle Fade In</h3>
              <div className="w-32 h-32 bg-gradient-to-br from-ikigai-gold to-ikigai-warm-gold rounded-ikigai mx-auto gentle-fade-in"></div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="ikigai-heading text-xl">Soft Pulse</h3>
              <div className="w-32 h-32 bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold rounded-ikigai mx-auto soft-pulse"></div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="ikigai-heading text-xl">Light Bloom</h3>
              <div className="w-32 h-32 bg-gradient-to-br from-ikigai-gold to-ikigai-warm-gold rounded-ikigai mx-auto light-bloom"></div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="ikigai-section text-center pt-12">
          <Link
            href="/"
            className="ikigai-button gentle-fade-in inline-block"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}