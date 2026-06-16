// src/components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: { label: string; href: string }
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, subtitle, action, centered }: SectionHeaderProps) {
  return (
    <div className={`flex items-end ${centered ? 'flex-col text-center' : 'justify-between'} gap-4 mb-10`}>
      <div>
        {eyebrow && (
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-2 block">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] max-w-lg">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <a
          href={action.href}
          className="flex-shrink-0 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-200"
        >
          {action.label} →
        </a>
      )}
    </div>
  )
}
