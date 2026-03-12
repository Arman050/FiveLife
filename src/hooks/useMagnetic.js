import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMagnetic(strength = 0.4) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 20 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20 })

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    rawX.set((e.clientX - cx) * strength)
    rawY.set((e.clientY - cy) * strength)
  }, [rawX, rawY, strength])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { ref, x, y, onMouseMove, onMouseLeave }
}
