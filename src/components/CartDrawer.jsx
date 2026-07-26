import { AnimatePresence, motion } from 'framer-motion'
import { FaWhatsapp, FaXmark } from 'react-icons/fa6'
import { useCart } from '../../context/CartContext.jsx'

export default function CartDrawer() {
  const { cart, loading, cartTotal, removeFromCart, clearCart, cartDrawerOpen, closeCartDrawer } = useCart()

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#161616] border-l border-gold/10 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="font-playfair text-xl text-white">Your Cart</h2>
              <button onClick={closeCartDrawer} className="text-[#888] hover:text-gold transition-colors">
                <FaXmark size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {loading ? (
                <p className="text-[#888] text-sm">Loading cart…</p>
              ) : cart.length === 0 ? (
                <p className="text-[#888] text-sm">Your cart is empty.</p>
              ) : (
                <div className="flex flex-col gap-5">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md border border-white/10"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item.productName}</p>
                        <p className="text-[#888] text-xs">{item.category} · {item.color}</p>
                        <p className="text-gold text-sm mt-1">
                          {item.price} × {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-[#666] hover:text-red-400 text-xs uppercase tracking-wide transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#888] text-sm">Total</span>
                  <span className="text-gold font-semibold">₦{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={clearCart}
                  className="flex items-center justify-center gap-2 w-full bg-gold text-black rounded font-montserrat text-[0.7rem] tracking-[0.15em] uppercase font-semibold py-3 hover:opacity-90 transition-opacity"
                >
                  <FaWhatsapp size={14} />
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}