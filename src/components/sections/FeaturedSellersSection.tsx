// src/components/sections/FeaturedSellersSection.tsx
import { Link } from 'react-router-dom'
import { SELLERS } from '../../data/mockData'
import { Star, BadgeCheck } from 'lucide-react'

export function FeaturedSellersSection() {
  return (
    <section className="py-14 bg-[var(--color-surface)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] block mb-1">Trusted Partners</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] tracking-tight">Featured Sellers</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-[#D4AF37] hover:underline hidden sm:block">View all sellers →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SELLERS.map(s => (
            <Link
              key={s.id}
              to="/products"
              className="flex flex-col items-center gap-2 p-5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200 group"
            >
              <span className="text-3xl">{s.logo}</span>
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[#D4AF37] transition-colors">{s.name}</span>
                  {s.verified && <BadgeCheck size={13} className="text-[#D4AF37]" />}
                </div>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <Star size={10} fill="#D4AF37" stroke="#D4AF37" />
                  <span className="text-[10px] text-[var(--color-text-secondary)] font-medium">{s.rating} · {s.products} items</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
