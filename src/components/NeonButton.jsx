import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function NeonButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
  disabled = false,
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-30, 30], [8, -8])
  const rotateY = useTransform(x, [-60, 60], [-8, 8])

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { rotateX, rotateY, transformPerspective: 600 },
    whileTap: { scale: 0.97 },
    className: `${cls} ${className} inline-flex items-center justify-center gap-2`,
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}
        style={{ ...motionProps.style, textDecoration: 'none' }}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  )
}
