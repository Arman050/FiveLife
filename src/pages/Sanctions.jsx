import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'

const SANCTIONS_TABLE = [
  {
    infraction: 'RDM / VDM',
    icon: '🔫',
    sanctions: ['Kick', '3 jours', '14 jours'],
    severity: 'ban',
  },
  {
    infraction: 'Metagaming (MG)',
    icon: '🧠',
    sanctions: ['1 jour', '7 jours', '30 jours'],
    severity: 'ban',
  },
  {
    infraction: 'Powergaming (PG)',
    icon: '💪',
    sanctions: ['1 jour', '7 jours', '30 jours'],
    severity: 'ban',
  },
  {
    infraction: 'Stream Sniping',
    icon: '📺',
    sanctions: ['7 jours', '30 jours', 'Permanent'],
    severity: 'ban',
  },
  {
    infraction: 'Bug Abuse',
    icon: '🐛',
    sanctions: ['Permanent', '—', '—'],
    severity: 'ban',
  },
  {
    infraction: 'Hacks / Cheat',
    icon: '💻',
    sanctions: ['Permanent', '—', '—'],
    severity: 'ban',
  },
  {
    infraction: 'Combat Logging',
    icon: '🔌',
    sanctions: ['Kick', '3 jours', '7 jours'],
    severity: 'warn',
  },
  {
    infraction: 'Fail RP',
    icon: '❌',
    sanctions: ['Avertissement', '1 jour', '7 jours'],
    severity: 'warn',
  },
  {
    infraction: 'NVL (No Value Life)',
    icon: '☠️',
    sanctions: ['Kick', '3 jours', '14 jours'],
    severity: 'warn',
  },
  {
    infraction: 'Troll / Perturbation',
    icon: '🤡',
    sanctions: ['Kick', '3 jours', '14 jours'],
    severity: 'warn',
  },
  {
    infraction: 'Spam / Pub',
    icon: '📢',
    sanctions: ['Mute 24h', '3 jours', 'Permanent'],
    severity: 'warn',
  },
  {
    infraction: 'Abus de position',
    icon: '🎭',
    sanctions: ['Exclusion faction', '7 jours', '30 jours'],
    severity: 'warn',
  },
  {
    infraction: 'Usurpation d\'identité',
    icon: '🎭',
    sanctions: ['7 jours', '30 jours', 'Permanent'],
    severity: 'warn',
  },
  {
    infraction: 'Non-respect staff',
    icon: '🛡️',
    sanctions: ['Avertissement', '7 jours', 'Permanent'],
    severity: 'warn',
  },
  {
    infraction: 'RP de qualité pauvre',
    icon: '⭐',
    sanctions: ['Conseil', 'Avertissement', 'Kick'],
    severity: 'info',
  },
]

const PROCÉDURE_SANCTION = [
  { step: '01', icon: '📝', title: 'Signalement', desc: 'Un joueur ou un staff constate l\'infraction. Captures d\'écran ou vidéo recommandées.' },
  { step: '02', icon: '🎫', title: 'Ticket', desc: 'Ouverture d\'un ticket sur Discord avec les preuves. Le staff examine le dossier.' },
  { step: '03', icon: '⚖️', title: 'Jugement', desc: 'Un admin senior évalue la gravité et applique la sanction selon le barème.' },
  { step: '04', icon: '📬', title: 'Notification', desc: 'Le joueur est informé de la sanction par DM Discord avec les motifs détaillés.' },
  { step: '05', icon: '🔁', title: 'Appel', desc: 'Possibilité de contester via un ticket dédié "appel de sanction" sous 48h.' },
]

const APPEL_REGLES = [
  { icon: '⏳', text: 'Un appel doit être déposé dans les 48h suivant la sanction. Passé ce délai, la sanction est définitive.', severity: 'warn' },
  { icon: '📸', text: 'Tout appel doit être accompagné de preuves : vidéo, captures d\'écran, témoins.', severity: 'info' },
  { icon: '🚫', text: 'Spammer le staff ou harceler les admins pendant un appel entraîne une sanction supplémentaire.', severity: 'ban' },
  { icon: '⚖️', text: 'La décision du staff senior est finale. Aucun deuxième appel n\'est accepté pour la même affaire.', severity: 'warn' },
  { icon: '🤝', text: 'Rester respectueux et factuel dans son appel augmente significativement les chances d\'une révision favorable.', severity: 'ok' },
]

export default function Sanctions() {
  const severityColor = {
    ban:  { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.3)',   badge: 'badge-red' },
    warn: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.3)',  badge: 'badge-orange' },
    info: { bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.3)',  badge: 'badge-purple' },
  }

  return (
    <PageWrapper
      title="Sanctions"
      description="Tableau des sanctions et procédures disciplinaires sur FiveLife RP."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)' }}>
        <div className="orb w-96 h-96 top-0 left-1/2 opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.3), transparent)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-red mb-4 inline-block">⚖️ Politique Disciplinaire</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              Tableau des <span className="text-gradient-static">Sanctions</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Les sanctions sont progressives et proportionnelles. Le staff applique ce barème avec cohérence pour garantir l'équité de traitement.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Tableau */}
        <GlassCard className="p-7 overflow-hidden" delay={0}>
          <SectionHeader emoji="📊" title="Barème des Sanctions" subtitle="Trois niveaux progressifs pour chaque infraction." />
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full neon-table mt-2">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-orbitron font-700 text-xs text-gray-400 uppercase tracking-wider border-b border-white/10">Infraction</th>
                  <th className="text-center py-3 px-4 font-orbitron font-700 text-xs text-green-400 uppercase tracking-wider border-b border-white/10">1ère fois</th>
                  <th className="text-center py-3 px-4 font-orbitron font-700 text-xs text-orange-400 uppercase tracking-wider border-b border-white/10">2ème fois</th>
                  <th className="text-center py-3 px-4 font-orbitron font-700 text-xs text-red-400 uppercase tracking-wider border-b border-white/10">3ème fois</th>
                </tr>
              </thead>
              <tbody>
                {SANCTIONS_TABLE.map((row, i) => {
                  const sc = severityColor[row.severity]
                  return (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base flex-shrink-0">{row.icon}</span>
                          <span className="text-gray-300 text-sm font-inter">{row.infraction}</span>
                        </div>
                      </td>
                      {row.sanctions.map((s, j) => (
                        <td key={j} className="py-3 px-4 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-orbitron font-600 ${
                            s === 'Permanent' ? 'badge-red' :
                            s === '—' ? 'text-gray-600' :
                            j === 0 ? 'text-green-400' :
                            j === 1 ? 'text-orange-400' : 'text-red-400'
                          }`}>
                            {s}
                          </span>
                        </td>
                      ))}
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Procédure */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h2 className="font-orbitron font-800 text-2xl text-white">⚙️ Procédure de Sanction</h2>
            <div className="neon-divider mt-3" />
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-pink-500 to-transparent hidden sm:block" />
            <div className="space-y-4">
              {PROCÉDURE_SANCTION.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-5 pl-0 sm:pl-16 relative"
                >
                  <div className="absolute left-0 top-2 w-12 h-12 rounded-full items-center justify-center hidden sm:flex flex-shrink-0"
                    style={{ background: 'rgba(168,85,247,0.2)', border: '2px solid rgba(168,85,247,0.5)' }}>
                    <span className="font-orbitron font-900 text-primary-400 text-sm">{s.step}</span>
                  </div>
                  <GlassCard className="p-4 flex-1" delay={0}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{s.icon}</span>
                      <h3 className="font-orbitron font-700 text-white text-sm">{s.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-inter">{s.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Appel */}
        <GlassCard className="p-7" delay={0.05} glow>
          <SectionHeader emoji="🔁" title="Procédure d'Appel" subtitle="Contestez une sanction que vous estimez injuste." />
          <ul>
            {APPEL_REGLES.map((r, i) => {
              const colors = {
                ban:  { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.5)',   text: '#fca5a5' },
                warn: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.5)',  text: '#fdba74' },
                info: { bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.5)',  text: '#c084fc' },
                ok:   { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.5)',   text: '#86efac' },
              }
              const c = colors[r.severity] || colors.info
              return (
                <li key={i} className="flex items-start gap-3 px-4 py-3 rounded-lg mb-2 text-sm font-inter leading-relaxed"
                  style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}>
                  <span className="flex-shrink-0" style={{ color: c.text }}>{r.icon}</span>
                  <span className="text-gray-300">{r.text}</span>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 text-center">
            <a
              href="https://discord.gg/k5QXH7yZAZ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              💬 Ouvrir un ticket d'appel
            </a>
          </div>
        </GlassCard>

      </div>
    </PageWrapper>
  )
}
