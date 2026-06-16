// src/components/sections/ReviewsSection.tsx
import { Star, Quote } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { REVIEWS } from '../../data/mockData'

export function ReviewsSection() {
  return (
    <section className="py-14 bg-[var(--color-surface)]" id="reviews">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Customers Say"
          subtitle="Real reviews from real people who love shopping on ILLIYUN."
          centered
        />

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {REVIEWS.slice(0, 6).map(review => (
            <article
              key={review.id}
              className="group relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-7 hover:border-[#D4AF37] hover:shadow-[0_4px_24px_rgba(212,175,55,0.08)] transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-6 text-[var(--color-border)] group-hover:text-[#D4AF37]/20 transition-colors duration-300">
                <Quote size={40} />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} fill={s <= review.rating ? '#D4AF37' : 'none'} stroke={s <= review.rating ? '#D4AF37' : '#D4D4D4'} />
                ))}
              </div>

              <p className="text-sm text-[var(--color-text-primary)] leading-relaxed mb-5">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] dark:bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white dark:text-[#111]">{review.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{review.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{review.location} · {review.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Overall rating bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 p-8 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl">
          <div className="text-center">
            <p className="text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>4.9</p>
            <div className="flex justify-center gap-0.5 mt-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#D4AF37" stroke="#D4AF37" />)}
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Overall Rating</p>
          </div>
          <div className="w-px h-16 bg-[var(--color-border)] hidden sm:block" />
          <div className="flex flex-col gap-1.5 flex-1 max-w-xs">
            {[5,4,3,2,1].map((star, i) => {
              const widths = ['82%', '12%', '4%', '1%', '1%']
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-secondary)] w-3">{star}</span>
                  <Star size={10} fill="#D4AF37" stroke="#D4AF37" />
                  <div className="flex-1 h-1.5 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: widths[i] }} />
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] w-8 text-right">{widths[i]}</span>
                </div>
              )
            })}
          </div>
          <div className="w-px h-16 bg-[var(--color-border)] hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-semibold">12,400+</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Verified Reviews</p>
          </div>
        </div>
      </div>
    </section>
  )
}
