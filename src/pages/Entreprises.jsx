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

const ENTREPRISES = [
  {
    icon: '🔧',
    name: 'Mécanicien',
    color: '#f59e0b',
    desc: 'Réparez les véhicules des citoyens de Los Santos. Un bon méca RP prend RDV, diagnostique et explique les réparations à son client.',
    rules: [
      { icon: '📞', text: 'Les rendez-vous mécanicien se font RP. Appelez le client, fixez une heure et un lieu.', severity: 'info' },
      { icon: '💬', text: 'Expliquez chaque réparation à votre client en RP : "Je dois changer les freins, ça va prendre 30 minutes."', severity: 'ok' },
      { icon: '🚫', text: 'Aucune activité illégale pendant les heures de service (trafic de pièces volées, chop shop, etc.).', severity: 'ban' },
      { icon: '💰', text: 'Tarifs affichés obligatoires. Pas de surtarification abusive ni d\'arnaques sur les devis.', severity: 'warn' },
    ],
  },
  {
    icon: '🚕',
    name: 'Chauffeur de Taxi',
    color: '#f59e0b',
    desc: 'Transportez les citoyens à travers Los Santos. Le taxi RP c\'est une vraie relation client : compteur, pourboire, conversation.',
    rules: [
      { icon: '📟', text: 'Compteur obligatoire : démarrez-le à chaque course et annoncez le prix en fin de trajet.', severity: 'warn' },
      { icon: '🎙️', text: 'Engagez la conversation avec vos passagers. Un taxi silencieux est un mauvais taxi RP.', severity: 'ok' },
      { icon: '🚫', text: 'Interdiction de transporter des suspects en fuite de la police sans conséquence RP assumée.', severity: 'warn' },
      { icon: '🗺️', text: 'Connaître les principaux lieux de Los Santos est un prérequis. Pas de GPS visible HRP.', severity: 'info' },
    ],
  },
  {
    icon: '🍔',
    name: 'Fast-Food',
    color: '#ef4444',
    desc: 'Nourrissez Los Santos. Burger Shot, bien-cuit ou saignant — chaque commande est une scène RP à part entière.',
    rules: [
      { icon: '⏳', text: 'Les files d\'attente doivent être gérées RP : pas de saut de file, respect de l\'ordre d\'arrivée.', severity: 'warn' },
      { icon: '🗣️', text: 'Annoncez les plats disponibles, les prix, les promotions en RP. Créez une vraie ambiance de restaurant.', severity: 'ok' },
      { icon: '🧹', text: 'Le nettoyage du restaurant entre les services est une responsabilité RP des employés.', severity: 'info' },
      { icon: '🚫', text: 'Aucune bagarre tolérée à l\'intérieur de l\'établissement. Les conflits se règlent dehors.', severity: 'warn' },
    ],
  },
  {
    icon: '🏦',
    name: 'Banque & Finance',
    color: '#10b981',
    desc: 'Gérez les finances de Los Santos. Prêts, virements, investissements — la finance RP est un pilier de l\'économie serveur.',
    rules: [
      { icon: '📄', text: 'Tout prêt doit faire l\'objet d\'un contrat RP signé par les deux parties avec conditions claires.', severity: 'warn' },
      { icon: '🔒', text: 'Les informations bancaires des clients sont strictement confidentielles. Aucune divulgation.', severity: 'ban' },
      { icon: '⚖️', text: 'En cas de braquage, le personnel coopère. La résistance armée n\'est autorisée que sur décision hiérarchique.', severity: 'info' },
      { icon: '💰', text: 'Les transactions suspectes (blanchiment, montants anormaux) doivent être signalées à la direction.', severity: 'warn' },
    ],
  },
  {
    icon: '🏠',
    name: 'Immobilier',
    color: '#8b5cf6',
    desc: 'Vendez, louez et gérez les propriétés de Los Santos. L\'immobilier RP est l\'une des activités les plus lucratives du serveur.',
    rules: [
      { icon: '📋', text: 'Tout contrat de vente/location doit être écrit et signé RP avant tout transfert de fonds.', severity: 'warn' },
      { icon: '🔑', text: 'La remise des clés se fait obligatoirement en présence des deux parties, en RP complet.', severity: 'info' },
      { icon: '🚫', text: 'Spéculation abusive (revente immédiate à prix doublé) sanctionnée par la direction du marché immobilier.', severity: 'warn' },
      { icon: '📸', text: 'Les visites d\'appartements sont des scènes RP à valoriser. Prenez le temps de présenter le bien.', severity: 'ok' },
    ],
  },
]

const REGLES_GENERALES = [
  { icon: '🚫', text: 'Toute activité illégale pendant les heures de service entraîne un licenciement immédiat de la faction.', severity: 'ban' },
  { icon: '👔', text: 'La tenue professionnelle de l\'entreprise est obligatoire pendant les heures de travail.', severity: 'warn' },
  { icon: '⭐', text: 'La qualité du service RP prime sur la rapidité. Prenez le temps de faire de bonnes interactions.', severity: 'ok' },
  { icon: '📱', text: 'Les offres d\'emploi, promotions et services doivent passer par les canaux officiels (Discord, annonces RP).', severity: 'info' },
  { icon: '🤝', text: 'Respectez vos collègues et la hiérarchie de votre entreprise. Les conflits internes se règlent RP.', severity: 'ok' },
  { icon: '💼', text: 'Chaque patron d\'entreprise est responsable des actions de ses employés envers les clients.', severity: 'warn' },
]

export default function Entreprises() {
  return (
    <PageWrapper
      title="Entreprises"
      description="Règlement des entreprises légales sur FiveLife RP — mécanicien, taxi, fast-food, immobilier et plus."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0a1a 50%, #0a0a0a 100%)' }}>
        <div className="orb orb-pink w-96 h-96 top-0 right-1/4 opacity-25" />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-purple mb-4 inline-block">💼 Économie RP</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              Entreprises <span className="text-gradient-static">Légales</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              L'économie de Los Santos repose sur vous. Chaque entreprise est une opportunité de créer du RP de qualité et de construire l'identité de votre personnage.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Règles générales */}
        <GlassCard className="p-7" delay={0}>
          <SectionHeader emoji="📜" title="Règles Générales" subtitle="Applicable à toutes les entreprises légales du serveur." />
          <ul>
            {REGLES_GENERALES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Entreprises individuelles */}
        {ENTREPRISES.map((e, idx) => (
          <GlassCard key={idx} className="p-7" delay={idx * 0.05}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `${e.color}20`, border: `2px solid ${e.color}40` }}>
                {e.icon}
              </div>
              <div>
                <h3 className="font-orbitron font-800 text-white text-lg">{e.name}</h3>
                <p className="text-gray-500 text-sm font-inter mt-1">{e.desc}</p>
              </div>
            </div>
            <ul>
              {e.rules.map((r, i) => <RuleItem key={i} {...r} />)}
            </ul>
          </GlassCard>
        ))}

        {/* CTA creer entreprise */}
        <GlassCard className="p-8 text-center" delay={0.1} glow>
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="font-orbitron font-800 text-white text-xl mb-3">Créer votre Entreprise</h3>
          <p className="text-gray-400 font-inter text-sm mb-6 max-w-md mx-auto">
            Vous avez une idée de business RP ? Soumettez votre projet sur le Discord et l'équipe staff étudiera votre candidature.
          </p>
          <a
            href="https://discord.gg/k5QXH7yZAZ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            💬 Rejoindre le Discord
          </a>
        </GlassCard>

      </div>
    </PageWrapper>
  )
}
