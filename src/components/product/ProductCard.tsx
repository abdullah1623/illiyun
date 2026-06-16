// src/components/product/ProductCard.tsx
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import type { Product } from '../../data/mockData'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { has, toggle } = useWishlist()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const wished = has(product.id)
  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null

  const handleAdd = () => {
    addItem({ id: product.id, title: product.title, price: product.price, image: product.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="group relative flex flex-col bg-[var(--color-bg)] rounded-xl overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1">
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

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge type={product.badge} />
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggle(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200
            ${wished
              ? 'bg-[#D4AF37] text-[#111111]'
              : 'bg-white/80 text-[#666] opacity-0 group-hover:opacity-100 hover:bg-[#D4AF37] hover:text-[#111111]'
            }`}
        >
          <Heart size={14} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Add to Cart — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs font-semibold tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-200
              ${added
                ? 'bg-[#D4AF37] text-[#111111]'
                : 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] hover:bg-[#D4AF37] hover:text-[#111111]'
              }`}
          >
            <ShoppingBag size={13} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
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

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
              <Star
                key={s}
                size={10}
                fill={s <= Math.round(product.rating) ? '#D4AF37' : 'none'}
                stroke={s <= Math.round(product.rating) ? '#D4AF37' : '#D4D4D4'}
              />
            ))}
          </div>
          <span className="text-[10px] text-[var(--color-text-secondary)]">({product.reviewCount})</span>
        </div>

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
      </div>
    </article>
  )
}
