import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  delay = 0,
  onClick,
  style = {},
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -3, transition: { duration: 0.15, ease: 'easeOut' } } : {}}
      onClick={onClick}
      className={`glass ${glow ? 'glass-glow' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}
