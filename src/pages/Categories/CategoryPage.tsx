// src/pages/Categories/CategoryPage.tsx
import { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Inbox, LayoutGrid } from 'lucide-react'
import { ProductCard } from '../../components/product/ProductCard'
import { FEATURED_PRODUCTS, CATEGORIES } from '../../data/mockData'

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  // Scroll to top on load or category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Find category based on slug
  const categoryInfo = useMemo(() => {
    if (!slug) return null
    return CATEGORIES.find(c => c.slug === slug.toLowerCase())
  }, [slug])

  // Filter products by category name
  const filteredProducts = useMemo(() => {
    if (!categoryInfo) return []
    return FEATURED_PRODUCTS.filter(
      p => p.category.toLowerCase() === categoryInfo.name.toLowerCase()
    )
  }, [categoryInfo])

  if (!categoryInfo) {
    return (
      <div className="min-h-[70vh] bg-[var(--color-bg)] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Inbox size={48} className="mx-auto text-[#D4AF37] mb-4" />
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Category Not Found</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 mb-8">The category slug "{slug}" doesn't correspond to any active category.</p>
          
          <h3 className="text-sm font-semibold tracking-wider text-[var(--color-text-primary)] uppercase mb-6">Browse Available Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/c/${cat.slug}`}
                className="p-5 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] hover:border-[#D4AF37] transition flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-2xl group-hover:scale-110 transition duration-200">{cat.icon}</span>
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[#D4AF37] transition"
          >
            <ArrowLeft size={14} />
            Back to All Products
          </Link>
        </div>

        {/* Category Header Card (Banner) */}
        <div className="relative rounded-2xl overflow-hidden mb-10 border border-[var(--color-border)] min-h-[200px] md:min-h-[280px] flex items-center bg-black">
          {/* Blurred Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={categoryInfo.image}
              alt={categoryInfo.name}
              className="w-full h-full object-cover opacity-40 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Banner Contents */}
          <div className="relative z-10 px-6 py-8 md:p-12 max-w-2xl text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl md:text-4xl bg-white/10 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center border border-white/20">
                {categoryInfo.icon}
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase bg-[#D4AF37]/20 px-3 py-1 rounded-full">
                CATEGORY
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {categoryInfo.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-3 max-w-lg leading-relaxed">
              Curated selection of our best {categoryInfo.name.toLowerCase()} items. Enjoy premium craftsmanship, verified quality, and fast courier dispatch.
            </p>
            <span className="inline-block mt-4 text-[10px] md:text-xs font-mono text-gray-400">
              {categoryInfo.count}+ Verified Listings Available
            </span>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} className="text-[#D4AF37]" />
              <h2 className="text-sm font-semibold tracking-wider text-[var(--color-text-primary)] uppercase">
                Showing {filteredProducts.length} Results
              </h2>
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] font-medium">
              Illiyun Luxury Marketplace
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
              <Inbox className="mx-auto text-[var(--color-text-disabled)] mb-4" size={40} />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">No products in this category</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2">We will update the list soon. In the meantime, discover related luxury goods.</p>
              <Link
                to="/products"
                className="mt-6 inline-block px-6 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
              >
                Explore All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
