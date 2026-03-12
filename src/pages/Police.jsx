import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'

function RuleItem({ icon, text, severity = 'info' }) {
  const colors = {
    ban:  { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.5)',   text: '#fca5a5' },
    warn: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.5)',  text: '#fdba74' },
    info: { bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.5)',  text: '#c084fc' },
    ok:   { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.5)',   text: '#86efac' },
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

const GRADES = [
  { grade: 'Stagiaire',      color: '#6b7280', icon: '👮' },
  { grade: 'Agent',          color: '#a855f7', icon: '👮' },
  { grade: 'Officier',       color: '#8b5cf6', icon: '👮‍♂️' },
  { grade: 'Inspecteur',     color: '#3b82f6', icon: '🕵️' },
  { grade: 'Lieutenant',     color: '#06b6d4', icon: '🎖️' },
  { grade: 'Capitaine',      color: '#10b981', icon: '⭐' },
  { grade: 'Commandant',     color: '#f59e0b', icon: '⭐⭐' },
  { grade: 'Commissaire',    color: '#ef4444', icon: '⭐⭐⭐' },
]

const REGLEMENT_HRP_SASP = [
  { icon: '🎙️', text: 'Micro obligatoire, fonctionnel et de qualité correcte. Aucune mission sans communication vocale.', severity: 'ban' },
  { icon: '🚫', text: 'Abus de pouvoir ou d\'autorité : expulsion immédiate de la faction + sanction staff sévère.', severity: 'ban' },
  { icon: '🏫', text: 'Formation académique de 2h minimum obligatoire avant toute prise de service officielle.', severity: 'warn' },
  { icon: '📸', text: 'Tenue réglementaire obligatoire en service. Toute modification non approuvée est sanctionnée.', severity: 'warn' },
  { icon: '🤝', text: 'Respect des autres joueurs, même hors-service. Un policier reste un représentant de la faction 24/7.', severity: 'warn' },
  { icon: '📋', text: 'Rédaction des PV, rapports d\'arrestation et fiches d\'incident obligatoire pour chaque intervention.', severity: 'info' },
  { icon: '🔒', text: 'Les informations internes à la faction (grades, opérations, véhicules tactiques) sont confidentielles.', severity: 'info' },
  { icon: '⚖️', text: 'Appliquer le code pénal du serveur à la lettre. Aucune peine ne peut être inventée sans base légale RP.', severity: 'warn' },
]

const REGLEMENT_RP_SASP = [
  { icon: '🔫', text: 'Usage des armes encadré par le protocole d\'intervention. Force létale uniquement en dernier recours.', severity: 'ban' },
  { icon: '🚗', text: 'Les poursuites doivent respecter la sécurité des civils. Stopper une course si le risque est trop élevé.', severity: 'warn' },
  { icon: '📢', text: 'Mise en situation : annonce orale de votre qualité de policier et mise en demeure avant toute action.', severity: 'warn' },
  { icon: '🔒', text: 'La mise en détention doit être justifiée RP. Un joueur peut contester son arrestation via un avocat.', severity: 'info' },
  { icon: '🧊', text: 'Un suspect menotté doit être escorté et ne peut pas être laissé sans surveillance prolongée.', severity: 'info' },
  { icon: '📝', text: 'Tout usage de la force doit faire l\'objet d\'un rapport écrit déposé dans les 24h RP.', severity: 'info' },
  { icon: '🤝', text: 'Collaboration obligatoire avec la SAMC sur les scènes mixtes. Sécurisation de la zone = priorité.', severity: 'ok' },
  { icon: '🛡️', text: 'Le brassard tactique et le gilet pare-balles réglementaire sont obligatoires pour les interventions armées.', severity: 'warn' },
]

const PRISON_RULES = [
  { icon: '⏱️', text: 'Durée de détention proportionnelle aux infractions commises selon le barème officiel du code pénal.', severity: 'info' },
  { icon: '📞', text: 'Tout détenu a droit à un appel téléphonique et à un avocat commis d\'office si nécessaire.', severity: 'ok' },
  { icon: '🔑', text: 'Les libérations anticipées doivent être validées par un officier supérieur ou le DOJ (Département de Justice).', severity: 'warn' },
  { icon: '🚫', text: 'Aucun policier ne peut fouiller une cellule sans mandat ou flagrance. Le droit du détenu est protégé RP.', severity: 'warn' },
  { icon: '🎭', text: 'Les détenus peuvent interagir entre eux en RP pendant leur incarcération. La vie carcérale est jouée.', severity: 'ok' },
]

const DEPARTS = [
  { icon: '📋', text: 'Tout recrutement doit passer par le formulaire officiel disponible sur le Discord de la SASP.', severity: 'info' },
  { icon: '🎓', text: 'Période de formation académique de 2 heures minimum animée par un instructeur certifié.', severity: 'warn' },
  { icon: '🔍', text: 'Période d\'essai de 7 jours observée par la hiérarchie avant titularisation définitive.', severity: 'info' },
  { icon: '🚪', text: 'Tout départ de la faction doit être signalé en avance. Un départ sans préavis entraîne un blacklist.', severity: 'warn' },
]

export default function Police() {
  return (
    <PageWrapper
      title="SASP — Police"
      description="Présentation complète de la SASP et règlement interne de la Police d'État sur FiveLife RP."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a101a 50%, #0a0a0a 100%)' }}>
        <div className="orb w-96 h-96 top-0 left-1/3 opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-blue mb-4 inline-block">🚔 San Andreas State Police</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              SASP — <span className="text-gradient-static">Police d'État</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              La San Andreas State Police maintient l'ordre et fait appliquer la loi sur l'ensemble du territoire. Rejoignez les forces de l'ordre les plus respectées de Los Santos.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Présentation + Stats */}
        <GlassCard className="p-7" delay={0}>
          <SectionHeader emoji="🚔" title="Présentation de la SASP" subtitle="La force de police officielle de San Andreas." />
          <p className="text-gray-400 text-sm font-inter leading-relaxed mb-6">
            La <strong className="text-white">San Andreas State Police (SASP)</strong> est la principale force de maintien de l'ordre sur FiveLife RP. Elle est responsable de l'application du code pénal, de la sécurité des citoyens, et de la coordination avec les autres institutions (SAMC, DOJ, Gouvernement).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { val: '24/7', label: 'Service continu' },
              { val: '2h', label: 'Formation académique' },
              { val: '7j', label: "Période d'essai" },
              { val: '8', label: 'Grades hiérarchiques' },
            ].map((s, i) => (
              <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="font-orbitron font-900 text-xl text-blue-400">{s.val}</div>
                <div className="text-gray-500 text-xs font-inter mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Hiérarchie */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="🎖️" title="Hiérarchie SASP" subtitle="8 grades du stagiaire au commissaire en chef." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GRADES.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center p-3 rounded-xl"
                style={{ background: `${g.color}12`, border: `1px solid ${g.color}30` }}
              >
                <div className="text-2xl mb-1">{g.icon}</div>
                <div className="font-orbitron font-700 text-xs" style={{ color: g.color }}>{g.grade}</div>
                <div className="text-gray-600 text-[10px] font-inter mt-1">Niveau {i + 1}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Recrutement */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="📋" title="Recrutement & Formation" subtitle="Le processus pour intégrer la SASP." />
          <ul>
            {DEPARTS.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Règlement HRP */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="📜" title="Règlement HRP SASP" subtitle="Obligations hors-roleplay pour tout officier." />
          <ul>
            {REGLEMENT_HRP_SASP.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Règlement RP */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="🎭" title="Règlement RP SASP" subtitle="Obligations in-character pendant vos interventions." />
          <ul>
            {REGLEMENT_RP_SASP.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Règlement Prison */}
        <GlassCard className="p-7" delay={0.05} glow>
          <SectionHeader emoji="🔒" title="Règlement Carcéral" subtitle="Droits et obligations des détenus et du personnel pénitentiaire." />
          <ul>
            {PRISON_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

      </div>
    </PageWrapper>
  )
}
