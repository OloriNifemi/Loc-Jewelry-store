// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Navbar />
      <ScrollToTop /> {/* ensures every page starts from top */}

      {/* AnimatePresence handles route animations */}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/products"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Products />
              </motion.div>
            }
          />
          <Route
            path="/blog"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Blog />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
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