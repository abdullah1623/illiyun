// src/components/sections/ProductGridSection.tsx
import { useEffect, useState } from 'react'
import { ProductCard } from '../product/ProductCard'
import { SkeletonCard } from '../ui/SkeletonCard'
import { SectionHeader } from '../ui/SectionHeader'
import type { Product } from '../../data/mockData'

interface ProductGridSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  products: Product[]
  seeAllHref?: string
  bgVariant?: 'default' | 'tinted'
}

export function ProductGridSection({
  eyebrow, title, subtitle, products, seeAllHref, bgVariant = 'default'
}: ProductGridSectionProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className={`py-14 ${bgVariant === 'tinted' ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-bg)]'}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          action={seeAllHref ? { label: 'See all', href: seeAllHref } : undefined}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map(product => <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>
    </section>
  )
}
