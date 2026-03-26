import { Link } from 'react-router-dom'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  { text: "Every piece feels personal and elegant — a true representation of Nigerian luxury. I wore my Oba Necklace to my friend's wedding and couldn't stop the compliments!", author: 'Adaeze O., Abuja' },
  { text: "I get compliments every time I wear my L.O.C jewelry. It's flawless! The Queen Ring is my go-to for every occasion.", author: 'Kemi B., Lagos' },
  { text: "Ordered the Elegance Bracelet as a gift and she cried happy tears. L.O.C jewelry is in a league of its own in Nigeria.", author: 'Emeka T., Port Harcourt' },
]

const values = [
  { symbol: '✦', title: 'Nigerian Heritage', desc: 'Every design honors our rich cultural identity' },
  { symbol: '◆', title: 'Global Luxury Standards', desc: 'Quality that competes on the world stage' },
  { symbol: '▲', title: 'Personal Elegance', desc: 'Jewelry that feels made just for you' },
]

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="py-24 px-[5vw] bg-[#1a1a1a] text-center">
        <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-4">✦ Who We Are ✦</span>
        <h1 className="font-playfair font-bold text-[clamp(2rem,4vw,3.5rem)] leading-snug">
          Our Story – <em className="italic text-gold">L.O.C</em>
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
      </div>

      <section className="py-20 px-[5vw]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

          {/* Story */}
          <div>
            <div className="space-y-6 font-cormorant italic text-lg text-[#ccc] leading-[1.9]">
              <p>Luxury by Olori Concept (L.O.C) is a Nigerian brand dedicated to delivering timeless elegance. Born from a deep appreciation of Nigerian culture and a desire to see it reflected in world-class jewelry, L.O.C bridges the gap between heritage and haute couture.</p>
              <p>Every piece reflects sophistication, modern design, and the essence of Nigerian culture. From handcrafted necklaces to exquisite rings, L.O.C jewelry empowers you to shine — whether you're attending a Lagos gala, a Yoruba traditional ceremony, or simply celebrating the everyday luxury of being you.</p>
              <p>Our craft is guided by one belief: that every Nigerian deserves to wear jewelry that mirrors their worth. We source only the finest materials, collaborating with skilled artisans to create pieces that transcend trends.</p>
            </div>

            <div className="flex gap-4 flex-wrap mt-10">
              <Link to="/products"
                className="bg-gold text-black px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-bold rounded-sm transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 no-underline">
                Explore Our Products
              </Link>
              <Link to="/blog"
                className="border border-white/30 text-white px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-300 hover:border-gold hover:text-gold no-underline">
                Read Our Blog
              </Link>
            </div>
          </div>

          {/* Values + Testimonials */}
          <div>
            <div className="bg-gradient-to-br from-[#111008] to-[#1a1a0a] border border-gold/15 rounded-xl p-10 mb-8">
              <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-5">Our Values</span>
              <div className="space-y-4">
                {values.map(({ symbol, title, desc }) => (
                  <div key={title} className="flex items-center gap-4 p-4 bg-gold/4 rounded-lg">
                    <span className="text-gold text-xl">{symbol}</span>
                    <div>
                      <div className="font-montserrat font-semibold text-[0.85rem] mb-0.5">{title}</div>
                      <div className="font-montserrat text-[0.78rem] text-[#888]">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="font-playfair text-2xl mb-6">
                Our Clients <em className="italic text-gold">Love</em> L.O.C
              </h3>
              <div className="space-y-4">
                {testimonials.map(({ text, author }) => (
                  <div key={author}
                    className="bg-gold/4 border border-gold/12 border-l-[3px] border-l-gold rounded-r-xl p-6 transition-colors hover:bg-gold/8">
                    <FaQuoteLeft className="text-gold/30 text-4xl mb-3" />
                    <p className="font-cormorant italic text-[1.05rem] text-[#ccc] leading-[1.7] mb-3">{text}</p>
                    <div className="font-montserrat text-[0.65rem] tracking-[0.15em] uppercase text-gold font-semibold">
                      ★★★★★ — {author}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
