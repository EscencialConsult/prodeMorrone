export default function HomeInstitutional() {
  return (
    <section style={{ background: '#f6f5f2', padding: '4.5rem 0 4rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.55rem',
            fontFamily: "'DM Sans',sans-serif",
            fontSize: '.72rem',
            fontWeight: 800,
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: '#8f7a45',
            marginBottom: '1rem',
          }}>
            <span style={{ width: 26, height: 1, background: '#b8a06a' }} />
            Estudio MRE
            <span style={{ width: 26, height: 1, background: '#b8a06a' }} />
          </span>

          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(2.3rem,6vw,4.6rem)',
            lineHeight: .95,
            letterSpacing: '.02em',
            color: '#202124',
            margin: '0 0 1.15rem',
          }}>
            DETRÁS DE CADA NÚMERO<br />
            <span style={{ color: '#b8a06a' }}>HAY UNA HISTORIA</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 'clamp(1rem,2.2vw,1.18rem)',
            lineHeight: 1.8,
            color: 'rgba(32,33,36,.72)',
            margin: '0 auto',
            maxWidth: 760,
          }}>
            En Estudio MRE creemos que detrás de cada número hay una historia. Este prode interno es una forma de compartir el Mundial, fortalecer vínculos y disfrutar una experiencia común entre colaboradores.
          </p>
        </div>
      </div>
    </section>
  )
}
