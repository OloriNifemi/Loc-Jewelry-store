import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FaStar, FaHeart, FaClock, FaCircleCheck } from 'react-icons/fa6'
import ProductCard from '../components/ProductCard.jsx'
import {
  NecklaceIcon, RingIcon, BraceletIcon,
  EarringIcon, ChainIcon, BangleIcon,
} from '../components/JewelryIcons.jsx'
import SingleEarring1 from '../../assets/Single-earrings-1.jpeg'
import SingleEarring2 from '../../assets/Single-earrings-2.jpeg'
import SingleEarring3 from '../../assets/Single-earrings-3.jpeg'
import SingleEarring4 from '../../assets/Single-earrings-4.jpeg'
import SingleEarring5 from '../../assets/Single-earrings-5.jpeg'
import SingleEarring6 from '../../assets/Single-earrings-6.jpeg'
import JewelryModeledSet from '../../assets/jewelry-modeled-set-4.jpeg'

const WA = 'https://wa.me/2349116971778?text=Hi,%20I%20am%20interested%20in%20your%20jewelry'

const products = [
  { name: 'Ọlórí Luxe Drips', category: 'Earrings', price: '₦6,500', badge: 'Bestseller', image: SingleEarring1, height:'h-[350px]' },
  { name: 'Ọlórí Minis', category: 'Earrings', price: '₦4,500', badge: null, image: SingleEarring2, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Earrings', price: '₦75,000', badge: 'New', image: SingleEarring3, height:'h-[350px]' },
  { name: 'Royale Drop Earrings', category: 'Earrings', price: '₦65,000', badge: null, image: SingleEarring4, height:'h-[350px]' },
  { name: 'Lagos Gold Chain', category: 'Earrings', price: '₦110,000', badge: null, image: SingleEarring5, height:'h-[350px]' },
  { name: 'Heritage Bangle', category: 'Earrings', price: '₦85,000', badge: 'Limited', image: SingleEarring6, height:'h-[350px]' },
]

const pillars = [
  { Icon: FaStar,        title: 'Premium Quality',    text: 'Each piece undergoes rigorous quality checks' },
  { Icon: FaHeart,       title: 'Made with Love',     text: 'Every piece reflects our passion for craft' },
  { Icon: FaClock,       title: 'Fast Delivery',      text: 'Across Lagos and all Nigerian states' },
  { Icon: FaCircleCheck, title: 'Authenticity',       text: '100% genuine materials, always verified' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen max-md:pb-20 flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(201,168,76,0.07)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(201,168,76,0.04)_0%,transparent_60%),linear-gradient(160deg,#0a0a0a_40%,#111008_100%)]" />

        {/* Animated lines */}
        {[
          'h-[60%] left-[15%] top-[20%] animate-lineFloat1',
          'h-[40%] left-[85%] top-[30%] animate-lineFloat2',
          'h-[50%] left-[50%] top-[10%] animate-lineFloat3',
        ].map((cls, i) => (
          <div key={i} className={`absolute w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent ${cls}`} />
        ))}

        {/* Diamonds */}
        {[
          'top-[20%] left-[15%] animate-diamondPulse1',
          'top-[80%] left-[85%] animate-diamondPulse2',
          'top-[10%] left-[50%] animate-diamondPulse3',
        ].map((cls, i) => (
          <div key={i} className={`absolute w-1.5 h-1.5 bg-gold rotate-45 ${cls}`} />
        ))}

        {/* Watermark */}
        <div className="absolute font-playfair font-bold pointer-events-none select-none text-transparent"
          style={{ fontSize: 'clamp(8rem,20vw,18rem)', WebkitTextStroke: '1px rgba(201,168,76,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap' }}>
          L.O.C
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-[5vw] animate-heroFadeIn">
          <div className="inline-block font-montserrat text-[0.65rem] tracking-[0.3em] uppercase text-gold border border-gold/40 px-6 py-2 mb-8 animate-heroFadeIn2">
            ✦ Lagos, Nigeria · Est. 2024 ✦
          </div>

          <h1 className="font-playfair font-bold leading-[1.1] mb-6 animate-heroFadeIn4"
            style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)' }}>
            Elegance <em className="italic text-gold">Redefined</em><br />for the Modern Nigerian
          </h1>

          <p className="font-cormorant italic text-[#ccc] max-w-xl mx-auto mb-10 leading-[1.7] animate-heroFadeIn6"
            style={{ fontSize: 'clamp(1rem,2vw,1.35rem)' }}>
            Luxury jewelry crafted to inspire confidence, style, and sophistication — every piece a statement of who you are.
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-heroFadeIn8">
            <Link to="/products"
              className="bg-gold text-black px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-bold rounded-sm transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.35)] no-underline">
              Shop Collection
            </Link>
            <a href={WA} target="_blank" rel="noreferrer"
              className="border border-white/30 text-white px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 no-underline">
              Inquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex  -translate-x-1/2 justify-center  flex-col items-center gap-2 font-montserrat text-[0.55rem] tracking-[0.25em] uppercase text-[#888] animate-heroFadeIn12">
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scrollPulse" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── FEATURED COLLECTION ── */}
      <section className="bg-deep py-28 px-[5vw]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-4 block">✦ Curated for You ✦</span>
          <h2 className="font-playfair font-bold text-[clamp(2rem,4vw,3.5rem)] leading-snug mb-6">
            Signature Nigerian <em className="italic text-gold">Collection</em>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mx-auto mb-6" />
          <p className="text-[#888] text-sm leading-relaxed">Each piece is a celebration of Nigerian culture, heritage, and the modern woman and man who wears it with pride.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ld:gap-12 max-w-[1200px] mx-auto">
          {products.map((p) => <ProductCard key={p.name} {...p} />)}
        </div>
      </section>

      {/* ── PROMISE ── */}
      <section className="py-28 px-[5vw]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

          {/* Visual */}
          <div className="relative">
            <div className="w-full aspect-[4/5] bg-[url('/assets/jewelry-modeled-set-4.jpeg')] bg-cover lg:bg-fit bg-center rounded-xl border border-gold/15 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.1),transparent_60%)]" />
              <div className="absolute inset-6 border border-gold/15 rounded-lg">
                {['tl','tr','bl','br'].map((pos) => (
                  <div key={pos} className={`absolute w-5 h-5 border-gold/60 border-solid
                    ${pos==='tl' ? 'top-2 left-2 border-t border-l' : ''}
                    ${pos==='tr' ? 'top-2 right-2 border-t border-r' : ''}
                    ${pos==='bl' ? 'bottom-2 left-2 border-b border-l' : ''}
                    ${pos==='br' ? 'bottom-2 right-2 border-b border-r' : ''}`} />
                ))}
              </div>
              {/* <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="relative z-10">
                <circle cx="70" cy="70" r="55" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4"/>
                <circle cx="70" cy="70" r="44" stroke="#c9a84c" strokeWidth="2" opacity="0.6"/>
                <circle cx="70" cy="70" r="30" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                <path d="M70 40 L75 58 L95 58 L80 70 L86 88 L70 77 L54 88 L60 70 L45 58 L65 58 Z" fill="#c9a84c" opacity="0.9"/>
              </svg> */}
            </div>
            {/* Stat badge */}
            <div className="absolute -bottom-6 lg:-right-6 -right-4 bg-gold text-black p-6 rounded-xl text-center min-w-[120px]">
              <span className="font-playfair text-3xl font-bold block leading-none">500+</span>
              <span className="font-montserrat text-[0.55rem] tracking-[0.15em] uppercase font-bold">Happy Clients</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-4 block">✦ Our Promise ✦</span>
            <h2 className="font-playfair font-bold leading-snug mb-6" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
              Crafted for <em className="italic text-gold">Excellence</em><br />in Nigeria
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
            <p className="font-cormorant italic text-[#ccc] text-xl leading-relaxed mb-8">
              "At L.O.C, every piece is designed with precision and passion, reflecting Nigerian elegance and global luxury standards."
            </p>

            <div className="grid grid-cols-2 gap-5 mb-10">
              {pillars.map(({ Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gold/10 border border-gold/20 rounded flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <span className="font-montserrat text-[0.8rem] font-semibold text-white block mb-0.5">{title}</span>
                    <span className="font-montserrat text-[0.78rem] text-[#ccc] leading-snug">{text}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about"
              className="inline-block bg-gold text-black px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-bold rounded-sm transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.35)] no-underline">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
