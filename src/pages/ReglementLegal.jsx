import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'

function RuleItem({ icon = '·', text, severity = 'info' }) {
  const colors = {
    ban:  { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.5)',   text: '#fca5a5' },
    warn: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.5)',  text: '#fdba74' },
    info: { bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.5)',  text: '#c084fc' },
    ok:   { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.5)',   text: '#86efac' },
  }
  const c = colors[severity] || colors.info
  return (
    <li className="flex items-start gap-3 px-4 py-3 rounded-lg mb-2 text-sm font-inter leading-relaxed transition-all hover:scale-[1.01]"
      style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}>
      <span className="flex-shrink-0 mt-0.5" style={{ color: c.text }}>{icon}</span>
      <span className="text-gray-300">{text}</span>
    </li>
  )
}

/* ── POLICE ─────────────────────────────────────── */
const POLICE_RULES = [
  { icon: '👮', text: 'Tenue complète SASP obligatoire en service. Hors service, rangez tout votre équipement dans votre casier.', severity: 'ban' },
  { icon: '🪪', text: 'Identité + badge obligatoires avant toute intervention officielle.', severity: 'ban' },
  { icon: '🔗', text: 'Procédure : Menottage → Fouille → Amende → Procès-verbal.', severity: 'info' },
  { icon: '🚗', text: 'Pas de poursuite >15 minutes sans RP justifié. Nombre de véhicules croît selon la durée.', severity: 'warn' },
  { icon: '📻', text: 'Radio 1 uniquement en service. Pas de communication externe.', severity: 'warn' },
  { icon: '📷', text: 'Caméras corporelles (bodycam) actives en permanence en service. Images utilisables par le DOJ.', severity: 'info' },
  { icon: '🔫', text: 'Rapport obligatoire après utilisation d\'une arme à feu. Les munitions sont comptées.', severity: 'ban' },
  { icon: '🏛️', text: 'Les postes de police sont des zones de sécurité (zone safe). Braquage / kidnapping interdits.', severity: 'ban' },
  { icon: '🎯', text: 'Pit à vitesse modérée uniquement, sur autorisation du Command Staff.', severity: 'warn' },
  { icon: '🤝', text: 'Soyez fairplay. Ne fuyez pas un simple contrôle par principe.', severity: 'info' },
  { icon: '🚫', text: 'Interdit d\'attirer un agent dans une embuscade à cause de son emploi RP.', severity: 'ban' },
  { icon: '⚖️', text: 'Transfert de matériel police (armes, menottes, uniformes) = bannissement définitif.', severity: 'ban' },
  { icon: '🚓', text: 'RP Ripou strictement interdit. Dossier staff obligatoire pour toute exception.', severity: 'ban' },
  { icon: '🧹', text: 'Impossible de faire un projet SASP avec un perso lié à l\'illégal. Sanction + wipe.', severity: 'ban' },
]

const PRISON_RULES = [
  { icon: '🏛️', text: 'Dès entrée à Bolingbroke, le RP pénitentiaire est obligatoire.', severity: 'info' },
  { icon: '⛏️', text: 'TIG ou UC : vous devez vous conformer à la sentence. Aucune évasion possible en prison.', severity: 'warn' },
  { icon: '🚌', text: 'Si évasion, elle doit avoir lieu pendant le convoi uniquement.', severity: 'warn' },
  { icon: '📿', text: 'Le bracelet électronique informe la police de votre position toutes les 5 minutes.', severity: 'info' },
  { icon: '🔒', text: 'Retirer le bracelet par ses propres moyens est impossible.', severity: 'info' },
]

/* ── AMBULANCE ──────────────────────────────────── */
const SAMS_RULES = [
  { icon: '🚑', text: 'Sirène + gyrophare OBLIGATOIRES à 100m de la zone d\'intervention.', severity: 'ban' },
  { icon: '🛑', text: 'Arrêt total du véhicule avant toute intervention médicale.', severity: 'ban' },
  { icon: '🚫', text: 'Soins en mouvement interdits — blessé stable d\'abord, soin ensuite.', severity: 'ban' },
  { icon: '💊', text: 'Facturation RP obligatoire après chaque intervention. Détail des soins requis.', severity: 'ban' },
  { icon: '🩺', text: 'Tenue médicale complète obligatoire en service. Hors service, tout le matériel range.', severity: 'ban' },
  { icon: '⛔', text: 'Interdit d\'utiliser les véhicules de service à des fins personnelles.', severity: 'ban' },
  { icon: '🔄', text: 'Passage illégal → EMS ou inversement = wipe + blacklist/bannissement.', severity: 'ban' },
  { icon: '🏥', text: 'Scènes de soin réalistes : fracture = examens complets, pas de "pensement magique".', severity: 'warn' },
  { icon: '📦', text: 'Vente/don de matériel médical à des civils hors prescriptions = BAN.', severity: 'ban' },
  { icon: '📻', text: 'Port ou utilisation de radio hors service à des fins personnelles = sanction lourde.', severity: 'ban' },
  { icon: '💼', text: 'Un membre SAMC ne peut pas avoir un autre job en parallèle.', severity: 'ban' },
  { icon: '🎯', text: 'La SAMC peut déposer des dossiers de Mort RP médicale selon le dossier du joueur.', severity: 'info' },
]

const ATA_RULES = [
  { icon: '🩹', text: 'Un ATA est émis suite à une blessure (accident, arme blanche, arme à feu).', severity: 'info' },
  { icon: '⏱️', text: 'ATA max : 24h. Blessure légère : 24–45 min. Blessure lourde : 1–24h.', severity: 'warn' },
  { icon: '🚗', text: 'Interdit de transporter des patients dans des véhicules non adaptés.', severity: 'ban' },
]

/* ── GOUVERNEMENT ───────────────────────────────── */
const GOV_RULES = [
  { icon: '🗳️', text: 'Élections du Gouverneur et cabinet organisées tous les 5 mois.', severity: 'info' },
  { icon: '🚫', text: 'RP illégal strictement interdit dans le Gouvernement. Bannissement définitif.', severity: 'ban' },
  { icon: '🔒', text: 'Impossible d\'avoir un P2 ou un second slot perso pour les membres.', severity: 'ban' },
  { icon: '📋', text: 'Candidature pour Gouverneur : contacter le staff pour officialiser, puis campagne IC.', severity: 'info' },
  { icon: '⚖️', text: 'Le DOJ et le Gouvernement collaborent étroitement mais aucun n\'est supérieur à l\'autre.', severity: 'info' },
  { icon: '🔐', text: 'Informations confidentielles traitées avec le plus grand soin. Aucune divulgation.', severity: 'ban' },
  { icon: '🏛️', text: 'Tribunaux et locaux gouvernementaux = zones de sécurité. Braquage interdit.', severity: 'ban' },
  { icon: '🎯', text: 'Interdit de prendre un membre du gouvernement en otage sans préméditation.', severity: 'ban' },
  { icon: '⚖️', text: 'Emprisonnement à vie ou long terme : approbation du staff obligatoire avant.', severity: 'warn' },
]

export default function ReglementLegal() {
  return (
    <PageWrapper
      title="Règlement Légal"
      description="Règlements légaux FiveLife RP — SASP Police, SAMC Ambulance, Gouvernement, DOJ."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 hero-ambient bg-grid overflow-hidden">
        <div className="orb orb-purple w-96 h-96 top-0 right-0 opacity-25" />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-purple mb-4 inline-block">⚖️ Factions Légales</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              Règlement <span className="text-gradient-static">Légal</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Règlements spécifiques aux factions légales : SASP, SAMC et Gouvernement. Ces règles complètent le règlement global.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* ── POLICE ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(37,99,235,0.2))', border: '1px solid rgba(59,130,246,0.4)' }}>
              🚓
            </div>
            <div>
              <h2 className="font-orbitron font-800 text-xl text-white">SASP — San Andreas State Police</h2>
              <p className="text-gray-500 text-sm font-inter">Application de la loi à Los Santos</p>
            </div>
          </motion.div>

          <GlassCard className="p-7 mb-5" delay={0}>
            <SectionHeader emoji="📌" title="Règlement Police" subtitle="Règles à respecter en tant qu'agent de la SASP." />
            <ul className="space-y-0">
              {POLICE_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
            </ul>
          </GlassCard>

          <GlassCard className="p-7" delay={0.05}>
            <SectionHeader emoji="🏦" title="Règlement Prison" subtitle="Comportements lors d'une incarcération à Bolingbroke." />
            <ul className="space-y-0">
              {PRISON_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
            </ul>
          </GlassCard>
        </div>

        {/* ── AMBULANCE ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(185,28,28,0.2))', border: '1px solid rgba(239,68,68,0.4)' }}>
              🚑
            </div>
            <div>
              <h2 className="font-orbitron font-800 text-xl text-white">SAMC — San Andreas Medical Company</h2>
              <p className="text-gray-500 text-sm font-inter">Née le 11 février 2024, fusion LSMC + BCMC</p>
            </div>
          </motion.div>

          <GlassCard className="p-7 mb-5" delay={0.1}>
            <SectionHeader emoji="🔨" title="Règlement HRP SAMC" subtitle="Obligations et interdictions pour les membres du service médical." />
            <ul className="space-y-0">
              {SAMS_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
            </ul>
          </GlassCard>

          <GlassCard className="p-7" delay={0.15}>
            <SectionHeader emoji="🩺" title="Arrêts de Travail (ATA)" subtitle="Système de restriction temporaire suite à blessures." />
            <ul className="space-y-0">
              {ATA_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
            </ul>
          </GlassCard>
        </div>

        {/* ── GOUVERNEMENT ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.3), rgba(161,98,7,0.2))', border: '1px solid rgba(234,179,8,0.4)' }}>
              🏛️
            </div>
            <div>
              <h2 className="font-orbitron font-800 text-xl text-white">Gouvernement & DOJ</h2>
              <p className="text-gray-500 text-sm font-inter">Direction de l'État de San Andreas</p>
            </div>
          </motion.div>

          <GlassCard className="p-7" delay={0.2}>
            <SectionHeader emoji="📌" title="Règlement Gouvernement & DOJ" />
            <ul className="space-y-0">
              {GOV_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  )
}
