import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    q: 'Quelle est la durée de combustion de vos bougies chandelles ?',
    a: "Nos bougies chandelles de 20 cm brûlent environ 8 à 10 heures par bougie. Pour maximiser la durée de vie, taillez la mèche à 5 mm avant chaque utilisation.",
  },
  {
    q: 'Vos bougies sont-elles compatibles avec tous les porte-bougies ?',
    a: "Oui ! Nos bougies ont un diamètre de 2,2 cm, ce qui est la taille standard. Elles sont compatibles avec la grande majorité des porte-bougies du commerce.",
  },
  {
    q: "Puis-je personnaliser une commande pour un événement ?",
    a: "Absolument ! Nous proposons des commandes personnalisées pour les mariages, anniversaires et événements d'entreprise. Contactez-nous par email pour discuter de votre projet.",
  },
  {
    q: 'Quels sont vos délais de livraison ?',
    a: "Nous expédions sous 2-3 jours ouvrés. La livraison prend ensuite 2-4 jours en France, 4-7 jours en Europe, et 7-14 jours pour les commandes internationales.",
  },
  {
    q: 'La livraison est-elle gratuite ?',
    a: "La livraison est offerte en France métropolitaine pour toute commande supérieure à 45€. Pour les autres montants et destinations, les frais de port sont calculés au panier.",
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      {/* Header */}
      <div className="py-16 md:py-20 text-center" style={{ background: '#FAF5EC' }}>
        <span className="font-jost text-xs uppercase tracking-widest font-medium" style={{ color: '#C4724A' }}>
          On est là pour vous
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold mt-2 mb-4" style={{ color: '#2C2420' }}>
          Contact
        </h1>
        <div className="section-divider" />
        <p className="font-jost mt-4 max-w-lg mx-auto" style={{ color: '#7C6F67' }}>
          Une question, une commande personnalisée ou juste envie de dire bonjour ?
          On vous répond dans les 24 heures.
        </p>
      </div>

      {/* Main Content */}
      <div className="py-16 md:py-20" style={{ background: '#FDFAF6' }}>
        <div className="container-momi">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-2xl font-semibold mb-8" style={{ color: '#2C2420' }}>
                Envoyez-nous un message
              </h2>

              {sent ? (
                <div className="py-12 text-center">
                  <CheckCircleIcon className="w-16 h-16 mx-auto mb-4" style={{ color: '#8B9E7A' }} />
                  <h3 className="font-playfair text-2xl font-medium mb-2" style={{ color: '#2C2420' }}>
                    Message envoyé !
                  </h3>
                  <p className="font-jost" style={{ color: '#7C6F67' }}>
                    Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-secondary mt-6"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-jost text-sm font-medium mb-2" style={{ color: '#2C2420' }}>
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Marie"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block font-jost text-sm font-medium mb-2" style={{ color: '#2C2420' }}>
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dupont"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-jost text-sm font-medium mb-2" style={{ color: '#2C2420' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marie@exemple.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block font-jost text-sm font-medium mb-2" style={{ color: '#2C2420' }}>
                      Sujet
                    </label>
                    <select className="input-field" style={{ cursor: 'pointer' }}>
                      <option value="">Choisir un sujet</option>
                      <option>Question sur une commande</option>
                      <option>Commande personnalisée</option>
                      <option>Information produit</option>
                      <option>Retour / Remboursement</option>
                      <option>Collaboration / Partenariat</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-jost text-sm font-medium mb-2" style={{ color: '#2C2420' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="input-field resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-4">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

            {/* Info + FAQ */}
            <div>
              {/* Contact Info */}
              <div className="mb-10">
                <h2 className="font-playfair text-2xl font-semibold mb-8" style={{ color: '#2C2420' }}>
                  Nos coordonnées
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: '📧',
                      label: 'Email',
                      value: 'hello@momicandles.com',
                      link: 'mailto:hello@momicandles.com',
                    },
                    {
                      icon: '📍',
                      label: 'Atelier',
                      value: 'Paris, France',
                      link: null,
                    },
                    {
                      icon: '📸',
                      label: 'Instagram',
                      value: '@momicandles',
                      link: 'https://instagram.com',
                    },
                    {
                      icon: '⏱️',
                      label: 'Réponse',
                      value: 'Sous 24 heures en semaine',
                      link: null,
                    },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="text-2xl w-8 flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-jost text-xs uppercase tracking-wide font-medium mb-0.5" style={{ color: '#A09690' }}>
                          {item.label}
                        </p>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="font-jost link-underline transition-colors"
                            style={{ color: '#C4724A' }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-jost" style={{ color: '#2C2420' }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#E8DCC8', margin: '2.5rem 0' }} />

              {/* FAQ */}
              <div>
                <h2 className="font-playfair text-2xl font-semibold mb-6" style={{ color: '#2C2420' }}>
                  Questions fréquentes
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{ borderBottom: '1px solid #E8DCC8' }}
                    >
                      <button
                        className="w-full text-left py-4 flex items-start justify-between gap-4"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="font-jost font-medium text-sm leading-snug" style={{ color: '#2C2420' }}>
                          {faq.q}
                        </span>
                        <span
                          className="flex-shrink-0 font-jost text-lg transition-transform duration-200"
                          style={{
                            color: '#C4724A',
                            transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                          }}
                        >
                          +
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="pb-4">
                          <p className="font-jost text-sm leading-relaxed" style={{ color: '#7C6F67' }}>
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
