// src/pages/Checkout/CheckoutPage.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, CreditCard, Truck, ShieldCheck, ArrowLeft, ChevronDown, Lock } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', desc: '5–7 business days', price: 0 },
  { id: 'express', label: 'Express Delivery', desc: '2–3 business days', price: 12 },
  { id: 'overnight', label: 'Overnight Delivery', desc: 'Next business day', price: 25 },
]

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'applepay', label: 'Apple Pay' },
]

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Address, 2: Delivery, 3: Payment
  const [isPlacing, setIsPlacing] = useState(false)

  // Address form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('United States')
  const [phone, setPhone] = useState('')
  const [addressError, setAddressError] = useState('')

  // Delivery
  const [deliveryMethod, setDeliveryMethod] = useState('standard')

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [paymentError, setPaymentError] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  const deliveryFee = useMemo(() => {
    const found = DELIVERY_OPTIONS.find(d => d.id === deliveryMethod)
    return found ? found.price : 0
  }, [deliveryMethod])

  const orderTotal = total + deliveryFee

  // Address validation
  const validateAddress = (): boolean => {
    if (!firstName.trim() || !lastName.trim() || !addressLine1.trim() || !city.trim() || !state.trim() || !zip.trim() || !phone.trim()) {
      setAddressError('Please fill in all required fields.')
      return false
    }
    setAddressError('')
    return true
  }

  // Payment validation
  const validatePayment = (): boolean => {
    if (paymentMethod === 'card') {
      if (!cardName.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
        setPaymentError('Please fill in all card details.')
        return false
      }
    }
    setPaymentError('')
    return true
  }

  const handleNextStep = () => {
    if (step === 1 && validateAddress()) setStep(2)
    else if (step === 2) setStep(3)
    else if (step === 3 && validatePayment()) {
      handlePlaceOrder()
    }
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-success')
    }, 1500)
  }

  const inputClass = 'w-full h-11 px-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition'

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[#D4AF37] transition">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[var(--color-border)] pb-6 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Secure Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-lg mx-auto">
          {[
            { num: 1, label: 'Shipping' },
            { num: 2, label: 'Delivery' },
            { num: 3, label: 'Payment' },
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <button
                onClick={() => { if (s.num < step) setStep(s.num) }}
                disabled={s.num > step}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${step >= s.num
                    ? 'bg-[#111] dark:bg-[#F5F5F5] text-white dark:text-[#111] border-2 border-[#D4AF37]'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-disabled)] border-2 border-[var(--color-border)]'
                  }`}>
                  {s.num}
                </div>
                <span className={`text-[10px] font-semibold tracking-wider uppercase transition
                  ${step >= s.num ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-disabled)]'}`}>
                  {s.label}
                </span>
              </button>
              {idx < 2 && (
                <div className={`flex-1 h-px mx-3 mt-[-14px] transition-colors duration-300
                  ${step > s.num ? 'bg-[#D4AF37]' : 'bg-[var(--color-border)]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-2xl p-6 md:p-8">

              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <MapPin size={18} className="text-[#D4AF37]" />
                    <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Shipping Address</h2>
                  </div>

                  {addressError && (
                    <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">{addressError}</div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">First Name *</label>
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Last Name *</label>
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Address Line 1 *</label>
                    <input type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} placeholder="123 Premium Avenue" className={inputClass} />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Address Line 2</label>
                    <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} placeholder="Apartment, suite, etc. (optional)" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">City *</label>
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="New York" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">State / Province *</label>
                      <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="NY" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">ZIP / Postal Code *</label>
                      <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="10001" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Country</label>
                      <div className="relative">
                        <select value={country} onChange={e => setCountry(e.target.value)} className={`${inputClass} appearance-none pr-8`}>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Japan</option>
                          <option>Australia</option>
                          <option>Bangladesh</option>
                          <option>India</option>
                          <option>Saudi Arabia</option>
                          <option>UAE</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Phone Number *</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Method */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Truck size={18} className="text-[#D4AF37]" />
                    <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Delivery Method</h2>
                  </div>

                  <div className="space-y-3">
                    {DELIVERY_OPTIONS.map(opt => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200
                          ${deliveryMethod === opt.id
                            ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]/20'
                            : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'
                          }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <input
                            type="radio"
                            name="delivery"
                            value={opt.id}
                            checked={deliveryMethod === opt.id}
                            onChange={() => setDeliveryMethod(opt.id)}
                            className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          <div>
                            <span className="text-xs font-semibold text-[var(--color-text-primary)] block">{opt.label}</span>
                            <span className="text-[10px] text-[var(--color-text-secondary)]">{opt.desc}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">
                          {opt.price === 0 ? <span className="text-[#D4AF37]">Free</span> : `$${opt.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="bg-[var(--color-bg)] p-4 rounded-xl border border-[var(--color-border)] mt-4">
                    <h4 className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-2">Shipping To</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {firstName} {lastName}<br />
                      {addressLine1}{addressLine2 ? `, ${addressLine2}` : ''}<br />
                      {city}, {state} {zip}<br />
                      {country}
                    </p>
                    <button onClick={() => setStep(1)} className="text-[10px] text-[#D4AF37] font-semibold hover:underline mt-2">
                      Edit Address
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <CreditCard size={18} className="text-[#D4AF37]" />
                    <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Payment Method</h2>
                  </div>

                  {paymentError && (
                    <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">{paymentError}</div>
                  )}

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-3">
                    {PAYMENT_METHODS.map(pm => (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3 border rounded-xl text-center text-[10px] font-semibold uppercase tracking-wider transition-all duration-200
                          ${paymentMethod === pm.id
                            ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[var(--color-text-primary)] ring-1 ring-[#D4AF37]/20'
                            : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)]'
                          }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>

                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Cardholder Name</label>
                        <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="John Doe" className={inputClass} />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Card Number</label>
                        <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" maxLength={19} className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">Expiry Date</label>
                          <input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM / YY" maxLength={7} className={inputClass} />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider block mb-1.5">CVC</label>
                          <input type="text" value={cardCvc} onChange={e => setCardCvc(e.target.value)} placeholder="123" maxLength={4} className={inputClass} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8 border border-dashed border-[var(--color-border)] rounded-xl bg-[var(--color-bg)]">
                      <p className="text-xs text-[var(--color-text-secondary)]">You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="text-center py-8 border border-dashed border-[var(--color-border)] rounded-xl bg-[var(--color-bg)]">
                      <p className="text-xs text-[var(--color-text-secondary)]">Apple Pay will be available for compatible devices.</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[10px] text-[var(--color-text-secondary)]">
                    <Lock size={12} className="text-[#D4AF37] flex-shrink-0" />
                    <span>All transactions are encrypted with bank-level 256-bit SSL security.</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 border border-[var(--color-border)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={handleNextStep}
                  disabled={isPlacing}
                  className="px-8 py-3 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {step === 3
                    ? (isPlacing ? 'Processing...' : 'Place Order')
                    : 'Continue'
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-2xl p-6 sticky top-24">
              <h2 className="text-sm font-bold tracking-wider text-[var(--color-text-primary)] uppercase border-b border-[var(--color-border)] pb-4 mb-5">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">{item.title}</p>
                      <p className="text-[10px] text-[var(--color-text-secondary)]">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-[var(--color-border)] pt-4 space-y-3">
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {deliveryFee === 0 ? <span className="text-[#D4AF37]">Free</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--color-border)]">
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">Total</span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-[var(--color-surface)] flex gap-3 items-start">
              <ShieldCheck size={18} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-[var(--color-text-primary)] uppercase">Buyer Protection</h4>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
                  Full refund if the item is not as described or not delivered within the estimated window.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
