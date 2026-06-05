import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MorroneLogo from '../brand/MorroneLogo.jsx'

const LINKS = [
  ['#como-funciona', 'Como funciona'],
  ['#funcionalidades', 'Funcionalidades'],
  ['#faq', 'Ayuda'],
]

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled
        ? { background: 'rgba(17,18,20,.96)', backdropFilter: 'blur(16px)', boxShadow: '0 1px 0 rgba(184,160,106,.2),0 8px 24px rgba(0,0,0,.3)', padding: '.65rem 0' }
        : { background: 'transparent', padding: '.95rem 0' }}
    >
      <div
        className="home-nav-shell"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <MorroneLogo className="home-nav-logo" size={36} variant="light" markOnly style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.5))' }} />

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="home-nav-link font-body font-medium text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="home-nav-login font-body font-semibold text-sm px-5 py-2.5 rounded-full transition-all"
            style={{ color: 'rgba(255,255,255,.82)', border: '1.5px solid rgba(255,255,255,.28)', textDecoration: 'none' }}
          >
            Iniciar sesion
          </Link>
          <Link
            to="/register"
            className="home-nav-register font-body font-bold text-sm px-5 py-2.5 rounded-full transition-all"
            style={{ background: '#b8a06a', color: '#111214', boxShadow: '0 6px 20px rgba(184,160,106,.3)', textDecoration: 'none' }}
          >
            Crear mi cuenta
          </Link>
        </div>

        <button
          className="mobile-touch lg:hidden p-2 flex flex-col gap-1.5 rounded-lg"
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(value => !value)}
          style={{ border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)' }}
        >
          <span className="block w-6 h-0.5 rounded bg-white transition-transform" style={open ? { transform: 'rotate(45deg) translate(3px,3px)' } : {}} />
          <span className="block w-6 h-0.5 rounded bg-white transition-opacity" style={open ? { opacity: 0 } : {}} />
          <span className="block w-6 h-0.5 rounded bg-white transition-transform" style={open ? { transform: 'rotate(-45deg) translate(3px,-3px)' } : {}} />
        </button>
      </div>

      {open && (
        <div
          className="home-mobile-menu mobile-panel lg:hidden mt-2 mx-4 p-4 space-y-1"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 px-4 rounded-xl text-sm font-body font-semibold text-white"
              style={{ textDecoration: 'none', background: 'rgba(255,255,255,.04)' }}
            >
              {label}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-center py-3 rounded-full text-sm font-body font-semibold text-white"
              style={{ border: '1.5px solid rgba(255,255,255,.3)', textDecoration: 'none' }}
            >
              Iniciar sesion
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="block text-center py-3 rounded-full text-sm font-body font-bold"
              style={{ background: '#b8a06a', color: '#111214', textDecoration: 'none' }}
            >
              Crear mi cuenta
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
