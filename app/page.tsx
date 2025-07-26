import Link from "next/link";

export default function Home() {
  return (
    <div className="ikigai-container">
      <div className="ikigai-center">
        <main className="ikigai-section">
          {/* Ikigai Title */}
          <div className="ikigai-section">
            <h1 className="ikigai-title text-6xl sm:text-8xl gentle-fade-in">
              Ikigen
            </h1>
            <div className="mt-6 w-32 h-1 bg-gradient-to-r from-ikigai-gold to-ikigai-warm-gold mx-auto rounded-full"></div>
          </div>

          {/* Subtitle */}
          <div className="ikigai-section max-w-3xl space-y-6">
            <p className="ikigai-heading text-2xl sm:text-3xl leading-relaxed gentle-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover your <em className="text-ikigai-warm-gold">ikigai</em> through mindful reflection
            </p>
            <p className="ikigai-body text-xl sm:text-2xl leading-relaxed gentle-fade-in" style={{ animationDelay: '0.4s' }}>
              Embark on a guided journey to uncover your purpose at the intersection of passion, skill, need, and value.
            </p>
          </div>

          {/* Ikigai Circle Diagram */}
          <div className="ikigai-section">
            <div className="ikigai-venn">
              {[
                { 
                  title: "Love", 
                  subtitle: "What you love",
                  type: "love",
                  route: "/reflect/love"
                },
                { 
                  title: "Skill", 
                  subtitle: "What you're good at",
                  type: "skill",
                  route: "/reflect/good-at"
                },
                { 
                  title: "Need", 
                  subtitle: "What the world needs",
                  type: "need",
                  route: "/reflect/world-needs"
                },
                { 
                  title: "Value", 
                  subtitle: "What you can be paid for",
                  type: "value",
                  route: "/reflect/paid-for"
                },
              ].map((domain, i) => (
                <Link
                  key={domain.title}
                  href={domain.route}
                  className="ikigai-venn-petal"
                >
                  <div 
                    className={`ikigai-circle p-8 text-center gentle-fade-in cursor-pointer ${domain.type}`}
                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ikigai-warm-gold to-ikigai-gold mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl ikigai-heading text-white">
                        {domain.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl ikigai-heading mb-2">
                      {domain.title}
                    </h3>
                    <p className="text-sm ikigai-body">
                      {domain.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="ikigai-section">
            <Link
              href="/reflect"
              className="ikigai-button gentle-fade-in inline-block"
              style={{ animationDelay: '1s' }}
            >
              Begin your journey
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center space-x-8 mt-12 opacity-60">
            <div className="w-8 h-8 bg-ikigai-gold rounded-full soft-pulse"></div>
            <div className="w-4 h-4 bg-ikigai-warm-gold rounded-full soft-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-6 h-6 bg-ikigai-gold rounded-full soft-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </main>

        <footer className="text-sm ikigai-body mt-16">
          © {new Date().getFullYear()} Alec D'Alelio — Built with intention and purpose
        </footer>
      </div>
    </div>
  );
}
