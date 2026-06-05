import MorroneLogo from '../brand/MorroneLogo.jsx'

const contactLinks = [
  { href: 'mailto:contacto@estudiomre.com.ar', label: 'contacto@estudiomre.com.ar' },
  { href: 'tel:+541164745005', label: '+54 11 6474-5005' },
  {
    href: 'https://www.google.com/maps/search/?api=1&query=Int.+Tomkinson+3381+San+Isidro',
    label: 'Int. Tomkinson 3381, San Isidro, Provincia de Buenos Aires',
  },
  { href: 'https://www.estudiomre.com.ar/', label: 'estudiomre.com.ar' },
]

function FooterList({ title, items }) {
  return (
    <div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.2em', color: 'rgba(184,160,106,.7)', margin: '0 0 1.1rem' }}>
        {title}
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {items.map(label => (
          <li key={label}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.84rem', color: 'rgba(255,255,255,.48)', display: 'inline-flex', alignItems: 'center', gap: '.4rem', lineHeight: 1.45 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(184,160,106,.35)', flexShrink: 0 }} />
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactIcon({ href }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.56)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {href.startsWith('mailto') && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
      {href.startsWith('tel') && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.19a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" /></>}
      {href.startsWith('http') && <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
    </svg>
  )
}

export default function HomeFooter() {
  return (
    <footer style={{ background: '#111214', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 250, background: 'radial-gradient(ellipse at 0% 100%,rgba(80,84,88,.18),transparent 65%)', pointerEvents: 'none' }} />

      <div className="home-footer-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="home-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem', marginBottom: '1.25rem', minWidth: 0 }}>
              <MorroneLogo size={36} variant="light" markOnly style={{ filter: 'drop-shadow(0 2px 16px rgba(184,160,106,.3))', opacity: .96 }} />
              <div style={{ width: 1, height: 36, background: 'rgba(184,160,106,.22)', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.72rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '.02em', color: 'rgba(255,255,255,.78)', margin: 0 }}>
                  Estudio Morrone
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.64rem', fontWeight: 700, lineHeight: 1.25, color: 'rgba(255,255,255,.42)', margin: '.1rem 0 0' }}>
                  Rucker Embden & Asociados
                </p>
              </div>
            </div>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.82rem', lineHeight: 1.7, color: 'rgba(255,255,255,.48)', maxWidth: '22rem', margin: '0 0 1.2rem' }}>
              Una experiencia interna para compartir el Mundial entre equipos, areas y colaboradores.
            </p>

            <div style={{ display: 'flex', gap: '.6rem' }}>
              {contactLinks.slice(0, 3).map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="home-footer-icon"
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <ContactIcon href={href} />
                </a>
              ))}
            </div>
          </div>

          <FooterList title="Estudio MRE" items={[
            'Asesoramiento integral',
            'Trayectoria profesional',
            'Acompanamiento a empresas',
            'Cercania y confianza',
          ]} />

          <FooterList title="Prode interno" items={[
            'Mundial 2026',
            'Pronosticos',
            'Ranking',
            'Experiencia compartida',
          ]} />

          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.2em', color: 'rgba(184,160,106,.7)', margin: '0 0 1.1rem' }}>
              Contacto
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {contactLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="home-footer-link"
                    style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.82rem', color: 'rgba(255,255,255,.48)', textDecoration: 'none', display: 'inline-flex', alignItems: 'flex-start', gap: '.4rem', lineHeight: 1.45 }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(184,160,106,.35)', flexShrink: 0, marginTop: '.5rem' }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="home-footer-bottom" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(184,160,106,.2) 20%,rgba(184,160,106,.2) 80%,transparent)' }} />
      </div>

      <div className="home-footer-bottom" style={{ maxWidth: 1200, margin: '0 auto', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem' }}>
          <div className="home-footer-legal" style={{ display: 'flex', alignItems: 'center', gap: '.85rem' }}>
            <MorroneLogo size={18} variant="light" markOnly style={{ opacity: .25 }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.72rem', color: 'rgba(255,255,255,.28)' }}>
              &copy; 2026 Estudio Morrone Rucker Embden & Asociados. Todos los derechos reservados.
            </span>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.72rem', color: 'rgba(255,255,255,.22)' }}>
            V1.1.1
          </span>
        </div>
      </div>
    </footer>
  )
}
