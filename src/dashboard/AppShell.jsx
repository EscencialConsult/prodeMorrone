import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import MorroneLogo from '../components/brand/MorroneLogo.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Inicio', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
  // { to: '/apuesta-manual-admin', label: 'Apuesta Manual', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  { to: '/apuestas', label: 'Pronósticos', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg> },
  { to: '/partidos', label: 'Fixture', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
  { to: '/mis-predicciones', label: 'Mis predicciones', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
  { to: '/ranking', label: 'Ranking', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { to: '/manual', label: 'Manual', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> },
]

const ADMIN_ICON = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
const MANUAL_ICON = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>

// Líneas antiguas removidas.
// const filteredNavItems = NAV_ITEMS.filter(item => {
//   if (esAdmin && (item.to === '/apuestas' || item.to === '/mis-predicciones' || item.to === '/manual')) {
//     return false
//   }
//   return true
// })

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() || '')
    .join('')
}

// Resto del código sin cambios.

function NavLink({ to, label, icon, location }) {
  const a = location.pathname === to

  return (
    <Link to={to} className={`nav-link ${a ? 'active' : ''}`}>
      <span className="nav-link-icon">{icon}</span>
      {label}
    </Link>
  )
}

function NavLinkMob({ to, label, icon, location, onClick }) {
  const a = location.pathname === to

  return (
    <Link to={to} onClick={onClick} className={`nav-link-mob ${a ? 'active' : ''}`}>
      <span className="nav-link-mob-icon">{icon}</span>
      {label}
    </Link>
  )
}

const APP_FOOTER_LINKS = [
  { href: 'mailto:contacto@estudiomre.com.ar', label: 'contacto@estudiomre.com.ar' },
  { href: 'tel:+541164745005', label: '+54 11 6474-5005' },
  {
    href: 'https://www.google.com/maps/search/?api=1&query=Int.+Tomkinson+3381+San+Isidro',
    label: 'Int. Tomkinson 3381, San Isidro',
    external: true,
    desktopOnly: true,
  },
  { href: 'https://www.estudiomre.com.ar/', label: 'estudiomre.com.ar', external: true },
]

function AppFooterLink({ href, label, external, desktopOnly }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${desktopOnly ? 'hidden lg:inline-flex' : 'inline-flex'} group min-h-8 items-center gap-2 rounded-md px-2 py-1 text-[0.72rem] font-semibold leading-none text-white/50 outline-none transition hover:bg-white/[0.04] hover:text-[#d6c08a] focus-visible:ring-2 focus-visible:ring-[#b8a06a]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214]`}
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-[#b8a06a]/60 transition group-hover:bg-[#d6c08a]" />
      <span className="truncate">{label}</span>
    </a>
  )
}

function AppFooter() {
  return (
    <footer className="shrink-0 border-t border-[#b8a06a]/20 bg-[#111214] px-4 py-3 text-white sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full min-w-0 flex-col items-start gap-2 sm:w-auto sm:max-w-[28rem]">
          <span className="inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border border-[#b8a06a]/20 bg-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,.22)]">
            <MorroneLogo size={26} variant="light" markOnly style={{ opacity: .94 }} />
          </span>

          <div className="min-w-0">
            <p className="text-[0.76rem] font-extrabold leading-snug tracking-[0.01em] text-white/80">
              Estudio Morrone Rucker Embden & Asociados
            </p>
            <p className="mt-0.5 text-[0.68rem] font-medium leading-tight text-white/35">
              &copy; {new Date().getFullYear()} <span aria-hidden="true">·</span> Prode Mundial 2026
            </p>
          </div>
        </div>

        <nav aria-label="Contacto del estudio" className="flex min-w-0 flex-wrap items-center gap-1 sm:justify-end">
          {APP_FOOTER_LINKS.map(link => (
            <AppFooterLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default function AppShell({ children }) {
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mob, setMob] = useState(false)
  const [logoutState, setLogoutState] = useState('idle')

  const esAdmin = isAdmin || user?.rol === 'admin' || user?.es_admin === true || user?.tipo_usuario === 'admin'

// âœ… FILTRAR NAV_ITEMS: ocultar "Apuestas", "Mis Prodes" y "Manual" para admins
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (esAdmin && (item.to === '/apuestas' || item.to === '/mis-predicciones' || item.to === '/manual')) {
      return false
    }
    return true
  })

  function pedirConfirmacion() {
    setLogoutState('confirm')
  }

  function cancelarLogout() {
    setLogoutState('idle')
  }

  async function confirmarLogout() {
    setLogoutState('logging')

    try {
      await logout()
    } catch (e) {
      console.warn('Logout falló pero seguimos:', e.message)
    }

    setLogoutState('redirect')

    setTimeout(() => {
      navigate('/')
    }, 700)
  }

  return (
    <>
<div className="shell-page">
        <nav
          style={{
            background: '#202124',
            flexShrink: 0,
            zIndex: 50,
            borderBottom: '1px solid rgba(184,160,106,.14)',
          }}
        >
<div
  style={{
    maxWidth: 1200,  // â† cambiar de 896 a 1200
    margin: '0 auto',
    padding: '0 1.5rem',
    height: 62,
    display: 'flex',
    alignItems: 'center',
  }}

          >
            <Link to="/dashboard" style={{ textDecoration: 'none', flexShrink: 0, marginRight: '1.8rem' }}>
              <MorroneLogo
                size={28}
                variant="light"
                markOnly
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.5))' }}
              />
            </Link>

<div className="dnav" style={{ display: 'flex', alignItems: 'center', gap: '.15rem', flex: 1 }}>
  {filteredNavItems.map(({ to, label, icon }) => (
    <NavLink key={to} to={to} label={label} icon={icon} location={location} />
  ))}

  {esAdmin && (
    <NavLink to="/admin" label="Configuración" icon={ADMIN_ICON} location={location} />
  )}
</div>

{esAdmin && (
  <Link
    to="/manual-admin"
    style={{ textDecoration: 'none', marginRight: '.75rem' }}
  >
    <span
      className={`admin-manual-link ${location.pathname === '/manual-admin' ? 'is-active' : ''}`}
      style={{
        cursor: 'pointer',
      }}
    >
      <span style={{ display: 'flex' }}>{MANUAL_ICON}</span>
      Manual
    </span>
  </Link>
)}

            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginLeft: 'auto' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.32rem',
                  fontSize: '.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  color: '#22c55e',
                }}
              >
                <span
                  className="ldot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block',
                  }}
                />
                En vivo
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.42rem',
                  padding: '.28rem .62rem .28rem .28rem',
                  borderRadius: 99,
                  background: 'rgba(255,255,255,.07)',
                  border: '1px solid rgba(255,255,255,.1)',
                }}
              >
                <div
                  style={{
                    width: 27,
                    height: 27,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#b8a06a,#8f7a45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: '.88rem',
                    color: '#111214',
                  }}
                >
                  {initials(user?.nombre || user?.name || 'U')}
                </div>

                <span
                  style={{
                    fontSize: '.78rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,.72)',
                    maxWidth: 84,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user?.nombre || user?.name || 'Usuario'}
                </span>
              </div>

              <div style={{ position: 'relative' }}>
                <button
                  className="shell-logout-btn"
                  onClick={logoutState === 'idle' ? pedirConfirmacion : undefined}
                  disabled={logoutState === 'logging' || logoutState === 'redirect'}
                  style={{
                    background: logoutState === 'logging' ? 'rgba(255,77,109,.12)' : 'transparent',
                    border: `1px solid ${logoutState === 'logging' ? 'rgba(255,77,109,.4)' : 'rgba(255,255,255,.1)'}`,
                    borderRadius: 7,
                    padding: '.3rem .68rem',
                    fontSize: '.74rem',
                    fontWeight: 600,
                    color: logoutState === 'logging' ? '#ff4d6d' : 'rgba(255,255,255,.35)',
                    cursor: logoutState === 'logging' || logoutState === 'redirect' ? 'wait' : 'pointer',
                    transition: 'all .16s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.4rem',
                    minWidth: 64,
                    justifyContent: 'center',
                  }}
                >
                  {logoutState === 'logging' ? (
                    <>
                      <svg className="spin-out" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Saliendo...
                    </>
                  ) : (
                    'Salir'
                  )}
                </button>

                {logoutState === 'confirm' && (
                  <>
                    <div
                      onClick={cancelarLogout}
                      style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 60,
                        background: 'transparent',
                      }}
                    />

                    <div
                      className="pop-in"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        zIndex: 61,
                        minWidth: 240,
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 12px 32px rgba(32,33,36,.22), 0 0 0 1px rgba(32,33,36,.06)',
                        padding: '.85rem .95rem',
                        border: '1px solid #dedbd4',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: 22,
                          width: 12,
                          height: 12,
                          background: '#fff',
                          transform: 'rotate(45deg)',
                          borderTop: '1px solid #dedbd4',
                          borderLeft: '1px solid #dedbd4',
                        }}
                      />

                      <p
                        style={{
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: '1rem',
                          color: '#202124',
                          margin: '0 0 .15rem',
                          letterSpacing: '.02em',
                        }}
                      >
                        ¿Cerrar sesión?
                      </p>

                      <p
                        style={{
                          fontSize: '.76rem',
                          color: '#6f7377',
                          margin: '0 0 .85rem',
                          lineHeight: 1.4,
                        }}
                      >
                        Vas a volver a la pantalla de inicio.
                      </p>

                      <div style={{ display: 'flex', gap: '.45rem', justifyContent: 'flex-end' }}>
                        <button
                          className="shell-popover-btn"
                          onClick={cancelarLogout}
                          style={{
                            background: 'transparent',
                            border: '1px solid #dedbd4',
                            borderRadius: 7,
                            padding: '.4rem .8rem',
                            fontSize: '.74rem',
                            fontWeight: 600,
                            color: '#6f7377',
                            cursor: 'pointer',
                            transition: 'all .14s',
                          }}
                        >
                          Cancelar
                        </button>

                        <button
                          className="shell-popover-danger"
                          onClick={confirmarLogout}
                          style={{
                            background: '#ff4d6d',
                            border: '1px solid #ff4d6d',
                            borderRadius: 7,
                            padding: '.4rem .9rem',
                            fontSize: '.74rem',
                            fontWeight: 700,
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'all .14s',
                            letterSpacing: '.02em',
                          }}
                        >
                          Sí, salir
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                className="mhb"
                onClick={() => setMob(v => !v)}
                style={{
                  display: 'none',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,.14)',
                  borderRadius: 7,
                  padding: '.36rem',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,.6)',
                  alignItems: 'center',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  {mob ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="7" x2="21" y2="7" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="17" x2="21" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mob && (
            <div
              style={{
                borderTop: '1px solid rgba(184,160,106,.1)',
                padding: '.55rem 1rem .75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '.18rem',
              }}
            >
              {filteredNavItems.map(({ to, label, icon }) => (
                <NavLinkMob key={to} to={to} label={label} icon={icon} location={location} onClick={() => setMob(false)} />
              ))}

              {esAdmin && (
                <NavLinkMob to="/admin" label="Configuración" icon={ADMIN_ICON} location={location} onClick={() => setMob(false)} />
              )}
            </div>
          )}
        </nav>


        <main
          className="shell-main shell-in"
        >
          {children}
        </main>

        <AppFooter />
      </div>

      {logoutState === 'redirect' && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(32,33,36,.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(184,160,106,.15)',
                border: '1px solid rgba(184,160,106,.4)',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8a06a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <p
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '1.6rem',
                margin: '0 0 .25rem',
                letterSpacing: '.04em',
              }}
            >
              Sesión cerrada
            </p>

            <p
              style={{
                fontSize: '.82rem',
                color: 'rgba(255,255,255,.55)',
                margin: 0,
              }}
            >
              Te llevamos al inicio...
            </p>
          </div>
        </div>
      )}
    </>
  )
}

