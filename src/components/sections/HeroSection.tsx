// src/components/sections/HeroSection.tsx
import { ArrowRight, ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Verified Sellers' },
  { icon: CreditCard, label: 'Secure Payments' },
  { icon: Truck, label: 'Fast Delivery' },
  { icon: RotateCcw, label: 'Easy Returns' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[var(--color-bg)]" aria-label="Hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(17,17,17,0.03)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,245,245,0.02)_0%,transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <img src="/brand/illiyun-logo.png" alt="" aria-hidden="true" className="h-8 w-auto object-contain opacity-90" />
              <div className="h-px w-6 bg-[#D4AF37]/60" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37]">Premium Marketplace</span>
            </div>

            {/* Headline */}
            <h1
              className="text-[2.8rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem] font-light text-[var(--color-text-primary)] leading-[1.02] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Discover<br />
              <span className="italic text-[#D4AF37]">Curated</span><br />
              Luxury.
            </h1>

            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.7] max-w-md">
              50,000+ premium products from 1,200+ verified sellers across 8 categories. Electronics, fashion, beauty, home and more — all in one trusted marketplace.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/products"
                id="hero-shop-now"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-[13px] font-bold tracking-wide uppercase rounded-xl hover:bg-[#D4AF37] hover:text-[#111] transition-all duration-300 shadow-lg shadow-black/10"
              >
                Shop Now
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/products?sort=trending"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] text-[13px] font-bold tracking-wide uppercase rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
              >
                Trending
              </Link>
            </div>

            {/* Trust badges — marketplace credibility */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-[var(--color-border)]">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} className="text-[#D4AF37]" />
                  <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Campaign visual */}
          <div className="relative hidden lg:block lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/15">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85" alt="Featured luxury collection" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-[var(--color-bg)]/92 dark:bg-[#1A1A1A]/92 backdrop-blur-xl rounded-xl p-4 border border-[var(--color-border)] shadow-lg">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img src="/brand/illiyun-logo.png" alt="" aria-hidden="true" className="h-4 w-auto object-contain opacity-70" />
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Featured Collection</span>
                  </div>
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">Summer Essentials 2026</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-[var(--color-text-secondary)]">Starting from <span className="font-bold text-[var(--color-text-primary)]">$29.00</span></p>
                    <Link to="/products" className="text-[11px] font-bold text-[#D4AF37] border-b border-[#D4AF37] pb-px hover:opacity-80 transition">Explore →</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#D4AF37]/20" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full border border-[var(--color-border)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
