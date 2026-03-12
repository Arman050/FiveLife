import { useEffect, useRef, memo } from 'react'

const COLORS = ['#a855f7', '#c084fc', '#ec4899', '#8b5cf6']
const N = 35
const CONNECT_DIST = 120
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST
const FRAME_MS = 1000 / 45  // ~45 fps cap

function mkParticle(w, h) {
  return {
    x:     Math.random() * w,
    y:     Math.random() * h,
    vx:    (Math.random() - 0.5) * 0.38,
    vy:    (Math.random() - 0.5) * 0.38,
    r:     Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.45 + 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

function ParticleBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })
    let raf, lastTs = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const pts = Array.from({ length: N }, () => mkParticle(canvas.width, canvas.height))

    const draw = (ts) => {
      raf = requestAnimationFrame(draw)
      if (ts - lastTs < FRAME_MS) return
      lastTs = ts

      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Connections — no save/restore, no shadowBlur
      ctx.lineWidth = 0.4
      for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONNECT_DIST_SQ) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.09
            ctx.strokeStyle = '#a855f7'
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Dots — no shadowBlur
      for (let i = 0; i < N; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0

        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
      }}
    />
  )
}

export default memo(ParticleBg)
