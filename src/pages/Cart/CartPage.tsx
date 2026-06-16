// src/pages/Cart/CartPage.tsx
import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { FEATURED_PRODUCTS } from '../../data/mockData'

export function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart()

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Resolve additional product details (like seller name) from mockData
  const cartItemsWithDetails = useMemo(() => {
    return items.map(item => {
      const match = FEATURED_PRODUCTS.find(p => p.id === item.id)
      return {
        ...item,
        seller: match?.seller || 'Verified Seller',
        comparePrice: match?.comparePrice
      }
    })
  }, [items])

  // Shipping calculation: Free standard shipping above $150, else $15.00
  const shippingFee = useMemo(() => {
    if (total === 0) return 0
    return total >= 150 ? 0 : 15
  }, [total])

  // Subtotal and final total
  const finalTotal = useMemo(() => {
    return total + shippingFee
  }, [total, shippingFee])

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[var(--color-bg)] flex flex-col items-center justify-center px-4 transition-colors duration-300">
        <img
          src="/brand/illiyun-logo.png"
          alt="ILLIYUN"
          draggable={false}
          className="h-20 w-auto object-contain opacity-30 mb-6"
        />
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Your Cart is Empty</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-sm text-center leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our curated collections to find your premium items.
        </p>
        <Link
          to="/products"
          className="mt-8 px-8 py-3.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[var(--color-border)] pb-6 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Shopping Bag
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5">
            Review your selections. Free standard shipping applies on orders of $150 or more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Items List Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
              {cartItemsWithDetails.map(item => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="w-24 aspect-[3/4] rounded-lg overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] flex-shrink-0 block">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[var(--color-text-secondary)]">
                      {item.seller}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5 hover:text-[#D4AF37] transition truncate">
                      <Link to={`/products/${item.id}`}>{item.title}</Link>
                    </h3>
                    
                    {/* Prices */}
                    <div className="flex items-baseline gap-2.5 mt-2">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.comparePrice && (
                        <span className="text-xs text-[var(--color-text-secondary)] line-through">
                          ${item.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[var(--color-border)] rounded-lg bg-[var(--color-bg)]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[var(--color-text-primary)]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal & Actions */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center w-full sm:w-auto gap-4 self-stretch sm:self-auto border-t sm:border-t-0 border-[var(--color-border)] pt-4 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-[var(--color-text-disabled)] block sm:hidden">Subtotal</span>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--color-text-secondary)] hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-500/10"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Back action */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[#D4AF37] transition"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-2xl p-6 space-y-6">
              <h2 className="text-sm font-bold tracking-wider text-[var(--color-text-primary)] uppercase border-b border-[var(--color-border)] pb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                  <span>Shipping Estimate</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {shippingFee === 0 ? (
                      <span className="text-[#D4AF37] font-semibold">Free</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {shippingFee > 0 && (
                  <div className="flex items-center gap-2 bg-[#D4AF37]/10 p-3 rounded-lg border border-[#D4AF37]/20 text-[10px] text-[var(--color-text-primary)]">
                    <Truck size={14} className="text-[#D4AF37] flex-shrink-0" />
                    <span>Add <strong className="font-semibold">${(150 - total).toFixed(2)}</strong> more for free standard delivery.</span>
                  </div>
                )}

                <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">Order Total</span>
                  <span className="text-xl font-bold text-[var(--color-text-primary)]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full h-12 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="border border-[var(--color-border)] rounded-2xl p-5 bg-[var(--color-surface)] flex gap-4 items-start">
              <ShieldCheck size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[var(--color-text-primary)] uppercase">Secure checkout transaction</h4>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                  We use bank-level industry standard encryption protocols. Your card details and payment information are fully protected.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
