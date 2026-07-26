import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark, FaMinus, FaPlus } from 'react-icons/fa6'
import { useCart } from '../../context/CartContext.jsx'

const COLORS = [
  { name: 'Gold', hex: '#B89C64' },
  { name: 'Silver', hex: '#C0C0C0' },
]

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  const [color, setColor] = useState('Gold')
  const [qty, setQty] = useState(1)

  if (!product) return null
  const isOutOfStock = product.badge === 'out-of-stock'

  function handleAddToCart() {
    addToCart({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      color,
      quantity: qty,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#161616] border border-gold/15 rounded-xl w-full max-w-md overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-72 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-4 right-4 bg-gold text-black text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded-sm">
                {product.badge}
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <FaXmark size={14} />
            </button>
          </div>

          <div className="p-6">
            <div className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-[#888] mb-1.5">
              {product.category}
            </div>
            <div className="font-playfair text-2xl font-semibold mb-1">{product.name}</div>
            <div className="text-gold font-semibold tracking-wide mb-6">{product.price}</div>

            {/* Color selection */}
            <div className="mb-6">
              <p className="font-montserrat text-[0.65rem] tracking-[0.15em] uppercase text-[#888] mb-3">
                Color: <span className="text-white">{color}</span>
              </p>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${
                      color === c.name
                        ? 'ring-2 ring-offset-2 ring-offset-[#161616] ring-gold scale-110'
                        : 'ring-1 ring-white/20 hover:ring-white/40'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity stepper */}
            <div className="mb-6">
              <p className="font-montserrat text-[0.65rem] tracking-[0.15em] uppercase text-[#888] mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded border border-white/15 text-white hover:border-gold hover:text-gold transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={11} />
                </button>
                <span className="w-6 text-center font-montserrat text-sm text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded border border-white/15 text-white hover:border-gold hover:text-gold transition-colors"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={11} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full rounded font-montserrat text-[0.7rem] tracking-[0.18em] uppercase font-semibold py-3.5 transition-all duration-300 ease-out
                ${isOutOfStock
                  ? 'border border-white/10 text-[#555] cursor-not-allowed'
                  : 'bg-gold text-black border border-gold hover:bg-transparent hover:text-gold hover:shadow-[0_0_0_1px_rgba(201,168,76,0.6)] active:scale-[0.98]'
                }`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}