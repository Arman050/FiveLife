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

const CHECKOUT_STATE_KEY = 'fivelife_tebex_checkout_state'

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

async function fetchBasket(basketId) {
  return apiRequest(
    `/accounts/${encodeURIComponent(TEBEX_PUBLIC_TOKEN)}/baskets/${encodeURIComponent(basketId)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )
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

  const preferred = providers[0]

  if (!preferred?.url) {
    throw new Error('Aucun provider de connexion Tebex disponible pour ce panier.')
  }

  console.log('[Store] Redirecting to Tebex auth provider:', preferred)
  window.location.assign(preferred.url)
}

function saveCheckoutState(state) {
  try {
    localStorage.setItem(CHECKOUT_STATE_KEY, JSON.stringify(state))
  } catch (err) {
    console.warn('[Store] Unable to save checkout state:', err)
  }
}

function readCheckoutState() {
  try {
    const raw = localStorage.getItem(CHECKOUT_STATE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function clearCheckoutState() {
  try {
    localStorage.removeItem(CHECKOUT_STATE_KEY)
  } catch {
    // no-op
  }
}

function resolveCheckoutUrl(basketId, basketPayload) {
  const data = basketPayload?.data || basketPayload || {}
  const links = data?.links || {}

  const checkoutFromApi =
    safeString(links?.checkout) ||
    safeString(links?.payment) ||
    (Array.isArray(links)
      ? safeString(
          links.find((item) => safeString(item?.name).toLowerCase().includes('checkout'))?.url ||
          links.find((item) => safeString(item?.name).toLowerCase().includes('payment'))?.url,
        )
      : '')

  if (checkoutFromApi) return checkoutFromApi

  // Safe fallback: Tebex checkout path uses /checkout/{basketIdent}
  return `https://checkout.tebex.io/checkout/${encodeURIComponent(basketId)}`
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

      // Step 1: create/reuse basket
      const existingState = readCheckoutState()
      let basketId = safeString(existingState?.basketId)
      let basketData = null

      if (basketId) {
        try {
          const basketRes = await fetchBasket(basketId)
          basketData = basketRes?.data || basketRes || {}
          console.log('[Store] Reusing existing basket:', { basketId, basketData })
        } catch {
          basketId = ''
          basketData = null
        }
      }

      if (!basketId) {
        const basketRes = await createBasket()
        basketId =
          safeString(basketRes?.data?.ident) ||
          safeString(basketRes?.ident) ||
          safeString(basketRes?.basket?.ident)
        basketData = basketRes?.data || basketRes || {}
      }

      if (!basketId) {
        throw new Error('Panier créé sans identifiant Tebex.')
      }

      saveCheckoutState({ basketId, packageId: Number(packageId), ts: Date.now() })

      // Tebex may require user auth before package add.
      // If basket has no user attached, redirect to auth first.
      if (!basketData?.username_id && !safeString(basketData?.username)) {
        await redirectToBasketAuth(basketId)
        return
      }

      // Step 2: add package to basket
      const addRes = await addPackageToBasket(basketId, packageId)

      // Refresh basket to get canonical checkout links if not present
      let basketForCheckout = addRes
      const linksData = (addRes?.data || addRes || {})?.links
      const hasCheckoutLinks =
        (typeof linksData === 'object' && !Array.isArray(linksData) && (linksData?.checkout || linksData?.payment)) ||
        (Array.isArray(linksData) && linksData.length > 0)

      if (!hasCheckoutLinks) {
        try {
          basketForCheckout = await fetchBasket(basketId)
        } catch (err) {
          console.warn('[Store] Could not refresh basket for checkout links, using fallback URL:', err)
        }
      }

      // Step 3: redirect to checkout
      const checkoutUrl = resolveCheckoutUrl(basketId, basketForCheckout)
      console.log('[Store] Redirect checkout:', checkoutUrl)
      clearCheckoutState()
      window.location.assign(checkoutUrl)
    } catch (e) {
      console.error('[Store] Checkout failed:', e)

      const rawMessage = safeString(e?.message, 'Échec du checkout Tebex.')
      const lowerMessage = rawMessage.toLowerCase()

      if (rawMessage === 'LOGIN_REQUIRED' && e?.basketId) {
        try {
          saveCheckoutState({ basketId: e.basketId, packageId: Number(packageId), ts: Date.now() })
          await redirectToBasketAuth(e.basketId)
          return
        } catch (authErr) {
          console.error('[Store] Auth link fetch failed:', authErr)
        }

        setError('Tu dois te connecter à ton compte avant d\'ajouter ce package au panier.')
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

  useEffect(() => {
    const resume = async () => {
      const state = readCheckoutState()
      if (!state?.basketId || !state?.packageId) return

      // Avoid stale resumptions
      if (Date.now() - Number(state.ts || 0) > 20 * 60 * 1000) {
        clearCheckoutState()
        return
      }

      console.log('[Store] Resuming pending checkout state:', state)
      await handleBuy(Number(state.packageId))
    }

    resume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper
      title="Boutique"
      description="Boutique FiveLife RP avec paiement sécurisé Tebex."
      className="px-4 md:px-8 lg:px-10 py-20"
    >
      <style>{`
        .store-card {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          border: 1px solid rgba(168,85,247,0.18);
          background: rgba(10,4,22,0.9);
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .store-card:hover {
          transform: translateY(-4px);
          border-color: rgba(168,85,247,0.55);
          box-shadow: 0 0 30px rgba(168,85,247,0.2), 0 8px 32px rgba(0,0,0,0.5);
        }
        .store-card-img-wrap {
          position: relative;
          overflow: hidden;
        }
        .store-card-img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .store-card:hover .store-card-img {
          transform: scale(1.04);
        }
        .store-card-body {
          padding: 0.75rem 0.85rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .store-card-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #F3E8FF;
          line-height: 1.3;
        }
        .store-card-desc {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.85rem;
          color: rgba(196,172,235,0.7);
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .store-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.3rem;
        }
        .store-card-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.06em;
          color: #C084FC;
          white-space: nowrap;
          flex-shrink: 0;
          text-shadow: 0 0 10px rgba(192,132,252,0.45);
        }
        .store-buy-btn {
          background: linear-gradient(135deg, #5C0FAB 0%, #9333EA 60%, #A855F7 100%);
          color: #fff;
          border: 1px solid rgba(168,85,247,0.5);
          border-radius: 2px;
          padding: 0.45rem 0.9rem;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 0 14px rgba(168,85,247,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .store-buy-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(168,85,247,0.65);
        }
        .store-buy-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .store-card-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(6,4,18,0.6) 100%);
          pointer-events: none;
        }
        .store-skeleton {
          aspect-ratio: 4/3;
          background: linear-gradient(90deg, rgba(168,85,247,0.04) 0%, rgba(168,85,247,0.1) 50%, rgba(168,85,247,0.04) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
          border-radius: 2px;
          border: 1px solid rgba(168,85,247,0.1);
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .cat-label {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
        }
        .cat-label-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8B5CF6;
          white-space: nowrap;
        }
        .cat-label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(168,85,247,0.4), transparent);
        }
      `}</style>

      <section className="max-w-7xl mx-auto">
        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F3E8FF',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1,
            }}
          >
            Boutique
          </h1>
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            color: '#8B5CF6',
            textTransform: 'uppercase',
          }}>
            Tebex Secure
          </span>
        </div>

        {error && (
          <div
            style={{
              marginBottom: '1.5rem',
              border: '1px solid rgba(190,60,100,0.5)',
              background: 'rgba(70,10,30,0.3)',
              padding: '0.7rem 1rem',
              color: '#FFD1DF',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.02em',
              borderRadius: '2px',
            }}
          >
            {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="store-skeleton" />
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && !error && (
          <div
            style={{
              border: '1px dashed rgba(168,85,247,0.25)',
              padding: '2rem',
              textAlign: 'center',
              color: 'rgba(196,164,242,0.6)',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Aucun article disponible
          </div>
        )}

        {!loading && categories.map((category) => (
          <div key={category.id} style={{ marginBottom: '2.5rem' }}>
            <div className="cat-label">
              <span className="cat-label-text">{category.name}</span>
              <div className="cat-label-line" />
            </div>

            {category.packages.length === 0 ? (
              <p style={{ color: 'rgba(196,164,242,0.45)', fontSize: '0.85rem', fontFamily: "'Barlow Condensed', sans-serif" }}>
                Aucun article dans cette catégorie.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.packages.map((pkg) => (
                  <article key={pkg.id} className="store-card">
                    <div className="store-card-img-wrap">
                      <img
                        src={pkg.image || 'https://placehold.co/800x450/0A0416/A855F7?text='}
                        alt={pkg.name}
                        loading="lazy"
                        className="store-card-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/800x450/0A0416/A855F7?text='
                        }}
                      />
                    </div>

                    <div className="store-card-body">
                      <span className="store-card-name">{pkg.name}</span>
                      {pkg.description && (
                        <p className="store-card-desc">{pkg.description}</p>
                      )}
                      <div className="store-card-footer">
                        <span className="store-card-price">{formatPrice(pkg.price, pkg.currency)}</span>
                        <button
                          type="button"
                          onClick={() => handleBuy(pkg.id)}
                          disabled={buyingPackageId === pkg.id}
                          className="store-buy-btn"
                        >
                          {buyingPackageId === pkg.id ? '...' : 'Acheter'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </PageWrapper>
  )
}
