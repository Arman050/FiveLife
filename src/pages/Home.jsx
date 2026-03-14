import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const featured = products.slice(0, 4)
const coffrets = products.slice(4, 8)

const marqueeItems = [
  '🕯️ Faites à la main',
  '✨ Design scandinave',
  '🌿 Cire naturelle',
  '🎁 Parfait en cadeau',
  '💛 Faites avec amour',
  '♻️ Emballage éco-responsable',
]

const testimonials = [
  {
    name: 'Sophie M.',
    location: 'Paris',
    stars: 5,
    text: "Ces bougies sont absolument magnifiques ! La qualité est exceptionnelle et les couleurs sont exactement comme sur les photos. Je les ai offertes et le résultat était bluffant.",
  },
  {
    name: 'Lucas B.',
    location: 'Lyon',
    stars: 5,
    text: "J'adore les couleurs vives et les designs uniques. Mes invités me demandent toujours où je les ai trouvées. Un vrai coup de cœur que je recommande sans hésiter !",
  },
  {
    name: 'Marie C.',
    location: 'Bordeaux',
    stars: 5,
    text: "Un vrai coup de cœur ! Ces bougies ont transformé mon salon. L'emballage est raffiné, la qualité artisanale se voit immédiatement. Commande déjà reconduite.",
  },
]

const blogPosts = [
  {
    title: 'Comment choisir ses bougies chandelles ?',
    excerpt: "Couleur, taille, matière... tout ce qu'il faut savoir pour bien choisir ses bougies chandelles selon l'occasion.",
    category: 'Conseils',
    date: '10 mars 2025',
    gradient: 'from-amber-100 to-orange-200',
  },
  {
    title: "L'art de la table à la scandinave",
    excerpt: "Les Scandinaves ont élevé la décoration de table au rang d'art. Découvrez leurs secrets pour une ambiance chaleureuse.",
    category: 'Inspiration',
    date: '28 fév. 2025',
    gradient: 'from-green-100 to-emerald-200',
  },
  {
    title: 'Prendre soin de ses bougies',
    excerpt: "Quelques gestes simples pour prolonger la durée de vie de vos bougies et préserver leur beauté le plus longtemps possible.",
    category: 'Entretien',
    date: '15 fév. 2025',
    gradient: 'from-rose-100 to-rose-300',
  },
]

function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Home() {
  const featuredRef   = useFadeUp()
  const storyRef      = useFadeUp()
  const coffretsRef   = useFadeUp()
  const testimonialsRef = useFadeUp()
  const blogRef       = useFadeUp()
  const newsletterRef = useFadeUp()

  return (
    <div>
      {/* ─── HERO ────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ background: 'linear-gradient(135deg, #F8F2E6 0%, #F0E6D2 50%, #EDE0C4 100%)' }}>
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#C4724A' }} />
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#8B9E7A' }} />
        <div className="absolute top-20 left-1/3 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#D4899A' }} />

        <div className="container-momi w-full py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
            {/* Text */}
            <div className="order-2 md:order-1">
              <span className="inline-block font-jost text-xs tracking-widest uppercase font-medium mb-4" style={{ color: '#C4724A' }}>
                Bougies artisanales ✦ Faites avec amour
              </span>
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-6" style={{ color: '#2C2420' }}>
                Illuminez
                <br />
                <em className="italic" style={{ color: '#C4724A' }}>votre monde</em>
              </h1>
              <p className="font-jost text-base md:text-lg leading-relaxed mb-8 max-w-md" style={{ color: '#7C6F67' }}>
                Des bougies chandelles colorées et uniques, fabriquées à la main dans notre atelier.
                Inspirées du design scandinave, chaque pièce est une œuvre à part entière.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/boutique" className="btn-primary">
                  Découvrir la boutique
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link to="/a-propos" className="btn-secondary">
                  Notre histoire
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-10 pt-10" style={{ borderTop: '1px solid #E8DCC8' }}>
                {[
                  { val: '100%', label: 'Fait main' },
                  { val: 'Vegan', label: 'Cire naturelle' },
                  { val: '4.9 ★', label: 'Avis clients' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="font-playfair text-xl font-semibold" style={{ color: '#2C2420' }}>{item.val}</div>
                    <div className="font-jost text-xs tracking-wide uppercase mt-0.5" style={{ color: '#A09690' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candle visual */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div
                  className="w-64 h-80 md:w-72 md:h-96 rounded-sm shadow-strong flex items-end justify-center overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, #FBCBA0, #E88A5E, #D4899A)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-25">
                    <HeroCandlesSVG />
                  </div>
                  <div className="relative z-10 p-6 w-full" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)' }}>
                    <span className="font-jost text-xs text-white/90 tracking-widest uppercase">Bestseller</span>
                    <p className="font-playfair text-white text-lg font-medium mt-1">Coucher de Soleil</p>
                  </div>
                </div>

                <div className="absolute -left-12 top-16 w-28 h-36 rounded-sm shadow-medium animate-float-slow"
                  style={{ background: 'linear-gradient(135deg, #E4D4F5, #F5C8DA, #C8E8D4)' }} />
                <div className="absolute -right-10 bottom-16 w-24 h-32 rounded-sm shadow-medium"
                  style={{ background: 'linear-gradient(135deg, #8B4A20, #C05030, #8C3A28)' }} />

                <div className="absolute -bottom-4 left-4 bg-white shadow-medium px-4 py-3 rounded-sm">
                  <div className="font-jost text-xs uppercase tracking-wide" style={{ color: '#A09690' }}>Lot de 3</div>
                  <div className="font-playfair text-lg font-semibold" style={{ color: '#2C2420' }}>12,95 €</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ───────────────────────────────── */}
      <div className="py-4 overflow-hidden" style={{ background: '#C4724A' }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 mx-8 font-jost text-sm font-medium tracking-wide uppercase whitespace-nowrap" style={{ color: '#FDFAF6' }}>
                {item}
                <span className="w-1 h-1 rounded-full opacity-60 inline-block" style={{ background: '#FAF5EC' }} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ─────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div ref={featuredRef} className="fade-up">
            <div className="text-center mb-12">
              <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Collection</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
                Nos bougies chandelles
              </h2>
              <div className="section-divider" />
              <p className="font-jost mt-4 max-w-xl mx-auto" style={{ color: '#7C6F67' }}>
                Chaque bougie est façonnée à la main, dans notre atelier, avec de la cire naturelle de stéarine et des pigments de qualité.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/boutique" className="btn-secondary inline-flex items-center gap-2">
                Voir toute la collection
                <ArrowLongRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ───────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FAF5EC' }}>
        <div className="container-momi">
          <div ref={storyRef} className="fade-up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square rounded-sm overflow-hidden shadow-strong" style={{ background: 'linear-gradient(135deg, #E4A882, #D4899A, #FBCBA0)' }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <StorySVG />
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-sm shadow-soft" style={{ background: 'rgba(253,250,246,0.92)' }}>
                    <p className="font-playfair italic leading-relaxed text-sm" style={{ color: '#4F443D' }}>
                      "Chaque bougie que nous créons est une invitation à ralentir, à s'émerveiller,
                      à créer de la beauté dans les gestes quotidiens."
                    </p>
                    <p className="font-jost text-xs mt-2 uppercase tracking-wide" style={{ color: '#A09690' }}>— Momi, fondatrice</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-40" style={{
                  backgroundImage: 'radial-gradient(circle, #C4724A 1px, transparent 1px)',
                  backgroundSize: '8px 8px'
                }} />
              </div>
              <div>
                <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Notre histoire</span>
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-6 leading-snug" style={{ color: '#2C2420' }}>
                  Des bougies nées d'une passion pour la couleur
                </h2>
                <div className="space-y-4 font-jost leading-relaxed" style={{ color: '#7C6F67' }}>
                  <p>
                    Momi Candles est née d'un constat simple : les bougies les plus populaires étaient ennuyeuses.
                    Pourquoi se contenter du blanc quand la vie est si colorée ?
                  </p>
                  <p>
                    Depuis notre atelier parisien, nous créons des bougies chandelles uniques, teintes à la main
                    avec des pigments naturels. Chaque bougie est différente — comme les moments qu'elle éclaire.
                  </p>
                  <p>
                    Inspirées du design scandinave et de son rapport intime à la lumière, nos créations apportent
                    chaleur, couleur et caractère à votre intérieur.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-6">
                  {[
                    { icon: '✋', label: 'Artisanat', desc: 'Façonnées à la main' },
                    { icon: '🌿', label: 'Naturel', desc: 'Cire de stéarine' },
                    { icon: '♻️', label: 'Éco-responsable', desc: 'Emballage recyclé' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-playfair font-medium" style={{ color: '#2C2420' }}>{item.label}</p>
                        <p className="font-jost text-sm" style={{ color: '#A09690' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/a-propos" className="btn-primary inline-flex items-center gap-2 mt-8">
                  En savoir plus
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COFFRETS & PARFUMÉES ──────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div ref={coffretsRef} className="fade-up">
            <div className="text-center mb-12">
              <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Cadeaux & Parfumées</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
                Coffrets cadeaux & bougies parfumées
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {coffrets.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH BANNER ─────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C4724A, #A85C38, #2C2420)' }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="container-momi relative z-10 text-center">
          <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#E4A882' }}>Cadeau parfait</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold mt-3 mb-6 leading-tight" style={{ color: '#FDFAF6' }}>
            Offrez de la lumière <br className="hidden md:block" />et de la couleur
          </h2>
          <p className="font-jost text-lg max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: '#E8DCC8' }}>
            Nos coffrets cadeaux sont soigneusement emballés dans du papier de soie et un ruban satiné.
            Parfaits pour un anniversaire, une fête des mères ou simplement pour faire plaisir.
          </p>
          <Link to="/boutique" className="btn-outline-light inline-flex items-center gap-2">
            Voir les coffrets
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FAF5EC' }}>
        <div className="container-momi">
          <div ref={testimonialsRef} className="fade-up">
            <div className="text-center mb-12">
              <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Avis clients</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
                Ce qu'ils disent de nous
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <StarIcon key={s} className="w-4 h-4" style={{ color: '#F59E0B' }} />
                    ))}
                  </div>
                  <p className="font-jost leading-relaxed mb-5 italic" style={{ color: '#7C6F67' }}>
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-playfair font-medium" style={{ color: '#2C2420' }}>{t.name}</p>
                    <p className="font-jost text-xs mt-0.5" style={{ color: '#A09690' }}>{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ──────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div ref={blogRef} className="fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Blog</span>
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2" style={{ color: '#2C2420' }}>
                  Inspirations & Conseils
                </h2>
              </div>
              <Link to="/blog" className="font-jost text-sm font-medium link-underline flex items-center gap-1 transition-colors" style={{ color: '#C4724A' }}>
                Voir tous les articles
                <ArrowLongRightIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <div key={i} className="blog-card">
                  <div className={`aspect-video bg-gradient-to-br ${post.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag-badge" style={{ background: '#F0E6D2', color: '#7C6F67' }}>{post.category}</span>
                      <span className="font-jost text-xs" style={{ color: '#A09690' }}>{post.date}</span>
                    </div>
                    <h3 className="font-playfair text-lg font-medium leading-snug mb-2" style={{ color: '#2C2420' }}>
                      {post.title}
                    </h3>
                    <p className="font-jost text-sm leading-relaxed" style={{ color: '#7C6F67' }}>
                      {post.excerpt}
                    </p>
                    <Link to="/blog" className="inline-flex items-center gap-1 mt-4 font-jost text-sm link-underline transition-colors" style={{ color: '#C4724A' }}>
                      Lire l'article
                      <ArrowLongRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ────────────────────────────── */}
      <section className="py-20" style={{ background: '#2C2420' }}>
        <div className="container-momi">
          <div ref={newsletterRef} className="fade-up text-center max-w-lg mx-auto">
            <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#E4A882' }}>Newsletter</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-3 mb-4" style={{ color: '#FDFAF6' }}>
              Rejoignez notre communauté
            </h2>
            <p className="font-jost leading-relaxed mb-8" style={{ color: '#C8C0BB' }}>
              Recevez nos nouvelles collections, inspirations et offres exclusives directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                className="flex-1 px-4 py-3 font-jost text-sm outline-none transition-colors"
                style={{
                  background: '#3D342F',
                  border: '1px solid #4F443D',
                  color: '#FAF5EC',
                }}
                onFocus={e => { e.target.style.borderColor = '#C4724A' }}
                onBlur={e => { e.target.style.borderColor = '#4F443D' }}
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                S'inscrire
              </button>
            </form>
            <p className="font-jost text-xs mt-4" style={{ color: '#67574F' }}>
              Désinscription possible à tout moment. Pas de spam, promis. 🕯️
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroCandlesSVG() {
  return (
    <svg viewBox="0 0 200 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[50, 100, 150].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={20 + i * 8} rx="8" ry="14" fill="#FFD580" opacity="0.6" />
          <line x1={x} y1={34 + i * 8} x2={x} y2={50 + i * 8} stroke="#3D342F" strokeWidth="2" />
          <rect x={x - 18} y={50 + i * 8} width="36" height={150 - i * 20} rx="4" fill="white" opacity="0.4" />
        </g>
      ))}
    </svg>
  )
}

function StorySVG() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="2" opacity="0.3" />
      <circle cx="150" cy="150" r="80" stroke="white" strokeWidth="1.5" opacity="0.2" />
      <rect x="130" y="80" width="40" height="140" rx="4" fill="white" opacity="0.3" />
      <ellipse cx="150" cy="70" rx="10" ry="16" fill="#FFD580" opacity="0.5" />
    </svg>
  )
}
