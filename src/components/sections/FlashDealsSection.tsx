// src/components/sections/FlashDealsSection.tsx
import { useEffect, useState, useCallback } from 'react'
import { Zap, ShoppingBag, Star } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { FLASH_DEALS } from '../../data/mockData'
import { useCart } from '../../context/CartContext'

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }, [target])
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])
  return time
}

function pad(n: number) { return String(n).padStart(2, '0') }

function FlashDealCard({ deal }: { deal: typeof FLASH_DEALS[0] }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const countdown = useCountdown(deal.endsAt)
  const discount = deal.comparePrice
    ? Math.round((1 - deal.price / deal.comparePrice) * 100)
    : null

  const handleAdd = () => {
    addItem({ id: deal.id, title: deal.title, price: deal.price, image: deal.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="group bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
        <img
          src={deal.image}
          alt={deal.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#111] px-2.5 py-1 rounded text-xs font-bold">
            -{discount}%
          </div>
        )}
        {/* Timer overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/70 dark:bg-[#111]/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <Zap size={12} className="text-[#D4AF37] flex-shrink-0" />
            <div className="flex items-center gap-1 font-mono text-xs text-white font-semibold">
              <span>{pad(countdown.h)}</span>
              <span className="text-[#D4AF37]">:</span>
              <span>{pad(countdown.m)}</span>
              <span className="text-[#D4AF37]">:</span>
              <span>{pad(countdown.s)}</span>
            </div>
            <span className="text-[10px] text-white/60 ml-auto">left</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-secondary)] font-medium">{deal.seller}</p>
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-2 leading-snug">{deal.title}</h3>

        {/* Stars */}
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={10} fill={s <= Math.round(deal.rating) ? '#D4AF37' : 'none'} stroke={s <= Math.round(deal.rating) ? '#D4AF37' : '#D4D4D4'} />
          ))}
          <span className="text-[10px] text-[var(--color-text-secondary)] ml-1">({deal.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">${deal.price.toFixed(2)}</span>
          {deal.comparePrice && <span className="text-xs text-[var(--color-text-secondary)] line-through">${deal.comparePrice.toFixed(2)}</span>}
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] text-[var(--color-text-secondary)] mb-1">
            <span>Sold: {deal.soldPercent}%</span>
            <span>{100 - deal.soldPercent}% left</span>
          </div>
          <div className="h-1.5 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
              style={{ width: `${deal.soldPercent}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className={`w-full mt-2 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-lg transition-all duration-200
            ${added ? 'bg-[#D4AF37] text-[#111]' : 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] hover:bg-[#D4AF37] hover:text-[#111]'}`}
        >
          <ShoppingBag size={13} />
          {added ? 'Added to Cart!' : 'Grab This Deal'}
        </button>
      </div>
    </article>
  )
}

export function FlashDealsSection() {
  return (
    <section className="py-14 bg-[var(--color-surface)]" id="flash-deals">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Limited Time"
          title="Flash Deals"
          subtitle="Prices drop fast. Quantities are limited. Grab yours before time runs out."
          action={{ label: 'All deals', href: '/deals' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLASH_DEALS.map(deal => <FlashDealCard key={deal.id} deal={deal} />)}
        </div>
      </div>
    </section>
  )
}
