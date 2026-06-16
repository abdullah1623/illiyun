// src/components/ui/LoadingScreen.tsx
// Premium branded loading experiences using the official ILLIYUN logo.

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--color-bg)] flex flex-col items-center justify-center transition-colors duration-300">
      {/* Logo with elegant fade animation */}
      <div className="animate-[logo-breathe_2s_ease-in-out_infinite]">
        <img
          src="/brand/illiyun-logo.png"
          alt="ILLIYUN"
          draggable={false}
          className="h-28 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
        />
      </div>

      {/* Gold loading bar */}
      <div className="mt-10 w-40 h-[2px] bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E8C84A] to-[#D4AF37] rounded-full animate-[loading-bar_1.8s_ease-in-out_infinite]"
          style={{ width: '45%' }}
        />
      </div>

      <p className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-disabled)] font-semibold">
        Premium Marketplace
      </p>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <div className="animate-[logo-breathe_2s_ease-in-out_infinite]">
        <img
          src="/brand/illiyun-logo.png"
          alt="Loading..."
          draggable={false}
          className="h-20 w-auto object-contain opacity-70"
        />
      </div>
      <div className="mt-8 w-28 h-[2px] bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E8C84A] to-[#D4AF37] rounded-full animate-[loading-bar_1.8s_ease-in-out_infinite]"
          style={{ width: '45%' }}
        />
      </div>
    </div>
  )
}
