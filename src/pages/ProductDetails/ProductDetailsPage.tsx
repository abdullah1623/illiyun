// src/pages/ProductDetails/ProductDetailsPage.tsx
import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Shield, RotateCcw, Truck, Info } from 'lucide-react'
import { FEATURED_PRODUCTS } from '../../data/mockData'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { ProductCard } from '../../components/product/ProductCard'

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  
  // Find product by id
  const product = useMemo(() => {
    return FEATURED_PRODUCTS.find(p => p.id === id)
  }, [id])

  const wished = has(product?.id || '')

  // Scroll to top on page load/product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  // Mock secondary images to simulate a luxury product gallery
  const galleryImages = useMemo(() => {
    if (!product) return []
    return [
      product.image,
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
    ]
  }, [product])

  const [activeImage, setActiveImage] = useState(product?.image || '')
  const [selectedTab, setSelectedTab] = useState<'details' | 'shipping' | 'seller'>('details')
  const [quantity, setQuantity] = useState(1)
  const [addedNotify, setAddedNotify] = useState(false)

  // Initialize active image when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image)
    }
  }, [product])

  // Get related products from the same category
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return FEATURED_PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-[60vh] bg-[var(--color-bg)] flex flex-col items-center justify-center px-4">
        <Info size={48} className="text-[#D4AF37] mb-4" />
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Product Not Found</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 mb-6">The item you are looking for might have been removed or does not exist.</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
        >
          Go Back to Shopping
        </Link>
      </div>
    )
  }

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      })
    }
    setAddedNotify(true)
    setTimeout(() => setAddedNotify(false), 2000)
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#D4AF37] transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#D4AF37] transition">Products</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-medium line-clamp-1">{product.title}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-[var(--color-border)]">
          
          {/* Gallery Column (left 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-[10px] font-semibold tracking-wider uppercase rounded">
                  {product.badge}
                </span>
              )}
            </div>
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border transition-all duration-200 bg-[var(--color-surface)]
                    ${activeImage === img
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 scale-[0.98]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-primary)]'
                    }`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Checkout/Product Info Column (right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Seller & Title */}
              <div>
                <span className="text-xs font-semibold tracking-[0.15em] text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-full">
                  Seller: {product.seller}
                </span>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mt-3 leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= Math.round(product.rating) ? '#D4AF37' : 'none'}
                      stroke={s <= Math.round(product.rating) ? '#D4AF37' : '#D4D4D4'}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{product.rating}</span>
                <span className="text-sm text-[var(--color-text-secondary)]">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price Details */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-5 rounded-2xl">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-[var(--color-text-secondary)] line-through">
                      ${product.comparePrice.toFixed(2)}
                    </span>
                  )}
                  {discount && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded">
                      Save {discount}%
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-2">
                  Prices inclusive of all taxes. Free shipping available on qualifying orders.
                </p>
              </div>

              {/* Description Snippet */}
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase mb-2">
                  Overview
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Crafted meticulously for those who appreciate premium quality and refined aesthetics. Features durable materials, modern utility, and a clean minimalist style that fits any contemporary lifestyle.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[var(--color-border)] rounded-lg h-12 bg-[var(--color-surface)]">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 text-lg font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[var(--color-text-primary)]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 text-lg font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 h-12 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 transition duration-300
                      ${addedNotify
                        ? 'bg-[#D4AF37] text-[#111]'
                        : 'bg-[#111] dark:bg-[#F5F5F5] text-white dark:text-[#111] hover:bg-[#D4AF37] hover:text-[#111]'
                      }`}
                  >
                    <ShoppingBag size={16} />
                    {addedNotify ? 'Added to Cart!' : 'Add to Cart'}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggle(product.id)}
                    aria-label={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className={`w-12 h-12 border rounded-lg flex items-center justify-center transition duration-200
                      ${wished
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]'
                      }`}
                  >
                    <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

            </div>

            {/* Product Details Tabs (Specs, Shipping, Brand) */}
            <div className="mt-8 border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-surface)]">
              <div className="flex border-b border-[var(--color-border)]">
                {(['details', 'shipping', 'seller'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 transition
                      ${selectedTab === tab
                        ? 'border-[#D4AF37] text-[var(--color-text-primary)]'
                        : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-5 text-xs text-[var(--color-text-secondary)] leading-relaxed min-h-[100px]">
                {selectedTab === 'details' && (
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Premium materials & sustainable craft methods.</li>
                    <li>Designed in-house with signature monochrome aesthetics.</li>
                    <li>Engineered for daily resilience and luxury handfeel.</li>
                    <li>Includes official authenticity certification code.</li>
                  </ul>
                )}
                {selectedTab === 'shipping' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <Truck size={14} className="text-[#D4AF37]" />
                      <span>Free Standard Shipping worldwide on orders above $150.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RotateCcw size={14} className="text-[#D4AF37]" />
                      <span>Complimentary returns within 30 days of delivery.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Shield size={14} className="text-[#D4AF37]" />
                      <span>Secure payment protocols and certified package warranty.</span>
                    </div>
                  </div>
                )}
                {selectedTab === 'seller' && (
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">About {product.seller}</h4>
                    <p className="mb-2">A verified top-tier supplier on ILLIYUN ecosystem. Consistently rating above 4.8★ with verified logistics and immediate response service desk.</p>
                    <span className="text-[10px] text-[#D4AF37] font-semibold">★ Verified Luxury Seller Badge</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">Related Picks</span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mt-1">
                  You Might Also Luxury
                </h2>
              </div>
              <Link to="/products" className="text-xs font-semibold text-[#D4AF37] hover:underline">
                View all collection →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
