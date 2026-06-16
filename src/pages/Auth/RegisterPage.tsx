// src/pages/Auth/RegisterPage.tsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldAlert, Check } from 'lucide-react'
import { Logo } from '../../components/ui/Logo'

export function RegisterPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  // Password strength
  const strength = (() => {
    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  })()

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength]
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#D4AF37'][strength]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms & Privacy Policy.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
    }, 1200)
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-[85vh] flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 shadow-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <Logo size="xl" className="items-center" />
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">
            Create Your Account
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5">
            Join the premium ILLIYUN marketplace experience.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-xs text-red-500 p-3.5 rounded-lg mb-6">
            <ShieldAlert size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
              />
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
              />
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
              />
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div className="mt-2.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: i <= strength ? strengthColor : 'var(--color-border)' }}
                    />
                  ))}
                </div>
                <span className="text-[10px] mt-1 block" style={{ color: strengthColor }}>
                  {strengthLabel}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
              />
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              {confirmPassword.length > 0 && password === confirmPassword && (
                <Check size={14} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" />
              )}
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2.5">
            <input
              id="agree-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-border)] text-[#D4AF37] focus:ring-[#D4AF37] mt-0.5"
            />
            <label htmlFor="agree-terms" className="text-xs text-[var(--color-text-secondary)] cursor-pointer select-none leading-relaxed">
              I agree to the{' '}
              <span className="text-[#D4AF37] font-semibold cursor-pointer hover:underline">Terms of Service</span>{' '}
              and{' '}
              <span className="text-[#D4AF37] font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#111] transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>

        {/* Social */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] space-y-4">
          <span className="text-[9px] font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider text-center block">
            Or Sign Up With
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="h-10 border border-[var(--color-border)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.618 4.47 1.637l2.427-2.427C17.382 1.618 14.947 1 12.24 1 6.71 1 2.24 5.48 2.24 11s4.47 10 10 10c5.77 0 10-4.053 10-10 0-.68-.06-1.334-.18-1.715H12.24z"/></svg>
              Google
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="h-10 border border-[var(--color-border)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.02 2.96 1.1.08 2.23-.58 2.95-1.39z"/></svg>
              Apple
            </button>
          </div>
        </div>

        {/* Redirect Footer */}
        <p className="text-xs text-[var(--color-text-secondary)] text-center mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-[#D4AF37] font-semibold hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  )
}
