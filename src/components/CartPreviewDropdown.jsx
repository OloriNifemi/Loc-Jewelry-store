import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'
import { useCart } from '../../context/CartContext.jsx'

export default function CartPreviewDropdown() {
  const { preview, closePreview, openCartDrawer, clearCart } = useCart()

  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          key={preview.key}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-[5vw] w-80 bg-[#161616] border border-gold/20 rounded-xl shadow-xl z-[100] overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{preview.productName}</p>
              <p className="text-[#888] text-xs mt-1">
                {preview.color} · Qty {preview.quantity}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <img
                src={preview.image}
                alt={preview.productName}
                className="w-12 h-12 rounded-full object-cover border border-gold/30"
              />
              <button
                onClick={closePreview}
                className="text-[#888] hover:text-gold transition-colors"
                aria-label="Close"
              >
                <FaXmark size={14} />
              </button>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <button
              onClick={() => {
                closePreview()
                openCartDrawer()
              }}
              className="w-full py-2.5 rounded border border-gold/40 text-gold font-montserrat text-[0.65rem] tracking-[0.15em] uppercase font-semibold hover:bg-gold hover:text-black transition-colors duration-200"
            >
              View Cart
            </button>
            <button
              onClick={() => {
                closePreview()
                clearCart()
              }}
              className="w-full py-2.5 rounded bg-gold text-black font-montserrat text-[0.65rem] tracking-[0.15em] uppercase font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Checkout
            </button>
            <button
              onClick={closePreview}
              className="text-center text-[#888] hover:text-gold text-[0.7rem] font-montserrat tracking-wide mt-1 transition-colors"
              
            > Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}