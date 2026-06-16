// src/components/ui/Badge.tsx
interface BadgeProps {
  type: 'new' | 'sale' | 'bestseller' | 'trending'
}

const config = {
  new: { label: 'New', bg: 'bg-[#111111] dark:bg-[#F5F5F5]', text: 'text-white dark:text-[#111111]' },
  sale: { label: 'Sale', bg: 'bg-[#D4AF37]', text: 'text-[#111111]' },
  bestseller: { label: 'Best Seller', bg: 'bg-[#111111] dark:bg-[#F5F5F5]', text: 'text-white dark:text-[#111111]' },
  trending: { label: 'Trending', bg: 'bg-[#D4AF37]', text: 'text-[#111111]' },
}

export function Badge({ type }: BadgeProps) {
  const c = config[type]
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}
