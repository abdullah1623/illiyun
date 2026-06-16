// src/components/ui/RatingStars.tsx
interface RatingStarsProps {
  rating: number
  count?: number
  size?: 'sm' | 'md'
}

export function RatingStars({ rating, count, size = 'sm' }: RatingStarsProps) {
  const starSize = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating)
          const partial = !filled && star <= Math.ceil(rating) && rating % 1 !== 0
          return (
            <span
              key={star}
              className={`${starSize} ${filled || partial ? 'text-[#D4AF37]' : 'text-[var(--color-border)]'}`}
            >
              {partial ? '½' : '★'}
            </span>
          )
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-[var(--color-text-secondary)]">({count.toLocaleString()})</span>
      )}
    </div>
  )
}
