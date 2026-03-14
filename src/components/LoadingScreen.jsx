import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 12
      })
    }, 90)
    return () => clearInterval(interval)
  }, [])

  const pct = Math.min(100, Math.round(progress))

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: '#06060D' }}
    >
      {/* CRT scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 6px)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Deep glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,15,200,0.35) 0%, transparent 65%)',
        filter: 'blur(80px)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Corner brackets */}
      {[
        { top: 20, left: 20,   borderTop: true,    borderLeft: true    },
        { top: 20, right: 20,  borderTop: true,    borderRight: true   },
        { bottom: 20, left: 20,  borderBottom: true, borderLeft: true    },
        { bottom: 20, right: 20, borderBottom: true, borderRight: true   },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 40, height: 40,
          ...pos,
          borderStyle: 'solid',
          borderColor: 'rgba(168,85,247,0.4)',
          borderTopWidth:    pos.borderTop    ? 2 : 0,
          borderLeftWidth:   pos.borderLeft   ? 2 : 0,
          borderRightWidth:  pos.borderRight  ? 2 : 0,
          borderBottomWidth: pos.borderBottom ? 2 : 0,
          zIndex: 3,
        }} />
      ))}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              width: 64, height: 64,
              background: 'linear-gradient(135deg, #5C0FAB, #9333EA)',
              border: '1px solid rgba(168,85,247,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              position: 'relative',
            }}
          >
            {/* Rotating border */}
            <motion.div
              style={{
                position: 'absolute',
                inset: -4,
                border: '1px solid rgba(168,85,247,0.4)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.4rem',
              letterSpacing: '0.1em',
              color: '#fff',
            }}>FL</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '4rem',
              letterSpacing: '0.14em',
              color: '#fff',
              lineHeight: 1,
              marginBottom: '0.25rem',
              textShadow: '0 0 40px rgba(168,85,247,0.4)',
            }}
          >
            FIVELIFE RP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              color: '#8B5CF6',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
            }}
          >
            GTA V · Roleplay · Serious
          </motion.p>

          {/* Horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              height: '1px',
              width: '200px',
              background: 'linear-gradient(90deg, transparent, #A855F7, transparent)',
              boxShadow: '0 0 8px rgba(168,85,247,0.6)',
              marginBottom: '2.5rem',
            }}
          />

          {/* Loading text + percentage */}
          <div className="flex items-center justify-between w-64 mb-2">
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              color: 'rgba(168,85,247,0.6)',
              textTransform: 'uppercase',
            }}>Chargement</span>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1rem',
              letterSpacing: '0.08em',
              color: '#A855F7',
            }}>{pct}%</span>
          </div>

          {/* Progress bar */}
          <div style={{
            width: '256px',
            height: '3px',
            background: 'rgba(168,85,247,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #6A0DAD, #A855F7)',
                boxShadow: '0 0 10px rgba(168,85,247,0.9)',
                width: `${pct}%`,
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>

          {/* Status message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              color: 'rgba(140,110,180,0.55)',
              textTransform: 'uppercase',
              marginTop: '1.25rem',
            }}
          >
            {pct < 30 ? 'Initialisation des ressources…'
              : pct < 60 ? 'Chargement des assets RP…'
              : pct < 90 ? 'Connexion au serveur…'
              : 'Bienvenue à Los Santos'}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(168,85,247,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.52rem',
          letterSpacing: '0.14em',
          color: 'rgba(100,70,150,0.5)',
          textTransform: 'uppercase',
        }}>FiveLife RP © 2026</span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem',
          color: 'rgba(168,85,247,0.4)',
          letterSpacing: '0.04em',
        }}>discord.gg/k5QXH7yZAZ</span>
      </div>
    </div>
  )
}
