import ProductCard from '../components/ProductCard.jsx'
import { useState, useEffect, useRef, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import ProductBanner from '../../assets/jewelry-modeled-set-4.jpeg'
import SingleEarring1 from '../../assets/Single-earrings-1.jpeg'
import SingleEarring2 from '../../assets/Single-earrings-2.jpeg'
import SingleEarring3 from '../../assets/Single-earrings-3.jpeg'
import SingleEarring4 from '../../assets/Single-earrings-4.jpeg'
import SingleEarring5 from '../../assets/Single-earrings-5.jpeg'
import SingleEarring6 from '../../assets/Single-earrings-6.jpeg'
import SingleEarring7 from '../../assets/Single-earrings-7.jpeg'
import SingleEarring8 from '../../assets/Single-earrings-8.jpeg'
import SingleEarring9 from '../../assets/Single-earrings-9.jpeg'
import SingleEarring10 from '../../assets/Single-earrings-10.jpeg'
import SingleEarring11 from '../../assets/Single-earrings-11.jpeg'
import SingleEarring12 from '../../assets/Single-earrings-12.jpeg'
import SingleEarring13 from '../../assets/Single-earrings-13.jpeg'
import SunbellEarring14 from '../../assets/sunbell-earring.jpeg'
import Necklace1 from '../../assets/necklace-1.jpeg'
import Necklace2 from '../../assets/necklace-2.jpeg'
import Necklace3 from '../../assets/necklace-3.jpeg'
import Necklace4 from '../../assets/necklace-4.jpeg'
import Necklace5 from '../../assets/necklace-5.jpeg'
import Necklace6 from '../../assets/necklace-6.jpeg'
import Necklace7 from '../../assets/layered-necklace.jpeg'
import FemaleBracelet1 from '../../assets/Female-bracelet-1.jpeg'
import FemaleBracelet2 from '../../assets/Female-bracelet-2.jpeg'
import FemaleBracelet3 from '../../assets/Female-bracelet-3.jpeg'
import FemaleBracelet4 from '../../assets/Female-bracelet-4.jpeg'
import FemaleBracelet5 from '../../assets/Female-bracelet-5.jpeg'
import FemaleBracelet6 from '../../assets/Female-bracelet-6.jpeg'
import MaleBracelet1 from '../../assets/Male-bracelet-1.jpeg'

const products = [
  { name: 'Ọlórí Luxe Drips', category: 'Earrings', price: '₦6,500', badge: 'Bestseller', image: SingleEarring1, height:'h-[350px]' },
  { name: 'Ọlórí Minis', category: 'Earrings', price: '₦4,500', badge: null, image: SingleEarring2, height:'h-[350px]' },
  { name: 'Ọlórí Midi', category: 'Earrings', price: '₦3,000', badge: 'New', image: SingleEarring3, height:'h-[350px]' },
  { name: 'Ọlórí Midi', category: 'Earrings', price: '₦4,500', badge: null, image: SingleEarring4, height:'h-[350px]' },
  { name: 'Ọlórí Midi', category: 'Earrings', price: '₦4,500', badge: null, image: SingleEarring5, height:'h-[350px]' },
  { name: 'Ọlórí Midi', category: 'Earrings', price: '₦4,500', badge: 'Limited', image: SingleEarring6, height:'h-[350px]' },
  { name: 'Ọlórí Luxe Drips', category: 'Earrings', price: '₦4,500', badge: 'Bestseller', image: SingleEarring7, height:'h-[350px]' },
  { name: 'Ọlórí Minis', category: 'Earrings', price: '₦4,500', badge: null, image: SingleEarring8, height:'h-[350px]' },
  { name: 'Ọlórí Midi', category: 'Earrings', price: '₦4,500', badge: 'New', image: SingleEarring9, height:'h-[350px]' },
  { name: 'Royale Drop Earrings', category: 'Earrings', price: '₦4,500', badge: 'out-of-stock', image: SingleEarring10, height:'h-[350px]' },
  { name: 'Royale Drop Earrings', category: 'Earrings', price: '₦4,500', badge: 'out-of-stock', image: SingleEarring11, height:'h-[320px]' },
  { name: 'Ọlórí Minis', category: 'Earrings', price: '₦4,500', badge: 'Limited', image: SingleEarring12, height:'h-[350px]' },
  { name: 'Ọlórí Luxe Drips', category: 'Earrings', price: '₦6,500', badge: 'Bestseller', image: SingleEarring13, height:'h-[350px]' },
  { name: 'Royale Drop Earrings', category: 'Earrings', price: '₦6,500', badge: 'Instock', image: SunbellEarring14, height:'h-[350px]' },
  { name: 'Lagos Gold Chain', category: 'Necklace', price: '₦4,500', badge: null, image: Necklace1, height:'h-[350px]' },
  { name: 'Lagos Silver Chain', category: 'Necklace', price: '₦4,500', badge: 'New', image: Necklace2, height:'h-[350px]' },
  { name: 'Lagos Gold Chain', category: 'Necklace', price: '₦4,500', badge: null, image: Necklace3, height:'h-[350px]' },
  { name: 'Lagos Gold Chain', category: 'Necklace', price: '₦4,500', badge: null, image: Necklace4, height:'h-[320px]' },
  { name: 'Ọlórí Luxe Drips', category: 'Necklace', price: '₦6,500', badge: 'Limited', image: Necklace5, height:'h-[350px]' },
  { name: 'Ọlórí Luxe Drips', category: 'Necklace', price: '₦6,500', badge: 'Bestseller', image: Necklace6, height:'h-[350px]' },
  { name: 'Ọlórí Luxe Drips', category: 'Necklace', price: '₦16,000', badge: 'Bestseller', image: Necklace7, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦7,000', badge: 'Bestseller', image: FemaleBracelet1, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦7,000', badge: 'Bestseller', image: FemaleBracelet2, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦7,000', badge: 'Bestseller', image: FemaleBracelet3, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦7,000', badge: 'Bestseller', image: FemaleBracelet4, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦7,000', badge: 'Bestseller', image: FemaleBracelet5, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦11,000', badge: 'Bestseller', image: FemaleBracelet6, height:'h-[350px]' },
  { name: 'Elegance Bracelet', category: 'Bracelet', price: '₦15,000', badge: 'Bestseller', image: MaleBracelet1, height:'h-[350px]' },
]

const PER_PAGE = 6

export default function Products() {
  const [page, setPage] = useState(1)
  const sectionRef = useRef(null)

  const totalPages = Math.ceil(products.length / PER_PAGE)

  // Ensure page never exceeds totalPages
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return products.slice(start, start + PER_PAGE)
  }, [page])

  function goTo(p) {
    setPage(p)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => { setPage(1) }, [])

  function pageNumbers() {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const nums = new Set([1, totalPages, page])
    if (page > 1) nums.add(page - 1)
    if (page < totalPages) nums.add(page + 1)
    return [...nums].sort((a, b) => a - b).reduce((acc, n, i, arr) => {
      if (i > 0 && n - arr[i - 1] > 1) acc.push('…')
      acc.push(n)
      return acc
    }, [])
  }

  return (
    <div className="pt-20">

      {/* ── Page header ── */}
      <div className="py-24 px-[5vw] bg-[url('/assets/Double-earrings.jpeg')] bg-cover bg-center text-center">
        <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-4">
          ✦ Curated Collection ✦
        </span>
        <h1 className="font-playfair font-bold text-[clamp(2rem,4vw,3.5rem)] leading-snug">
          Explore Our Exclusive <em className="italic text-gold">Nigerian Collection</em>
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mx-auto mt-6 mb-6" />
        {/* <p className="bg-gradient-to-r from-neutral-50 to-black bg-clip-text text-transparent  text-sm max-w-md mx-auto leading-relaxed">
          Click any piece to inquire directly via WhatsApp. Custom orders and personal styling available.
        </p> */}
      </div>

      {/* ── Grid + Pagination ── */}
      <section ref={sectionRef} className="bg-deep py-20 px-[5vw]">
        <div className="max-w-[1200px] mx-auto">

          {/* Results count */}
          <div className="flex items-center justify-between mb-10">
            <span className="font-montserrat text-[0.65rem] tracking-[0.15em] uppercase text-[#888]">
              Showing{' '}
              <span className="text-gold font-semibold">{(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, products.length)}</span>
              {' '}of{' '}
              <span className="text-gold font-semibold">{products.length}</span>
              {' '}pieces
            </span>
            <span className="font-montserrat text-[0.65rem] tracking-[0.15em] uppercase text-[#888]">
              Page <span className="text-gold font-semibold">{page}</span> of{' '}
              <span className="text-gold font-semibold">{totalPages}</span>
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginated.map((p, i) => (
              <ProductCard key={`${p.name}-${(page - 1) * PER_PAGE + i}`} {...p} />
            ))}
          </div>

          {/* ── Pagination controls ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">

              {/* Previous button */}
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-montserrat text-[0.65rem] tracking-[0.15em] uppercase font-semibold transition-all duration-300
                  ${page === 1
                    ? 'text-[#444] border border-white/5 cursor-not-allowed'
                    : 'text-gold border border-gold/40 hover:bg-gold hover:text-black hover:border-gold cursor-pointer'
                  }`}
              >
                <FaChevronLeft size={10} />
                Prev
              </button>

              {/* Page number buttons */}
              {pageNumbers().map((n, i) =>
                n === '…' ? (
                  <span key={`ellipsis-${i}`} className="font-montserrat text-[0.7rem] text-[#444] px-1">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => goTo(n)}
                    className={`w-10 h-10 rounded-sm font-montserrat text-[0.75rem] font-semibold transition-all duration-300 cursor-pointer
                      ${n === page
                        ? 'bg-gold text-black border border-gold'
                        : 'text-[#888] border border-white/8 hover:border-gold/40 hover:text-gold'
                      }`}
                  >
                    {n}
                  </button>
                )
              )}

              {/* Next button */}
              <button
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-montserrat text-[0.65rem] tracking-[0.15em] uppercase font-semibold transition-all duration-300
                  ${page === totalPages
                    ? 'text-[#444] border border-white/5 cursor-not-allowed'
                    : 'text-gold border border-gold/40 hover:bg-gold hover:text-black hover:border-gold cursor-pointer'
                  }`}
              >
                Next
                <FaChevronRight size={10} />
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  )
}