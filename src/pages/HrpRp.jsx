import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'

const HRP_CONCEPTS = [
  {
    title: 'Metagaming (MG)',
    emoji: '🧠',
    severity: 'ban',
    desc: 'Utiliser des informations obtenues hors du jeu (Discord, stream, OOC) dans votre roleplay. Par exemple : aller secourir votre ami parce que vous avez vu sur son stream qu\'il était en danger.',
    sanction: 'Jusqu\'à 3 jours de ban',
  },
  {
    title: 'Powergaming (PG)',
    emoji: '💪',
    severity: 'ban',
    desc: 'Forcer des actions irréalistes ou impossibles sur d\'autres joueurs sans leur laisser de choix. Exemple : "/me désarme l\'officier et s\'enfuit" sans possibilité de réaction de l\'autre joueur.',
    sanction: 'Jusqu\'à 7 jours de ban',
  },
  {
    title: 'RDM (Random Death Match)',
    emoji: '🔫',
    severity: 'ban',
    desc: 'Tuer ou agresser un joueur sans aucune raison RP préalable. Chaque acte de violence doit avoir une motivation scénaristique claire.',
    sanction: 'Kick → 3j → 14j',
  },
  {
    title: 'VDM (Vehicle Death Match)',
    emoji: '🚗',
    severity: 'ban',
    desc: 'Écraser intentionnellement un joueur avec un véhicule sans justification RP. Inclut les collisions délibérées en véhicule pendant une bagarre.',
    sanction: 'Kick → 3j → 14j',
  },
  {
    title: 'Combat Logging',
    emoji: '🔌',
    severity: 'ban',
    desc: 'Se déconnecter intentionnellement pour éviter une conséquence RP (arrestation, mort, perte d\'un bien). Le serveur garde trace des déconnexions.',
    sanction: 'Jusqu\'à 7 jours de ban',
  },
  {
    title: 'Fail RP',
    emoji: '❌',
    severity: 'warn',
    desc: 'Actions qui cassent l\'immersion et sortent du cadre réaliste du roleplay. Exemple : courir partout sans raison, parler en OOC sans /ooc, ignorer les conséquences de vos blessures.',
    sanction: 'Kick → Avertissement',
  },
  {
    title: 'NVL (No Value of Life)',
    emoji: '☠️',
    severity: 'ban',
    desc: 'Ne pas valoriser la vie de son personnage. Exemple : se jeter sur des policiers armés à mains nues, ignorer une arme pointée sur vous, etc.',
    sanction: 'Jusqu\'à 3 jours de ban',
  },
  {
    title: 'FearRP',
    emoji: '😨',
    severity: 'warn',
    desc: 'Votre personnage doit avoir peur dans des situations dangereuses. Une arme pointée sur vous oblige à coopérer. Fuir une situation à risque extrême est un Fail RP.',
    sanction: 'Avertissement → Kick',
  },
]

const RP_COMMANDS = [
  { cmd: '/me',  color: '#a855f7', desc: 'Décrit une action visible par les joueurs proches. Ex: /me sort son portefeuille et le tend à l\'agent.' },
  { cmd: '/do',  color: '#ec4899', desc: 'Décrit une conséquence ou un élément de décor. Ex: /do Une odeur de brûlé se dégage du véhicule.' },
  { cmd: '/try', color: '#8b5cf6', desc: 'Effectue un jet de dé (1-100) pour déterminer la réussite d\'une action incertaine.' },
  { cmd: '/ooc', color: '#6b7280', desc: 'Message hors roleplay visible par tous — usage limité et encadré. Préférez Discord pour le HRP.' },
  { cmd: '/b',   color: '#6b7280', desc: 'Message HRP local (proximité). Doit rester exceptionnel et court.' },
]

const RP_TIPS = [
  { emoji: '🎭', tip: 'Votre personnage a une histoire, des motivations, des peurs. Jouez-les cohéremment.' },
  { emoji: '📖', tip: 'Une backstory solide enrichit vos interactions et rend votre RP plus crédible.' },
  { emoji: '🎤', tip: 'Utilisez un micro de qualité. Un RP vocal immersif commence par une voix claire.' },
  { emoji: '🤝', tip: 'Donnez du jeu aux autres joueurs. Un bon RP est collaboratif, pas compétitif.' },
  { emoji: '📷', tip: 'Utilisez /me et /do généreusement pour enrichir vos scènes.' },
  { emoji: '⏰', tip: 'Prenez le temps. Un RP précipité est un mauvais RP. La qualité prime sur la quantité.' },
  { emoji: '🧘', tip: 'Restez calme même dans les situations tendues. La colère RL n\'a pas sa place IC.' },
  { emoji: '🎯', tip: 'Préparez votre scène avant de la lancer. Improvisation ≠ absence de préparation.' },
]

function RuleItem({ icon, text, severity = 'info' }) {
  const colors = {
    ban:  { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.5)',   text: '#fca5a5' },
    warn: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.5)',  text: '#fdba74' },
    info: { bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.5)',  text: '#c084fc' },
  }
  const c = colors[severity] || colors.info
  return (
    <li className="flex items-start gap-3 px-4 py-3 rounded-lg mb-2 text-sm font-inter leading-relaxed"
      style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}>
      <span className="flex-shrink-0" style={{ color: c.text }}>{icon}</span>
      <span className="text-gray-300">{text}</span>
    </li>
  )
}

export default function HrpRp() {
  return (
    <PageWrapper
      title="HRP / RP"
      description="Notions HRP et RP de FiveLife — concepts fondamentaux du roleplay GTA V."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0f1a 50%, #0a0a0a 100%)' }}>
        <div className="orb orb-purple w-96 h-96 top-0 left-1/4 opacity-25" />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-purple mb-4 inline-block">💡 Notions Fondamentales</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              Notions <span className="text-gradient-static">HRP / RP</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Comprenez les concepts clés du roleplay avant de vous lancer. Ces notions sont indispensables pour jouer correctement sur FiveLife RP.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Concepts */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="badge badge-red mb-3 inline-block">⛔ À éviter absolument</span>
            <h2 className="font-orbitron font-800 text-2xl text-white">Concepts HRP — Infractions RP</h2>
            <div className="neon-divider mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HRP_CONCEPTS.map((c, i) => (
              <GlassCard key={i} delay={i * 0.04} className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <h3 className="font-orbitron font-700 text-white text-sm">{c.title}</h3>
                    <span className={`badge text-[10px] mt-1 ${c.severity === 'ban' ? 'badge-red' : 'badge-orange'}`}>
                      {c.sanction}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs font-inter leading-relaxed">{c.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Commandes RP */}
        <GlassCard className="p-7" delay={0}>
          <SectionHeader emoji="⌨️" title="Commandes RP" subtitle="Les commandes essentielles pour un roleplay riche et immersif." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RP_COMMANDS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.color}30` }}
              >
                <code
                  className="font-mono text-sm font-700 px-2 py-1 rounded-lg flex-shrink-0"
                  style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }}
                >
                  {c.cmd}
                </code>
                <p className="text-gray-400 text-xs font-inter leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Tips */}
        <GlassCard className="p-7" delay={0.1}>
          <SectionHeader emoji="✨" title="Conseils RP" subtitle="Bonnes pratiques pour améliorer votre qualité de jeu." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RP_TIPS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(168,85,247,0.05)' }}
              >
                <span className="text-xl flex-shrink-0">{t.emoji}</span>
                <p className="text-gray-400 text-sm font-inter leading-relaxed">{t.tip}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* HRP vs RP distinction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassCard className="p-6" delay={0.05}>
            <h3 className="font-orbitron font-700 text-white text-sm mb-4">
              <span className="text-gray-500">HRP</span> — Hors Roleplay
            </h3>
            <ul className="space-y-2 text-sm font-inter text-gray-400">
              {[
                'Tout ce qui se passe en dehors du jeu RP.',
                'Discord, forums, réseaux sociaux.',
                'Staff, tickets de support, signalements.',
                'Discussions entre joueurs en tant que personnes IRL.',
                'Questions techniques sur le serveur.',
              ].map((item, i) => <RuleItem key={i} icon="→" text={item} severity="info" />)}
            </ul>
          </GlassCard>

          <GlassCard className="p-6" delay={0.1}>
            <h3 className="font-orbitron font-700 text-white text-sm mb-4">
              <span className="text-primary-400">RP</span> — In Character (IC)
            </h3>
            <ul className="space-y-2 text-sm font-inter text-gray-400">
              {[
                'Tout ce qui se passe dans le jeu, en tant que personnage.',
                'Dialogues, actions, émotions de votre avatar.',
                'Relations avec les autres personnages.',
                'Commerce, crimes, travaux — tout est IC.',
                'Ne jamais briser l\'immersion sans raison.',
              ].map((item, i) => <RuleItem key={i} icon="→" text={item} severity="info" />)}
            </ul>
          </GlassCard>
        </div>

      </div>
    </PageWrapper>
  )
}
