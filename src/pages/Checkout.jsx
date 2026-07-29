import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'

function parsePrice(priceStr) {
  const num = Number(String(priceStr).replace(/[₦,]/g, ''))
  return isNaN(num) ? 0 : num
}

export default function Checkout() {
  const { cart, cartTotal, cartId } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePay(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (cart.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setLoading(true)

    try {
      // Step 1: create the order in Sanity (status: pending_payment)
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          customerName: name,
          phone,
          address,
          items: cart.map((item) => ({
            productName: item.productName,
            category: item.category,
            color: item.color,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total: cartTotal,
        }),
      })
      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Step 2: initialize Paystack transaction
      const payRes = await fetch('/api/paystack-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          email: `${phone.replace(/\D/g, '')}@loc-customer.com`, // Paystack requires an email; synthesize one from phone
          amount: cartTotal,
        }),
      })
      const payData = await payRes.json()

      if (!payRes.ok) {
        throw new Error(payData.error || 'Failed to initialize payment')
      }

      // Step 3: redirect to Paystack's hosted checkout
      window.location.href = payData.authorizationUrl
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-[5vw] text-center min-h-screen">
        <p className="text-[#888] font-montserrat">Your cart is empty.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 px-8 py-3 bg-gold text-black rounded font-montserrat text-[0.7rem] tracking-[0.15em] uppercase font-semibold hover:opacity-90 transition-opacity"
        >
          Browse Collection
        </button>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-[5vw] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-playfair text-3xl text-white mb-10 text-center">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Order summary */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] text-[#888] mb-5">
              Order Summary
            </h2>
            <div className="flex flex-col gap-4 mb-6">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded-md object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{item.productName}</p>
                    <p className="text-[#888] text-xs">{item.color} · x{item.quantity}</p>
                  </div>
                  <p className="text-gold text-sm">
                    ₦{(parsePrice(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-white font-medium">Total</span>
              <span className="text-gold font-semibold text-lg">₦{cartTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery form */}
          <form onSubmit={handlePay} className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] text-[#888] mb-5">
              Delivery Details
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[#888] text-xs mb-1.5 font-montserrat">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-white/15 rounded px-4 py-2.5 text-white text-sm focus:border-gold outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-[#888] text-xs mb-1.5 font-montserrat">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-white/15 rounded px-4 py-2.5 text-white text-sm focus:border-gold outline-none transition-colors"
                  placeholder="080..."
                />
              </div>

              <div>
                <label className="block text-[#888] text-xs mb-1.5 font-montserrat">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0d0d0d] border border-white/15 rounded px-4 py-2.5 text-white text-sm focus:border-gold outline-none transition-colors resize-none"
                  placeholder="Street, area, city, state"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs font-montserrat">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`mt-2 w-full py-3.5 rounded font-montserrat text-[0.7rem] tracking-[0.15em] uppercase font-semibold transition-all duration-300
                  ${loading
                    ? 'bg-white/10 text-[#666] cursor-not-allowed'
                    : 'bg-gold text-black hover:opacity-90'
                  }`}
              >
                {loading ? 'Processing…' : `Pay ₦${cartTotal.toLocaleString()}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}