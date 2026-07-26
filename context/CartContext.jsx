import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

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
  const [toast, setToast] = useState(null)
  const [preview, setPreview] = useState(null)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  // Bumped whenever we clear the cart, so any in-flight fetch started
  // before the clear gets ignored if it resolves after.
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

  const fetchCart = useCallback(async () => {
    const myVersion = requestVersion.current
    try {
      const res = await fetch(`/api/cart-get?cartId=${cartId}`)
      const data = await res.json()
      // If a clear happened while this request was in flight, discard the result
      if (myVersion !== requestVersion.current) return
      setCart(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    } finally {
      if (myVersion === requestVersion.current) setLoading(false)
    }
  }, [cartId])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  async function addToCart(product) {
    const qty = product.quantity > 0 ? product.quantity : 1
    const color = product.color || 'Gold'
    const productKey = `${product.name}-${product.category}-${color}`
      .toLowerCase()
      .replace(/\s+/g, '-')

    requestVersion.current++ // invalidate any older in-flight fetchCart

    setCart((prev) => {
      const existing = prev.find((item) => item.productKey === productKey)
      if (existing) {
        return prev.map((item) =>
          item.productKey === productKey
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [
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
      await fetchCart()
    } catch (err) {
      console.error('Failed to add to cart:', err)
      showToast('Failed to add item — try again')
      await fetchCart()
    }
  }

  async function removeFromCart(itemId) {
    const removedItem = cart.find((item) => item._id === itemId)

    setCart((prev) => prev.filter((item) => item._id !== itemId))
    if (removedItem) showToast(`${removedItem.productName} removed from cart`)

    if (itemId.startsWith('temp-')) {
      return
    }

    try {
      await fetch('/api/cart-remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
    } catch (err) {
      console.error('Failed to remove item:', err)
      showToast('Failed to remove item — try again')
      await fetchCart()
    }
  }

  function buildWhatsAppMessage() {
    const lines = [
      `Hi! 👋 I'd like to order the following from L.O.C:`,
      ``,
      ...cart.map(
        (item) =>
          `• ${item.productName} (${item.category}, ${item.color}) x${item.quantity} — ${item.price}`
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

    requestVersion.current++ // invalidate any in-flight fetchCart
    setCart([])
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
      await fetchCart()
    }
  }

  async function clearAllItems() {
    if (cart.length === 0) return

    requestVersion.current++ // invalidate any in-flight fetchCart
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
      await fetchCart()
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
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