// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { Share2, MessageSquare, Users, Play, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/about' },
    { label: 'Press', href: '/about' },
    { label: 'Blog', href: '/about' },
  ],
  Support: [
    { label: 'Help Center', href: '/about' },
    { label: 'Contact Us', href: '/about' },
    { label: 'Returns', href: '/about' },
    { label: 'Shipping Policy', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/about' },
    { label: 'Terms & Conditions', href: '/about' },
    { label: 'Cookie Policy', href: '/about' },
    { label: 'Accessibility', href: '/about' },
  ],
  Shop: [
    { label: 'All Categories', href: '/products' },
    { label: 'Deals', href: '/products' },
    { label: 'New Arrivals', href: '/products' },
    { label: 'Sell on ILLIYUN', href: '/about' },
  ],
}

const SOCIALS = [
  { Icon: Share2, label: 'Instagram', href: '#' },
  { Icon: MessageSquare, label: 'Twitter / X', href: '#' },
  { Icon: Users, label: 'LinkedIn', href: '#' },
  { Icon: Play, label: 'YouTube', href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Brand Identity Block — prominent brand section */}
        <div className="mb-14 pb-10 border-b border-[var(--color-border)]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-md">
              <Logo size="md" showTagline />
              <p className="mt-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                A premium multi-category marketplace curating the finest products from trusted sellers worldwide. Discover luxury, quality, and craftsmanship — all in one place.
              </p>
              <div className="flex gap-3 mt-6">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#111] transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Trust metrics */}
            <div className="flex gap-10 lg:gap-14">
              {[
                { value: '50K+', label: 'Products Listed' },
                { value: '1,200+', label: 'Verified Sellers' },
                { value: '120+', label: 'Countries Served' },
              ].map(stat => (
                <div key={stat.label} className="text-center lg:text-right">
                  <p className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">{stat.value}</p>
                  <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-primary)] mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[#D4AF37] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter bar */}
        <div className="border-t border-[var(--color-border)] pt-10 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-2xl">
            <div className="flex-1">
              <p className="text-sm font-bold text-[var(--color-text-primary)]">Stay updated</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">New arrivals, exclusive deals, and curated picks.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-56 px-4 py-2.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]"
              />
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-sm font-semibold rounded-xl hover:bg-[#D4AF37] hover:text-[#111] transition-all duration-200">
                <Mail size={14} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/brand/illiyun-logo.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-auto object-contain opacity-40"
            />
            <p className="text-xs text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()} ILLIYUN. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {['Visa', 'Mastercard', 'Apple Pay', 'PayPal'].map(method => (
              <span
                key={method}
                className="px-2.5 py-1 text-[10px] font-medium border border-[var(--color-border)] rounded text-[var(--color-text-secondary)]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
