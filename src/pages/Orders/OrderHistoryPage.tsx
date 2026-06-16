// src/pages/Orders/OrderHistoryPage.tsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight, Clock, CheckCircle, Truck as TruckIcon, ShoppingBag } from 'lucide-react'

// Mock order data for demo
const MOCK_ORDERS = [
  {
    id: 'ILL-AX7K92FM',
    date: 'Jun 15, 2026',
    status: 'delivered',
    total: 489.00,
    items: [
      { title: 'Minimalist Chronograph Watch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&q=80', qty: 1 },
      { title: 'Premium Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80', qty: 1 },
    ],
  },
  {
    id: 'ILL-BK3M81QP',
    date: 'Jun 10, 2026',
    status: 'shipped',
    total: 210.00,
    items: [
      { title: 'Ergonomic Sneakers Pro', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80', qty: 2 },
    ],
  },
  {
    id: 'ILL-CP5N44RT',
    date: 'May 28, 2026',
    status: 'processing',
    total: 124.00,
    items: [
      { title: 'Artisan Skincare Set', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80', qty: 1 },
    ],
  },
]

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  processing: {
    label: 'Processing',
    color: '#D4AF37',
    icon: <Clock size={12} />,
  },
  shipped: {
    label: 'Shipped',
    color: '#3b82f6',
    icon: <TruckIcon size={12} />,
  },
  delivered: {
    label: 'Delivered',
    color: '#22c55e',
    icon: <CheckCircle size={12} />,
  },
}

export function OrderHistoryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="border-b border-[var(--color-border)] pb-6 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Order History
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5">
            Track your past and active orders from the ILLIYUN marketplace.
          </p>
        </div>

        {MOCK_ORDERS.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
            <img src="/brand/illiyun-logo.png" alt="ILLIYUN" draggable={false} className="h-16 w-auto object-contain opacity-20 mx-auto mb-5" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">No Orders Yet</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xs mx-auto">
              You haven't placed any orders. Start exploring our premium collections.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block px-6 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {MOCK_ORDERS.map(order => {
              const status = STATUS_MAP[order.status]
              return (
                <article
                  key={order.id}
                  className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                >
                  {/* Order Header */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg flex items-center justify-center">
                        <Package size={16} className="text-[var(--color-text-secondary)]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--color-text-primary)] font-mono">{order.id}</span>
                        <span className="text-[10px] text-[var(--color-text-secondary)] block mt-0.5">{order.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Badge */}
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${status.color}15`,
                          color: status.color,
                          border: `1px solid ${status.color}30`,
                        }}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      {/* Item thumbnails */}
                      <div className="flex -space-x-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="w-12 h-12 rounded-lg overflow-hidden border-2 border-[var(--color-surface)] bg-[var(--color-bg)] flex-shrink-0"
                          >
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[var(--color-text-primary)] font-medium truncate">
                          {order.items.map(i => i.title).join(', ')}
                        </p>
                        <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                          {order.items.reduce((s, i) => s + i.qty, 0)} item{order.items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* View Details */}
                      <button className="flex items-center gap-1 text-[10px] font-semibold text-[#D4AF37] hover:underline transition flex-shrink-0">
                        View Details
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-12 pt-8 border-t border-[var(--color-border)]">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[#D4AF37] transition"
          >
            <ShoppingBag size={14} />
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}
