// src/components/sections/IslamicCollectionSection.tsx
import { Link } from 'react-router-dom'
import { ProductCard } from '../product/ProductCard'
import { ISLAMIC_PRODUCTS } from '../../data/mockData'

export function IslamicCollectionSection() {
  const products = ISLAMIC_PRODUCTS.slice(0, 4)
  return (
    <section className="py-14 bg-[#111111] dark:bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] block mb-1">🌙 Curated with Care</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Islamic Collection</h2>
            <p className="text-sm text-gray-400 mt-1 max-w-md">Thoughtfully curated prayer essentials, fragrances, calligraphy art and more.</p>
          </div>
          <Link to="/c/islamic" className="text-xs font-bold text-[#D4AF37] hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
