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

const CENTRES = [
  { city: 'Los Santos', hospital: 'PillBox Hill Medical Center', icon: '🏥', primary: true },
  { city: 'Paleto Bay',  hospital: 'Paleto Bay Medical Center',   icon: '🏥', primary: false },
  { city: 'Sandy Shores',hospital: 'Sandy Shores Medical Center', icon: '🏥', primary: false },
  { city: 'Roxwood',     hospital: 'Roxwood Medical Center',      icon: '🏥', primary: false },
  { city: 'Cayo Perico', hospital: 'Cayo Perico Medical Station', icon: '🚁', primary: false },
]

const SERVICES = [
  { icon: '🚑', name: 'SAR', full: 'Search & Rescue', desc: 'Intervention rapide sur les scènes d\'accident et récupération des blessés.' },
  { icon: '🔪', name: 'Chirurgie', full: 'Bloc Opératoire',  desc: 'Interventions chirurgicales lourdes pour les blessures critiques.' },
  { icon: '🧠', name: 'Psy',       full: 'Psychiatrie',       desc: 'Suivi psychologique pour les traumatismes et troubles mentaux.' },
  { icon: '👶', name: 'Obst.',     full: 'Obstétrique',       desc: 'Service maternité et suivi gynécologique.' },
  { icon: '🧬', name: 'Labo',      full: 'Laboratoire',       desc: 'Analyses biologiques, toxicologiques et médico-légales.' },
  { icon: '⚰️', name: 'Mort.',     full: 'Mortuaire',         desc: 'Gestion des décès, autopsies et organisation funèbre.' },
]

const REGLEMENT_EMS_HRP = [
  { icon: '🎙️', text: 'Micro obligatoire et fonctionnel en service. Aucune intervention sans communication vocale.', severity: 'ban' },
  { icon: '🚫', text: 'Interdiction formelle de dévoiler des informations médicales confidentielles hors protocole médical RP.', severity: 'ban' },
  { icon: '⚠️', text: 'Tout abus de position médicale (spawn abusif d\'un patient, TP non justifié) est sanctionné sévèrement.', severity: 'ban' },
  { icon: '🏥', text: 'Rester en tenue EMS lorsque vous êtes en service. Hors service, vous êtes un civil ordinaire.', severity: 'warn' },
  { icon: '🔧', text: 'Signaler tout bug ou comportement anormal au staff via ticket. Ne jamais exploiter un bug.', severity: 'warn' },
  { icon: '📋', text: 'Compléter les rapports d\'intervention pour chaque patient traité. La traçabilité est obligatoire.', severity: 'info' },
  { icon: '🤝', text: 'Collaborer avec la SASP pour les scènes de crime. Vous êtes neutres — ne prenez pas parti.', severity: 'ok' },
  { icon: '🚁', text: 'L\'hélicoptère médicalisé est réservé aux urgences critiques inaccessibles par voie terrestre.', severity: 'info' },
]

const REGLEMENT_RP = [
  { icon: '❤️', text: 'Vous ne pouvez pas refuser de soigner un joueur sur le plan HRP. Hors-RP, l\'obligation de soins s\'applique.', severity: 'ok' },
  { icon: '🎭', text: 'Jouez les blessures de vos patients de manière réaliste. Un coup de feu à la tête n\'est pas la même chose qu\'une chute.', severity: 'info' },
  { icon: '💊', text: 'La gestion des médicaments et stupéfiants doit être RP. Tout détournement est un motif d\'exclusion.', severity: 'ban' },
  { icon: '⏱️', text: 'Le temps de revive est de 10 minutes. Ne relancez pas un joueur avant sans accord RP.', severity: 'warn' },
  { icon: '🔇', text: 'Sur une scène active, vous bénéficiez d\'une zone de sécurité. Les tirs sur le personnel EMS sont strictement interdits.', severity: 'ok' },
  { icon: '📞', text: 'En cas d\'appel 15, vous DEVEZ répondre si vous êtes en service — même si le RP en cours est intense.', severity: 'warn' },
]

const MORT_RP = [
  { icon: '☠️', text: 'La mort RP (MortRP) efface tous les souvenirs de l\'événement ayant causé votre mort définitive.', severity: 'warn' },
  { icon: '🔄', text: 'Vous revenez avec une nouvelle vie, un nouveau passé. Vous ne connaissez plus les personnes impliquées dans votre mort.', severity: 'info' },
  { icon: '📜', text: 'La MortRP doit être validée par un admin. Elle ne peut pas être forcée sans accord des parties ou sanction staff.', severity: 'warn' },
  { icon: '🎭', text: 'Le personnel EMS décide du moment où un joueur est médicalement décédé. Leurs décisions sont définitives RP.', severity: 'info' },
  { icon: '⚠️', text: 'Abuser du système de MortRP pour effacer des dettes ou éviter des conséquences RP est puni d\'un ban.', severity: 'ban' },
]

const EMS_ILLEGAUX = [
  { icon: '🩸', text: 'Les EMS illégaux (médecins corrompus) doivent avoir un dossier validé par le staff et la hiérarchie SAMC.', severity: 'warn' },
  { icon: '💉', text: 'La vente de médicaments sur le marché noir par un EMS illégal est un RP autorisé sous conditions strictes.', severity: 'info' },
  { icon: '🚨', text: 'Si un EMS illégal est arrêté IC, il subit les conséquences RP normales. Aucune immunité liée au grade.', severity: 'warn' },
  { icon: '🎭', text: 'Le double-jeu (EMS légal + illégal simultané) est strictement interdit sans autorisation staff explicite.', severity: 'ban' },
]

export default function Ambulance() {
  return (
    <PageWrapper
      title="SAMC — Ambulance"
      description="Présentation complète de la SAMC (San Andreas Medical Center) et règlement EMS de FiveLife RP."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a1a12 50%, #0a0a0a 100%)' }}>
        <div className="orb w-96 h-96 top-0 left-1/3 opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.3), transparent)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-green mb-4 inline-block">🚑 San Andreas Medical Center</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              SAMC — <span className="text-gradient-static">Ambulanciers</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Née le 11 février 2024 de la fusion du LSMC et du BCMC, la SAMC est l'institution médicale officielle de FiveLife RP.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Présentation */}
        <GlassCard className="p-7" delay={0}>
          <SectionHeader emoji="🏥" title="Présentation de la SAMC" subtitle="Une institution médicale moderne au service de Los Santos." />
          <div className="prose prose-invert max-w-none text-gray-400 text-sm font-inter leading-relaxed space-y-4">
            <p>
              La <strong className="text-white">San Andreas Medical Center (SAMC)</strong> est née le <strong className="text-green-400">11 février 2024</strong> de la fusion du Los Santos Medical Center (LSMC) et du Blaine County Medical Center (BCMC). Cette unification a permis de créer une structure médicale unique, couvrant l'ensemble du comté de San Andreas.
            </p>
            <p>
              La SAMC intervient sur toutes les urgences médicales du territoire, que ce soit pour des accidents de la route, des fusillades, des overdoses ou des catastrophes naturelles. Ses équipes sont formées pour répondre dans les délais les plus courts possibles.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { val: '5', label: 'Centres médicaux' },
              { val: '24/7', label: 'Service continu' },
              { val: '10min', label: 'Délai max. revive' },
              { val: '2024', label: 'Création SAMC' },
            ].map((s, i) => (
              <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="font-orbitron font-900 text-xl text-green-400">{s.val}</div>
                <div className="text-gray-500 text-xs font-inter mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Centres */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="📍" title="Centres Médicaux" subtitle="5 établissements répartis sur tout San Andreas." />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {CENTRES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: c.primary ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${c.primary ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="font-orbitron font-700 text-white text-xs">{c.city}</div>
                  <div className="text-gray-500 text-[10px] font-inter mt-0.5">{c.hospital}</div>
                  {c.primary && <span className="badge badge-green text-[9px] mt-1">Siège principal</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Services */}
        <GlassCard className="p-7" delay={0.1}>
          <SectionHeader emoji="🔬" title="Services Médicaux" subtitle="Une gamme complète de soins pour tous les scénarios RP." />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-orbitron font-700 text-white text-xs">{s.name}</div>
                <div className="text-primary-400 text-[10px] font-inter mb-2">{s.full}</div>
                <p className="text-gray-500 text-[11px] font-inter leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Règlement HRP */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="📋" title="Règlement HRP EMS" subtitle="Obligations hors-roleplay pour tout membre de la SAMC." />
          <ul>
            {REGLEMENT_EMS_HRP.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Règlement RP */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="🎭" title="Règlement RP EMS" subtitle="Obligations in-character pour les ambulanciers en service." />
          <ul>
            {REGLEMENT_RP.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* MortRP */}
        <GlassCard className="p-7" delay={0.05} glow>
          <SectionHeader emoji="☠️" title="Système MortRP" subtitle="La mort définitive et ses conséquences sur votre personnage." />
          <ul>
            {MORT_RP.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* EMS Illégaux */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="🩸" title="EMS Illégaux" subtitle="Règles encadrant le roleplay de médecins corrompus." />
          <ul>
            {EMS_ILLEGAUX.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

      </div>
    </PageWrapper>
  )
}
