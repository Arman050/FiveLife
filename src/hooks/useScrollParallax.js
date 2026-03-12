import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export function useScrollParallax(speed = 0.3) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`])
  return { ref, y }
}
