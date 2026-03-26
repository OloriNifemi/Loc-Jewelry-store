import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-off-white">
      <Navbar />
      <ScrollToTop /> {/* ensures every page starts from top */} 
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog"     element={<Blog />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
