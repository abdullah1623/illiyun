// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/Home/HomePage'
import { ProductListingPage } from './pages/ProductListing/ProductListingPage'
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage'
import { CategoryPage } from './pages/Categories/CategoryPage'
import { SearchResultsPage } from './pages/SearchResults/SearchResultsPage'
import { CartPage } from './pages/Cart/CartPage'
import { WishlistPage } from './pages/Wishlist/WishlistPage'
import { LoginPage } from './pages/Auth/LoginPage'
import { RegisterPage } from './pages/Auth/RegisterPage'
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { OrderSuccessPage } from './pages/Checkout/OrderSuccessPage'
import { OrderHistoryPage } from './pages/Orders/OrderHistoryPage'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  {/* Core */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductListingPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/p/:id" element={<ProductDetailsPage />} />
                  <Route path="/c/:slug" element={<CategoryPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />

                  {/* Shopping */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                  <Route path="/order-history" element={<OrderHistoryPage />} />

                  {/* Auth */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Navbar routes — point to product listing */}
                  <Route path="/deals" element={<ProductListingPage />} />
                  <Route path="/new" element={<ProductListingPage />} />
                  <Route path="/about" element={<ProductListingPage />} />
                  <Route path="/categories" element={<ProductListingPage />} />

                  {/* 404 fallback */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
