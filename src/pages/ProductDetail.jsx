import { useParams, Link } from 'react-router-dom'
import { ArrowLongLeftIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { getProductBySlug, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#FDFAF6' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#2C2420' }}>Produit introuvable</h1>
        <Link to="/boutique" className="btn-primary">Retour à la boutique</Link>
      </div>
    )
  }

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div style={{ background: '#FDFAF6' }}>
      {/* Breadcrumb */}
      <div className="container-momi pt-8">
        <Link
          to="/boutique"
          className="inline-flex items-center gap-2 font-jost text-sm link-underline transition-colors"
          style={{ color: '#7C6F67' }}
        >
          <ArrowLongLeftIcon className="w-5 h-5" />
          Retour à la boutique
        </Link>
      </div>

      {/* Product Detail */}
      <div className="container-momi py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div
              className={`w-full aspect-square rounded-sm bg-gradient-to-br ${product.gradient} shadow-strong relative overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg viewBox="0 0 200 300" className="w-1/2 h-auto" fill="none">
                  <ellipse cx="100" cy="20" rx="10" ry="18" fill="#FFD580" opacity="0.7" />
                  <line x1="100" y1="38" x2="100" y2="56" stroke="#3D342F" strokeWidth="2" />
                  <rect x="70" y="56" width="60" height="200" rx="5" fill="white" opacity="0.5" />
                </svg>
              </div>
            </div>
            {product.tag && (
              <span
                className="absolute top-4 left-4 tag-badge text-cream-50"
                style={{ background: product.tagColor === 'bestseller' ? '#C4724A' : product.tagColor === 'new' ? '#8B9E7A' : '#D4899A' }}
              >
                {product.tag}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="sticky top-32">
            <p className="font-jost text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#A09690' }}>
              {product.category === 'chandelles' ? 'Bougies Chandelles' : product.category === 'coffrets' ? 'Coffrets Cadeaux' : 'Bougies Parfumées'}
            </p>
            <h1 className="font-playfair text-3xl md:text-4xl font-semibold leading-tight mb-2" style={{ color: '#2C2420' }}>
              {product.name}
            </h1>
            <p className="font-jost mb-4" style={{ color: '#7C6F67' }}>{product.subtitle}</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <StarSolid key={s} className="w-4 h-4" style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <span className="font-jost text-sm" style={{ color: '#A09690' }}>4.9 (124 avis)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-playfair text-3xl font-semibold" style={{ color: '#2C2420' }}>{product.price}</span>
              {product.originalPrice && (
                <span className="font-jost text-lg line-through" style={{ color: '#C8C0BB' }}>{product.originalPrice}</span>
              )}
            </div>

            <p className="font-jost leading-relaxed mb-8" style={{ color: '#7C6F67' }}>
              {product.description}
            </p>

            {/* Add to cart */}
            <button className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base mb-4">
              <ShoppingBagIcon className="w-5 h-5" />
              Ajouter au panier
            </button>
            <button className="btn-secondary w-full py-4 text-base">
              Acheter maintenant
            </button>

            {/* Product Details */}
            <div className="mt-10 space-y-4 pt-8" style={{ borderTop: '1px solid #E8DCC8' }}>
              {[
                { label: 'Dimensions', value: product.dimensions },
                { label: 'Durée de combustion', value: product.burn },
                { label: 'Matériaux', value: product.material },
              ].map(detail => (
                <div key={detail.label} className="flex gap-4">
                  <span className="font-jost text-sm font-medium w-36 flex-shrink-0" style={{ color: '#2C2420' }}>{detail.label}</span>
                  <span className="font-jost text-sm" style={{ color: '#7C6F67' }}>{detail.value}</span>
                </div>
              ))}
            </div>

            {/* Care Note */}
            <div className="mt-6 p-4 rounded-sm" style={{ background: '#FAF5EC', border: '1px solid #EDE0C4' }}>
              <p className="font-jost text-xs leading-relaxed" style={{ color: '#7C6F67' }}>
                <strong className="font-medium" style={{ color: '#2C2420' }}>Conseil d'entretien :</strong>{' '}
                Taillez la mèche à 5 mm avant chaque utilisation. Ne laissez jamais une bougie allumée sans surveillance.
                Les légères variations de couleur font partie du charme artisanal de chaque pièce.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="py-16" style={{ background: '#FAF5EC' }}>
          <div className="container-momi">
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-8 text-center" style={{ color: '#2C2420' }}>
              Vous pourriez aussi aimer
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
