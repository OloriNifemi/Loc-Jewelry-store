import { FaWhatsapp, FaCartPlus } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext.jsx'

const WA_BASE = 'https://wa.me/2349116971778?text='

export default function ProductCard({ name, category, price, badge, image, height }) {
  const { addToCart } = useCart()
  const isOutOfStock = badge === 'out-of-stock'

  const message = [
    `Hi! 👋 I'm interested in ordering from L.O.C.`,
    ``,
    `📦 *Product Details:*`,
    `• Name: ${name}`,
    `• Category: ${category}`,
    `• Price: ${price}`,
    ``,
    `Could you please confirm availability and how I can complete my order? Thank you! 🙏`,
  ].join('\n')

  const waLink = `${WA_BASE}${encodeURIComponent(message)}`

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-gold/8 transition-all duration-500 lg:w-[350px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,76,0.2)]"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={image}
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

      <div className="p-6">
        <div className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-[#888] mb-1.5">
          {category}
        </div>
        <div className="font-playfair text-xl font-semibold mb-1">{name}</div>
        <div className="text-gold font-semibold tracking-wide mb-5">{price}</div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => addToCart({ name, category, price, image })}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-2 w-full rounded font-montserrat text-[0.65rem] tracking-[0.18em] uppercase font-semibold py-3 transition-all duration-300 ease-out
              ${isOutOfStock
                ? 'border border-white/10 text-[#555] cursor-not-allowed'
                : 'bg-gold text-black border border-gold hover:bg-transparent hover:text-gold hover:shadow-[0_0_0_1px_rgba(201,168,76,0.6)] active:scale-[0.98]'
              }`}
          >
            <FaCartPlus size={14} />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          
          <a  href={waLink}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center gap-2 w-full rounded font-montserrat text-[0.65rem] tracking-[0.18em] uppercase font-semibold py-3 transition-all duration-300 ease-out
              ${isOutOfStock
                ? 'border border-white/10 text-[#555] cursor-not-allowed'
                : 'bg-gold text-black border border-gold hover:bg-transparent hover:text-gold hover:shadow-[0_0_0_1px_rgba(201,168,76,0.6)] active:scale-[0.98]'
              }`}
          >
            <FaWhatsapp size={14} />
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}