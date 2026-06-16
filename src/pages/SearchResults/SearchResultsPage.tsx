// src/pages/SearchResults/SearchResultsPage.tsx
import { useMemo, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { ProductCard } from '../../components/product/ProductCard'
import { FEATURED_PRODUCTS } from '../../data/mockData'

export function SearchResultsPage() {
  const { search } = useLocation()
  
  // Extract query from URL parameters
  const query = useMemo(() => {
    return new URLSearchParams(search).get('q') || ''
  }, [search])

  // Scroll to top on search query change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [query])

  // Filter products matching query case-insensitively
  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const lowerQuery = query.toLowerCase().trim()
    return FEATURED_PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.seller.toLowerCase().includes(lowerQuery)
    )
  }, [query])

  // Get trending recommendations if no results
  const trendingRecommendations = useMemo(() => {
    return FEATURED_PRODUCTS.slice(0, 4)
  }, [])

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[var(--color-border)] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-1 block">
              SEARCH RESULTS
            </span>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              {query.trim() ? (
                <>
                  Results for "<span className="text-[#D4AF37] font-medium">{query}</span>"
                </>
              ) : (
                'Search Marketplace'
              )}
            </h1>
          </div>
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">
            {searchResults.length} Match{searchResults.length !== 1 && 'es'} Found
          </span>
        </div>

        {/* Search Results Render */}
        {!query.trim() ? (
          <div className="text-center py-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-2xl mx-auto px-4">
            <img src="/brand/illiyun-logo.png" alt="ILLIYUN" draggable={false} className="h-16 w-auto object-contain opacity-20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Start Searching</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">Enter keywords in the navbar search field to discover premium apparel, modern tech, and curated lifestyle items.</p>
            <Link
              to="/products"
              className="mt-6 inline-block px-6 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
            >
              Browse All Products
            </Link>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="space-y-12">
            {/* No Results Info */}
            <div className="text-center py-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-3xl mx-auto px-4">
              <img src="/brand/illiyun-logo.png" alt="ILLIYUN" draggable={false} className="h-16 w-auto object-contain opacity-20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">No matches found for "{query}"</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2">Please double-check spelling, refine your keywords, or try searching for a category like "Electronics" or "Fashion".</p>
              <Link
                to="/products"
                className="mt-6 inline-block px-6 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
              >
                Clear Search & Browse All
              </Link>
            </div>

            {/* Trending Recommendations */}
            <section className="pt-8 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-[#D4AF37]" />
                <h3 className="text-sm font-semibold tracking-wider text-[var(--color-text-primary)] uppercase">
                  Trending Recommendations
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {trendingRecommendations.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Grid list of matches */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {searchResults.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
