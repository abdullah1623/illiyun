// src/pages/Checkout/OrderSuccessPage.tsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight, Clock } from 'lucide-react'

export function OrderSuccessPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  // Generate a mock order ID
  const orderId = `ILL-${Date.now().toString(36).toUpperCase().slice(-8)}`

  return (
    <div className="bg-[var(--color-bg)] min-h-[80vh] flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="w-full max-w-lg text-center">

        {/* Success Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border-2 border-[#D4AF37]/30 animate-[pulse_2s_ease-in-out_infinite]">
            <CheckCircle size={36} className="text-[#D4AF37]" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] tracking-tight">
          Order Placed Successfully
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-sm mx-auto leading-relaxed">
          Thank you for shopping at ILLIYUN. Your order has been confirmed and is being prepared for shipment.
        </p>

        {/* Order Details Card */}
        <div className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-2xl p-6 text-left space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider">Order ID</span>
              <p className="text-sm font-bold text-[var(--color-text-primary)] font-mono mt-0.5">{orderId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider">Date</span>
              <p className="text-sm font-medium text-[var(--color-text-primary)] mt-0.5">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                <Package size={14} className="text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">Order is being processed</span>
                <p className="text-[10px] text-[var(--color-text-secondary)]">Your items are being prepared by verified sellers.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--color-bg)] rounded-lg flex items-center justify-center border border-[var(--color-border)]">
                <Clock size={14} className="text-[var(--color-text-secondary)]" />
              </div>
              <div>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">Estimated delivery: 5-7 business days</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed">
            A confirmation email with tracking details has been sent to your registered email address. 
            You can track your order status anytime from your account dashboard.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link
            to="/order-history"
            className="px-6 py-3 border border-[var(--color-border)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition w-full sm:w-auto text-center"
          >
            View Order History
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  )
}
