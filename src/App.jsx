import { lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ParticleBg from './components/ParticleBg'
import LoadingScreen from './components/LoadingScreen'

const Home            = lazy(() => import('./pages/Home'))
const ReglementGlobal = lazy(() => import('./pages/ReglementGlobal'))
const ReglementLegal  = lazy(() => import('./pages/ReglementLegal'))
const ReglementIllegal= lazy(() => import('./pages/ReglementIllegal'))
const HrpRp           = lazy(() => import('./pages/HrpRp'))
const Ambulance       = lazy(() => import('./pages/Ambulance'))
const Police          = lazy(() => import('./pages/Police'))
const Entreprises     = lazy(() => import('./pages/Entreprises'))
const Sanctions       = lazy(() => import('./pages/Sanctions'))
const Faq             = lazy(() => import('./pages/Faq'))

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      {/* Particle canvas background */}
      <ParticleBg />

      {/* Subtle scan line */}
      <div className="scanline" />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content — offset by sidebar on md+ */}
      <main
        className="relative z-10 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarOpen ? 0 : 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/reglement-global"  element={<ReglementGlobal />} />
            <Route path="/reglement-legal"   element={<ReglementLegal />} />
            <Route path="/reglement-illegal" element={<ReglementIllegal />} />
            <Route path="/hrp-rp"            element={<HrpRp />} />
            <Route path="/ambulance-sams"    element={<Ambulance />} />
            <Route path="/sasp-police"       element={<Police />} />
            <Route path="/entreprises"       element={<Entreprises />} />
            <Route path="/sanctions"         element={<Sanctions />} />
            <Route path="/faq-contact"       element={<Faq />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}
