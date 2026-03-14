import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

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

const values = [
  {
    icon: '✋',
    title: 'Artisanat authentique',
    desc: 'Chaque bougie est façonnée à la main dans notre atelier parisien. Pas de production en masse, pas de compromis sur la qualité.',
  },
  {
    icon: '🌿',
    title: 'Matières naturelles',
    desc: 'Nous utilisons exclusivement de la cire naturelle de stéarine — plus dure, plus lente à brûler et entièrement vegan.',
  },
  {
    icon: '🎨',
    title: 'Couleurs uniques',
    desc: 'Nos pigments sont soigneusement sélectionnés pour leur intensité et leur durabilité. Chaque bougie est colorée à la main.',
  },
  {
    icon: '♻️',
    title: 'Éco-responsable',
    desc: "Notre emballage est recyclé et recyclable. Nous nous engageons à minimiser notre impact environnemental à chaque étape.",
  },
]

const team = [
  {
    name: 'Momi',
    role: 'Fondatrice & Créatrice',
    bio: "Passionnée de design scandinave depuis toujours, Momi a fondé Momi Candles en 2022 après avoir réalisé que les bougies méritaient d'être aussi belles que le reste de notre intérieur.",
    gradient: 'from-terracotta-300 to-rose-300',
  },
  {
    name: 'Léa',
    role: 'Artisane & Coloriste',
    bio: "Ancienne peintre, Léa apporte sa sensibilité artistique à chaque bougie. C'est elle qui mélange les couleurs et crée les mélanges de teintes uniques de nos collections.",
    gradient: 'from-sage-300 to-sage-400',
  },
  {
    name: 'Thomas',
    role: 'Logistique & Expéditions',
    bio: "Thomas veille à ce que chaque commande arrive en parfait état. Son soin du détail dans l'emballage garantit que vos bougies arrivent comme un cadeau.",
    gradient: 'from-amber-200 to-orange-300',
  },
]

export default function About() {
  const valuesRef = useFadeUp()
  const teamRef   = useFadeUp()
  const storyRef  = useFadeUp()

  return (
    <div>
      {/* Page Header */}
      <div className="py-20 md:py-28 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F2E6, #EDE0C4)' }}>
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: '#C4724A' }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: '#8B9E7A' }} />
        <div className="container-momi relative z-10">
          <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>
            Notre histoire
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 mb-6" style={{ color: '#2C2420' }}>
            À propos de <em className="italic" style={{ color: '#C4724A' }}>Momi Candles</em>
          </h1>
          <div className="section-divider" />
          <p className="font-jost text-lg mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: '#7C6F67' }}>
            Momi Candles est née d'une simple conviction : la beauté du quotidien mérite d'être célébrée.
            Une bougie colorée peut transformer un dîner en un moment magique.
          </p>
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-20 md:py-28" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div ref={storyRef} className="fade-up">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>2022 — Paris</span>
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-8 leading-snug" style={{ color: '#2C2420' }}>
                  Comment tout a commencé
                </h2>
                <div className="space-y-5 font-jost leading-relaxed" style={{ color: '#7C6F67' }}>
                  <p>
                    Tout a commencé lors d'un séjour à Copenhague. Dans cette ville où la lumière est rare mais précieuse,
                    les Danois ont développé un rapport intime à la bougie. Mais Momi, fondatrice de Momi Candles,
                    remarqua quelque chose : la plupart des bougies étaient blanches, beiges... ennuyeuses.
                  </p>
                  <p>
                    "Pourquoi la bougie la plus vendue en France est-elle blanche ?" se demanda-t-elle.
                    "Alors que nous mettons tant de soin à choisir nos coussins, notre vaisselle, nos fleurs..."
                    Cette question fut le point de départ de Momi Candles.
                  </p>
                  <p>
                    Revenue à Paris, Momi commença à expérimenter dans sa cuisine, mélangeant des pigments
                    naturels à de la cire de stéarine. Ses premières bougies furent offertes à des amis.
                    Le bouche-à-oreille fit le reste.
                  </p>
                  <p>
                    Aujourd'hui, notre petite équipe de passionnés fabrique à la main des centaines de bougies
                    par semaine, expédiées dans toute l'Europe et au-delà.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-sm shadow-medium" style={{ background: 'linear-gradient(135deg, #FBCBA0, #E88A5E, #D4899A)' }} />
                <div className="aspect-[3/4] rounded-sm shadow-medium mt-8" style={{ background: 'linear-gradient(135deg, #E4D4F5, #F5C8DA, #C8E8D4)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28" style={{ background: '#FAF5EC' }}>
        <div className="container-momi">
          <div ref={valuesRef} className="fade-up">
            <div className="text-center mb-14">
              <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Ce qui nous guide</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
                Nos valeurs
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, i) => (
                <div key={i} className="text-center group">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: '#FDFAF6', border: '1px solid #E8DCC8' }}
                  >
                    {val.icon}
                  </div>
                  <h3 className="font-playfair text-lg font-medium mb-3" style={{ color: '#2C2420' }}>{val.title}</h3>
                  <p className="font-jost text-sm leading-relaxed" style={{ color: '#7C6F67' }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div ref={teamRef} className="fade-up">
            <div className="text-center mb-14">
              <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>Les gens derrière les bougies</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
                Notre équipe
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="text-center">
                  <div className={`w-40 h-40 rounded-full mx-auto mb-6 bg-gradient-to-br ${member.gradient} shadow-medium relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-30" fill="none">
                        <circle cx="40" cy="32" r="16" fill="white" />
                        <ellipse cx="40" cy="72" rx="28" ry="20" fill="white" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-1" style={{ color: '#2C2420' }}>{member.name}</h3>
                  <p className="font-jost text-sm uppercase tracking-wide mb-4" style={{ color: '#C4724A' }}>{member.role}</p>
                  <p className="font-jost text-sm leading-relaxed" style={{ color: '#7C6F67' }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16" style={{ background: '#2C2420' }}>
        <div className="container-momi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '2022', label: 'Année de création' },
              { val: '500+', label: 'Bougies faites par mois' },
              { val: '12+', label: 'Pays expédiés' },
              { val: '4.9★', label: 'Note moyenne' },
            ].map(item => (
              <div key={item.label} className="text-center py-4">
                <div className="font-playfair text-4xl font-semibold mb-2" style={{ color: '#FDFAF6' }}>{item.val}</div>
                <div className="font-jost text-sm uppercase tracking-wide" style={{ color: '#A09690' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: '#FAF5EC' }}>
        <div className="container-momi max-w-xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-6" style={{ color: '#2C2420' }}>
            Envie de découvrir nos créations ?
          </h2>
          <Link to="/boutique" className="btn-primary inline-flex items-center gap-2">
            Visiter la boutique
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
