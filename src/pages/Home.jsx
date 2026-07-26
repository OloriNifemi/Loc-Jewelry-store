import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FaStar, FaHeart, FaClock, FaCircleCheck } from 'react-icons/fa6'
import ProductCard from '../components/ProductCard.jsx'
import {
  NecklaceIcon, RingIcon, BraceletIcon,
  EarringIcon, ChainIcon, BangleIcon,
} from '../components/JewelryIcons.jsx'
import Necklace7 from '../../assets/layered-necklace.jpeg'
import MaleBracelet1 from '../../assets/Male-bracelet-1.jpeg'
import SingleEarring6 from '../../assets/Single-earrings-6.jpeg'
import JewelryModeledSet from '../../assets/jewelry-modeled-set-4.jpeg'

const WA = 'https://wa.me/2349116971778?text=Hi,%20I%20am%20interested%20in%20your%20jewelry'

const products = [
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦15,000', badge: 'Bestseller', colors: { Gold: null, Silver: null, Black: MaleBracelet1 }, height:'h-[350px]' },
  { name: 'Ọlórí Midi', category: 'Earrings', price: '₦4,500', badge: 'Limited', colors: { Gold: null, Silver: SingleEarring6 }, height:'h-[350px]' },
  { name: 'Ọlórí Luxe Drips', category: 'Necklace', price: '₦16,000', badge: 'Bestseller', colors: { Gold: Necklace7, Silver: null }, singleColor: true, height:'h-[350px]' },
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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 lg:pt-0 pb-16 lg:pb-0">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#080808_0%,#111111_100%)]" />

        {/* Gold glow */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[180px]" />

        {/* Watermark */}
        <h2
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-playfair font-bold text-transparent lg:block"
          style={{
            fontSize: "clamp(10rem,22vw,20rem)",
            WebkitTextStroke: "1px rgba(201,168,76,.06)",
            letterSpacing: ".15em",
          }}
        >
          L.O.C
        </h2>

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 px-[5vw]">

          {/* TEXT */}
          <div className="text-center lg:text-left">

            <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 sm:px-5 py-1.5 sm:py-2 font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gold">
              Est. 2024 · Lagos, Nigeria
            </span>

            <h1
              className="mt-6 sm:mt-8 lg:mt-16 font-playfair font-bold leading-[0.98] sm:leading-[0.95] text-white break-words"
              style={{
                fontSize: "clamp(2rem,8vw,6.3rem)",
              }}
            >
              Jewelry
              <br />
              that speaks
              <br />
              <span className="italic text-gold">before you do.</span>
            </h1>

            <p className="mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 text-sm sm:text-lg leading-7 sm:leading-8 text-white/65">
              Premium non-tarnish jewelry crafted for everyday elegance.
              Designed to elevate every outfit with timeless pieces you'll
              love wearing again and again.
            </p>

            <div className=" w-full mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-4">
              <Link
                to="/products"
                className="rounded-full bg-gold py-4 lg:w-[40%] max-md:w-[50%] text-center font-montserrat text-[11px] sm:text-xs font-semibold uppercase tracking-[.18em] sm:tracking-[.22em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,168,76,.35)]"
              >
                Shop Collection
              </Link>

              
              <a  href={WA}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 py-4 lg:w-[40%] max-md:w-[50%] text-center font-montserrat text-[11px] sm:text-xs uppercase tracking-[.18em] sm:tracking-[.22em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Premium Features */}
            <div className="mt-10 sm:mt-14 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">

              <div className="rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-2 sm:py-3">
                <p className="font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold">
                  Premium Finish
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-2 sm:py-3">
                <p className="font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold">
                  Non Tarnish
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-2 sm:py-3">
                <p className="font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold">
                  Nationwide Delivery
                </p>
              </div>

            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex items-center justify-center">

            {/* Main image */}
            <div className="relative aspect-[4/5] w-full max-w-[340px] sm:max-w-[400px] lg:w-[430px] lg:max-w-none overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-gold/15">

              <img
                src={JewelryModeledSet}
                alt="Luxury Jewelry"
                className="h-full w-full object-cover transition-transform duration-[6000ms] hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            {/* Floating Product */}
            <div className="absolute -left-4 sm:-left-8 lg:-left-10 top-10 sm:top-16 lg:top-20 w-32 sm:w-44 lg:w-52 rounded-xl sm:rounded-2xl border border-gold/15 bg-[#101010]/90 p-3 sm:p-4 backdrop-blur-xl shadow-2xl">

              <img
                src={SingleEarring6}
                alt=""
                className="h-24 sm:h-36 lg:h-44 w-full rounded-lg sm:rounded-xl object-cover"
              />

              <p className="mt-2 sm:mt-4 font-playfair text-sm sm:text-lg text-white">
                Ọlórí Midi
              </p>

              <span className="text-xs sm:text-sm text-gold">
                ₦4,500
              </span>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-3 sm:-right-5 lg:-right-6 bottom-6 sm:bottom-8 lg:bottom-10 rounded-xl sm:rounded-2xl border border-gold/15 bg-[#111]/95 px-5 sm:px-7 lg:px-8 py-3 sm:py-5 lg:py-6 backdrop-blur-xl">

              <p className="font-playfair text-xl sm:text-2xl lg:text-3xl font-semibold text-gold">
                100+
              </p>

              <span className="mt-1 block font-montserrat text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/60">
                Happy Clients
              </span>

            </div>

          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 sm:gap-3">
          <div className="h-10 sm:h-12 w-px bg-gradient-to-b from-gold to-transparent" />
          <span className="font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1200px] mx-auto">
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
