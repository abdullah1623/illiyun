// src/pages/Home/HomePage.tsx
import { HeroSection } from '../../components/sections/HeroSection'
import { CategoriesSection } from '../../components/sections/CategoriesSection'
import { ProductGridSection } from '../../components/sections/ProductGridSection'
import { FlashDealsSection } from '../../components/sections/FlashDealsSection'
import { IslamicCollectionSection } from '../../components/sections/IslamicCollectionSection'
import { FeaturedSellersSection } from '../../components/sections/FeaturedSellersSection'
import { MarketplaceStatsSection } from '../../components/sections/MarketplaceStatsSection'
import { WhyChooseSection } from '../../components/sections/WhyChooseSection'
import { ReviewsSection } from '../../components/sections/ReviewsSection'
import { NewsletterSection } from '../../components/sections/NewsletterSection'
import {
  FEATURED_PRODUCTS,
  TRENDING_PRODUCTS,
  BESTSELLER_PRODUCTS,
  NEW_ARRIVALS,
  TOP_RATED,
  SALE_PRODUCTS,
} from '../../data/mockData'

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <CategoriesSection />
      <ProductGridSection
        eyebrow="Handpicked for You"
        title="Featured Products"
        subtitle="Discover our editors' top picks across every category."
        products={FEATURED_PRODUCTS.slice(0, 8)}
        seeAllHref="/products"
        bgVariant="default"
      />
      <FlashDealsSection />
      <ProductGridSection
        eyebrow="What's Hot"
        title="Trending Now"
        subtitle="The most-wanted products this week."
        products={TRENDING_PRODUCTS}
        seeAllHref="/products?sort=trending"
        bgVariant="tinted"
      />
      <MarketplaceStatsSection />
      <ProductGridSection
        eyebrow="Just Arrived"
        title="New Arrivals"
        subtitle="Fresh additions to our curated collection."
        products={NEW_ARRIVALS}
        seeAllHref="/products?sort=new"
        bgVariant="default"
      />
      <IslamicCollectionSection />
      <ProductGridSection
        eyebrow="Customer Favorites"
        title="Best Sellers"
        subtitle="Top-rated products loved by thousands of shoppers."
        products={BESTSELLER_PRODUCTS}
        seeAllHref="/products?sort=bestseller"
        bgVariant="tinted"
      />
      <FeaturedSellersSection />
      <ProductGridSection
        eyebrow="Highest Rated"
        title="Top Rated Products"
        subtitle="Products with the best reviews from verified buyers."
        products={TOP_RATED}
        seeAllHref="/products?sort=rating"
        bgVariant="default"
      />
      <ProductGridSection
        eyebrow="Limited Time"
        title="On Sale"
        subtitle="Premium products at reduced prices. Don't miss out."
        products={SALE_PRODUCTS}
        seeAllHref="/products?sort=sale"
        bgVariant="tinted"
      />
      <WhyChooseSection />
      <ReviewsSection />
      <NewsletterSection />
    </main>
  )
}
