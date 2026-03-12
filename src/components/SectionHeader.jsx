import { motion } from 'framer-motion'

export default function SectionHeader({ emoji, title, subtitle, center = false, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${center ? 'text-center' : ''} ${className}`}
    >
      {emoji && (
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          color: '#8B5CF6',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.75rem',
        }}>◆ {emoji}</span>
      )}
      <h2 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        letterSpacing: '0.06em',
        color: '#fff',
        lineHeight: 1,
        marginBottom: subtitle ? '0.5rem' : 0,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '1rem',
          color: 'rgba(180,150,220,0.65)',
          letterSpacing: '0.03em',
          marginTop: '0.4rem',
          maxWidth: '600px',
        }}>
          {subtitle}
        </p>
      )}
      <div className="neon-divider mt-4" />
    </motion.div>
  )
}
