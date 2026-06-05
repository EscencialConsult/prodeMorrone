import { Link } from 'react-router-dom'

const STEPS = [
  {
    n: '01',
    title: 'REGISTRATE',
    desc: 'Ingresa con tu email de empresa. RRHH aprueba tu acceso en minutos y ya estas dentro.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    n: '02',
    title: 'PRONOSTICA',
    desc: 'Antes de cada partido, carga el resultado que crees que va a pasar. Se cierra cuando arranca.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    n: '03',
    title: 'GANA',
    desc: 'Cada acierto suma puntos. El ranking final define al ganador. El premio lo define tu empresa.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  },
]

export default function HomeHowItWorks() {
  return (
    <section id="como-funciona" className="home-section relative" style={{ background: '#f6f5f2', paddingTop: '5rem', paddingBottom: '6rem' }}>
      <div className="home-section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 font-body font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ border: '1px solid #b8a06a', color: '#8f7a45', background: 'rgba(184,160,106,.1)' }}
          >
            Como funciona
          </span>
          <h2 className="home-section-heading font-display" style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', color: '#202124', lineHeight: 1, letterSpacing: '.01em' }}>
            3 PASOS Y ESTAS JUGANDO
          </h2>
        </div>

        <div className="home-card-grid grid md:grid-cols-3 gap-6 mb-12">
          {STEPS.map(({ n, title, desc, icon }) => (
            <div
              key={n}
              className="home-how-card home-card relative rounded-2xl p-7 bg-white transition-all duration-300"
              style={{ border: '1px solid #dedbd4', boxShadow: '0 1px 0 rgba(32,33,36,.03)' }}
            >
              <div className="home-step-number font-display leading-none mb-4 select-none" style={{ fontSize: '5.5rem', color: '#b8a06a', opacity: .7 }}>
                {n}
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg,#202124,#6f7377)', color: '#b8a06a' }}>
                {icon}
              </div>
              <h3 className="font-display text-2xl mb-3" style={{ color: '#202124', letterSpacing: '.01em' }}>{title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#6f7377' }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/register"
            className="home-section-cta home-how-cta inline-flex items-center gap-2 font-body font-bold text-base px-8 py-4 rounded-full transition-all"
            style={{ background: '#b8a06a', color: '#111214', boxShadow: '0 8px 24px rgba(184,160,106,.28)', textDecoration: 'none' }}
          >
            Empezar ahora
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>

      <svg className="home-wave absolute bottom-0 left-0 w-full" style={{ display: 'block', height: 72, marginBottom: -2 }} viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1440" height="72" fill="#f6f5f2" />
        <path d="M0,40 C360,72 720,0 1080,30 C1260,45 1380,60 1440,40 L1440,72 L0,72 Z" fill="#202124" />
      </svg>
    </section>
  )
}
