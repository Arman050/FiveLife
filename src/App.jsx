import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnnouncementBar from './components/AnnouncementBar'

const Home          = lazy(() => import('./pages/Home'))
const Shop          = lazy(() => import('./pages/Shop'))
const About         = lazy(() => import('./pages/About'))
const Blog          = lazy(() => import('./pages/Blog'))
const Contact       = lazy(() => import('./pages/Contact'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="flex flex-col items-center gap-4">
        <svg className="w-10 h-10 text-terracotta-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="font-jost text-warm-400 text-sm tracking-widest uppercase">Chargement…</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cream-50">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"                    element={<Home />} />
              <Route path="/boutique"            element={<Shop />} />
              <Route path="/boutique/:slug"      element={<ProductDetail />} />
              <Route path="/a-propos"            element={<About />} />
              <Route path="/blog"                element={<Blog />} />
              <Route path="/contact"             element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
