import { useEffect, useMemo, useState } from 'react'
import PageWrapper from '../components/PageWrapper'

const API_BASE = 'https://headless.tebex.io/api'

function cleanEnv(value = '') {
  return String(value).trim().replace(/^['\"]|['\"]$/g, '')
}

const TEBEX_PUBLIC_TOKEN = cleanEnv(import.meta.env.VITE_TEBEX_PUBLIC_TOKEN || '')

const COMPLETE_URL = (
  import.meta.env.VITE_TEBEX_COMPLETE_URL || `${window.location.origin}/`
).trim()

const CANCEL_URL = (
  import.meta.env.VITE_TEBEX_CANCEL_URL || `${window.location.origin}/boutique`
).trim()

function safeString(value, fallback = '') {
  if (typeof value === 'string') return value.trim()
  if (value === null || value === undefined) return fallback
  return String(value).trim()
}

function stripHtml(input = '') {
  return safeString(input).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function safeImage(url) {
  const candidate = safeString(url)
  if (!candidate) return null
  try {
    const parsed = new URL(candidate, window.location.origin)
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.href
  } catch {
    return null
  }
  return null
}

function formatPrice(value, currency = 'USD') {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return `0.00 ${currency}`

  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

async function apiRequest(path, options = {}) {
  const url = `${API_BASE}${path}`
  console.log('[Tebex] Request:', { url, options })

  const response = await fetch(url, options)
  const contentType = response.headers.get('content-type') || ''

  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  console.log('[Tebex] Response:', { status: response.status, payload })

  if (!response.ok) {
    const msg =
      payload?.detail ||
      payload?.error ||
      payload?.message ||
      response.statusText ||
      'Erreur API Tebex'
    throw new Error(`${safeString(msg, 'Erreur API Tebex')} (HTTP ${response.status} on ${path})`)
  }

  return payload
}

async function createBasket() {
  const body = JSON.stringify({
    complete_url: COMPLETE_URL,
    cancel_url: CANCEL_URL,
  })

  // Current Headless route (account-scoped)
  try {
    return await apiRequest(`/accounts/${encodeURIComponent(TEBEX_PUBLIC_TOKEN)}/baskets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    })
  } catch (err) {
    console.warn('[Tebex] Account-scoped basket route failed, trying legacy route:', err)
  }

  // Fallback for older examples
  return apiRequest('/baskets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body,
  })
}

async function addPackageToBasket(basketId, packageId) {
  const body = JSON.stringify({ package_id: Number(packageId) })

  try {
    return await apiRequest(`/baskets/${encodeURIComponent(basketId)}/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    })
  } catch (err) {
    const msg = safeString(err?.message).toLowerCase()
    if (msg.includes('user must login before adding packages to basket')) {
      const loginError = new Error('LOGIN_REQUIRED')
      loginError.basketId = basketId
      throw loginError
    }
    throw err
  }
}

async function getBasketAuthLinks(basketId) {
  const returnUrl = `${window.location.origin}/boutique`
  return apiRequest(
    `/accounts/${encodeURIComponent(TEBEX_PUBLIC_TOKEN)}/baskets/${encodeURIComponent(basketId)}/auth?returnUrl=${encodeURIComponent(returnUrl)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )
}

async function redirectToBasketAuth(basketId) {
  const linksResponse = await getBasketAuthLinks(basketId)

  const providers =
    (Array.isArray(linksResponse) && linksResponse) ||
    (Array.isArray(linksResponse?.data) && linksResponse.data) ||
    []

  const preferred =
    providers.find((p) => safeString(p?.name).toLowerCase().includes('fivem')) ||
    providers[0]

  if (!preferred?.url) {
    throw new Error('Aucun provider de connexion Tebex disponible pour ce panier.')
  }

  console.log('[Store] Redirecting to Tebex auth provider:', preferred)
  window.location.assign(preferred.url)
}

function sanitizePackage(pkg) {
  return {
    id: Number(pkg?.id),
    name: safeString(pkg?.name, 'Package sans nom'),
    description: stripHtml(pkg?.description || pkg?.description_html || 'Aucune description.'),
    price: Number(pkg?.total_price ?? pkg?.price ?? 0),
    currency: safeString(pkg?.currency?.iso_4217 || pkg?.currency || 'USD', 'USD'),
    image:
      safeImage(pkg?.image) ||
      safeImage(pkg?.image_url) ||
      safeImage(pkg?.background_image) ||
      null,
  }
}

function sanitizeCategory(category) {
  const packages = Array.isArray(category?.packages) ? category.packages : []

  return {
    id: Number(category?.id),
    name: safeString(category?.name, 'Catégorie'),
    description: stripHtml(category?.description || ''),
    packages: packages
      .map(sanitizePackage)
      .filter((pkg) => Number.isFinite(pkg.id) && pkg.id > 0),
  }
}

export default function Store() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [buyingPackageId, setBuyingPackageId] = useState(null)

  const hasToken = useMemo(
    () => Boolean(TEBEX_PUBLIC_TOKEN && TEBEX_PUBLIC_TOKEN !== 'REPLACE_WITH_TEBEX_PUBLIC_TOKEN'),
    [],
  )

  useEffect(() => {
    const loadStore = async () => {
      try {
        setLoading(true)
        setError('')

        if (!hasToken) {
          throw new Error('Token Tebex public manquant (VITE_TEBEX_PUBLIC_TOKEN).')
        }

        console.log('[Store] Tebex token loaded:', {
          present: Boolean(TEBEX_PUBLIC_TOKEN),
          length: TEBEX_PUBLIC_TOKEN.length,
        })

        const data = await apiRequest(
          `/accounts/${encodeURIComponent(TEBEX_PUBLIC_TOKEN)}/categories?includePackages=1`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
        )

        const rawCategories =
          (Array.isArray(data?.data) && data.data) ||
          (Array.isArray(data?.categories) && data.categories) ||
          (Array.isArray(data) && data) ||
          []

        const clean = rawCategories
          .map(sanitizeCategory)
          .filter((category) => Number.isFinite(category.id) && category.id > 0)

        console.log('[Store] Categories loaded:', clean)
        setCategories(clean)
      } catch (e) {
        console.error('[Store] Load failed:', e)

        const rawMessage = safeString(e?.message, 'Impossible de charger la boutique.')
        const lowerMessage = rawMessage.toLowerCase()

        if (lowerMessage.includes('account identifier is invalid')) {
          setError('Token Tebex invalide. Vérifie VITE_TEBEX_PUBLIC_TOKEN dans le fichier .env à la racine du projet.')
        } else {
          setError(rawMessage)
        }
      } finally {
        setLoading(false)
      }
    }

    loadStore()
  }, [hasToken])

  const handleBuy = async (packageId) => {
    try {
      setBuyingPackageId(packageId)
      setError('')

      // Step 1: create basket
      const basketRes = await createBasket()

      const basketId =
        safeString(basketRes?.data?.ident) ||
        safeString(basketRes?.ident) ||
        safeString(basketRes?.basket?.ident)

      const basketData = basketRes?.data || basketRes || {}

      if (!basketId) {
        throw new Error('Panier créé sans identifiant Tebex.')
      }

      // Tebex may require user auth before package add.
      // If basket has no user attached, redirect to auth first.
      if (!basketData?.username_id && !safeString(basketData?.username)) {
        await redirectToBasketAuth(basketId)
        return
      }

      // Step 2: add package to basket
      await addPackageToBasket(basketId, packageId)

      // Step 3: redirect to checkout
      const checkoutUrl = `https://checkout.tebex.io/payment/${encodeURIComponent(basketId)}`
      console.log('[Store] Redirect checkout:', checkoutUrl)
      window.location.assign(checkoutUrl)
    } catch (e) {
      console.error('[Store] Checkout failed:', e)

      const rawMessage = safeString(e?.message, 'Échec du checkout Tebex.')
      const lowerMessage = rawMessage.toLowerCase()

      if (rawMessage === 'LOGIN_REQUIRED' && e?.basketId) {
        try {
          await redirectToBasketAuth(e.basketId)
          return
        } catch (authErr) {
          console.error('[Store] Auth link fetch failed:', authErr)
        }

        setError('Tu dois te connecter (FiveM/Tebex) avant d\'ajouter ce package au panier.')
        setBuyingPackageId(null)
        return
      }

      if (lowerMessage.includes('route') && lowerMessage.includes('could not be found')) {
        setError('Route Tebex introuvable. Vérifie la clé publique et la version Headless API du compte.')
      } else {
        setError(rawMessage)
      }

      setBuyingPackageId(null)
    }
  }

  return (
    <PageWrapper
      title="Boutique"
      description="Boutique FiveLife RP avec paiement sécurisé Tebex."
      className="px-4 md:px-8 lg:px-10 py-20"
    >
      <section className="max-w-7xl mx-auto">
        <div className="glass glass-strong p-5 md:p-7">
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#E9D5FF',
              fontSize: 'clamp(1.2rem, 2.6vw, 1.8rem)',
            }}
          >
            Boutique FiveLife
          </h1>

          <p style={{ color: 'rgba(214,190,248,0.82)', marginTop: '0.45rem' }}>
            Paiement sécurisé via Tebex.
          </p>

          {error && (
            <div
              style={{
                marginTop: '1rem',
                border: '1px solid rgba(190,60,100,0.6)',
                background: 'rgba(70,10,30,0.35)',
                padding: '0.75rem 0.9rem',
                color: '#FFD1DF',
              }}
            >
              {error}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="glass p-3"
                  style={{ height: 250, opacity: 0.65, animation: 'pulse 1.2s ease-in-out infinite' }}
                />
              ))}
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div
              style={{
                marginTop: '1rem',
                border: '1px solid rgba(168,85,247,0.3)',
                background: 'rgba(20,8,36,0.65)',
                padding: '0.8rem 0.9rem',
                color: '#DCC4FF',
              }}
            >
              Aucune catégorie ou package n'est disponible pour le moment.
            </div>
          )}

          {!loading && categories.map((category) => (
            <div key={category.id} style={{ marginTop: '1.2rem' }}>
              <h2
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.95rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C084FC',
                }}
              >
                {category.name}
              </h2>

              {category.description && (
                <p style={{ color: 'rgba(185,155,230,0.8)', marginTop: '0.3rem' }}>{category.description}</p>
              )}

              {category.packages.length === 0 ? (
                <div
                  style={{
                    marginTop: '0.8rem',
                    border: '1px dashed rgba(168,85,247,0.35)',
                    padding: '0.7rem 0.8rem',
                    color: 'rgba(196,164,242,0.8)',
                  }}
                >
                  Aucun package dans cette catégorie.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                  {category.packages.map((pkg) => (
                    <article
                      key={pkg.id}
                      className="glass p-3"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.18s ease, border-color 0.18s ease',
                      }}
                    >
                      <img
                        src={pkg.image || 'https://placehold.co/800x450/10071E/E9D5FF?text=FiveLife+Store'}
                        alt={pkg.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          aspectRatio: '16 / 9',
                          objectFit: 'cover',
                          border: '1px solid rgba(168,85,247,0.22)',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/800x450/10071E/E9D5FF?text=FiveLife+Store'
                        }}
                      />

                      <h3
                        style={{
                          marginTop: '0.65rem',
                          color: '#F3E8FF',
                          fontWeight: 700,
                          letterSpacing: '0.03em',
                        }}
                      >
                        {pkg.name}
                      </h3>

                      <p style={{ color: 'rgba(205,182,240,0.78)', marginTop: '0.32rem' }}>
                        {pkg.description || 'Aucune description.'}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <span style={{ color: '#E9D5FF', fontWeight: 700 }}>
                          {formatPrice(pkg.price, pkg.currency)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleBuy(pkg.id)}
                          disabled={buyingPackageId === pkg.id}
                          className="btn-primary"
                          style={{
                            padding: '0.55rem 1rem',
                            fontSize: '0.64rem',
                            opacity: buyingPackageId === pkg.id ? 0.6 : 1,
                            pointerEvents: buyingPackageId === pkg.id ? 'none' : 'auto',
                          }}
                        >
                          {buyingPackageId === pkg.id ? 'Patiente...' : 'Acheter'}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
