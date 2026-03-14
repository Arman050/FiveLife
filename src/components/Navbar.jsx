import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const navLinks = [
  { label: 'Boutique', href: '/boutique' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass shadow-soft' : 'bg-cream-50 border-b border-warm-100'
      }`}
    >
      <div className="container-momi">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-playfair font-semibold tracking-tight text-warm-800 group-hover:text-terracotta-500 transition-colors">
                Momi Candles
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-jost text-sm tracking-wide link-underline transition-colors ${
                  location.pathname === link.href
                    ? 'text-terracotta-500 font-medium'
                    : 'text-warm-700 hover:text-warm-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="p-2 text-warm-600 hover:text-warm-900 transition-colors"
              aria-label="Rechercher"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <Link
              to="/boutique"
              className="relative p-2 text-warm-600 hover:text-warm-900 transition-colors"
              aria-label="Panier"
            >
              <ShoppingBagIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/boutique"
              className="relative p-2 text-warm-600 hover:text-warm-900 transition-colors"
              aria-label="Panier"
            >
              <ShoppingBagIcon className="w-5 h-5" />
            </Link>
            <button
              className="p-2 text-warm-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen
                ? <XMarkIcon className="w-6 h-6" />
                : <Bars3Icon className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(4rem+2.4rem)] bg-cream-50 z-40 flex flex-col">
          <nav className="container-momi py-8 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-jost text-lg py-3 border-b border-warm-100 transition-colors ${
                  location.pathname === link.href
                    ? 'text-terracotta-500 font-medium'
                    : 'text-warm-800 hover:text-terracotta-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="container-momi py-4">
            <Link to="/boutique" className="btn-primary w-full text-center block">
              Voir la boutique
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
