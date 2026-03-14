import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

const posts = [
  {
    id: 1,
    title: 'Comment choisir ses bougies chandelles ?',
    excerpt: "Couleur, taille, matière... tout ce qu'il faut savoir pour bien choisir ses bougies chandelles selon l'occasion et l'ambiance souhaitée.",
    category: 'Conseils',
    date: '10 mars 2025',
    readTime: '4 min',
    gradient: 'from-amber-100 to-orange-200',
    featured: true,
  },
  {
    id: 2,
    title: "L'art de la table à la scandinave",
    excerpt: "Les Scandinaves ont élevé la décoration de table au rang d'art. Découvrez leurs secrets pour créer une ambiance chaleureuse et épurée.",
    category: 'Inspiration',
    date: '28 fév. 2025',
    readTime: '5 min',
    gradient: 'from-green-100 to-emerald-200',
    featured: false,
  },
  {
    id: 3,
    title: 'Prendre soin de ses bougies',
    excerpt: "Quelques gestes simples pour prolonger la durée de vie de vos bougies et préserver leur beauté le plus longtemps possible.",
    category: 'Entretien',
    date: '15 fév. 2025',
    readTime: '3 min',
    gradient: 'from-rose-100 to-pink-200',
    featured: false,
  },
  {
    id: 4,
    title: "Le hygge, philosophie de vie nordique",
    excerpt: "Le hygge est bien plus qu'une tendance déco — c'est une manière d'être. Comment intégrer cette philosophie danoise dans votre quotidien.",
    category: 'Lifestyle',
    date: '2 fév. 2025',
    readTime: '6 min',
    gradient: 'from-amber-200 to-yellow-300',
    featured: false,
  },
  {
    id: 5,
    title: "Bougies et décoration : 5 idées pour votre table",
    excerpt: "Des bougies chandelles colorées comme pièces maîtresses de votre décoration de table : cinq façons d'illuminer vos repas.",
    category: 'Décoration',
    date: '20 janv. 2025',
    readTime: '4 min',
    gradient: 'from-violet-100 to-purple-200',
    featured: false,
  },
  {
    id: 6,
    title: "Cire de stéarine vs paraffine : quelles différences ?",
    excerpt: "Pourquoi nous avons choisi la cire de stéarine pour nos bougies, et en quoi elle est supérieure à la paraffine pour la santé et l'environnement.",
    category: 'Savoir-faire',
    date: '8 janv. 2025',
    readTime: '5 min',
    gradient: 'from-teal-100 to-cyan-200',
    featured: false,
  },
]

const tagColors = {
  'Conseils':    { bg: '#FEF3C7', text: '#92400E' },
  'Inspiration': { bg: '#D1FAE5', text: '#065F46' },
  'Entretien':   { bg: '#FCE7F3', text: '#831843' },
  'Lifestyle':   { bg: '#FEF9C3', text: '#713F12' },
  'Décoration':  { bg: '#EDE9FE', text: '#4C1D95' },
  'Savoir-faire':{ bg: '#CFFAFE', text: '#164E63' },
}

export default function Blog() {
  const [activeTag, setActiveTag] = useState('Tous')

  const tags = ['Tous', ...Object.keys(tagColors)]
  const filtered = activeTag === 'Tous' ? posts : posts.filter(p => p.category === activeTag)
  const featured = posts[0]
  const rest = filtered.filter(p => p.id !== featured.id)

  return (
    <div>
      {/* Header */}
      <div className="py-16 md:py-20 text-center" style={{ background: '#FAF5EC' }}>
        <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>
          Inspirations & conseils
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
          Le Blog Momi
        </h1>
        <div className="section-divider" />
        <p className="font-jost mt-4 max-w-lg mx-auto" style={{ color: '#7C6F67' }}>
          Conseils d'entretien, inspirations déco, philosophie nordique...
          Bienvenue dans l'univers de Momi Candles.
        </p>
      </div>

      {/* Featured Post */}
      {activeTag === 'Tous' && (
        <div className="py-12" style={{ background: '#FDFAF6' }}>
          <div className="container-momi">
            <div className="grid md:grid-cols-2 gap-8 items-center overflow-hidden rounded-sm shadow-medium" style={{ background: '#fff' }}>
              <div className={`aspect-video md:aspect-auto md:h-80 bg-gradient-to-br ${featured.gradient}`} />
              <div className="p-8 md:pr-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="tag-badge"
                    style={{ background: tagColors[featured.category]?.bg, color: tagColors[featured.category]?.text }}
                  >
                    {featured.category}
                  </span>
                  <span className="font-jost text-xs" style={{ color: '#A09690' }}>{featured.date}</span>
                  <span className="font-jost text-xs" style={{ color: '#A09690' }}>· {featured.readTime} de lecture</span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4 leading-tight" style={{ color: '#2C2420' }}>
                  {featured.title}
                </h2>
                <p className="font-jost leading-relaxed mb-6" style={{ color: '#7C6F67' }}>
                  {featured.excerpt}
                </p>
                <a href="#" className="inline-flex items-center gap-2 font-jost font-medium link-underline transition-colors" style={{ color: '#C4724A' }}>
                  Lire l'article complet
                  <ArrowLongRightIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tag Filter */}
      <div className="py-6 sticky z-20" style={{ background: 'rgba(253,250,246,0.95)', backdropFilter: 'blur(12px)', top: '4rem' }}>
        <div className="container-momi">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="font-jost text-sm px-4 py-1.5 transition-all duration-200"
                style={{
                  background: activeTag === tag ? '#2C2420' : 'transparent',
                  color: activeTag === tag ? '#FDFAF6' : '#7C6F67',
                  border: `1px solid ${activeTag === tag ? '#2C2420' : '#C8C0BB'}`,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="py-12 md:py-16" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTag === 'Tous' ? rest : filtered).map(post => (
              <div key={post.id} className="blog-card">
                <div className={`aspect-video bg-gradient-to-br ${post.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="tag-badge"
                      style={{ background: tagColors[post.category]?.bg, color: tagColors[post.category]?.text }}
                    >
                      {post.category}
                    </span>
                    <span className="font-jost text-xs" style={{ color: '#A09690' }}>{post.date}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-medium leading-snug mb-2" style={{ color: '#2C2420' }}>
                    {post.title}
                  </h3>
                  <p className="font-jost text-sm leading-relaxed mb-4" style={{ color: '#7C6F67' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <a href="#" className="inline-flex items-center gap-1 font-jost text-sm font-medium link-underline transition-colors" style={{ color: '#C4724A' }}>
                      Lire l'article
                      <ArrowLongRightIcon className="w-4 h-4" />
                    </a>
                    <span className="font-jost text-xs" style={{ color: '#C8C0BB' }}>{post.readTime} de lecture</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="py-16 text-center" style={{ background: '#FAF5EC' }}>
        <div className="container-momi max-w-lg mx-auto">
          <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Ne rien manquer</span>
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
            Recevez nos articles par email
          </h2>
          <form className="flex flex-col sm:flex-row gap-3 mt-6" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre adresse email"
              required
              className="flex-1 px-4 py-3 font-jost text-sm outline-none"
              style={{ background: '#fff', border: '1px solid #E8DCC8', color: '#2C2420' }}
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              S'abonner
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
