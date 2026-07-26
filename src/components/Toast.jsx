import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext.jsx'

export default function Toast() {
  const { toast } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <AnimatePresence>
      {visible && toast && (
        <motion.div
          key={toast.key}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[60]
          w-fit max-w-[85vw] sm:max-w-sm
          bg-[#1a1a1a] border border-gold/30 text-white
          px-5 py-3 rounded-full shadow-lg
          font-montserrat text-[0.75rem] tracking-wide
          text-center break-words"
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}