import React, { createContext, useContext, useState } from 'react'

interface WishlistContextType {
  ids: Set<string>
  toggle: (id: string) => void
  has: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextType>({
  ids: new Set(), toggle: () => {}, has: () => false, count: 0
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <WishlistContext.Provider value={{ ids, toggle, has: (id) => ids.has(id), count: ids.size }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
