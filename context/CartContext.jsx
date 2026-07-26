import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)
const WA_BASE = 'https://wa.me/2349116971778?text='

function getOrCreateCartId() {
  let id = localStorage.getItem('loc_cart_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('loc_cart_id', id)
  }
  return id
}

function parsePrice(priceStr) {
  const num = Number(String(priceStr).replace(/[₦,]/g, ''))
  return isNaN(num) ? 0 : num
}

export function CartProvider({ children }) {
  const [cartId] = useState(getOrCreateCartId)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null) // { message, key }

  function showToast(message) {
    setToast({ message, key: Date.now() })
  }

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`/api/cart-get?cartId=${cartId}`)
      const data = await res.json()
      setCart(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    } finally {
      setLoading(false)
    }
  }, [cartId])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  async function addToCart(product) {
    const productKey = `${product.name}-${product.category}`.toLowerCase().replace(/\s+/g, '-')

    // Optimistic update — reflect the change instantly
    setCart((prev) => {
      const existing = prev.find((item) => item.productKey === productKey)
      if (existing) {
        return prev.map((item) =>
          item.productKey === productKey ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prev,
        {
          _id: `temp-${productKey}`, // replaced once real fetch confirms
          productKey,
          productName: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]
    })
    showToast(`1 item added to cart`)

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
        }),
      })
      await fetchCart() // reconcile with real Sanity IDs in the background
    } catch (err) {
      console.error('Failed to add to cart:', err)
      showToast('Failed to add item — try again')
      await fetchCart() // roll back to real state on failure
    }
  }

  async function removeFromCart(itemId) {
    const removedItem = cart.find((item) => item._id === itemId)

    // Optimistic update
    setCart((prev) => prev.filter((item) => item._id !== itemId))
    if (removedItem) showToast(`${removedItem.productName} removed from cart`)

    try {
      await fetch('/api/cart-remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
    } catch (err) {
      console.error('Failed to remove item:', err)
      showToast('Failed to remove item — try again')
      await fetchCart() // roll back on failure
    }
  }

  function buildWhatsAppMessage() {
    const lines = [
      `Hi! 👋 I'd like to order the following from L.O.C:`,
      ``,
      ...cart.map(
        (item) => `• ${item.productName} (${item.category}) x${item.quantity} — ${item.price}`
      ),
      ``,
      `💰 Total: ₦${cart
        .reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)
        .toLocaleString()}`,
      ``,
      `Could you please confirm availability and how I can complete payment? Thank you! 🙏`,
    ]
    return lines.join('\n')
  }

  async function clearCart() {
    if (cart.length === 0) return
    const message = buildWhatsAppMessage()
    window.open(`${WA_BASE}${encodeURIComponent(message)}`, '_blank')

    setCart([])
    showToast('Cart cleared')

    try {
      await fetch('/api/cart-clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId }),
      })
    } catch (err) {
      console.error('Failed to clear cart:', err)
      await fetchCart() // roll back on failure
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, loading, cartCount, cartTotal, addToCart, removeFromCart, clearCart, toast }}
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