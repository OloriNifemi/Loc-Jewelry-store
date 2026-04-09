import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import {
  NecklaceSmIcon, RingSmIcon, EarringSmIcon, BraceletSmIcon,
} from '../components/JewelryIcons.jsx'


const WA_CARE = 'https://wa.me/2349116971778?text=Hi,%20I%20need%20advice%20on%20caring%20for%20my%20L.O.C%20jewelry'
const WA_BLOG = 'https://wa.me/2349116971778?text=Hi,%20I%20saw%20your%20blog%20and%20I%20am%20interested%20in%20jewelry'

/* ─── sub-components ─── */

function TipBox({ title, children, extraClass = '' }) {
  return (
    <div className={`bg-gradient-to-br from-gold/8 to-gold/3 border-l-[3px] border-gold rounded-r-xl p-5 my-6 ${extraClass}`}>
      <strong className="font-montserrat text-[0.72rem] tracking-[0.15em] uppercase text-gold block mb-2">{title}</strong>
      <span className="font-montserrat text-[0.88rem] text-[#ccc] leading-[1.7]">{children}</span>
    </div>
  )
}

function Swatch({ gradient, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-full border-2 border-white/10 shadow-lg cursor-pointer hover:scale-125 transition-transform ${gradient}`} />
      <span className="font-montserrat text-[0.55rem] tracking-wide uppercase text-[#888] text-center max-w-[50px] leading-tight">{label}</span>
    </div>
  )
}

function JewelTypeCard({ icon: Icon, name, tagline, desc, swatches, tip }) {
  return (
    <div className="bg-gold/4 border border-gold/12 rounded-xl p-7 mb-6 transition-all hover:bg-gold/8 hover:border-gold/25">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon />
        </div>
        <div>
          <div className="font-playfair text-xl font-semibold">{name}</div>
          <div className="font-montserrat text-[0.68rem] tracking-[0.15em] uppercase text-gold">{tagline}</div>
        </div>
      </div>
      <p className="font-montserrat text-[0.88rem] text-[#ccc] leading-[1.7] mb-4">{desc}</p>
      <div className="font-montserrat text-[0.7rem] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Best Colors &amp; Finishes</div>
      <div className="flex gap-3 flex-wrap mb-4">
        {swatches.map((s) => <Swatch key={s.label} {...s} />)}
      </div>
      <TipBox title="✦ L.O.C Styling Tip">{tip}</TipBox>
    </div>
  )
}

function CareStep({ num, title, desc }) {
  return (
    <div className="flex gap-6 items-start p-6 bg-white/2 border border-white/5 rounded-xl mb-4 transition-colors hover:bg-gold/4">
      <div className="font-playfair text-4xl text-gold/30 font-bold leading-none flex-shrink-0 min-w-[40px]">{num}</div>
      <div>
        <h4 className="font-playfair text-lg font-semibold mb-1">{title}</h4>
        <p className="font-montserrat text-[0.85rem] text-[#888] leading-[1.7]">{desc}</p>
      </div>
    </div>
  )
}

function TrendCard({ num, name, tagline, desc, tip }) {
  return (
    <div className="bg-gold/4 border-l-[3px] border-gold border border-gold/12 rounded-xl p-7 mb-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="font-playfair text-4xl text-gold/30 font-bold leading-none min-w-[40px]">{String(num).padStart(2,'0')}</div>
        <div>
          <div className="font-playfair text-xl font-semibold">{name}</div>
          <div className="font-montserrat text-[0.68rem] tracking-[0.15em] uppercase text-gold">{tagline}</div>
        </div>
      </div>
      <p className="font-montserrat text-[0.88rem] text-[#ccc] leading-[1.7] mb-3">{desc}</p>
      <TipBox title="✦ How to Wear It">{tip}</TipBox>
    </div>
  )
}

/* ─── Tab contents ─── */

function TabTypes() {
  const types = [
    {
      icon: NecklaceSmIcon,
      name: 'Necklaces',
      tagline: 'Statement · Layered · Pendant · Choker',
      desc: 'The necklace is the crown of the body. From delicate pendants that grace the collarbone to bold statement chains that anchor a look, necklaces are the most versatile piece in any wardrobe. In Nigerian fashion, gold necklaces are particularly powerful — they complement rich ankara fabrics, all-white lace, and sleek monochrome corporate wear equally.',
      swatches: [
        { gradient: 'bg-gradient-to-br from-[#c9a84c] to-[#e8c97a]', label: 'Yellow Gold' },
        { gradient: 'bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5]', label: 'Silver' },
        { gradient: 'bg-gradient-to-br from-[#b76e79] to-[#c9a0aa]', label: 'Rose Gold' },
        { gradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#444]',    label: 'Black Onyx' },
        { gradient: 'bg-gradient-to-br from-[#1c3a6e] to-[#2a5aad]', label: 'Sapphire' },
        { gradient: 'bg-gradient-to-br from-[#1a5c2e] to-[#2e8b57]', label: 'Emerald' },
        { gradient: 'bg-gradient-to-br from-[#8b0000] to-[#c0392b]', label: 'Ruby Red' },
      ],
      tip: 'Yellow gold necklaces pair beautifully with warm-toned Nigerian fabrics — burnt orange ankara, champagne lace, and ivory aso-ebi. Silver and rose gold shine against cooler tones like cobalt blue and royal purple.',
    },
    {
      icon: RingSmIcon,
      name: 'Rings',
      tagline: 'Cocktail · Signet · Stacking · Statement',
      desc: 'Rings speak with authority. A cocktail ring commands attention in any room; a sleek signet ring whispers of refinement. In Nigerian culture, rings carry profound meaning — from engagement and marriage to celebration and achievement. Stacking rings on multiple fingers is a growing Lagos trend, turning hands into a gallery of self-expression.',
      swatches: [
        { gradient: 'bg-gradient-to-br from-[#c9a84c] to-[#f0e2b6]', label: 'Gold' },
        { gradient: 'bg-gradient-to-br from-[#f0f0f0] to-[#fff]',    label: 'Diamond' },
        { gradient: 'bg-gradient-to-br from-[#4b0082] to-[#7b2fa3]', label: 'Amethyst' },
        { gradient: 'bg-gradient-to-br from-[#1a5c2e] to-[#4caf50]', label: 'Emerald' },
        { gradient: 'bg-gradient-to-br from-[#1c3a6e] to-[#4169e1]', label: 'Blue Topaz' },
        { gradient: 'bg-gradient-to-br from-[#b76e79] to-[#e8a0a0]', label: 'Rose Gold' },
      ],
      tip: 'For corporate and professional settings, opt for one bold ring on the index or middle finger. For events and celebrations, stack 2–3 thin gold bands for a contemporary Lagos look.',
    },
    {
      icon: EarringSmIcon,
      name: 'Earrings',
      tagline: 'Studs · Hoops · Drops · Chandelier',
      desc: 'Earrings frame the face and define the mood of an outfit. Tiny gold studs say effortless elegance; chandelier drops say celebration. For Nigerian women, earrings are non-negotiable — and for men, a single small stud or hoop is increasingly a hallmark of confident, fashion-forward style.',
      swatches: [
        { gradient: 'bg-gradient-to-br from-[#c9a84c] to-[#e8c97a]', label: 'Gold' },
        { gradient: 'bg-gradient-to-br from-[#e0e0e0] to-[#fff]',    label: 'Silver' },
        { gradient: 'bg-gradient-to-br from-[#b76e79] to-[#e8a0aa]', label: 'Rose Gold' },
        { gradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#333]',    label: 'Jet Black' },
        { gradient: 'bg-gradient-to-br from-[#f5f0e8] to-[#fff8f0]', label: 'Pearl White' },
      ],
      tip: 'Oversized gold hoops are a Lagos street-style staple. For owambe and traditional ceremonies, opt for chandelier earrings with coral or amber stones — they echo the colors of Nigerian royalty.',
    },
    {
      icon: BraceletSmIcon,
      name: 'Bracelets & Bangles',
      tagline: 'Chain · Bangle · Cuff · Charm',
      desc: 'Bracelets are the punctuation of an outfit — they complete the sentence. A single gold cuff on a bare wrist is minimalist luxury. A stack of thin bangles creates rhythm and movement. In Nigerian tradition, coral bracelets hold deep cultural significance, worn by royalty and during sacred ceremonies.',
      swatches: [
        { gradient: 'bg-gradient-to-br from-[#c9a84c] to-[#e8c97a]', label: 'Gold' },
        { gradient: 'bg-gradient-to-br from-[#c0392b] to-[#e74c3c]', label: 'Coral Red' },
        { gradient: 'bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5]', label: 'Silver' },
        { gradient: 'bg-gradient-to-br from-[#4b3621] to-[#7b5e3a]', label: 'Bronze' },
        { gradient: 'bg-gradient-to-br from-[#1a5c2e] to-[#27ae60]', label: 'Green Jade' },
      ],
      tip: 'Mix metals confidently — a gold cuff with a silver chain bracelet is a contemporary pairing that Lagos\'s top stylists love. Add a charm bracelet for personality at casual outings.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleHero
        bg="from-[#111008] via-[#1c1505] to-[#0a0a08]"
        subtitle="Types · Colors · Meaning"
        svg={
          <svg width="180" height="100" viewBox="0 0 300 100" fill="none">
            <path d="M30 50 Q75 20 100 50 Q125 80 150 50" stroke="#c9a84c" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="150" cy="50" r="8" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.15)"/>
            <circle cx="200" cy="50" r="20" stroke="#c9a84c" strokeWidth="2" fill="none"/>
            <circle cx="200" cy="50" r="6" fill="#c9a84c" opacity="0.7"/>
            <path d="M260 30 L263 40 L260 45 L257 40 Z" fill="#c9a84c" opacity="0.8"/>
            <line x1="260" y1="45" x2="260" y2="58" stroke="#c9a84c" strokeWidth="1.5"/>
            <ellipse cx="260" cy="65" rx="9" ry="12" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
          </svg>
        }
      />
      <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-3">✦ The L.O.C Guide ✦</span>
      <h2 className="font-playfair font-bold text-[clamp(1.8rem,3vw,2.4rem)] leading-snug mb-4">
        Types of Jewelry & Their <em className="italic text-gold">Colors</em>
      </h2>
      <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
      <p className="font-cormorant italic text-lg text-[#ccc] leading-[1.9] mb-10">
        Jewelry is more than adornment — it is language. In Nigeria, a woman's necklace speaks of grace; a man's ring speaks of authority. At L.O.C, we believe choosing the right piece — in the right color — transforms any outfit from ordinary to unforgettable.
      </p>
      {types.map((t) => <JewelTypeCard key={t.name} {...t} />)}
    </div>
  )
}

function TabElevate() {
  const cards = [
    { title: 'Creates a Focal Point',       text: 'A statement necklace draws the eye upward to your face — the most expressive part of you. This is why jewelry near the face (necklaces, earrings) is the most powerful for commanding a room. It makes people look at you, not just your clothes.', bg: 'from-[#111008] to-[#1a1505]' },
    { title: 'Communicates Wealth & Status',text: 'Across Nigerian culture, fine jewelry signals prosperity and social standing. Gold has been currency, decoration, and symbol of achievement for centuries. Wearing quality jewelry communicates that you invest in yourself — and people notice.', bg: 'from-[#0f0f0f] to-[#1a1a10]' },
    { title: 'Transforms Basic Outfits',    text: 'A plain white top and black trousers become editorial with the right gold necklace and earrings. A simple corporate blazer becomes memorable with a bold ring. Jewelry is the most efficient fashion investment — one piece can work across 20 different outfits.', bg: 'from-[#111008] to-[#1c1200]' },
    { title: 'Expresses Personal Identity', text: 'The jewelry you choose is autobiography. Minimalist rings say quiet confidence. Chandelier earrings say drama and celebration. Bold cuffs say power. Your jewelry is what makes your look unmistakably yours.', bg: 'from-[#0a0a0a] to-[#181818]' },
  ]
  const metalRules = [
    { gradient: 'bg-gradient-to-br from-[#c9a84c] to-[#e8c97a]', border: 'border-gold',    name: 'Gold',     rule: '→ Warm colors (orange, red, yellow, champagne, brown, cream, white). Perfect for traditional Nigerian attire.' },
    { gradient: 'bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5]', border: 'border-[#e0e0e0]', name: 'Silver', rule: '→ Cool colors (blue, purple, grey, black, green). Modern corporate looks and evening wear.' },
    { gradient: 'bg-gradient-to-br from-[#b76e79] to-[#e8a0aa]', border: 'border-[#b76e79]', name: 'Rose Gold', rule: '→ Universally flattering. Works with pinks, nudes, dusty rose, wine, and white. The most skin-tone-friendly metal.' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleHero
        bg="from-[#0a0a08] via-[#181408] to-[#0f0f0f]"
        subtitle="Confidence · Presence · Style"
        svg={
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 20 L64 38 L83 38 L68 50 L74 68 L60 57 L46 68 L52 50 L37 38 L56 38 Z" fill="#c9a84c" opacity="0.9"/>
            <circle cx="60" cy="60" r="48" stroke="#c9a84c" strokeWidth="1" strokeDasharray="5 4" opacity="0.3"/>
          </svg>
        }
      />
      <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-3">✦ Style Intelligence ✦</span>
      <h2 className="font-playfair font-bold text-[clamp(1.8rem,3vw,2.4rem)] leading-snug mb-4">
        Why Jewelry <em className="italic text-gold">Elevates</em> Your Fashion
      </h2>
      <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
      <div className="font-cormorant italic text-lg text-[#ccc] leading-[1.9] mb-10 space-y-4">
        <p>There is a reason a well-chosen piece of jewelry can make an outfit feel incomplete without it. Jewelry does something that clothing alone cannot — it focuses attention, communicates personality, and signals intention. In Lagos, where fashion is a form of national conversation, jewelry is not optional. It is essential.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {cards.map(({ title, text, bg }) => (
          <div key={title} className="bg-[#1a1a1a] border border-gold/8 rounded-xl overflow-hidden">
            <div className={`h-28 flex items-center justify-center bg-gradient-to-br ${bg} relative`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_60%)]" />
            </div>
            <div className="p-6">
              <div className="font-playfair text-lg font-semibold mb-2">{title}</div>
              <p className="font-montserrat text-[0.82rem] text-[#888] leading-[1.65]">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-playfair text-2xl font-semibold mt-10 mb-4">
        The Nigerian Context: <em className="italic text-gold">Why Jewelry Matters More Here</em>
      </h3>
      <div className="font-cormorant italic text-lg text-[#ccc] leading-[1.9] mb-6 space-y-4">
        <p>Nigerian culture has always understood what the West is only recently rediscovering: that adornment is not vanity, it is identity. From the coral beads of Benin royalty to the gold headpieces of Yoruba brides, jewelry in Nigeria carries the weight of history, family, and aspiration simultaneously.</p>
        <p>The modern Nigerian understands that jewelry is a social signal. It says: "I am intentional. I am polished. I am here."</p>
      </div>

      <TipBox title="✦ The L.O.C Philosophy">
        At L.O.C, we design each piece to work hard for the wearer. Every necklace, ring, earring, and bracelet is designed to be recognizable — a signature that says something about the person wearing it before they've spoken a word. That is the true power of luxury jewelry.
      </TipBox>

      <h3 className="font-playfair text-2xl font-semibold mt-10 mb-6">
        The <em className="italic text-gold">Color Rule</em>: Matching Jewelry to Your Outfit
      </h3>
      <div className="space-y-3">
        {metalRules.map(({ gradient, border, name, rule }) => (
          <div key={name} className={`flex items-center gap-4 p-4 bg-gold/4 rounded-xl border-l-2 ${border}`}>
            <div className={`w-6 h-6 rounded-full flex-shrink-0 border border-white/10 ${gradient}`} />
            <div className="font-montserrat text-[0.8rem]">
              <strong className="text-white">{name}</strong>
              <span className="text-[#888]"> {rule}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabMaintain() {
  const steps = [
    { num: '01', title: 'Put Jewelry On Last, Take It Off First', desc: 'Always apply perfume, body lotion, hairspray, and makeup before putting on your jewelry. Chemicals in these products — especially alcohol in perfume — are the number one cause of tarnishing. When you return home, remove jewelry before washing your hands, cooking, or cleaning.' },
    { num: '02', title: 'Remove Before Swimming & Bathing', desc: 'Chlorine in swimming pools is extremely harsh on gold plating and can weaken clasps and settings. Salt water (the Atlantic Ocean, Elegushi, Tarkwa Bay) can cause corrosion over time. Shower water combined with soap can dull gemstone brilliance. Remove all jewelry before any water activity.' },
    { num: '03', title: 'Avoid Sleeping in Jewelry', desc: 'Sleeping in rings and bracelets causes metal fatigue — the repeated bending and pressure weakens the metal over time. Necklace chains can tangle and break. Earring posts can get bent. Make removing jewelry before sleep a non-negotiable habit.' },
    { num: '04', title: 'Keep Pieces Separate', desc: 'Gold scratches silver. Diamonds scratch softer gemstones. Never store pieces loose together in one box. Each piece should have its own compartment, pouch, or wrapping. L.O.C pieces come in individual pouches for exactly this reason — use them every time.' },
    { num: '05', title: 'Gentle Soap & Warm Water (Monthly)', desc: 'Mix mild dish soap with warm — not hot — water. Soak the piece for 10–15 minutes, then gently scrub with a very soft toothbrush (baby toothbrush ideal). Rinse thoroughly and pat dry with a soft, lint-free cloth. Never use tissue paper — it scratches.' },
    { num: '06', title: 'Polishing Cloth for Shine (Weekly)', desc: 'Use a jewelry-specific polishing cloth to buff gold and silver pieces weekly. This removes light tarnish and surface oils, restoring the mirror-like shine. Avoid paper towels — the fibers cause micro-scratches.' },
    { num: '07', title: 'For Gemstones: Extra Gentle Care', desc: 'Avoid ultrasonic cleaners for pieces with emeralds, pearls, opals, or coral — vibrations can crack these stones. Never use bleach or ammonia. For diamonds and sapphires, the soap-and-water method is safe. When in doubt, simply wipe with a dry soft cloth.' },
    { num: '08', title: 'Professional Cleaning (Annually)', desc: 'Once a year, have your most precious pieces professionally inspected and cleaned. A jeweler will check for loose stones, worn prongs, and weakened clasps — and can re-plate gold-plated pieces to restore their original brilliance.' },
  ]
  const dos = ['Store in a cool, dry place away from direct sunlight', 'Use anti-tarnish pouches or strips in your jewelry box', 'Keep air conditioning in the room where jewelry is stored', 'Use individual soft pouches for each piece', 'Store necklaces hanging to prevent tangling', 'Keep silica gel packets in your jewelry box']
  const donts = ['Store jewelry in the bathroom (too much humidity)', 'Leave pieces in direct sunlight on a windowsill', 'Mix all pieces loose in one drawer', 'Wrap pieces in tissue paper (causes scratches)', 'Store near open windows during rainy season', 'Use rubber bands to bundle chains together']

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleHero
        bg="from-[#0a0a08] via-[#141208] to-[#0f0f0f]"
        subtitle="Protect · Clean · Store · Preserve"
        svg={
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 20 Q80 35 80 55 Q80 75 60 90 Q40 75 40 55 Q40 35 60 20Z" stroke="#c9a84c" strokeWidth="2" fill="rgba(201,168,76,0.06)"/>
            <path d="M50 55 L55 60 L70 45" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-3">✦ Care Guide ✦</span>
      <h2 className="font-playfair font-bold text-[clamp(1.8rem,3vw,2.4rem)] leading-snug mb-4">
        How to <em className="italic text-gold">Maintain</em> Your Jewelry
      </h2>
      <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
      <p className="font-cormorant italic text-lg text-[#ccc] leading-[1.9] mb-10">
        A beautiful piece of jewelry is an investment. The difference between a piece that looks stunning after ten years and one that tarnishes within months often comes down to a few simple habits. This is the complete L.O.C care guide.
      </p>

      <h3 className="font-playfair text-2xl font-semibold mb-6">Daily <em className="italic text-gold">Wearing</em> Habits</h3>
      {steps.slice(0,4).map((s) => <CareStep key={s.num} {...s} />)}

      <h3 className="font-playfair text-2xl font-semibold mt-10 mb-6">Cleaning Your <em className="italic text-gold">L.O.C Jewelry</em></h3>
      {steps.slice(4).map((s) => <CareStep key={s.num} {...s} />)}

      <h3 className="font-playfair text-2xl font-semibold mt-10 mb-4">
        <em className="italic text-gold">Storage</em> Best Practices in Nigeria's Climate
      </h3>
      <p className="font-cormorant italic text-lg text-[#ccc] leading-[1.9] mb-6">
        Lagos's humid tropical climate is harder on jewelry than most people realize. Heat and humidity accelerate tarnishing, loosen adhesives in settings, and cause certain metals to oxidize faster.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-6">
          <h4 className="font-montserrat text-[0.72rem] tracking-[0.2em] uppercase text-green-400 mb-4">✓ Do This</h4>
          <ul className="space-y-2">
            {dos.map((d) => (
              <li key={d} className="flex items-start gap-2 font-montserrat text-[0.82rem] text-[#ccc]">
                <FaCheck className="text-green-400 mt-0.5 flex-shrink-0" size={11} />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-6">
          <h4 className="font-montserrat text-[0.72rem] tracking-[0.2em] uppercase text-red-400 mb-4">✕ Never Do This</h4>
          <ul className="space-y-2">
            {donts.map((d) => (
              <li key={d} className="flex items-start gap-2 font-montserrat text-[0.82rem] text-[#ccc]">
                <FaXmark className="text-red-400 mt-0.5 flex-shrink-0" size={11} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TipBox title="✦ L.O.C Care Promise">
        Every L.O.C piece is designed and finished to last years with proper care. If you ever have questions about maintaining your specific piece, message us directly on WhatsApp.
        <a href={WA_CARE} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 bg-gold text-black px-5 py-2.5 rounded font-montserrat text-[0.65rem] tracking-[0.15em] uppercase font-bold no-underline hover:bg-gold-light transition-colors">
          <FaWhatsapp size={13} /> Ask Us on WhatsApp
        </a>
      </TipBox>
    </div>
  )
}

function TabTrends() {
  const trends = [
    { num: 1, name: 'Chunky Gold Everything',          tagline: 'Maximalist · Bold · Unapologetic', desc: 'The minimalism of the 2010s is over. 2026 Lagos is wearing bold, chunky gold — oversized hoops, thick chain necklaces, wide cuffs. This trend is a declaration: Nigerian women and men are done being subtle. The bigger the gold, the more confidence. Think Afrobeats energy translated into jewelry.', tip: 'Let the jewelry be the hero. Pair chunky gold with a clean, minimal outfit — white, black, or cream — so the pieces command full attention.' },
    { num: 2, name: 'Heritage Revival: Beads & Coral', tagline: 'Cultural · Proud · Rooted',           desc: 'A powerful cultural reclamation is happening in Nigerian fashion. Coral beads — once strictly traditional — are being worn with contemporary outfits. Waist beads are being worn under fashion-forward silhouettes. Igbo, Yoruba, and Benin jewelry motifs are being reimagined in modern gold settings.', tip: 'Mix one heritage piece — a coral bead necklace, a beaded cuff — with contemporary jewelry. The contrast between old and new is what makes the look extraordinary.' },
    { num: 3, name: 'The Ring Stack',                  tagline: 'Layered · Mixed Metals · Artistic',  desc: 'Single rings are for 2020. In 2026 Lagos, the look is 3–5 rings across both hands — mixing gold, rose gold, and silver; combining thick bands with thin ones; pairing gemstone rings with plain polished bands. The hand becomes a canvas. Top Lagos stylists are calling it "hand art."', tip: 'Keep one "statement" ring (thicker, more detailed) and build around it with thinner bands. Leave at least one finger bare for balance. Mix metals — it is intentional, not accidental.' },
    { num: 4, name: "Men's Jewelry Moment",            tagline: 'Chains · Rings · Earrings · Confident', desc: 'Nigerian men in 2026 are embracing jewelry with a confidence that is reshaping fashion conversations. Thick gold chains over agbada and native wear. Single stud earrings at corporate events. Signet rings as everyday accessories. The modern Nigerian man understands that fine jewelry is not feminine — it is power.', tip: 'Start with one statement chain or bracelet. A gold Cuban link over a plain white or black native looks extraordinary. Add a ring for events. Build your collection gradually — each piece should mean something.' },
  ]
  const occasions = [
    { label: "Valentine's Day & Anniversaries",    detail: 'Rose gold pieces, heart motifs, and matching sets' },
    { label: 'Traditional Weddings (Owambe)',       detail: 'Bold gold statement pieces, coral, layered necklaces' },
    { label: 'Corporate Promotions & Milestones',   detail: 'Signet rings, elegant pendants, professional cuffs' },
    { label: 'Graduations & Birthdays',             detail: 'Personalized charm bracelets, drop earrings, stacking rings' },
    { label: 'Self-Purchase ("Treat Yourself")',    detail: 'The fastest growing category. Because you deserve it.' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleHero
        bg="from-[#0a0a0a] via-[#181510] to-[#0f0f0f]"
        subtitle="Lagos · Nigeria · 2026"
        svg={
          <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
            <text x="10" y="55" fontFamily="serif" fontSize="36" fontWeight="bold" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.8">Lagos</text>
            <path d="M5 70 L135 70" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
          </svg>
        }
      />
      <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-3">✦ 2026 Report ✦</span>
      <h2 className="font-playfair font-bold text-[clamp(1.8rem,3vw,2.4rem)] leading-snug mb-4">
        Top Jewelry Trends <em className="italic text-gold">in Lagos 2026</em>
      </h2>
      <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
      <p className="font-cormorant italic text-lg text-[#ccc] leading-[1.9] mb-10">
        Lagos sets the tone for fashion across West Africa. What Lekki wears today, the continent follows tomorrow. In 2026, Lagos's jewelry trends reflect a generation that is deeply proud of its Nigerian identity while moving confidently on the global stage.
      </p>

      {trends.map((t) => <TrendCard key={t.num} {...t} />)}

      <h3 className="font-playfair text-2xl font-semibold mt-10 mb-4">
        The Gift Occasion <em className="italic text-gold">Calendar</em> for 2026
      </h3>
      <div className="space-y-3 mb-12">
        {occasions.map(({ label, detail }) => (
          <div key={label} className="flex items-center gap-4 p-4 bg-gold/4 rounded-xl">
            <span className="text-gold text-lg">✦</span>
            <div className="font-montserrat text-[0.82rem]">
              <strong className="text-white">{label}</strong>
              <span className="text-[#888]"> — {detail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center p-12 bg-gold/4 border border-gold/15 rounded-xl">
        <h3 className="font-playfair text-2xl font-semibold mb-3">
          Ready to Find Your <em className="italic text-gold">Signature Piece?</em>
        </h3>
        <p className="text-[#888] text-sm mb-6">Browse the L.O.C Collection or speak directly with our team about custom designs.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/products"
            className="bg-gold text-black px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-bold rounded-sm transition-all hover:bg-gold-light no-underline">
            Shop Collection
          </Link>
          <a href={WA_BLOG} target="_blank" rel="noreferrer"
            className="border border-white/30 text-white px-9 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-semibold rounded-sm transition-all hover:border-gold hover:text-gold no-underline">
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function ArticleHero({ bg, subtitle, svg }) {
  return (
    <div className={`w-full h-64 rounded-xl mb-8 relative overflow-hidden flex items-center justify-center bg-gradient-to-br ${bg}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(201,168,76,0.12),transparent_65%)]" />
      <div className="relative z-10">{svg}</div>
      <div className="absolute bottom-5 left-0 right-0 text-center">
        <span className="font-montserrat text-[0.6rem] tracking-[0.3em] uppercase text-gold/70">{subtitle}</span>
      </div>
    </div>
  )
}

/* ─── Main Blog Page ─── */

const TABS = [
  { id: 'types',    label: 'Types & Colors',       Component: TabTypes },
  { id: 'elevate',  label: 'Elevate Your Fashion', Component: TabElevate },
  { id: 'maintain', label: 'Care & Maintenance',   Component: TabMaintain },
  { id: 'trends',   label: 'Lagos Trends 2026',    Component: TabTrends },
]

export default function Blog() {

  const [active, setActive] = useState('types')
  const tabRef = useRef(null)
  const contentRef = useRef(null)

  const handleTabClick = (id) => {
    setActive(id)
    // Use setTimeout to ensure state is updated before scrolling
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)
  }

  const { Component } = TABS.find((t) => t.id === active)

  return (
    <div className="pt-20 ">

      {/* Page header */}
      <div className="py-24 px-[5vw] bg-[#1a1a1a] text-center">
        <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-4">✦ Style & Inspiration ✦</span>
        <h1 className="font-playfair font-bold text-[clamp(2rem,4vw,3.5rem)] leading-snug">
          The L.O.C <em className="italic text-gold">Journal</em>
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mx-auto mt-6 mb-5" />
        <p className="text-[#888] text-sm max-w-lg mx-auto leading-relaxed">
          Everything you need to know about jewelry — types, colors, how to wear it with confidence, and how to keep it flawless forever.
        </p>
      </div>

      {/* Tab bar */}
      <div ref={tabRef} className="bg-black border-b border-gold/12 sticky top-20 z-40">
        <div className="flex overflow-x-auto hide-scrollbar px-[5vw]">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`font-montserrat text-[0.68rem] tracking-[0.18em] uppercase font-semibold
                          px-8 py-5 whitespace-nowrap border-b-2 transition-all duration-300 flex-shrink-0 cursor-pointer bg-transparent
                          ${active === id
                            ? 'text-gold border-gold'
                            : 'text-[#888] border-transparent hover:text-gold-light'
                          }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <section ref={contentRef} className="bg-deep py-16 px-[5vw]">
        <div key={active} className="animate-fadeIn">
          <Component />
        </div>

        {/* Newsletter */}
        <div className="max-w-[1200px] mx-auto mt-20 bg-gradient-to-br from-gold/8 to-gold/3 border border-gold/20 rounded-xl p-12 flex flex-wrap items-center justify-between gap-8 overflow-hidden">

          <div>
            <h3 className="font-playfair font-bold text-3xl mb-2">
              Stay <em className="italic text-gold">Inspired</em>
            </h3>
            <p className="text-[#888] text-sm">
              Join the L.O.C community. Get style tips, new arrivals & exclusive offers.
            </p>
          </div>

          <div className="flex justify-center w-full sm:w-auto">
            <div className="flex w-full max-w-full sm:w-auto">

              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 border-r-0 text-white px-6 py-3.5 font-montserrat text-[0.8rem] outline-none rounded-l focus:border-gold/50 placeholder-[#888] w-full sm:w-64 transition-colors"
              />

              <button className="bg-gold text-black px-6 py-3.5 font-montserrat text-[0.65rem] tracking-[0.18em] uppercase font-bold rounded-r hover:bg-gold-light transition-colors whitespace-nowrap">
                Subscribe
              </button>

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}