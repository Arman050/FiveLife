import { useState, useEffect } from 'react'

const messages = [
  "🕯️ Livraison offerte dès 45€ en France",
  "✨ Fabriquées à la main avec amour",
  "📦 Expédition sous 2-3 jours ouvrés",
  "🌿 Cire naturelle de stéarine — 100% vegan",
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent(c => (c + 1) % messages.length)
        setFade(true)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="announcement-bar">
      <p
        className="transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {messages[current]}
      </p>
    </div>
  )
}
