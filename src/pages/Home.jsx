import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import NeonButton from '../components/NeonButton'
import AnimatedCounter from '../components/AnimatedCounter'
import {
  DocumentTextIcon, ScaleIcon, FireIcon,
  TruckIcon, ShieldCheckIcon, ExclamationTriangleIcon,
  ArrowRightIcon, SignalIcon,
} from '@heroicons/react/24/outline'

/* ── Typing effect ─────────────────────────────── */
const TITLE_TEXT = "L'immersion absolue commence ici"
function useTyping(text, speed = 45) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return displayed
}

/* ── Nav grid ──────────────────────────────────── */
const QUICK = [
  { icon: DocumentTextIcon, label: 'Règlement Global', desc: 'Règles générales du serveur', path: '/reglement-global', accent: '#A855F7', tag: 'DOCS' },
  { icon: ScaleIcon,         label: 'Légal / SASP',    desc: 'Forces de l\'ordre & droit', path: '/reglement-legal',  accent: '#7B2FBE', tag: 'LÉGAL' },
  { icon: FireIcon,          label: 'Illégal / Crime', desc: 'Organisations criminelles',  path: '/reglement-illegal',accent: '#9333EA', tag: 'CRIME' },
  { icon: ExclamationTriangleIcon, label: 'Sanctions', desc: 'Tableau des sanctions RP',   path: '/sanctions',        accent: '#D4AF37', tag: 'SANC.' },
]

/* ── Features ──────────────────────────────────── */
const FEATURES = [
  { tag: '01', title: 'RP Serious',        desc: 'Jeu de rôle immersif et cohérent. Backstory obligatoire, identité unique, cohérence narrative exigée.' },
  { tag: '02', title: 'Ville Vivante',      desc: '50+ métiers, économie dynamique, événements quotidiens. Staff actif 24h/7j pour l\'immersion maximale.' },
  { tag: '03', title: 'Staff Équitable',    desc: 'Staff impartial et formé. Règlement clair, tickets traités sous 24h, zéro tolérance abus.' },
  { tag: '04', title: 'Perfs Optimisées',   desc: 'Serveur bare-metal haute performance. Scripts optimisés, lag < 15ms, 100+ slots stables.' },
  { tag: '05', title: 'Whitelist Discord',  desc: 'Accès sécurisé via Discord. Entretien IC, formations métiers intégrées, tutoriaux complets.' },
  { tag: '06', title: 'Communauté Active',  desc: 'Forum actif, réseaux sociaux, events hebdomadaires, streams partenaires, galerie photos RP.' },
]

export default function Home() {
  const typed = useTyping(TITLE_TEXT, 42)

  return (
    <PageWrapper title="Accueil" description="FiveLife RP — Serveur GTA V Roleplay Français Serious. L'immersion absolue.">

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-ambient bg-grid">

        {/* Corner UI brackets */}
        <div className="corner-tl" />
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="corner-br" />

        {/* Deep light orbs */}
        <div className="orb orb-purple w-[700px] h-[700px] -top-40 -left-40 opacity-50" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-0 right-1/4 opacity-20" />

        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(-55deg, transparent, transparent 12px, rgba(168,85,247,0.018) 12px, rgba(168,85,247,0.018) 13px)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">

          {/* Server logo — grand, centré, au-dessus du titre */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-6"
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src="/image.png"
                alt="FiveLife RP"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '3px solid rgba(168,85,247,0.7)',
                  boxShadow: '0 0 40px rgba(168,85,247,0.55), 0 0 80px rgba(168,85,247,0.2)',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Glow ring */}
              <div style={{
                position: 'absolute', inset: -6,
                borderRadius: '50%',
                border: '1px solid rgba(168,85,247,0.25)',
                pointerEvents: 'none',
              }} />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="badge badge-purple">
              <span className="pulse-dot w-1.5 h-1.5" />
              Serveur FiveM · GTA V RP · Serious
            </span>
          </motion.div>

          {/* Giant Bebas Neue title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="hero-display mb-2"
              style={{ fontSize: 'clamp(5rem, 16vw, 11rem)' }}
            >
              <span className="text-gradient-static">FIVE</span>
              <span style={{ color: '#fff' }}>LIFE</span>
            </h1>
            <h1
              className="hero-display mb-6"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.35em' }}
            >
              ROLEPLAY
            </h1>
          </motion.div>

          {/* Glow line separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glow-line max-w-xs mx-auto mb-6"
          />

          {/* Typing subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="typing-cursor mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(200,170,255,0.8)',
            }}
          >
            {typed}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <NeonButton
              href="https://discord.gg/k5QXH7yZAZ"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <span style={{ fontSize: '0.9em' }}>▶</span> Rejoindre Discord
            </NeonButton>
            <NeonButton variant="secondary">
              <SignalIcon className="w-3.5 h-3.5" />
              connect.fivelife-rp.com
            </NeonButton>
          </motion.div>

          {/* HUD Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { label: 'Joueurs / Jour', value: 500, suffix: '+', fill: '80%' },
              { label: 'Métiers RP',     value: 50,  suffix: '+', fill: '65%' },
              { label: 'Staff',          value: 24,  suffix: '/7', fill: '100%' },
            ].map((stat, i) => (
              <div key={i}
                className="hud-stat p-3"
                style={{
                  background: 'rgba(10,4,22,0.8)',
                  border: '1px solid rgba(168,85,247,0.2)',
                }}
              >
                <div className="hud-stat-value">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="hud-stat-bar w-full mb-1">
                  <div className="hud-stat-bar-fill" style={{ width: stat.fill }} />
                </div>
                <div className="hud-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            color: 'rgba(168,85,247,0.5)',
            textTransform: 'uppercase',
          }}>Scroll</span>
          <div style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(180deg, rgba(168,85,247,0.6), transparent)',
          }} />
        </motion.div>
      </section>

      {/* ══════════ BANNIÈRE ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden"
        style={{ maxHeight: 320 }}
      >
        <img
          src="/banniere3.png"
          alt="FiveLife RP Banner"
          style={{
            width: '100%',
            height: 320,
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(180deg, #0a0a0a, transparent)',
        }} />
        {/* bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(0deg, #0a0a0a, transparent)',
        }} />
      </motion.div>

      {/* ══════════ QUICK ACCESS ══════════ */}
      <section className="relative py-24 px-6 bg-grid">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="section-label mb-5">Accès Rapide</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              letterSpacing: '0.06em',
              color: '#fff',
              lineHeight: 1,
            }}>
              RÈGLEMENTS & <span className="text-gradient-static">RESSOURCES</span>
            </h2>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(180,150,220,0.7)',
              marginTop: '0.5rem',
              letterSpacing: '0.04em',
            }}>
              Tout le nécessaire pour débuter votre vie à Los Santos, accessible en un clic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link to={item.path} className="block no-underline tactical-card p-5 h-full" style={{ textDecoration: 'none' }}>
                    {/* Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '0.58rem',
                        letterSpacing: '0.18em',
                        color: item.accent,
                        fontWeight: 700,
                      }}>{item.tag}</span>
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{
                          background: `rgba(${item.accent === '#D4AF37' ? '212,175,55' : '168,85,247'},0.12)`,
                          border: `1px solid ${item.accent}40`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.accent }} />
                      </div>
                    </div>

                    <h3 style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#fff',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                    }}>{item.label}</h3>

                    <p style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '0.9rem',
                      color: 'rgba(180,150,220,0.65)',
                      letterSpacing: '0.02em',
                      marginBottom: '1rem',
                    }}>{item.desc}</p>

                    <div className="flex items-center gap-1" style={{ color: item.accent }}>
                      <span style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}>Consulter</span>
                      <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="relative py-24 px-6">
        <div className="orb orb-purple w-96 h-96 left-0 top-1/2 -translate-y-1/2 opacity-20" />
        <div className="max-w-6xl mx-auto relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="section-label mb-5">Pourquoi FiveLife ?</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              letterSpacing: '0.06em',
              color: '#fff',
              lineHeight: 1,
            }}>
              UNE <span className="text-gradient-static">EXPÉRIENCE</span> SANS PAREIL
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass p-6 group hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.2rem',
                    lineHeight: 1,
                    color: 'rgba(168,85,247,0.3)',
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                  }}>{f.tag}</span>
                  <div>
                    <h3 style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: '#fff',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                    }}>{f.title}</h3>
                    <p style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '0.95rem',
                      color: 'rgba(180,150,220,0.65)',
                      lineHeight: 1.55,
                    }}>{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SHOWCASE BANNIÈRE ══════════ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
            style={{
              borderRadius: 16,
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 0 40px rgba(168,85,247,0.15)',
            }}
          >
            <img
              src="/banniere.png"
              alt="FiveLife RP Showcase"
              style={{
                width: '100%',
                maxHeight: 460,
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
            {/* gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(10,4,22,0.7) 0%, transparent 50%, rgba(10,4,22,0.4) 100%)',
              pointerEvents: 'none',
            }} />
            {/* bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
              background: 'linear-gradient(0deg, rgba(10,4,22,0.85), transparent)',
              pointerEvents: 'none',
            }} />
            {/* Overlay text */}
            <div style={{
              position: 'absolute',
              bottom: 28,
              left: 32,
            }}>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                color: 'rgba(168,85,247,0.8)',
                textTransform: 'uppercase',
              }}>— Los Santos, San Andreas</span>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                letterSpacing: '0.07em',
                color: '#fff',
                lineHeight: 1.1,
                marginTop: 4,
              }}>Votre aventure commence ici</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(60,10,120,0.5) 0%, rgba(100,20,180,0.3) 50%, rgba(40,5,90,0.5) 100%)',
              border: '1px solid rgba(168,85,247,0.4)',
              padding: '3rem 2.5rem',
            }}
          >
            {/* Diagonal stripe accent */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(168,85,247,0.025) 20px, rgba(168,85,247,0.025) 21px)',
              }}
            />

            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 16, left: 16, width: 30, height: 30, borderTop: '2px solid rgba(168,85,247,0.5)', borderLeft: '2px solid rgba(168,85,247,0.5)' }} />
            <div style={{ position: 'absolute', top: 16, right: 16, width: 30, height: 30, borderTop: '2px solid rgba(168,85,247,0.5)', borderRight: '2px solid rgba(168,85,247,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16, width: 30, height: 30, borderBottom: '2px solid rgba(168,85,247,0.5)', borderLeft: '2px solid rgba(168,85,247,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 16, right: 16, width: 30, height: 30, borderBottom: '2px solid rgba(168,85,247,0.5)', borderRight: '2px solid rgba(168,85,247,0.5)' }} />

            <div className="relative z-10 text-center">
              <div className="section-label mb-5">Rejoindre le Serveur</div>

              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                letterSpacing: '0.06em',
                color: '#fff',
                lineHeight: 1,
                marginBottom: '1rem',
              }}>
                PRÊT À VIVRE<br />
                <span className="text-gradient-static">L'AVENTURE ?</span>
              </h2>

              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.1rem',
                color: 'rgba(200,170,255,0.65)',
                letterSpacing: '0.04em',
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem',
              }}>
                Rejoignez des centaines de joueurs passionnés et créez votre histoire unique à Los Santos.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <NeonButton
                  href="https://discord.gg/k5QXH7yZAZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  ▶ Rejoindre maintenant
                </NeonButton>
                <NeonButton variant="secondary">
                  <Link to="/reglement-global" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Lire le Règlement
                  </Link>
                </NeonButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo1.png"
              alt="FiveLife RP"
              style={{ width: 32, height: 32, objectFit: 'cover', border: '1px solid rgba(168,85,247,0.4)' }}
            />
            <div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', letterSpacing: '0.12em', color: '#fff' }}>FiveLife RP</p>
              <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', letterSpacing: '0.14em', color: '#8B5CF6', textTransform: 'uppercase' }}>Serveur GTA V Roleplay</p>
            </div>
          </div>
         <p 
            style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontSize: '0.6rem', 
              letterSpacing: '0.1em', 
              color: 'rgba(100,80,140,0.7)' 
            }}
          >
            © 2026{' '}
            <a
              href="https://armatech.be"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
              className="hover:underline transition-all duration-300"
            >
              ArmaTech DEV
            </a>{' '}
            · TOUS DROITS RÉSERVÉS
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/k5QXH7yZAZ"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                color: 'rgba(168,85,247,0.6)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#A855F7'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(168,85,247,0.6)'}
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </PageWrapper>
  )
}
