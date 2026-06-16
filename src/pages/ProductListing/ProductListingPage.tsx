// src/pages/ProductListing/ProductListingPage.tsx
import { useState, useMemo, useEffect } from 'react'
import { SlidersHorizontal, ChevronDown, X, Star } from 'lucide-react'
import { ProductCard } from '../../components/product/ProductCard'
import { FEATURED_PRODUCTS, CATEGORIES } from '../../data/mockData'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' }
]

export function ProductListingPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const itemsPerPage = 6

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  // Categories helper counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    FEATURED_PRODUCTS.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...FEATURED_PRODUCTS]

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Rating filter
    if (minRating !== null) {
      result = result.filter(p => p.rating >= minRating)
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [selectedCategories, priceRange, minRating, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, priceRange, minRating, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    setMinRating(null)
    setSortBy('featured')
  }

  const activeFiltersCount =
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0) +
    (minRating !== null ? 1 : 0)

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-2 block">
            ILLIYUN COLLECTION
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Explore All Products
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xl">
            Immerse yourself in our premium multi-category marketplace. Hand-selected for style, quality, and durability.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-6 sticky top-24 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-semibold tracking-wide uppercase text-[var(--color-text-primary)]">Filters</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#D4AF37] hover:underline transition"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="border-b border-[var(--color-border)] pb-6 mb-6">
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-4">Categories</h3>
              <div className="space-y-3">
                {CATEGORIES.map(cat => {
                  const count = categoryCounts[cat.name] || 0
                  return (
                    <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="w-4 h-4 rounded border-[var(--color-border)] text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--color-text-disabled)] font-mono">({count})</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-b border-[var(--color-border)] pb-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Price Range</h3>
                <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex gap-3 mt-4">
                <div className="flex-1">
                  <span className="text-[10px] text-[var(--color-text-disabled)] block uppercase mb-1">Min</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                    className="w-full px-3 py-1.5 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)]"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-[var(--color-text-disabled)] block uppercase mb-1">Max</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Math.max(priceRange[0], parseInt(e.target.value) || 500)])}
                    className="w-full px-3 py-1.5 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-4">Customer Rating</h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? null : rating)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition text-xs
                      ${minRating === rating
                        ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[var(--color-text-primary)]'
                        : 'border border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star
                            key={s}
                            size={12}
                            fill={s <= Math.floor(rating) ? '#D4AF37' : 'none'}
                            stroke={s <= Math.floor(rating) ? '#D4AF37' : '#D4D4D4'}
                          />
                        ))}
                      </div>
                      <span>{rating} & Up</span>
                    </div>
                    {minRating === rating && <X size={12} className="text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Column */}
          <main className="lg:col-span-3">
            
            {/* Products Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-[#D4AF37] text-[#111] text-xs font-bold rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Showing <span className="font-semibold text-[var(--color-text-primary)]">{filteredProducts.length}</span> products
                </p>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-[var(--color-text-secondary)]">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 text-xs bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
                <SlidersHorizontal className="mx-auto text-[var(--color-text-disabled)] mb-4" size={40} />
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">No products match your filters</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                  {paginatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-12 border-t border-[var(--color-border)] pt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3.5 py-2 border border-[var(--color-border)] rounded-lg text-xs font-medium text-[var(--color-text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface)] transition"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const page = idx + 1
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-semibold transition
                            ${currentPage === page
                              ? 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] border border-[#111111] dark:border-[#F5F5F5]'
                              : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                            }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3.5 py-2 border border-[var(--color-border)] rounded-lg text-xs font-medium text-[var(--color-text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface)] transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filters Drawer Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <aside className="absolute top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-[var(--color-bg)] shadow-[var(--shadow-modal)] p-6 flex flex-col z-55 border-l border-[var(--color-border)]">
            
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-6">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] uppercase">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">Categories</h3>
                <div className="space-y-3">
                  {CATEGORIES.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => toggleCategory(cat.name)}
                        className="w-4 h-4 rounded border-[var(--color-border)] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Price Range</h3>
                  <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">Customer Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(minRating === rating ? null : rating)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition text-xs
                        ${minRating === rating
                          ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[var(--color-text-primary)]'
                          : 'border border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                        }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              size={12}
                              fill={s <= Math.floor(rating) ? '#D4AF37' : 'none'}
                              stroke={s <= Math.floor(rating) ? '#D4AF37' : '#D4D4D4'}
                            />
                          ))}
                        </div>
                        <span>{rating} & Up</span>
                      </div>
                      {minRating === rating && <X size={12} className="text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] pt-4 mt-6 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 text-xs font-semibold border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)] transition text-[var(--color-text-secondary)]"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 text-xs font-semibold bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition"
              >
                Apply Filters
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
