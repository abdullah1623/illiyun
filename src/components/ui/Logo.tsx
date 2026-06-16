// src/components/ui/Logo.tsx
// Official ILLIYUN brand logo component — single source of truth.
// Uses the official logo asset at /brand/illiyun-logo.png
// Supports responsive sizes and both light & dark mode rendering.

interface LogoProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  /** Show only the icon monogram (no wordmark) */
  iconOnly?: boolean
  /** Show the tagline underneath */
  showTagline?: boolean
}

const SIZE_MAP = {
  xs: { height: 36 },
  sm: { height: 52 },
  md: { height: 56 },
  lg: { height: 72 },
  xl: { height: 100 },
  hero: { height: 140 },
}

export function Logo({ className = '', size = 'md', iconOnly = false, showTagline = false }: LogoProps) {
  const { height } = SIZE_MAP[size]

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <img
        src="/brand/illiyun-logo.png"
        alt="ILLIYUN — Premium Marketplace"
        draggable={false}
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          ...(iconOnly ? { clipPath: 'inset(0 0 40% 0)' } : {}),
        }}
        className="block drop-shadow-[0_1px_3px_rgba(212,175,55,0.2)]"
      />
      {showTagline && (
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-secondary)] mt-2 font-semibold">
          Elevate Your Style
        </span>
      )}
    </div>
  )
}
