import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'

function RuleItem({ icon = '·', text, severity }) {
  const colors = {
    ban:   { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.5)',   text: '#fca5a5' },
    warn:  { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.5)',  text: '#fdba74' },
    info:  { bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.5)',  text: '#c084fc' },
  }
  const c = colors[severity] || colors.info
  return (
    <li
      className="flex items-start gap-3 px-4 py-3 rounded-lg mb-2 text-sm font-inter leading-relaxed transition-all hover:scale-[1.01]"
      style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}
    >
      <span className="flex-shrink-0 mt-0.5" style={{ color: c.text }}>{icon}</span>
      <span className="text-gray-300">{text}</span>
    </li>
  )
}

const GENERAL_RULES = [
  { icon: '⛔', text: 'Propos racistes, xénophobes, homophobes ou haineux → bannissement immédiat.', severity: 'ban' },
  { icon: '⛔', text: 'Contenu sexuel, religieux ou haineux affiché ou envoyé → bannissement.', severity: 'ban' },
  { icon: '🔞', text: 'Personnage mineur interdit. Votre personnage doit avoir 21 ans minimum.', severity: 'ban' },
  { icon: '🎙️', text: 'Vocal extérieur au jeu strictement interdit (Discord, Teams, etc.) en session.', severity: 'ban' },
  { icon: '📺', text: 'Stream hack interdit — être sur un stream en même temps qu\'on est en jeu.', severity: 'ban' },
  { icon: '❌', text: 'RP sexuel interdit, sans exception, quel que soit l\'âge des joueurs.', severity: 'ban' },
  { icon: '💬', text: 'Dialecte HRP interdit en jeu ("papillon", "gopro", "faire un ticket"…).', severity: 'warn' },
  { icon: '📢', text: 'Publicité pour un autre serveur RP strictement interdite.', severity: 'ban' },
  { icon: '🐛', text: 'Abus de bugs ou glitchs = ban permanent (ex : sortir d\'une cellule par animation).', severity: 'ban' },
  { icon: '💰', text: 'Vente ou achat de biens contre argent réel = bannissement définitif.', severity: 'ban' },
  { icon: '🏷️', text: 'Achat/rachat de carte bancaire strictement interdit.', severity: 'ban' },
  { icon: '📱', text: 'Annonces illégales sur Pages Jaunes, Marketplace ou Birdy/Instapic interdites.', severity: 'ban' },
  { icon: '👔', text: 'Matériel et tenues d\'entreprise (kit EMS, uniforme police) interdits hors service.', severity: 'ban' },
  { icon: '👤', text: 'Interdit de créer un personnage après wipe avec le même nom ou pour venger l\'ancien.', severity: 'warn' },
  { icon: '🌊', text: 'Partir à la nage pendant ou après une course-poursuite est interdit.', severity: 'warn' },
]

const COMA_RULES = [
  { icon: '🚫', text: 'Trash corps interdit — faire du trash talk sur un joueur en coma face à vous.', severity: 'ban' },
  { icon: '🚫', text: 'Déplacer intentionnellement le corps d\'un joueur pour l\'empêcher d\'être secouru.', severity: 'ban' },
  { icon: '🔇', text: 'En coma, vous ne pouvez pas communiquer via micro ou /me.', severity: 'warn' },
  { icon: '📝', text: 'La commande /me ne sert qu\'à décrire la douleur de votre personnage en coma.', severity: 'info' },
  { icon: '🧠', text: 'Le coma ne vous fait pas perdre la mémoire de ce qui s\'est passé avant.', severity: 'info' },
  { icon: '☮️', text: 'Si mis en coma lors d\'un conflit, ne pas chercher à vous venger immédiatement.', severity: 'warn' },
]

const BAN_RULES = [
  { icon: '🔍', text: 'Le staff peut refuser l\'accès à tout joueur ayant un historique problématique sur d\'autres serveurs partenaires.', severity: 'warn' },
  { icon: '⚠️', text: 'Antécédents de cheat, duplication, logiciels tiers = refus d\'accès automatique.', severity: 'ban' },
  { icon: '💢', text: 'Comportements toxiques, harcèlement, troll, griefing = exclusion.', severity: 'ban' },
  { icon: '📊', text: 'Le temps de jeu, le comportement Discord et les signalements sont pris en compte.', severity: 'info' },
  { icon: '🔐', text: 'Refuser l\'accès ne nécessite aucune justification publique — protection de la communauté.', severity: 'info' },
]

const DISCORD_RULES = [
  { icon: '🤝', text: 'Respectez tous les membres. Harcèlement, intimidation et discours de haine sont interdits.', severity: 'ban' },
  { icon: '🚫', text: 'Aucun contenu illégal ou inapproprié (images, vidéos, liens) sur le serveur.', severity: 'ban' },
  { icon: '📣', text: 'Pas de spam ni de publicité sans autorisation préalable, y compris en message privé.', severity: 'ban' },
  { icon: '📸', text: 'Partage de contenu personnel interdit sans consentement préalable de la personne.', severity: 'ban' },
  { icon: '📂', text: 'Respectez les canaux de discussion — utilisez le bon canal pour chaque sujet.', severity: 'warn' },
  { icon: '🗣️', text: 'Insultes et propos vulgaires non tolérés. Propos racistes, homophobes, sexistes = ban.', severity: 'ban' },
  { icon: '⚖️', text: 'Les décisions des modérateurs sont finales. Contactez un admin en cas de problème.', severity: 'info' },
]

const TICKET_RULES = [
  { icon: '🎩', text: 'Utilisez des formules de politesse et évitez d\'insulter les membres du staff.', severity: 'info' },
  { icon: '😌', text: 'Restez respectueux même en désaccord avec l\'avis du staff.', severity: 'info' },
  { icon: '🎫', text: 'Évitez d\'ouvrir des tickets sans raison valable.', severity: 'warn' },
  { icon: '⏱️', text: 'Sans réponse dans les 24h, le ticket est automatiquement fermé.', severity: 'warn' },
  { icon: '📋', text: 'Soyez clair et précis dans vos demandes pour une meilleure compréhension.', severity: 'info' },
  { icon: '🔔', text: 'Ne mentionnez pas les membres du staff, soyez patient — votre demande sera traitée.', severity: 'info' },
]

export default function ReglementGlobal() {
  return (
    <PageWrapper
      title="Règlement Global"
      description="Règlements généraux du serveur FiveLife RP — interdictions, coma, Discord, tickets."
    >
      {/* Hero */}
      <div className="relative py-20 px-6 hero-ambient bg-grid overflow-hidden">
        <div className="orb orb-purple w-96 h-96 -top-20 -left-20 opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-purple mb-4 inline-block">📋 Obligatoire</span>
            <h1 className="font-orbitron font-900 text-4xl md:text-5xl text-white mb-4">
              Règlement <span className="text-gradient-static">Global</span>
            </h1>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Ces règles s'appliquent à tous les joueurs, sans exception. Ignorance n'est pas une excuse.
              Tout manquement peut entraîner des sanctions allant du kick au bannissement permanent.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Interdictions */}
        <GlassCard className="p-7" delay={0}>
          <SectionHeader emoji="🌍" title="Interdictions Globales" subtitle="Ces éléments sont formellement et définitivement interdits sur le serveur." />
          <ul className="space-y-0">
            {GENERAL_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Coma */}
        <GlassCard className="p-7" delay={0.05}>
          <SectionHeader emoji="🔌" title="Coma & Déconnexions" subtitle="Comportements à adopter lors d'un coma ou d'une déconnexion involontaire." />
          <ul className="space-y-0">
            {COMA_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Bannissements */}
        <GlassCard className="p-7" delay={0.1}>
          <SectionHeader emoji="🔒" title="Politique de Bannissement" subtitle="Le staff se réserve le droit de refuser l'accès au serveur selon le profil du joueur." />
          <ul className="space-y-0">
            {BAN_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Discord */}
        <GlassCard className="p-7" delay={0.15}>
          <SectionHeader emoji="💬" title="Règlement Discord" subtitle="Règles à respecter sur notre serveur Discord communautaire." />
          <ul className="space-y-0">
            {DISCORD_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Tickets */}
        <GlassCard className="p-7" delay={0.2}>
          <SectionHeader emoji="🎫" title="Règlement des Tickets" subtitle="Comment interagir correctement avec le staff via le système de tickets." />
          <ul className="space-y-0">
            {TICKET_RULES.map((r, i) => <RuleItem key={i} {...r} />)}
          </ul>
        </GlassCard>

        {/* Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl p-5 text-center font-inter text-sm text-primary-300"
          style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.3)' }}
        >
          ⚠️ Ce règlement peut être modifié à tout moment. Il est de votre responsabilité de rester informé des mises à jour.
        </motion.div>
      </div>
    </PageWrapper>
  )
}
