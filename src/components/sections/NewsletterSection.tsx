// src/components/sections/NewsletterSection.tsx
import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-14 bg-[#111111] dark:bg-[#0A0A0A] overflow-hidden relative" id="newsletter">
      {/* Decorative accents */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full border border-[#D4AF37]/10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full border border-[#D4AF37]/05 translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
            <Mail size={22} className="text-[#D4AF37]" />
          </div>

          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3 block">
            Stay in the Loop
          </span>

          <h2
            className="text-3xl md:text-4xl font-light text-white mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            The Finest Picks,<br />
            <span className="italic text-[#D4AF37]">Delivered to You</span>
          </h2>

          <p className="text-sm text-white/50 mb-8 leading-relaxed">
            Join 80,000+ shoppers who get exclusive deals, curated collections, and new arrivals — before anyone else.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <CheckCircle size={40} className="text-[#D4AF37]" />
              <p className="text-white font-medium">You're in! Welcome to ILLIYUN.</p>
              <p className="text-sm text-white/50">Check your inbox for a welcome gift. 🎁</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter your email address"
                className={`flex-1 px-5 py-3.5 text-sm bg-white/5 text-white placeholder:text-white/30 rounded-lg border transition-all duration-200 focus:outline-none
                  ${focused ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20' : 'border-white/10'}`}
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#111] text-sm font-semibold rounded-lg hover:bg-[#E8C84A] transition-all duration-200 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-xs text-white/30 mt-4">
            No spam. Unsubscribe anytime. Read our{' '}
            <a href="/privacy" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
