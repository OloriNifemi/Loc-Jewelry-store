import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductModal from './ProductModal.jsx'

export default function ProductCard({ name, category, price, badge, colors, height, singleColor }) {
  const [modalOpen, setModalOpen] = useState(false)

  const thumbnail = colors.Gold || colors.Silver

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  }

  return (
    <>
      <motion.div
        onClick={() => setModalOpen(true)}
        className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-gold/8 transition-all duration-500 lg:w-[350px] cursor-pointer hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,76,0.2)]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={thumbnail}
            alt={name}
            className={`w-full ${height} object-center transition-transform duration-700 group-hover:scale-105`}
            whileHover={{ scale: 1.05 }}
          />
          {badge && (
            <span className="absolute top-4 right-4 bg-gold text-black text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded-sm z-10">
              {badge}
            </span>
          )}
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="font-playfair text-xl font-semibold">{name}</div>
          <div className="text-gold font-semibold tracking-wide">{price}</div>
        </div>
      </motion.div>

      {modalOpen && (
        <ProductModal
          product={{ name, category, price, badge, colors, singleColor }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}