// src/pages/Auth/ForgotPasswordPage.tsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, ShieldAlert, CheckCircle } from 'lucide-react'
import { Logo } from '../../components/ui/Logo'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSent(true)
    }, 1000)
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-[85vh] flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 shadow-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <Logo size="xl" className="items-center" />
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">
            Reset Your Password
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 max-w-xs mx-auto leading-relaxed">
            Enter your registered email address and we'll send you a secure link to reset your password.
          </p>
        </div>

        {sent ? (
          /* Success State */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={24} className="text-[#D4AF37]" />
            </div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Check Your Inbox</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2 leading-relaxed max-w-xs mx-auto">
              We've sent a password reset link to <strong className="text-[var(--color-text-primary)]">{email}</strong>. 
              Please check your email and follow the instructions.
            </p>
            <p className="text-[10px] text-[var(--color-text-disabled)] mt-4">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="text-[#D4AF37] font-semibold hover:underline"
              >
                try again
              </button>.
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200"
            >
              <ArrowLeft size={14} />
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-xs text-red-500 p-3.5 rounded-lg mb-6">
                <ShieldAlert size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#111] transition duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-xs text-[var(--color-text-secondary)] text-center mt-8">
              Remember your password?{' '}
              <Link to="/login" className="text-[#D4AF37] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
