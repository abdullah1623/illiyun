// src/components/sections/CategoriesSection.tsx
import { useState } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { CATEGORIES } from '../../data/mockData'

export function CategoriesSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-14 bg-[var(--color-bg)]" id="categories">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Browse By"
          title="Shop Categories"
          subtitle="Discover our curated selection across every lifestyle need."
          action={{ label: 'View all categories', href: '/categories' }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map(cat => (
            <a
              key={cat.id}
              href={`/c/${cat.slug}`}
              className="group relative flex flex-col items-center rounded-xl overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_4px_24px_rgba(212,175,55,0.10)] hover:-translate-y-1"
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden bg-[var(--color-surface)]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-all duration-300 ${hovered === cat.id ? 'bg-black/20' : 'bg-transparent'}`} />
              </div>

              {/* Icon overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-2xl drop-shadow-md">{cat.icon}</span>
              </div>

              {/* Label */}
              <div className="w-full px-2 py-3 text-center">
                <p className="text-xs font-semibold text-[var(--color-text-primary)] leading-tight">
                  {cat.name}
                </p>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  {cat.count.toLocaleString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
