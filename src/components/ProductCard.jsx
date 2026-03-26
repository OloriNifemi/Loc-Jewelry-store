import { FaWhatsapp } from 'react-icons/fa'

const WA_BASE = 'https://wa.me/2349116971778?text=Hi,%20I%20am%20interested%20in%20the%20'

export default function ProductCard({ name, category, price, badge, image, height }) {
  const waLink = `${WA_BASE}${encodeURIComponent(name)}`

  return (
    <div className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-gold/8
                    transition-all duration-500 hover:-translate-y-2
                    hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,76,0.2)]">

      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full ${height} object-center transition-transform duration-700 group-hover:scale-105`}
        />
        {badge && (
          <span className="absolute top-4 right-4 bg-gold text-black text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded-sm z-10">
            {badge}
          </span>
        )}
      </div>

      {/* Info — unchanged */}
      <div className="p-6">
        <div className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-[#888] mb-1.5">
          {category}
        </div>
        <div className="font-playfair text-xl font-semibold mb-1">{name}</div>
        <div className="text-gold font-semibold tracking-wide mb-5">{price}</div>
        
        <a  href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full
                     border border-gold/40 text-gold rounded
                     font-montserrat text-[0.65rem] tracking-[0.18em] uppercase font-semibold
                     py-3 transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold no-underline"
        >
          <FaWhatsapp size={14} />
          Inquire on WhatsApp
        </a>
      </div>
    </div>
  )
}
