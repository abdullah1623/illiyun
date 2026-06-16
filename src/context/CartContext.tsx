import React, { createContext, useContext, useState } from 'react'

interface CartItem { id: string; title: string; price: number; image: string; quantity: number }
interface CartContextType {
  items: CartItem[]
  count: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  count: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  
  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    )
  }

  const clearCart = () => setItems([])

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
