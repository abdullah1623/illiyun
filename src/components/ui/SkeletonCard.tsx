// src/components/ui/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[var(--color-surface)] animate-pulse">
      <div className="aspect-[3/4] bg-[var(--color-surface-2)]" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-[var(--color-surface-2)] rounded w-1/3" />
        <div className="h-4 bg-[var(--color-surface-2)] rounded w-3/4" />
        <div className="h-3 bg-[var(--color-surface-2)] rounded w-1/2" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 bg-[var(--color-surface-2)] rounded w-1/4" />
          <div className="h-5 bg-[var(--color-surface-2)] rounded w-1/5" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonCategoryCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[var(--color-surface)] animate-pulse">
      <div className="aspect-square bg-[var(--color-surface-2)]" />
      <div className="p-3 space-y-1.5">
        <div className="h-4 bg-[var(--color-surface-2)] rounded w-2/3 mx-auto" />
        <div className="h-3 bg-[var(--color-surface-2)] rounded w-1/2 mx-auto" />
      </div>
    </div>
  )
}
