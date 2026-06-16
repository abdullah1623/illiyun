// src/components/sections/MarketplaceStatsSection.tsx
import { Package, Users, Globe, Star } from 'lucide-react'

const STATS = [
  { icon: Package, value: '50,000+', label: 'Premium Products', color: '#D4AF37' },
  { icon: Users, value: '1,200+', label: 'Verified Sellers', color: '#D4AF37' },
  { icon: Globe, value: '120+', label: 'Countries Served', color: '#D4AF37' },
  { icon: Star, value: '98%', label: 'Customer Satisfaction', color: '#D4AF37' },
]

export function MarketplaceStatsSection() {
  return (
    <section className="py-12 bg-[#111111] dark:bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon size={24} className="mx-auto mb-3 text-[#D4AF37]" />
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{value}</p>
              <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
