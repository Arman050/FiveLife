import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div>
      {/* Page Header */}
      <div className="py-16 md:py-20 text-center" style={{ background: '#FAF5EC' }}>
        <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>
          Toutes nos créations
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
          La Boutique
        </h1>
        <div className="section-divider" />
        <p className="font-jost mt-4 max-w-lg mx-auto" style={{ color: '#7C6F67' }}>
          Des bougies artisanales colorées, fabriquées à la main avec amour.
          Chaque pièce est unique et réalisée dans notre atelier parisien.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-[calc(4rem+2.4rem)] z-30 py-4 shadow-soft" style={{ background: 'rgba(253,250,246,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="container-momi">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="font-jost text-sm px-5 py-2 transition-all duration-200"
                style={{
                  background: activeCategory === cat.id ? '#2C2420' : 'transparent',
                  color: activeCategory === cat.id ? '#FDFAF6' : '#7C6F67',
                  border: `1px solid ${activeCategory === cat.id ? '#2C2420' : '#C8C0BB'}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12 md:py-16" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-playfair text-xl" style={{ color: '#A09690' }}>
                Aucun produit dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shipping Info Banner */}
      <div className="py-12" style={{ background: '#FAF5EC' }}>
        <div className="container-momi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚚', title: 'Livraison offerte', desc: 'Dès 45€ en France' },
              { icon: '✋', title: 'Fait main', desc: 'Dans notre atelier à Paris' },
              { icon: '🌿', title: '100% Naturel', desc: 'Cire de stéarine vegan' },
              { icon: '🎁', title: 'Emballage cadeau', desc: 'Inclus à la demande' },
            ].map(item => (
              <div key={item.title} className="text-center py-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-playfair font-medium mb-1" style={{ color: '#2C2420' }}>{item.title}</p>
                <p className="font-jost text-sm" style={{ color: '#A09690' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
