// src/components/layout/Navbar.tsx
import { useState, useEffect, useRef } from 'react'
import { Search, Heart, ShoppingBag, User, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { useTheme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const NAV_LINKS = [
  { label: 'Categories', href: '/categories', hasDropdown: true },
  { label: 'Deals', href: '/deals' },
  { label: 'New Arrivals', href: '/new' },
  { label: 'About', href: '/about' },
]

const CATEGORY_ITEMS = [
  { label: 'Electronics', icon: '💻' },
  { label: 'Fashion', icon: '👗' },
  { label: 'Beauty', icon: '✨' },
  { label: 'Home & Living', icon: '🏠' },
  { label: 'Books', icon: '📚' },
  { label: 'Sports', icon: '⚽' },
  { label: 'Automotive', icon: '🚗' },
  { label: 'Islamic Collection', icon: '🌙' },
]

export function Navbar() {
  const { isDark, toggle } = useTheme()
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const catRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`)
      setSearchOpen(false)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-[var(--color-bg)]/95 backdrop-blur-xl shadow-[0_1px_0_var(--color-border)]'
            : 'bg-[var(--color-bg)]'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main bar — taller for brand presence */}
          <div className="flex items-center h-[72px] gap-5">
            {/* Logo — larger for brand visibility */}
            <Link to="/" className="flex-shrink-0" aria-label="ILLIYUN Home">
              <Logo size="sm" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7 ml-4" aria-label="Main navigation">
              {NAV_LINKS.map(link => (
                link.hasDropdown ? (
                  <div key={link.label} ref={catRef} className="relative">
                    <button
                      onClick={() => setCatOpen(o => !o)}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 py-5"
                      aria-expanded={catOpen}
                    >
                      {link.label}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {catOpen && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 animate-in fade-in slide-in-from-top-2">
                        {CATEGORY_ITEMS.map(cat => (
                          <Link
                            key={cat.label}
                            to={`/c/${cat.label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all duration-150"
                            onClick={() => setCatOpen(false)}
                          >
                            <span>{cat.icon}</span>
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Search bar — desktop — better sizing and contrast */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-auto">
              <div className="relative w-full group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within:text-[#D4AF37] transition-colors"
                />
                <input
                  type="search"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full pl-11 pr-4 py-3 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all duration-200"
                />
              </div>
            </form>

            {/* Actions — better spacing */}
            <div className="flex items-center gap-0.5 ml-auto lg:ml-0">
              {/* Mobile search */}
              <button
                onClick={() => setSearchOpen(o => !o)}
                className="md:hidden p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Dark mode */}
              <button
                onClick={toggle}
                className="p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={19} /> : <Moon size={19} />}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label="Wishlist"
              >
                <Heart size={19} />
                {wishCount > 0 && (
                  <span className="absolute top-1 right-1 w-[18px] h-[18px] bg-[#D4AF37] text-[#111] text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label="Cart"
              >
                <ShoppingBag size={19} />
                {count > 0 && (
                  <span className="absolute top-1 right-1 w-[18px] h-[18px] bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-[9px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                to="/login"
                className="p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label="Profile"
              >
                <User size={19} />
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="lg:hidden p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full pl-11 pr-4 py-3 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]"
                />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>
      <aside
        className={`fixed top-0 right-0 bottom-0 z-40 lg:hidden w-72 bg-[var(--color-bg)] border-l border-[var(--color-border)] transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
          <Logo size="xs" />
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-[var(--color-surface)]"><X size={18} /></button>
        </div>
        <nav className="p-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-3 border-[var(--color-border)]" />
          {CATEGORY_ITEMS.map(cat => (
            <Link
              key={cat.label}
              to={`/c/${cat.label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border)] flex gap-2">
          <Link to="/login" className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-all" onClick={() => setMobileOpen(false)}>Sign In</Link>
          <Link to="/register" className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] hover:bg-[#D4AF37] hover:text-[#111] transition-all" onClick={() => setMobileOpen(false)}>Register</Link>
        </div>
      </aside>

      {/* Spacer — matches new navbar height */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  )
}
