// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Navbar />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div {...pageTransition}>
                <About />
              </motion.div>
            }
          />
          <Route
            path="/products"
            element={
              <motion.div {...pageTransition}>
                <Products />
              </motion.div>
            }
          />
          <Route
            path="/blog"
            element={
              <motion.div {...pageTransition}>
                <Blog />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div {...pageTransition}>
                <Contact />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  )
}