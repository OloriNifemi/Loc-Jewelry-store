import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext.jsx'

export default function CartPreviewDropdown() {
  const { preview, closePreview, openCartDrawer, clearCart } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!preview) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 6000)
    return () => clearTimeout(timer)
  }, [preview])

  return (
    <AnimatePresence>
      {visible && preview && (
        <motion.div
          key={preview.key}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-[5vw] w-60 bg-[#161616] border border-gold/20 rounded-xl shadow-xl z-[100] overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{preview.productName}</p>
              <p className="text-[#888] text-[11px] mt-0.5">
                {preview.color} · Qty {preview.quantity}
              </p>
            </div>
            <img
              src={preview.image}
              alt={preview.productName}
              className="w-8 h-8 rounded-full object-cover border border-gold/30 shrink-0"
            />
          </div>

          <div className="p-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setVisible(false)
                openCartDrawer()
              }}
              className="w-full py-2 rounded border border-gold/40 text-gold font-montserrat text-[0.6rem] tracking-[0.12em] uppercase font-semibold hover:bg-gold hover:text-black transition-colors duration-200"
            >
              View Cart
            </button>
            <button
              onClick={() => {
                setVisible(false)
                clearCart()
              }}
              className="w-full py-2 rounded bg-gold text-black font-montserrat text-[0.6rem] tracking-[0.12em] uppercase font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Checkout
            </button>
            <button
              onClick={() => {
                setVisible(false)
                closePreview()
              }}
              className="text-center text-[#888] hover:text-gold text-[0.65rem] font-montserrat tracking-wide mt-0.5 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}