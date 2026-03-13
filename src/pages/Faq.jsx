import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'

const FAQ_ITEMS = [
  {
    category: '🎮 Gameplay',
    items: [
      {
        q: 'Comment rejoindre le serveur FiveLife RP ?',
        a: 'Ouvrez FiveM et cherchez "FiveLife RP" dans la liste des serveurs. Assurez-vous d\'avoir un compte Discord actif et d\'avoir lu le règlement.',
      },
      {
        q: 'Est-ce que je dois lire le règlement avant de jouer ?',
        a: 'Absolument. La connaissance du règlement est obligatoire. L\'ignorance ne constitue pas une excuse valable lors d\'une sanction. Lisez toutes les sections qui concernent votre activité RP.',
      },
      {
        q: 'Comment créer mon personnage ?',
        a: 'Lors de votre première connexion, vous serez guidé par une séquence de création de personnage. Choisissez un nom réaliste, une apparence cohérente et définissez une backstory avant de débuter.',
      },
      {
        q: 'Peut-on jouer plusieurs personnages ?',
        a: 'Oui, dans la limite de 2 personnages actifs par compte. Un personnage légal et un personnage illégal sont autorisés, mais ils ne peuvent en aucun cas interagir ensemble (anti-metagaming).',
      },
      {
        q: 'Comment gagner de l\'argent légalement ?',
        a: 'Rejoignez une entreprise légale (mécanicien, taxi, fast-food, etc.) ou une faction (SASP, SAMC). Vous pouvez aussi créer votre propre activité commerciale avec l\'accord du staff.',
      },
    ],
  },
  {
    category: '🚔 Factions',
    items: [
      {
        q: 'Comment rejoindre la police (SASP) ?',
        a: 'Remplissez le formulaire de candidature disponible sur le Discord dans le canal #recrutement-sasp. Une formation académique de 2h sera organisée suite à votre acceptation.',
      },
      {
        q: 'Comment rejoindre la SAMC ?',
        a: 'Candidatez via le Discord dans le canal #recrutement-samc. Vous suivrez une formation médicale initiale avant de prendre votre premier service en ambulance.',
      },
      {
        q: 'Est-ce qu\'on peut être dans plusieurs factions ?',
        a: 'Non. Un personnage ne peut appartenir qu\'à une seule faction officielle à la fois. Vous pouvez quitter une faction pour en rejoindre une autre après un délai de 7 jours.',
      },
      {
        q: 'Comment rejoindre un gang illégal ?',
        a: 'Les gangs se rejoignent en RP pur. Vous devez rencontrer leurs membres en jeu, prouver votre valeur, et être coopté par le chef de gang. Aucun formulaire n\'est nécessaire.',
      },
    ],
  },
  {
    category: '⚙️ Technique',
    items: [
      {
        q: 'Le serveur est en maintenance. Quand reviendra-t-il ?',
        a: 'Consultez le canal #annonces sur notre Discord pour les mises à jour en temps réel. Les maintenances sont généralement annoncées 30 minutes à l\'avance.',
      },
      {
        q: 'J\'ai perdu mes biens suite à un bug. Que faire ?',
        a: 'Ouvrez un ticket #bug-report sur Discord avec des preuves (captures, vidéo). Le staff vérifiera les logs et procédera à un remboursement si le bug est confirmé.',
      },
      {
        q: 'Comment signaler un joueur qui triche ?',
        a: 'Ouvrez un ticket #report-joueur sur Discord avec vidéo obligatoire. Les reports sans preuves ne sont pas traités. Restez factuel et évitez les accusations sans fondement.',
      },
      {
        q: 'Mon personnage a été supprimé par erreur. Que faire ?',
        a: 'Contactez le support via un ticket #support-compte avec votre identifiant joueur. Le staff vérifie les backups quotidiens et peut restaurer un personnage dans les 24h.',
      },
    ],
  },
  {
    category: '📜 Règlement',
    items: [
      {
        q: 'C\'est quoi la différence entre HRP et RP ?',
        a: 'HRP (Hors Roleplay) désigne tout ce qui se passe en dehors du jeu : Discord, staff, tickets, discussions entre joueurs IRL. RP (In Character) désigne ce que vit votre personnage dans le jeu.',
      },
      {
        q: 'Qu\'est-ce que le Metagaming ?',
        a: 'Utiliser des informations obtenues hors du jeu (Discord, stream d\'un ami, OOC) dans votre RP. C\'est strictement interdit et sévèrement sanctionné. Seules les informations obtenues IC comptent.',
      },
      {
        q: 'Comment contester une sanction ?',
        a: 'Ouvrez un ticket #appel-sanction dans les 48h suivant la sanction. Fournissez vos preuves et restez respectueux. La décision du staff senior est définitive.',
      },
    ],
  },
]

function FAQAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(168,85,247,0.2)' }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
            style={{ background: openIdx === i ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.03)' }}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <span className="font-inter font-600 text-white text-sm pr-4">{item.q}</span>
            <motion.span
              animate={{ rotate: openIdx === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-primary-400 flex-shrink-0 text-lg"
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 pt-2 text-gray-400 text-sm font-inter leading-relaxed"
                  style={{ background: 'rgba(168,85,247,0.06)' }}>
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <PageWrapper
      title="FAQ & Contact"
      description="Questions fréquentes et formulaire de contact pour FiveLife RP."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0f1a 50%, #0a0a0a 100%)' }}>
        <div className="orb orb-purple w-96 h-96 top-0 right-1/4 opacity-25" />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-purple mb-4 inline-block">❓ Questions & Réponses</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              FAQ & <span className="text-gradient-static">Contact</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions ou contactez notre équipe support.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Contact rapide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '💬', label: 'Discord Support', sub: 'Tickets #support', href: 'https://discord.gg/ardQd3tqhg', color: '#5865f2' },
            { icon: '📣', label: 'Annonces', sub: 'Canal #annonces Discord', href: 'https://discord.gg/ardQd3tqhg', color: '#ec4899' },
          ].map((c, i) => (
            <GlassCard key={i} delay={i * 0.06} className="p-5">
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${c.color}20`, border: `1px solid ${c.color}40` }}>
                  {c.icon}
                </div>
                <div>
                  <div className="font-orbitron font-700 text-white text-sm">{c.label}</div>
                  <div className="text-gray-500 text-xs font-inter mt-1">{c.sub}</div>
                </div>
              </a>
            </GlassCard>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h2 className="font-orbitron font-800 text-2xl text-white">❓ Questions Fréquentes</h2>
            <div className="neon-divider mt-3" />
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FAQ_ITEMS.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`px-4 py-2 rounded-lg font-inter text-sm font-500 transition-all ${
                  activeCategory === i
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  background: activeCategory === i ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeCategory === i ? 'rgba(168,85,247,0.6)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <FAQAccordion items={FAQ_ITEMS[activeCategory].items} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact via Discord */}
        <GlassCard className="p-8" delay={0.05} glow>
          <SectionHeader emoji="🎫" title="Nous Contacter" subtitle="Pour toute demande, notre équipe est disponible via les tickets Discord." />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              { icon: '🐛', label: 'Report de bug',      sub: 'Un problème technique en jeu ?',         color: '#ef4444' },
              { icon: '⚖️', label: 'Appel de sanction',  sub: 'Contester une décision du staff',         color: '#f59e0b' },
              { icon: '💡', label: 'Suggestion',          sub: 'Proposer une amélioration au serveur',    color: '#a855f7' },
              { icon: '🛡️', label: 'Recrutement staff',  sub: 'Rejoindre l\'équipe de modération',       color: '#10b981' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: `${item.color}10`, border: `1px solid ${item.color}30` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${item.color}20` }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-orbitron font-700 text-white text-xs">{item.label}</div>
                  <div className="text-gray-500 text-[11px] font-inter mt-0.5">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-2xl text-center"
            style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.25)' }}>
            <p className="text-gray-400 font-inter text-sm mb-1">
              Ouvrez un ticket dans le salon dédié sur notre Discord.
            </p>
            <p className="text-gray-500 font-inter text-xs mb-5">
              Notre équipe staff répond généralement sous <strong className="text-white">24h</strong>. Soyez précis et joignez des preuves si nécessaire.
            </p>
            <a
              href="https://discord.gg/ardQd3tqhg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              💬 Ouvrir un ticket Discord
            </a>
          </div>
        </GlassCard>

      </div>
    </PageWrapper>
  )
}
