import { useState } from 'react'
import { Link } from 'react-router-dom'
import sheetsApi from '../services/sheetsApi.js'
import MorroneLogo from '../components/brand/MorroneLogo.jsx'

export default function RegisterPage() {
  const [form, setForm]       = useState({ nombre: '', email: '', password: '' })
  const [done, setDone]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await sheetsApi.auth.registro(form.nombre, form.email, form.password)
      setDone(true)
    } catch (err) {
      setError(err.message || 'No se pudo completar el registro')
    } finally {
      setLoading(false)
    }
  }

  // â”€â”€ Input field helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const inputStyle = {
    background: 'rgba(255,255,255,.06)',
    border: '1px solid rgba(255,255,255,.1)',
    color: '#fff',
    caretColor: '#b8a06a',
  }
  const onFocus = e => {
    e.target.style.borderColor = 'rgba(184,160,106,.55)'
    e.target.style.background  = 'rgba(184,160,106,.06)'
    e.target.style.boxShadow   = '0 0 0 3px rgba(184,160,106,.1)'
  }
  const onBlur = e => {
    e.target.style.borderColor = 'rgba(255,255,255,.1)'
    e.target.style.background  = 'rgba(255,255,255,.06)'
    e.target.style.boxShadow   = 'none'
  }

  return (
    <>
      <style>{`
        @keyframes rp-fade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .rp-card { animation: rp-fade .5s ease both; }
        @keyframes rp-spin  { to{transform:rotate(360deg)} }
        .rp-spin { animation: rp-spin .75s linear infinite; }
        @keyframes rp-pop   { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .rp-pop  { animation: rp-pop .5s cubic-bezier(.175,.885,.32,1.275) both; }
        @keyframes rp-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .rp-pulse{ animation: rp-pulse 1.8s ease infinite; }
      `}</style>

      {/* â”€â”€ Full-screen background â”€â”€ */}
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
        style={{
          backgroundImage: [
            'linear-gradient(160deg, rgba(17,18,20,.82) 0%, rgba(32,33,36,.88) 45%, rgba(17,18,20,.95) 100%)',
            'linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: 'cover, 42px 42px, 42px 42px',
          backgroundPosition: 'center, center, center',
        }}
      >
        {/* Gold glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 45% at 20% 25%, rgba(184,160,106,.16), transparent 55%)'
        }} />
        {/* Blue glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 45% at 80% 75%, rgba(111,115,119,.28), transparent 55%)'
        }} />

        {/* â”€â”€ Logo / Brand â”€â”€ */}
        <div className="relative z-10 flex flex-col items-center mb-6 text-center rp-card">

          <MorroneLogo size={52} variant="light" markOnly style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,.6))' }} />
          <p className="mt-3 font-body text-xs font-bold uppercase tracking-[.22em]" style={{ color: 'rgba(184,160,106,.76)' }}>
            Estudio MRE
          </p>
          <p className="mt-1 font-body text-xs" style={{ color: 'rgba(255,255,255,.38)' }}>
            Alta de colaboradores | Mundial 2026
          </p>
        </div>

        {/* â”€â”€ CARD â”€â”€ */}
        <div
          className="rp-card relative z-10 w-full"
          style={{
            maxWidth: 420,
            background: 'linear-gradient(160deg, rgba(32,33,36,.92) 0%, rgba(17,18,20,.96) 100%)',
            border: '1px solid rgba(184,160,106,.25)',
            borderRadius: 20,
            boxShadow: '0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(184,160,106,.08), inset 0 1px 0 rgba(255,255,255,.05)',
            backdropFilter: 'blur(24px)',
            animationDelay: '.1s',
          }}
        >
          {/* Gold top accent */}
          <div className="rounded-t-[20px] h-0.5 w-full"
            style={{ background: 'linear-gradient(90deg, transparent, #b8a06a 30%, #b8a06a 70%, transparent)' }} />

          <div className="px-8 py-8">

            {done ? (
              /* â•â• ESTADO: REGISTRO EXITOSO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
              <div className="text-center py-4">
                {/* Check ring */}
                <div className="rp-pop w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(184,160,106,.25), rgba(184,160,106,.1))', border: '2px solid rgba(184,160,106,.5)', boxShadow: '0 0 0 6px rgba(184,160,106,.08)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b8a06a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h2 className="font-display leading-none mb-3" style={{ fontSize: '2.4rem', color: '#fff', letterSpacing: '.03em' }}>
                  REGISTRO ENVIADO
                </h2>

                <p className="font-body text-sm leading-relaxed mb-2 max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,.55)' }}>
                  Tu cuenta está <strong style={{ color: '#b8a06a' }}>pendiente de aprobación</strong> por el administrador.
                </p>
                <p className="font-body text-sm leading-relaxed mb-8 max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,.4)' }}>
                  Te avisaremos cuando esté activa y ya puedas ingresar.
                </p>

                {/* Divider */}
                <div className="h-px mb-6 mx-auto w-3/4"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(184,160,106,.2), transparent)' }} />

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 font-body font-bold text-sm px-6 py-3 rounded-full transition-all"
                  style={{ background: '#b8a06a', color: '#111214', textDecoration: 'none', boxShadow: '0 6px 20px rgba(184,160,106,.28)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#d6c08a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#b8a06a'; e.currentTarget.style.transform = '' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Ir al inicio de sesión
                </Link>
              </div>

            ) : (
              /* â•â• ESTADO: FORMULARIO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
              <>
                {/* Card header */}
                <div className="mb-7">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 rp-pulse" />
                    <span className="font-body text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(184,160,106,.7)' }}>
                      Estudio MRE
                    </span>
                  </div>
                  <h1 className="font-display leading-none" style={{ fontSize: '2.6rem', color: '#fff', letterSpacing: '.03em' }}>
                    REGISTRO COLABORADORES
                  </h1>
                  <p className="font-body text-sm mt-1.5" style={{ color: 'rgba(255,255,255,.45)' }}>
                    Registrate para participar del prode interno de Estudio MRE.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px mb-7" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,160,106,.2) 50%, transparent)' }} />

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre"
                      className="block font-body font-bold text-xs uppercase tracking-widest mb-2"
                      style={{ color: 'rgba(184,160,106,.8)' }}>
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      value={form.nombre}
                      onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
                      placeholder="Juan Pérez"
                      required
                      autoFocus
                      autoComplete="name"
                      className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email"
                      className="block font-body font-bold text-xs uppercase tracking-widest mb-2"
                      style={{ color: 'rgba(184,160,106,.8)' }}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="tu@empresa.com"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label htmlFor="password"
                      className="block font-body font-bold text-xs uppercase tracking-widest mb-2"
                      style={{ color: 'rgba(184,160,106,.8)' }}>
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={form.password}
                      onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                    <p className="font-body text-xs mt-1.5" style={{ color: 'rgba(255,255,255,.28)' }}>
                      Mínimo 6 caracteres
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl font-body text-sm"
                      style={{ background: 'rgba(184,69,46,.12)', border: '1px solid rgba(184,69,46,.35)', color: '#e07050' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-px">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-body font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: '#b8a06a', color: '#111214', boxShadow: '0 8px 28px rgba(184,160,106,.3)' }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#d6c08a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(184,160,106,.45)' } }}
                    onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#b8a06a'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(184,160,106,.3)' } }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full rp-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      <>
                        Crear mi cuenta
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,.08)' }} />
                  <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,.25)' }}>o</span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,.08)' }} />
                </div>

                {/* Link login */}
                <Link
                  to="/login"
                  className="block w-full font-body font-semibold text-sm py-3.5 rounded-full text-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,.18)', color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,160,106,.5)'; e.currentTarget.style.color = '#b8a06a'; e.currentTarget.style.background = 'rgba(184,160,106,.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.18)'; e.currentTarget.style.color = 'rgba(255,255,255,.7)'; e.currentTarget.style.background = 'transparent' }}
                >
                  Ya tengo cuenta - Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>

        {/* â”€â”€ Footer â”€â”€ */}
        {!done && (
          <div className="relative z-10 flex flex-col items-center gap-2 mt-6 rp-card" style={{ animationDelay: '.2s' }}>
            <Link to="/"
              className="font-body text-sm flex items-center gap-1.5 transition-colors"
              style={{ color: 'rgba(255,255,255,.38)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#b8a06a' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.38)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Volver al inicio
            </Link>
            <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,.22)' }}>
              Estudio Morrone Rucker Embden & Asociados
            </p>
          </div>
        )}

      </div>
    </>
  )
}


