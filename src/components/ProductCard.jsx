import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function ProductCard({ product }) {
  const { slug, name, subtitle, price, originalPrice, gradient, tag, tagColor } = product

  const tagColorMap = {
    bestseller: 'bg-terracotta-500 text-cream-50',
    new:        'bg-sage-500 text-cream-50',
    limited:    'bg-rose-500 text-cream-50',
  }

  return (
    <div className="product-card group">
      {/* Image Area */}
      <Link to={`/boutique/${slug}`} className="block relative">
        <div
          className={`w-full aspect-[3/4] bg-gradient-to-br ${gradient} candle-placeholder`}
        >
          {/* Candle SVG decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CandleIllustration />
          </div>
        </div>

        {/* Tag */}
        {tag && (
          <span className={`absolute top-3 left-3 tag-badge ${tagColorMap[tagColor] || 'bg-warm-800 text-cream-50'}`}>
            {tag}
          </span>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-warm-800 text-cream-50 py-3 px-4 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-jost text-sm font-medium tracking-wide">
          <ShoppingBagIcon className="w-4 h-4" />
          <span>Ajouter au panier</span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/boutique/${slug}`}>
          <h3 className="font-playfair text-base font-medium text-warm-800 hover:text-terracotta-500 transition-colors leading-snug">
            {name}
          </h3>
        </Link>
        {subtitle && (
          <p className="font-jost text-sm text-warm-400 mt-0.5">{subtitle}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-jost font-medium text-warm-800">{price}</span>
          {originalPrice && (
            <span className="font-jost text-sm text-warm-300 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

function CandleIllustration() {
  return (
    <svg
      viewBox="0 0 80 160"
      className="w-16 h-auto opacity-20 drop-shadow-lg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flame */}
      <ellipse cx="40" cy="12" rx="6" ry="10" fill="#FFD580" opacity="0.8" />
      <ellipse cx="40" cy="16" rx="3" ry="6" fill="#FF9D3A" opacity="0.9" />
      {/* Wick */}
      <line x1="40" y1="22" x2="40" y2="30" stroke="#3D342F" strokeWidth="1.5" />
      {/* Candle body */}
      <rect x="26" y="30" width="28" height="120" rx="3" fill="white" opacity="0.6" />
      {/* Drip */}
      <path d="M36 34 Q34 42 35 50" stroke="white" strokeWidth="2" opacity="0.4" />
    </svg>
  )
}
