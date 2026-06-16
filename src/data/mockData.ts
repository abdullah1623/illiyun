// src/data/mockData.ts
export interface Product {
  id: string; title: string; price: number; comparePrice?: number
  rating: number; reviewCount: number; image: string
  badge?: 'new' | 'sale' | 'bestseller' | 'trending'
  category: string; seller: string; description?: string
}

export interface Category {
  id: string; name: string; slug: string; icon: string; count: number; image: string
}

export interface Review {
  id: string; name: string; avatar: string; rating: number
  text: string; location: string; date: string
}

export interface Seller {
  id: string; name: string; logo: string; rating: number; products: number; verified: boolean
}

export const SELLERS: Seller[] = [
  { id: 's1', name: 'LuxeTime', logo: '⌚', rating: 4.9, products: 342, verified: true },
  { id: 's2', name: 'SoundCraft', logo: '🎧', rating: 4.8, products: 218, verified: true },
  { id: 's3', name: 'GlowLab', logo: '✨', rating: 4.7, products: 156, verified: true },
  { id: 's4', name: 'ActiveGear', logo: '🏃', rating: 4.6, products: 489, verified: true },
  { id: 's5', name: 'RetroShot', logo: '📷', rating: 4.5, products: 97, verified: true },
  { id: 's6', name: 'StepUp', logo: '👟', rating: 4.8, products: 263, verified: true },
  { id: 's7', name: 'ViewPoint', logo: '🕶️', rating: 4.7, products: 184, verified: true },
  { id: 's8', name: 'HomeNest', logo: '🏠', rating: 4.6, products: 512, verified: true },
  { id: 's9', name: 'PageTurner', logo: '📚', rating: 4.9, products: 1240, verified: true },
  { id: 's10', name: 'Crescent Co.', logo: '🌙', rating: 4.8, products: 178, verified: true },
]

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', icon: '💻', count: 1240, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80' },
  { id: '2', name: 'Fashion', slug: 'fashion', icon: '👗', count: 3820, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80' },
  { id: '3', name: 'Beauty', slug: 'beauty', icon: '✨', count: 890, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
  { id: '4', name: 'Home & Living', slug: 'home-living', icon: '🏠', count: 2150, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { id: '5', name: 'Books', slug: 'books', icon: '📚', count: 4600, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: '6', name: 'Sports', slug: 'sports', icon: '⚽', count: 780, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80' },
  { id: '7', name: 'Automotive', slug: 'automotive', icon: '🚗', count: 430, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80' },
  { id: '8', name: 'Islamic Collection', slug: 'islamic', icon: '🌙', count: 320, image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&q=80' },
]

// High-quality Unsplash product images
const IMG = {
  watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  perfume: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
  shoe1: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80',
  camera: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
  sneaker: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  glasses: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80',
  shoe2: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80',
  headphones: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80',
  bag: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
  keyboard: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
  candle: 'https://images.unsplash.com/photo-1602607633590-58d32878e3f5?w=500&q=80',
  skincare: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
  bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
  plant: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
  lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&q=80',
  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&q=80',
  wallet: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
  ring: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80',
  book: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
  yoga: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
  tablet: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
  mug: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
  speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
}

export const FEATURED_PRODUCTS: Product[] = [
  // Electronics (8)
  { id: 'p1', title: 'Premium Wireless Headphones', price: 189, rating: 4.9, reviewCount: 891, image: IMG.headphones, badge: 'bestseller', category: 'Electronics', seller: 'SoundCraft', description: 'Studio-grade wireless headphones with active noise cancellation and 40-hour battery life.' },
  { id: 'p2', title: 'Portable Film Camera', price: 89, comparePrice: 120, rating: 4.5, reviewCount: 178, image: IMG.camera, badge: 'sale', category: 'Electronics', seller: 'RetroShot', description: 'Compact analog camera with premium glass lens for stunning vintage photography.' },
  { id: 'p3', title: 'Mechanical Keyboard Pro', price: 159, rating: 4.8, reviewCount: 634, image: IMG.keyboard, badge: 'trending', category: 'Electronics', seller: 'SoundCraft', description: 'Hot-swappable mechanical keyboard with RGB lighting and PBT keycaps.' },
  { id: 'p4', title: 'True Wireless Earbuds', price: 79, comparePrice: 110, rating: 4.6, reviewCount: 1203, image: IMG.earbuds, badge: 'sale', category: 'Electronics', seller: 'SoundCraft', description: 'Compact earbuds with spatial audio and 8-hour battery life per charge.' },
  { id: 'p5', title: 'Studio Monitor Headset', price: 320, rating: 4.9, reviewCount: 456, image: IMG.sneaker, badge: 'bestseller', category: 'Electronics', seller: 'SoundCraft' },
  { id: 'p6', title: 'Portable Bluetooth Speaker', price: 69, comparePrice: 99, rating: 4.4, reviewCount: 567, image: IMG.speaker, badge: 'sale', category: 'Electronics', seller: 'SoundCraft' },
  { id: 'p7', title: 'Digital Drawing Tablet', price: 249, rating: 4.7, reviewCount: 312, image: IMG.tablet, badge: 'new', category: 'Electronics', seller: 'RetroShot' },
  { id: 'p8', title: 'Smart Water Bottle', price: 45, rating: 4.3, reviewCount: 890, image: IMG.bottle, category: 'Electronics', seller: 'ActiveGear' },
  // Fashion (8)
  { id: 'p9', title: 'Minimalist Chronograph Watch', price: 299, comparePrice: 399, rating: 4.8, reviewCount: 246, image: IMG.watch, badge: 'sale', category: 'Fashion', seller: 'LuxeTime' },
  { id: 'p10', title: 'Ergonomic Sneakers Pro', price: 210, rating: 4.8, reviewCount: 734, image: IMG.shoe2, badge: 'bestseller', category: 'Fashion', seller: 'StepUp' },
  { id: 'p11', title: 'Classic Sunglasses', price: 145, comparePrice: 195, rating: 4.7, reviewCount: 289, image: IMG.glasses, badge: 'sale', category: 'Fashion', seller: 'ViewPoint' },
  { id: 'p12', title: 'Leather Weekend Bag', price: 275, rating: 4.6, reviewCount: 198, image: IMG.bag, badge: 'trending', category: 'Fashion', seller: 'LuxeTime' },
  { id: 'p13', title: 'Genuine Leather Wallet', price: 85, comparePrice: 120, rating: 4.5, reviewCount: 423, image: IMG.wallet, badge: 'sale', category: 'Fashion', seller: 'LuxeTime' },
  { id: 'p14', title: 'Trail Running Shoes', price: 165, rating: 4.6, reviewCount: 512, image: IMG.shoe1, badge: 'trending', category: 'Fashion', seller: 'ActiveGear' },
  { id: 'p15', title: 'Premium Bomber Jacket', price: 189, comparePrice: 250, rating: 4.7, reviewCount: 345, image: IMG.jacket, badge: 'sale', category: 'Fashion', seller: 'StepUp' },
  { id: 'p16', title: 'Urban Backpack', price: 95, rating: 4.4, reviewCount: 678, image: IMG.backpack, category: 'Fashion', seller: 'ActiveGear' },
  // Beauty (6)
  { id: 'p17', title: 'Artisan Skincare Set', price: 124, comparePrice: 160, rating: 4.7, reviewCount: 342, image: IMG.perfume, badge: 'new', category: 'Beauty', seller: 'GlowLab' },
  { id: 'p18', title: 'Luxury Fragrance Collection', price: 185, rating: 4.8, reviewCount: 567, image: IMG.skincare, badge: 'bestseller', category: 'Beauty', seller: 'GlowLab' },
  { id: 'p19', title: 'Organic Face Serum', price: 68, comparePrice: 89, rating: 4.6, reviewCount: 234, image: IMG.bottle, badge: 'sale', category: 'Beauty', seller: 'GlowLab' },
  { id: 'p20', title: 'Rose Gold Jewelry Ring', price: 156, rating: 4.9, reviewCount: 189, image: IMG.ring, badge: 'new', category: 'Beauty', seller: 'LuxeTime' },
  { id: 'p21', title: 'Premium Hair Care Kit', price: 92, comparePrice: 130, rating: 4.5, reviewCount: 412, image: IMG.skincare, badge: 'sale', category: 'Beauty', seller: 'GlowLab' },
  { id: 'p22', title: 'Aromatherapy Diffuser Set', price: 78, rating: 4.4, reviewCount: 301, image: IMG.candle, category: 'Beauty', seller: 'HomeNest' },
  // Home & Living (6)
  { id: 'p23', title: 'Handcrafted Soy Candle', price: 34, rating: 4.6, reviewCount: 890, image: IMG.candle, badge: 'trending', category: 'Home & Living', seller: 'HomeNest' },
  { id: 'p24', title: 'Minimalist Desk Lamp', price: 89, comparePrice: 120, rating: 4.7, reviewCount: 234, image: IMG.lamp, badge: 'sale', category: 'Home & Living', seller: 'HomeNest' },
  { id: 'p25', title: 'Indoor Plant Collection', price: 55, rating: 4.5, reviewCount: 567, image: IMG.plant, badge: 'new', category: 'Home & Living', seller: 'HomeNest' },
  { id: 'p26', title: 'Ceramic Coffee Mug Set', price: 42, rating: 4.3, reviewCount: 1023, image: IMG.mug, badge: 'bestseller', category: 'Home & Living', seller: 'HomeNest' },
  { id: 'p27', title: 'Woven Throw Blanket', price: 75, comparePrice: 99, rating: 4.6, reviewCount: 345, image: IMG.candle, badge: 'sale', category: 'Home & Living', seller: 'HomeNest' },
  { id: 'p28', title: 'Modern Wall Clock', price: 65, rating: 4.4, reviewCount: 278, image: IMG.watch, category: 'Home & Living', seller: 'HomeNest' },
  // Books (5)
  { id: 'p29', title: 'The Art of Minimalism', price: 24, rating: 4.8, reviewCount: 1456, image: IMG.book, badge: 'bestseller', category: 'Books', seller: 'PageTurner' },
  { id: 'p30', title: 'Modern Design Anthology', price: 45, comparePrice: 60, rating: 4.7, reviewCount: 678, image: IMG.book, badge: 'sale', category: 'Books', seller: 'PageTurner' },
  { id: 'p31', title: 'Entrepreneurship Blueprint', price: 32, rating: 4.6, reviewCount: 890, image: IMG.book, badge: 'trending', category: 'Books', seller: 'PageTurner' },
  { id: 'p32', title: 'Photography Masterclass', price: 38, rating: 4.5, reviewCount: 345, image: IMG.book, badge: 'new', category: 'Books', seller: 'PageTurner' },
  { id: 'p33', title: 'Culinary Arts Collection', price: 28, rating: 4.4, reviewCount: 567, image: IMG.book, category: 'Books', seller: 'PageTurner' },
  // Sports (5)
  { id: 'p34', title: 'Premium Yoga Mat', price: 65, rating: 4.7, reviewCount: 789, image: IMG.yoga, badge: 'bestseller', category: 'Sports', seller: 'ActiveGear' },
  { id: 'p35', title: 'Fitness Resistance Bands', price: 29, comparePrice: 45, rating: 4.5, reviewCount: 1234, image: IMG.yoga, badge: 'sale', category: 'Sports', seller: 'ActiveGear' },
  { id: 'p36', title: 'Insulated Water Bottle', price: 35, rating: 4.6, reviewCount: 890, image: IMG.bottle, badge: 'trending', category: 'Sports', seller: 'ActiveGear' },
  { id: 'p37', title: 'Compression Running Socks', price: 22, rating: 4.3, reviewCount: 456, image: IMG.shoe1, category: 'Sports', seller: 'ActiveGear' },
  { id: 'p38', title: 'Adjustable Dumbbell Set', price: 185, comparePrice: 240, rating: 4.8, reviewCount: 321, image: IMG.speaker, badge: 'sale', category: 'Sports', seller: 'ActiveGear' },
  // Automotive (4)
  { id: 'p39', title: 'Leather Steering Wheel Cover', price: 45, rating: 4.4, reviewCount: 234, image: IMG.wallet, badge: 'new', category: 'Automotive', seller: 'StepUp' },
  { id: 'p40', title: 'Car Interior LED Kit', price: 35, comparePrice: 50, rating: 4.5, reviewCount: 567, image: IMG.lamp, badge: 'sale', category: 'Automotive', seller: 'SoundCraft' },
  { id: 'p41', title: 'Premium Car Freshener Set', price: 28, rating: 4.3, reviewCount: 890, image: IMG.candle, badge: 'bestseller', category: 'Automotive', seller: 'HomeNest' },
  { id: 'p42', title: 'Dash Camera Pro', price: 129, rating: 4.7, reviewCount: 345, image: IMG.camera, badge: 'trending', category: 'Automotive', seller: 'RetroShot' },
  // Islamic Collection (8)
  { id: 'p43', title: 'Handcrafted Prayer Beads', price: 35, rating: 4.9, reviewCount: 456, image: IMG.ring, badge: 'bestseller', category: 'Islamic Collection', seller: 'Crescent Co.' },
  { id: 'p44', title: 'Premium Prayer Mat', price: 85, comparePrice: 120, rating: 4.8, reviewCount: 678, image: IMG.yoga, badge: 'sale', category: 'Islamic Collection', seller: 'Crescent Co.' },
  { id: 'p45', title: 'Oud Fragrance Collection', price: 145, rating: 4.7, reviewCount: 234, image: IMG.perfume, badge: 'new', category: 'Islamic Collection', seller: 'Crescent Co.' },
  { id: 'p46', title: 'Decorative Calligraphy Art', price: 125, rating: 4.6, reviewCount: 189, image: IMG.book, badge: 'trending', category: 'Islamic Collection', seller: 'Crescent Co.' },
  { id: 'p47', title: 'Islamic Book Collection', price: 55, rating: 4.8, reviewCount: 890, image: IMG.book, badge: 'bestseller', category: 'Islamic Collection', seller: 'PageTurner' },
  { id: 'p48', title: 'Zamzam Water Gift Set', price: 42, rating: 4.9, reviewCount: 345, image: IMG.bottle, badge: 'new', category: 'Islamic Collection', seller: 'Crescent Co.' },
  { id: 'p49', title: 'Modest Fashion Scarf', price: 65, comparePrice: 89, rating: 4.5, reviewCount: 567, image: IMG.bag, badge: 'sale', category: 'Islamic Collection', seller: 'Crescent Co.' },
  { id: 'p50', title: 'Arabian Incense Set', price: 38, rating: 4.6, reviewCount: 412, image: IMG.candle, category: 'Islamic Collection', seller: 'Crescent Co.' },
]

// Derived collections
export const TRENDING_PRODUCTS = FEATURED_PRODUCTS.filter(p => p.badge === 'trending').slice(0, 8)
export const BESTSELLER_PRODUCTS = FEATURED_PRODUCTS.filter(p => p.badge === 'bestseller').slice(0, 8)
export const NEW_ARRIVALS = FEATURED_PRODUCTS.filter(p => p.badge === 'new').slice(0, 8)
export const TOP_RATED = [...FEATURED_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8)
export const SALE_PRODUCTS = FEATURED_PRODUCTS.filter(p => p.badge === 'sale').slice(0, 8)
export const ISLAMIC_PRODUCTS = FEATURED_PRODUCTS.filter(p => p.category === 'Islamic Collection')

export const FLASH_DEALS: (Product & { endsAt: Date; soldPercent: number })[] = [
  { ...FEATURED_PRODUCTS[1], id: 'f1', endsAt: new Date(Date.now() + 3 * 3600000), soldPercent: 72 },
  { ...FEATURED_PRODUCTS[3], id: 'f2', endsAt: new Date(Date.now() + 5 * 3600000), soldPercent: 55 },
  { ...FEATURED_PRODUCTS[10], id: 'f3', endsAt: new Date(Date.now() + 2 * 3600000), soldPercent: 88 },
  { ...FEATURED_PRODUCTS[14], id: 'f4', endsAt: new Date(Date.now() + 7 * 3600000), soldPercent: 40 },
]

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'Sarah A.', avatar: 'SA', rating: 5, text: 'Absolutely love the quality. Every product I\'ve ordered has exceeded my expectations. ILLIYUN is my go-to marketplace now.', location: 'Dubai, UAE', date: '2 weeks ago' },
  { id: 'r2', name: 'Mohammed K.', avatar: 'MK', rating: 5, text: 'The shopping experience is incredibly smooth. Premium products, fast delivery, and exceptional customer service.', location: 'Riyadh, KSA', date: '1 month ago' },
  { id: 'r3', name: 'Fatima Z.', avatar: 'FZ', rating: 5, text: 'The Islamic Collection is extraordinary. Thoughtfully curated items with top-tier craftsmanship. Highly recommend.', location: 'Kuala Lumpur, MY', date: '3 weeks ago' },
  { id: 'r4', name: 'James L.', avatar: 'JL', rating: 5, text: 'I switched from Amazon to ILLIYUN for premium goods. The curation is superb and shipping is surprisingly fast.', location: 'London, UK', date: '1 week ago' },
  { id: 'r5', name: 'Aisha R.', avatar: 'AR', rating: 4, text: 'Great selection of electronics. The headphones I bought are studio quality. Will definitely order again.', location: 'Istanbul, TR', date: '3 days ago' },
  { id: 'r6', name: 'David C.', avatar: 'DC', rating: 5, text: 'The best online marketplace I\'ve used. Everything from packaging to product quality screams premium.', location: 'New York, US', date: '2 weeks ago' },
  { id: 'r7', name: 'Noor H.', avatar: 'NH', rating: 5, text: 'Love the prayer mats from the Islamic Collection. Beautiful craftsmanship and arrived in perfect condition.', location: 'Jakarta, ID', date: '1 month ago' },
  { id: 'r8', name: 'Emma W.', avatar: 'EW', rating: 4, text: 'The skincare set from GlowLab is amazing. My skin has never looked better. Thank you ILLIYUN!', location: 'Sydney, AU', date: '5 days ago' },
  { id: 'r9', name: 'Omar S.', avatar: 'OS', rating: 5, text: 'Excellent customer service. Had an issue with my order and it was resolved within hours. Very impressed.', location: 'Doha, QA', date: '2 weeks ago' },
  { id: 'r10', name: 'Maria G.', avatar: 'MG', rating: 5, text: 'The watch I ordered is absolutely stunning. Looks even better in person. Premium quality at a fair price.', location: 'Barcelona, ES', date: '4 days ago' },
  { id: 'r11', name: 'Ahmed B.', avatar: 'AB', rating: 5, text: 'ILLIYUN has the best collection of oud fragrances I\'ve found online. Authentic and beautifully packaged.', location: 'Jeddah, KSA', date: '1 week ago' },
  { id: 'r12', name: 'Sophie T.', avatar: 'ST', rating: 4, text: 'Love the home and living section. The candles and decor items are gorgeous. My apartment looks amazing now.', location: 'Paris, FR', date: '3 weeks ago' },
  { id: 'r13', name: 'Yusuf M.', avatar: 'YM', rating: 5, text: 'Fast delivery to Malaysia. Products are exactly as described. Very trustworthy marketplace.', location: 'Penang, MY', date: '6 days ago' },
  { id: 'r14', name: 'Rachel K.', avatar: 'RK', rating: 5, text: 'The book collection is fantastic. Found titles I couldn\'t find anywhere else. PageTurner is an amazing seller.', location: 'Toronto, CA', date: '2 weeks ago' },
  { id: 'r15', name: 'Hassan D.', avatar: 'HD', rating: 5, text: 'Premium marketplace with a premium experience. From browsing to unboxing, everything feels luxury.', location: 'Cairo, EG', date: '1 week ago' },
]
