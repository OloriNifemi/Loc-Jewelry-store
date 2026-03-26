import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FaInstagram, FaTiktok, FaXTwitter, FaLocationDot, FaPhone, FaClock, FaPenToSquare } from 'react-icons/fa6'

const WA = 'https://wa.me/2349116971778?text=Hi,%20I%20am%20interested%20in%20your%20jewelry'

const details = [
  { Icon: FaPhone,       label: 'Phone',         value: '+234 911 697 1778' },
  { Icon: FaLocationDot, label: 'Location',       value: 'Lagos, Nigeria' },
  { Icon: FaClock,       label: 'Hours',          value: 'Mon – Sat: 9am – 7pm WAT' },
  { Icon: FaPenToSquare, label: 'Custom Orders',  value: 'Available via WhatsApp' },
]

const socials = [
  { Icon: FaInstagram, label: 'Instagram', href: '#' },
  { Icon: FaTiktok,    label: 'TikTok',    href: '#' },
  { Icon: FaXTwitter,  label: 'X',         href: '#' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="py-24 px-[5vw] bg-[#1a1a1a] text-center">
        <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-4">✦ Get in Touch ✦</span>
        <h1 className="font-playfair font-bold text-[clamp(2rem,4vw,3.5rem)] leading-snug">
          Connect With <em className="italic text-gold">L.O.C</em>
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
      </div>

      <section className="py-20 px-[5vw]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* Left — info */}
          <div>
            <span className="font-montserrat text-[0.6rem] tracking-[0.35em] uppercase text-gold block mb-4">✦ Reach Us ✦</span>
            <h2 className="font-playfair font-bold text-[2rem] leading-snug mb-6">
              We'd love to <em className="italic text-gold">hear</em><br />from you
            </h2>
            <p className="font-cormorant italic text-lg text-[#ccc] leading-[1.8] mb-8">
              Reach out for inquiries, custom orders, or collaborations. We're always excited to bring your vision to life.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-black px-8 py-4 rounded-lg font-montserrat text-[0.8rem] tracking-[0.1em] uppercase font-bold mb-8 no-underline transition-all duration-300 hover:bg-[#22c55e] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)] w-fit"
            >
              <FaWhatsapp size={22} />
              Message Us on WhatsApp
            </a>

            {/* Contact details */}
            <div className="mb-8 divide-y divide-white/5">
              {details.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 py-4">
                  <div className="w-9 h-9 bg-gold/10 border border-gold/20 rounded flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="font-montserrat text-[0.6rem] tracking-[0.15em] uppercase text-gold font-semibold min-w-[90px]">
                      {label}
                    </span>
                    <span className="font-montserrat text-[0.85rem] text-[#ccc]">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-4 font-semibold">
                Follow Us
              </div>
              <div className="flex gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[#ccc]
                               border border-white/10 hover:border-gold hover:text-gold
                               hover:-translate-y-0.5 transition-all duration-300 no-underline"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-gold font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Amaka Johnson"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white/4 border border-white/8 text-white px-5 py-4 font-montserrat text-[0.85rem] outline-none rounded-lg transition-all focus:border-gold/50 focus:bg-white/7 placeholder-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-gold font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white/4 border border-white/8 text-white px-5 py-4 font-montserrat text-[0.85rem] outline-none rounded-lg transition-all focus:border-gold/50 focus:bg-white/7 placeholder-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-gold font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Custom Order Inquiry"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="bg-white/4 border border-white/8 text-white px-5 py-4 font-montserrat text-[0.85rem] outline-none rounded-lg transition-all focus:border-gold/50 focus:bg-white/7 placeholder-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-montserrat text-[0.6rem] tracking-[0.2em] uppercase text-gold font-semibold">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us about the piece you have in mind, your budget, or any questions you have..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-white/4 border border-white/8 text-white px-5 py-4 font-montserrat text-[0.85rem] outline-none rounded-lg transition-all focus:border-gold/50 focus:bg-white/7 placeholder-white/20 resize-y"
                />
              </div>

              <button
                type="submit"
                className={`mt-2 px-8 py-4 font-montserrat text-[0.7rem] tracking-[0.2em] uppercase font-bold rounded-lg transition-all duration-300
                  ${submitted
                    ? 'bg-green-500 text-black cursor-default'
                    : 'bg-gold text-black hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.35)]'
                  }`}
              >
                {submitted ? 'Message Sent ✓' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}
