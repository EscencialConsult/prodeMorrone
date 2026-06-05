import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MorroneLogo from '../brand/MorroneLogo.jsx'

function useCountdown(target) {
  const calc = () => {
    const d = new Date(target) - new Date()
    if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [])
  return t
}

const PREDS = [
  { user: 'M. García', pred: 'Argentina 2 – 1 España', pts: '+10' },
  { user: 'C. López',  pred: 'Brasil 1 – 1 Francia',  pts: '+5'  },
  { user: 'P. Romero', pred: 'Uruguay 3 – 0 México',  pts: '+10' },
]

export default function HomeHero() {
  const cd = useCountdown('2026-06-11T19:00:00')

  return (
    <>
      <style>{`
        @keyframes float-medal-anim {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(2deg); }
        }
        .float-medal-el { animation: float-medal-anim 5s ease-in-out infinite; }
        @keyframes pulse-dot-anim { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }
        .pulse-dot-el { animation: pulse-dot-anim 1.6s ease infinite; }
      `}</style>

      <section className="home-hero-section relative min-h-screen text-white overflow-hidden flex items-center"
        style={{
          backgroundImage: "url(/imgprode/fondo-banner.png), linear-gradient(180deg,rgba(17,18,20,.96) 0%,rgba(32,33,36,.94) 58%,rgba(32,33,36,.98) 100%), linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px), linear-gradient(0deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: 'cover, cover, 44px 44px, 44px 44px',
          backgroundPosition: 'center, center, center, center',
          backgroundBlendMode: 'overlay',
          paddingTop: 'clamp(80px, 10vh, 120px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
        }}>

        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(184,160,106,.12), transparent 32%, rgba(111,115,119,.16) 72%, transparent)'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}
          className="home-hero-inner relative z-10 w-full">
          <div className="home-hero-grid grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* COLUMNA IZQUIERDA */}
            <div className="home-hero-copy lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Pills superiores */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="home-hero-kicker inline-flex items-center gap-2 font-body font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ border: '1px solid #b8a06a', color: '#b8a06a', background: 'rgba(184,160,106,.1)' }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot-el" />
                  Estudio MRE | Mundial 2026
                </span>
                <span className="hidden sm:flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,.55)' }}>
                  <span className="h-px w-6" style={{ background: 'rgba(184,160,106,.45)' }} />
                  Experiencia interna
                </span>
              </div>

              {/* Títulos */}
              <div>
                <h1 className="home-hero-title font-display leading-none block text-white" style={{ fontSize: 'clamp(1.8rem,8vw,5rem)', letterSpacing: '.01em' }}>
                  EL MUNDIAL
                </h1>
                <h1 className="home-hero-title-main font-display leading-none block" style={{ fontSize: 'clamp(2.8rem,12vw,7.5rem)', letterSpacing: '.01em', color: '#b8a06a', textShadow: '0 0 40px rgba(184,160,106,.4)' }}>
                  SE VIVE EN ESTE ESTUDIO
                </h1>
              </div>

              {/* Descripción */}
              <p className="font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,.82)' }}>
                Una experiencia interna para compartir el Mundial entre equipos, áreas y colaboradores.
              </p>

              {/* Pills de beneficios */}
              <div className="home-benefit-list flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
                {[
                  { label: 'Competencia sana', sub: 'Entre equipos y áreas', bg: 'linear-gradient(135deg,#b8a06a,#8f7a45)', ic: '#111214' },
                  { label: 'Más participación', sub: 'Todos suman al clima', bg: 'linear-gradient(135deg,#9aa0a6,#6f7377)', ic: '#fff' },
                  { label: 'Energía positiva', sub: 'Participación entre equipos', bg: 'linear-gradient(135deg,#1b8a5a,#146a46)', ic: '#fff' },
                ].map(({ label, sub, bg, ic }) => (
                  <div key={label} className="home-benefit-pill flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 w-full sm:w-auto"
                    style={{ background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.13)', backdropFilter: 'blur(6px)' }}>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-body font-semibold text-white leading-tight">{label}</p>
                      <p className="text-xs font-body leading-tight" style={{ color: 'rgba(255,255,255,.5)' }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones */}
              <div className="home-hero-actions flex flex-col sm:flex-row gap-3">
                <Link to="/register" className="home-hero-cta1 font-body font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                  style={{ background: '#b8a06a', color: '#111214', boxShadow: '0 8px 24px rgba(184,160,106,.3)', textDecoration: 'none' }}>
                  Crear mi cuenta
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
                <Link to="/login" className="home-hero-cta2 font-body font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                  style={{ color: '#fff', border: '1.5px solid rgba(255,255,255,.3)', textDecoration: 'none' }}>
                  Ya tengo cuenta →
                </Link>
              </div>

              {/* Alert box */}
              <div className="home-hero-alert flex items-start gap-3 p-3 sm:p-4 rounded-lg max-w-xl"
                style={{ background: 'linear-gradient(135deg,rgba(184,69,46,.12),rgba(184,69,46,.05))', border: '1px solid rgba(184,69,46,.35)', borderLeft: '3px solid #b8452e' }}>
                <svg viewBox="0 0 24 24" fill="#b8452e" className="w-5 h-5 shrink-0 mt-0.5"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/></svg>
                <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: 'rgba(255,255,255,.88)' }}>
                  <strong className="text-white">El Mundial comienza el 11 de junio.</strong>{' '}
                  Registrate antes de que arranque para no perderte los primeros partidos.
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="lg:col-span-5">
              {/* Logo flotante */}
              <div className="home-floating-logo relative mb-5 sm:mb-6 flex justify-center">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(184,160,106,.28), transparent 60%)', filter: 'blur(28px)' }} />
                <MorroneLogo size={78} variant="light"  className="relative float-medal-el"
                  style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,.6))' }} />
              </div>

              {/* Panel principal */}
              <div className="home-hero-panel rounded-2xl p-4 sm:p-5"
                style={{ background: 'linear-gradient(160deg,rgba(32,33,36,.78),rgba(17,18,20,.88))', border: '1px solid rgba(184,160,106,.28)', backdropFilter: 'blur(16px)', boxShadow: '0 28px 70px rgba(17,18,20,.55)' }}>
                
                {/* Header */}
                <div className="home-panel-header flex items-center justify-between mb-4">
                  <div className="home-panel-brand flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        background: 'rgba(255,255,255,.07)',
                        border: '1px solid rgba(255,255,255,.1)',
                        overflow: 'visible',
                        flexShrink: 0,
                      }}
                    >
                      <MorroneLogo size={12} variant="light" markOnly style={{ opacity: .78 }} />
                    </span>
                    <span className="home-panel-brand-text font-body text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,.4)' }}>| Mundial 2026</span>
                  </div>
                  <span className="home-panel-live flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest" style={{ color: '#b8a06a' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot-el" />
                    En vivo
                  </span>
                </div>

                <div className="mb-4 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(184,160,106,.3),transparent)' }} />

                {/* Countdown */}
                <p className="font-body font-bold text-xs uppercase tracking-widest mb-3 text-center" style={{ color: '#b8a06a' }}>
                  Falta para el inicio
                </p>
                <div className="home-countdown-grid grid grid-cols-4 gap-1.5 mb-4">
                  {[{v:cd.days,l:'Días'},{v:cd.hours,l:'Horas'},{v:cd.minutes,l:'Min'},{v:cd.seconds,l:'Seg'}].map(({v,l}) => (
                    <div key={l} className="home-countdown-cell py-2 sm:py-3 text-center rounded-lg"
                      style={{ background: 'rgba(184,160,106,.06)', border: '1px solid rgba(184,160,106,.18)' }}>
                      <div className="font-display leading-none" style={{ fontSize: 'clamp(1.2rem,5vw,2rem)', color: '#b8a06a' }}>
                        {String(v).padStart(2,'0')}
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider mt-1 font-body" style={{ color: 'rgba(255,255,255,.45)' }}>{l}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(184,160,106,.3),transparent)' }} />

                <div className="home-predictions-block">
                  <p className="font-body font-bold text-xs uppercase tracking-widest mb-3" style={{ color: '#b8a06a' }}>Predicciones recientes</p>
                  <div className="space-y-2.5 mb-4">
                    {PREDS.map(({user,pred,pts}) => (
                      <div key={user} className="home-pred-row flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-body font-bold text-xs"
                            style={{ background: '#2c2e31', color: '#a9adb1' }}>{user[0]}</div>
                          <div className="min-w-0">
                            <div className="text-white font-body font-semibold text-xs">{user}</div>
                            <div className="font-body text-[10px] sm:text-xs truncate" style={{ color: 'rgba(255,255,255,.38)' }}>{pred}</div>
                          </div>
                        </div>
                        <span className="font-body font-bold text-xs flex-shrink-0" style={{ color: '#b8a06a' }}>{pts}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA final */}
                <Link to="/register" className="home-hero-cta3 flex items-center justify-center gap-2 w-full font-body font-bold text-sm py-3 sm:py-3.5 rounded-full transition-all"
                  style={{ background: '#b8a06a', color: '#111214', textDecoration: 'none' }}>
                  Empezar a pronosticar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wave hero → cream */}
        <svg className="home-wave absolute bottom-0 left-0 w-full" style={{ display: 'block', height: 100, marginBottom: -2 }}
          viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-wave-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#202124" stopOpacity="0" />
              <stop offset="100%" stopColor="#202124" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect width="1440" height="100" fill="url(#hero-wave-grad)" />
          <path d="M0,60 C240,100 480,15 720,35 C960,55 1200,100 1440,60 L1440,100 L0,100 Z" fill="#f6f5f2" />
        </svg>
      </section>
    </>
  )
}

