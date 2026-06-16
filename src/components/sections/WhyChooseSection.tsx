// src/components/sections/WhyChooseSection.tsx
import { ShieldCheck, Zap, BadgeCheck, RotateCcw } from 'lucide-react'

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Secure Shopping',
    description: 'Every transaction is encrypted end-to-end with bank-grade security. Your data is always protected.',
  },
  {
    Icon: Zap,
    title: 'Fast Delivery',
    description: 'Express shipping across the globe. Real-time tracking from warehouse to your door.',
  },
  {
    Icon: BadgeCheck,
    title: 'Trusted Sellers',
    description: 'Every seller on ILLIYUN is verified and rated. Guaranteed authentic products only.',
  },
  {
    Icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 30-day returns. No questions asked. Full refunds processed within 48 hours.',
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-14 bg-[var(--color-bg)]" id="why-illiyun">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3 block">
            Our Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] tracking-tight">
            Why Choose ILLIYUN?
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)] text-sm leading-relaxed">
            We've built a marketplace around trust, quality, and a seamless shopping experience.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[#D4AF37] hover:shadow-[0_4px_24px_rgba(212,175,55,0.08)] transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-surface)] group-hover:bg-[#D4AF37]/10 transition-colors duration-300 mb-5 mx-auto">
                <Icon size={24} className="text-[var(--color-text-secondary)] group-hover:text-[#D4AF37] transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">{title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Divider strip */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50,000+', label: 'Products Listed' },
            { value: '1,200+', label: 'Verified Sellers' },
            { value: '120+', label: 'Countries Shipped' },
            { value: '4.9 ★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {stat.value}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
