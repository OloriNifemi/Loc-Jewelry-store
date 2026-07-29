import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const CartContext = createContext(null)
const CART_CACHE_KEY = 'loc_cart_cache'
const LEGACY_ID_KEY = 'loc_cart_id'

function readCachedCart() {
  try {
    const raw = localStorage.getItem(CART_CACHE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCachedCart(items) {
  try {
    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(items))
  } catch {
    // best-effort only
  }
}

function parsePrice(priceStr) {
  const num = Number(String(priceStr).replace(/[₦,]/g, ''))
  return isNaN(num) ? 0 : num
}

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(null)
  const [cart, setCart] = useState(readCachedCart)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [preview, setPreview] = useState(null)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  const requestVersion = useRef(0)

  function showToast(message) {
    setToast({ message, key: Date.now() })
  }

  function openCartDrawer() {
    setPreview(null)
    setCartDrawerOpen(true)
  }
  function closeCartDrawer() {
    setCartDrawerOpen(false)
  }

  const fetchCart = useCallback(async (id) => {
    if (!id) return
    const myVersion = requestVersion.current
    try {
      const res = await fetch(`/api/cart-get?cartId=${id}`)
      const data = await res.json()
      if (myVersion !== requestVersion.current) return
      const items = Array.isArray(data) ? data : []
      setCart(items)
      writeCachedCart(items)
    } catch (err) {
      console.error('Failed to fetch cart:', err)
      // leave whatever's already in state (cache) alone on failure
    } finally {
      if (myVersion === requestVersion.current) setLoading(false)
    }
  }, [])

  // Resolve the cookie-backed cartId once on mount, then load the real cart
  useEffect(() => {
    async function initCart() {
      const legacyId = localStorage.getItem(LEGACY_ID_KEY) || ''
      try {
        const res = await fetch(`/api/cart-id${legacyId ? `?legacyId=${legacyId}` : ''}`)
        const data = await res.json()
        setCartId(data.cartId)
        fetchCart(data.cartId)
      } catch (err) {
        console.error('Failed to resolve cart id:', err)
        setLoading(false)
      }
    }
    initCart()
  }, [fetchCart])

  async function addToCart(product) {
    if (!cartId) return
    const qty = product.quantity > 0 ? product.quantity : 1
    const color = product.color || 'Gold'
    const productKey = `${product.name}-${product.category}-${color}`
      .toLowerCase()
      .replace(/\s+/g, '-')

    requestVersion.current++

    setCart((prev) => {
      const existing = prev.find((item) => item.productKey === productKey)
      const next = existing
        ? prev.map((item) =>
            item.productKey === productKey
              ? { ...item, quantity: item.quantity + qty }
              : item
          )
        : [
            ...prev,
            {
              _id: `temp-${productKey}`,
              productKey,
              productName: product.name,
              category: product.category,
              price: product.price,
              image: product.image,
              color,
              quantity: qty,
            },
          ]
      writeCachedCart(next)
      return next
    })

    setPreview({
      key: Date.now(),
      productName: product.name,
      color,
      image: product.image,
      quantity: qty,
    })

    try {
      await fetch('/api/cart-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          productKey,
          productName: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          color,
          quantity: qty,
        }),
      })
      await fetchCart(cartId)
    } catch (err) {
      console.error('Failed to add to cart:', err)
      showToast('Failed to add item — try again')
      await fetchCart(cartId)
    }
  }

  async function removeFromCart(itemId) {
    const removedItem = cart.find((item) => item._id === itemId)

    requestVersion.current++
    setCart((prev) => {
      const next = prev.filter((item) => item._id !== itemId)
      writeCachedCart(next)
      return next
    })
    if (removedItem) showToast(`${removedItem.productName} removed from cart`)

    if (itemId.startsWith('temp-')) return

    try {
      await fetch('/api/cart-remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
    } catch (err) {
      console.error('Failed to remove item:', err)
      showToast('Failed to remove item — try again')
      await fetchCart(cartId)
    }
  }

  async function decrementItem(itemId) {
    const item = cart.find((i) => i._id === itemId)
    if (!item) return

    requestVersion.current++

    setCart((prev) => {
      const next = item.quantity <= 1
        ? prev.filter((i) => i._id !== itemId)
        : prev.map((i) => (i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
      writeCachedCart(next)
      return next
    })

    if (itemId.startsWith('temp-')) return

    try {
      await fetch('/api/cart-decrement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
      await fetchCart(cartId)
    } catch (err) {
      console.error('Failed to decrement item:', err)
      showToast('Failed to update quantity — try again')
      await fetchCart(cartId)
    }
  }

  async function incrementItem(itemId) {
    const item = cart.find((i) => i._id === itemId)
    if (!item) return

    requestVersion.current++

    setCart((prev) => {
      const next = prev.map((i) => (i._id === itemId ? { ...i, quantity: i.quantity + 1 } : i))
      writeCachedCart(next)
      return next
    })

    if (itemId.startsWith('temp-')) return

    try {
      await fetch('/api/cart-increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
      await fetchCart(cartId)
    } catch (err) {
      console.error('Failed to increment item:', err)
      showToast('Failed to update quantity — try again')
      await fetchCart(cartId)
    }
  }

  async function clearAllItems() {
    if (cart.length === 0 || !cartId) return

    requestVersion.current++
    setCart([])
    writeCachedCart([])
    setPreview(null)
    setCartDrawerOpen(false)
    showToast('Cart cleared')

    try {
      await fetch('/api/cart-clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId }),
      })
    } catch (err) {
      console.error('Failed to clear cart:', err)
      await fetchCart(cartId)
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartId,
        cart,
        loading,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        clearAllItems,
        toast,
        preview,
        closePreview: () => setPreview(null),
        cartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}