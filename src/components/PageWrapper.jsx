import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const pageVariants = {
  initial:  { opacity: 0, y: 14 },
  animate:  { opacity: 1, y: 0,   transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0,         transition: { duration: 0.18 } },
}

export default function PageWrapper({ title, description, children, className = '' }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Helmet>
        <title>{title ? `${title} — FiveLife RP` : 'FiveLife RP — L\'immersion absolue'}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>

      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`min-h-screen page-content ${className}`}
      >
        {children}
      </motion.div>
    </>
  )
}
