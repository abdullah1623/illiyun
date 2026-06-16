// src/pages/Wishlist/WishlistPage.tsx
import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { FEATURED_PRODUCTS } from '../../data/mockData'

export function WishlistPage() {
  const { ids, toggle } = useWishlist()
  const { addItem } = useCart()

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Resolve matching product models from Wishlist IDs set
  const wishlistedProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter(p => ids.has(p.id))
  }, [ids])

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[var(--color-bg)] flex flex-col items-center justify-center px-4 transition-colors duration-300">
        <img
          src="/brand/illiyun-logo.png"
          alt="ILLIYUN"
          draggable={false}
          className="h-20 w-auto object-contain opacity-30 mb-6"
        />
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Your Wishlist is Empty</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-sm text-center leading-relaxed">
          Keep track of items you love. Save your favorites here by clicking the heart button on product cards.
        </p>
        <Link
          to="/products"
          className="mt-8 px-8 py-3.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
        >
          Discover Products
        </Link>
      </div>
    )
  }

  const handleAddToCart = (product: typeof FEATURED_PRODUCTS[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    })
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[var(--color-border)] pb-6 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              My Wishlist
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5">
              Saved items you want to keep tabs on. Add them to your cart directly from here.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5 rounded-lg">
            {wishlistedProducts.length} Item{wishlistedProducts.length !== 1 && 's'} Saved
          </span>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistedProducts.map(product => {
            const discount = product.comparePrice
              ? Math.round((1 - product.price / product.comparePrice) * 100)
              : null

            return (
              <article
                key={product.id}
                className="group relative flex flex-col bg-[var(--color-bg)] rounded-xl overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]">
                  <Link to={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove Button Overlay */}
                  <button
                    onClick={() => toggle(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 text-[var(--color-text-secondary)] hover:text-red-500 hover:scale-105 flex items-center justify-center border border-[var(--color-border)] transition-all duration-200"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-4 gap-1.5">
                  <p className="text-[10px] font-medium tracking-widest uppercase text-[var(--color-text-secondary)]">
                    {product.seller}
                  </p>
                  
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] leading-snug line-clamp-2 hover:text-[#D4AF37] transition-colors">
                    <Link to={`/products/${product.id}`}>
                      {product.title}
                    </Link>
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-semibold text-[var(--color-text-primary)]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-xs text-[var(--color-text-secondary)] line-through">
                        ${product.comparePrice.toFixed(2)}
                      </span>
                    )}
                    {discount && (
                      <span className="text-[10px] font-semibold text-[#D4AF37]">-{discount}%</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 px-3 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] hover:bg-[#D4AF37] hover:text-[#111] rounded-lg text-xs font-semibold uppercase tracking-wide flex items-center justify-center gap-1.5 transition duration-200"
                    >
                      <ShoppingBag size={13} />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </div>
  )
}
