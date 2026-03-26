import { Link } from 'react-router-dom'
import { FaInstagram, FaTiktok, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'

const WA = 'https://wa.me/2349116971778?text=Hi,%20I%20am%20interested%20in%20your%20jewelry'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-gold/12 pt-16 pb-8 px-[5vw]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 pb-12 border-b border-white/5">

        {/* Brand */}
        <div>
          <Link to="/" className="font-playfair text-2xl tracking-widest text-gold no-underline block mb-4">
            L<span className="italic text-off-white">.</span>O<span className="italic text-off-white">.</span>C
          </Link>
          <p className="font-cormorant italic text-base text-[#888] leading-relaxed max-w-xs">
            "Luxury by Olori Concept — where Nigerian elegance meets global luxury. Every piece tells your story."
          </p>
          <div className="flex gap-3 mt-6">
            {[FaInstagram, FaTiktok, FaXTwitter].map((Icon, i) => (
              <a key={i} href="#"
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#ccc]
                           border border-white/10 hover:border-gold hover:text-gold
                           hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-montserrat text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-5 font-semibold">
            Navigation
          </div>
          <ul className="list-none flex flex-col gap-3">
            {[['/', 'Home'], ['/about', 'Our Story'], ['/products', 'Collection'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="font-montserrat text-[0.82rem] text-[#888] hover:text-gold transition-colors duration-300 no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-montserrat text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-5 font-semibold">
            Contact
          </div>
          <ul className="list-none flex flex-col gap-3">
            <li>
              <a href={WA} target="_blank" rel="noreferrer"
                className="font-montserrat text-[0.82rem] text-[#888] hover:text-gold transition-colors duration-300 no-underline flex items-center gap-2">
                <FaWhatsapp size={13} /> +234 911 697 1778
              </a>
            </li>
            <li className="font-montserrat text-[0.82rem] text-[#888]">Lagos, Nigeria</li>
            <li><a href={WA} target="_blank" rel="noreferrer" className="font-montserrat text-[0.82rem] text-[#888] hover:text-gold transition-colors no-underline">WhatsApp Us</a></li>
            <li><a href="#" className="font-montserrat text-[0.82rem] text-[#888] hover:text-gold transition-colors no-underline">Custom Orders</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-4 mt-8">
        <span className="font-montserrat text-[0.72rem] text-[#888]">
          © 2026 Luxury by Olori Concept (L.O.C). All rights reserved. Lagos, Nigeria.
        </span>
        <span className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-gold/70">
          ✦ Nigerian Luxury ✦
        </span>
      </div>
    </footer>
  )
}
