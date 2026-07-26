import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FaBars, FaXmark, FaCartShopping } from 'react-icons/fa6'
import { useCart } from '../../context/CartContext.jsx'
import CartDrawer from './CartDrawer.jsx'

const WA = 'https://wa.me/2349116971778?text=Hi,%20I%20am%20interested%20in%20your%20jewelry'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/products', label: 'Collection' },
  { to: '/blog',     label: 'Blog' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cartCount } = useCart()

  function close() { setOpen(false) }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full max-w-full overflow-x-hidden z-50 flex items-center justify-between px-[5vw] py-5
                      bg-black/92 backdrop-blur-xl border-b border-gold/15">

        {/* Logo */}
        <Link to="/" onClick={close} className="font-playfair text-2xl tracking-widest text-gold no-underline">
          L<span className="italic text-off-white">.</span>O<span className="italic text-off-white">.</span>C
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`relative font-montserrat text-[0.7rem] tracking-[0.18em] uppercase no-underline
                            transition-colors duration-300
                            after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0
                            after:h-px after:bg-gold after:transition-transform after:duration-300
                            ${pathname === to
                              ? 'text-gold after:scale-x-100'
                              : 'text-gray-300 hover:text-gold after:scale-x-0 hover:after:scale-x-100'
                            }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side: cart + WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 text-gold
                       border border-gold/30 rounded transition-colors hover:bg-gold/10"
            aria-label="Open cart"
          >
            <FaCartShopping size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center
                                min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-black
                                text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          
          <a  href={WA}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gold text-black px-5 py-2.5 rounded-sm
                       font-montserrat text-[0.68rem] tracking-[0.14em] uppercase font-bold
                       transition-all duration-300 hover:bg-gold-light hover:-translate-y-px no-underline"
          >
            <FaWhatsapp size={14} />
            WhatsApp Us
          </a>
        </div>

        {/* Mobile: cart icon + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 text-gold
                       border border-gold/30 rounded transition-colors hover:bg-gold/10"
            aria-label="Open cart"
          >
            <FaCartShopping size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center
                                min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-black
                                text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-10 h-10 text-gold
                       border border-gold/30 rounded transition-colors hover:bg-gold/10"
            aria-label="Toggle menu"
          >
            {open ? <FaXmark size={18} /> : <FaBars size={18} />}
          </button>
        </div>

      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 overflow-x-hidden z-40 md:hidden transition-all duration-300
                    ${open ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-black transition-opacity duration-300
                      ${open ? 'opacity-80' : 'opacity-0'}`}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-full bg-[#0a0a0a] border-l border-gold/15
                      flex flex-col transition-transform duration-300 ease-in-out
                      ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gold/10">
            <span className="font-playfair text-xl tracking-widest text-gold">
              L<span className="italic text-white">.</span>O<span className="italic text-white">.</span>C
            </span>
            <button
              onClick={close}
              className="text-[#888] hover:text-gold transition-colors"
              aria-label="Close menu"
            >
              <FaXmark size={18} />
            </button>
          </div>

          {/* Nav links */}
          <ul className="list-none flex flex-col px-8 py-8 gap-1 flex-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={close}
                  className={`block font-montserrat text-[0.75rem] tracking-[0.2em] uppercase
                              py-4 border-b border-white/5 no-underline transition-colors duration-200
                              ${pathname === to
                                ? 'text-gold'
                                : 'text-[#aaa] hover:text-gold'
                              }`}
                >
                  {pathname === to && (
                    <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full mr-3 mb-0.5" />
                  )}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA at bottom of drawer */}
          <div className="px-8 pb-10">
            
            <a  href={WA}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="flex items-center justify-center gap-2 w-full bg-gold text-black
                         py-3.5 rounded-sm font-montserrat text-[0.68rem] tracking-[0.14em]
                         uppercase font-bold no-underline hover:bg-gold-light transition-colors"
            >
              <FaWhatsapp size={14} />
              Message Us on WhatsApp
            </a>
            <p className="text-center font-montserrat text-[0.6rem] text-[#555] mt-4 tracking-wider uppercase">
              Lagos, Nigeria · Est. 2024
            </p>
          </div>

        </div>
      </div>

      {/* ── Cart drawer ── */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}