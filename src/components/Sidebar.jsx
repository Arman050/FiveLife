import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  DocumentTextIcon,
  ScaleIcon,
  FireIcon,
  LightBulbIcon,
  TruckIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const NAV_GROUPS = [
  {
    label: 'Navigation',
    items: [
      { path: '/',                  label: 'Accueil',          icon: HomeIcon,                emoji: '⌂' },
    ],
  },
  {
    label: 'Règlements',
    items: [
      { path: '/reglement-global',  label: 'Règlement Global', icon: DocumentTextIcon,        emoji: '▪' },
      { path: '/reglement-legal',   label: 'Légal',            icon: ScaleIcon,               emoji: '▪' },
      { path: '/reglement-illegal', label: 'Illégal',          icon: FireIcon,                emoji: '▪' },
      { path: '/hrp-rp',            label: 'HRP / RP',         icon: LightBulbIcon,           emoji: '▪' },
    ],
  },
  {
    label: 'Métiers',
    items: [
      { path: '/ambulance-sams',    label: 'SAMS',             icon: TruckIcon,               emoji: '▪' },
      { path: '/sasp-police',       label: 'SASP Police',      icon: ShieldCheckIcon,         emoji: '▪' },
      { path: '/entreprises',       label: 'Entreprises',      icon: BuildingOfficeIcon,      emoji: '▪' },
    ],
  },
  {
    label: 'Autres',
    items: [
      { path: '/sanctions',         label: 'Sanctions',        icon: ExclamationTriangleIcon, emoji: '▪' },
      { path: '/faq-contact',       label: 'FAQ & Contact',    icon: ChatBubbleLeftRightIcon, emoji: '▪' },
    ],
  },
]

// Flat list for legacy compat
const NAV = NAV_GROUPS.flatMap(g => g.items)

const sidebarVariants = {
  open:   { x: 0,    opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 38 } },
  closed: { x: -300, opacity: 0, transition: { type: 'spring', stiffness: 350, damping: 38 } },
}

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) setIsOpen(false)
  }, [location.pathname, isMobile, setIsOpen])

  return (
    <>
      {/* ── Hamburger ─────────────────────────── */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="fixed top-4 left-4 z-[60] transition-all hover:scale-105 active:scale-95"
        aria-label="Toggle navigation"
        style={{
          padding: '0.5rem',
          background: 'rgba(10,4,22,0.92)',
          border: '1px solid rgba(168,85,247,0.35)',
          color: '#A855F7',
          cursor: 'pointer',
        }}
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
          {isOpen
            ? <XMarkIcon className="w-5 h-5" />
            : <Bars3Icon className="w-5 h-5" />
          }
        </motion.div>
      </button>

      {/* ── Overlay ───────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar Panel ─────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-full w-[278px] z-50 flex flex-col sidebar-scroll overflow-y-auto"
            style={{
              background: '#08040F',
              borderRight: '1px solid rgba(168,85,247,0.22)',
              boxShadow: '6px 0 40px rgba(0,0,0,0.8), 2px 0 0 rgba(168,85,247,0.12)',
            }}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Vertical accent line */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, transparent 0%, #A855F7 20%, #6A0DAD 80%, transparent 100%)',
              boxShadow: '0 0 12px rgba(168,85,247,0.5)',
            }} />

            {/* ── Logo ─────────────────────────── */}
            <div className="px-5 pt-5 pb-4 mt-14" style={{ paddingLeft: '1.5rem' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{
                    width: 38, height: 38,
                    border: '1px solid rgba(168,85,247,0.5)',
                    flexShrink: 0,
                    borderRadius: 6,
                  }}
                >
                  <img
                    src="/logo1.png"
                    alt="FiveLife RP"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2"
                    style={{ borderColor: '#08040F' }}
                  />
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.4rem',
                    letterSpacing: '0.14em',
                    color: '#fff',
                    lineHeight: 1,
                  }}>FIVELIFE</p>
                  <p style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    color: '#8B5CF6',
                    textTransform: 'uppercase',
                  }}>RP · Serious · FiveM</p>
                </div>
              </motion.div>

              {/* Thin rule */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5) 50%, transparent)',
                marginTop: '1rem',
              }} />
            </div>

            {/* ── Nav ──────────────────────────── */}
            <nav className="flex-1 pb-4" style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}>
              {NAV_GROUPS.map((group, gi) => (
                <div key={gi} className="mb-3">
                  {/* Group label */}
                  <p style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.52rem',
                    letterSpacing: '0.22em',
                    color: 'rgba(100,70,150,0.7)',
                    textTransform: 'uppercase',
                    padding: '0.4rem 0.6rem',
                    marginBottom: '2px',
                  }}>{group.label}</p>

                  {group.items.map((item, i) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    const globalIdx = NAV.findIndex(n => n.path === item.path)

                    return (
                      <motion.div
                        key={item.path}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: globalIdx * 0.03, type: 'spring', stiffness: 400, damping: 32 }}
                      >
                        <NavLink
                          to={item.path}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            padding: '0.55rem 0.75rem',
                            textDecoration: 'none',
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: isActive ? 700 : 500,
                            fontSize: '0.95rem',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: isActive ? '#E4CAFF' : 'rgba(160,130,200,0.65)',
                            background: isActive
                              ? 'linear-gradient(90deg, rgba(100,15,180,0.35) 0%, rgba(80,10,140,0.15) 100%)'
                              : 'transparent',
                            borderLeft: isActive
                              ? '3px solid #A855F7'
                              : '3px solid transparent',
                            boxShadow: isActive ? 'inset 0 0 20px rgba(168,85,247,0.06)' : 'none',
                            transition: 'all 0.18s ease',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.color = 'rgba(200,170,240,0.9)'
                              e.currentTarget.style.background = 'rgba(80,10,140,0.12)'
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              e.currentTarget.style.color = 'rgba(160,130,200,0.65)'
                              e.currentTarget.style.background = 'transparent'
                            }
                          }}
                        >
                          <Icon
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: isActive ? '#A855F7' : 'rgba(100,70,150,0.7)' }}
                          />
                          <span>{item.label}</span>

                          {isActive && (
                            <motion.span
                              layoutId="activeIndicator"
                              style={{
                                marginLeft: 'auto',
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '0.5rem',
                                color: '#A855F7',
                                letterSpacing: '0.1em',
                              }}
                            >
                              ◆
                            </motion.span>
                          )}
                        </NavLink>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </nav>

            {/* ── Footer ───────────────────────── */}
            <div className="px-5 pb-5">
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.45) 50%, transparent)',
                marginBottom: '1rem',
              }} />

              {/* Status */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="pulse-dot" />
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.85rem',
                  letterSpacing: '0.06em',
                  color: 'rgba(160,130,200,0.7)',
                  textTransform: 'uppercase',
                }}>
                  Serveur <span style={{ color: '#22c55e', fontWeight: 700 }}>EN LIGNE</span>
                </span>
              </div>

              {/* Discord button */}
              <a
                href="https://discord.gg/k5QXH7yZAZ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block text-center mb-3"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                ▶ Rejoindre Discord
              </a>


              <p style={{
                textAlign: 'center',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                color: 'rgba(80,60,110,0.6)',
                marginTop: '0.75rem',
                textTransform: 'uppercase',
              }}>
                © 2026 FiveLife RP
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
