/**
 * VistaGlobal.jsx — Ranking Global (suma de todas las apuestas)
 * Ubicación: src/components/ranking/VistaGlobal.jsx
 *
 * Componente READ-ONLY reutilizado por RankingPageUser y RankingPageAdmin.
 * Recibe la misma forma de datos que el ranking por apuesta:
 *   tabla: [{ user_id, nombre, puntos_totales, aciertos_*, predicciones }]
 *   meta:  { total, mi_posicion, esta_en_top }
 * No depende de una apuesta concreta (los puntos vienen pre-sumados del backend).
 */
import { useState, useEffect } from 'react'

function initials(n) { return (n||'').trim().split(/\s+/).slice(0,2).map(w=>w[0]?.toUpperCase()||'').join('')||'?' }

/* CSS propio: responsive del podio según cantidad (sin depender de JS) */
const CSS = `
@media(max-width:720px) {
  .rk-podio-grid[data-count="2"] { grid-template-columns:repeat(2,minmax(0,1fr))!important;max-width:100%!important }
  .rk-podio-grid[data-count="3"] { grid-template-columns:repeat(3,minmax(0,1fr))!important;max-width:100%!important }
}
`

const PODIO_CFG = {
  0: { grad:'linear-gradient(145deg,#d6c08a 0%,#8f7a45 100%)', shadow:'rgba(184,160,106,.5)', border:'rgba(184,160,106,.7)', ring:'rgba(184,160,106,.3)', emoji:'🥇' },
  1: { grad:'linear-gradient(145deg,#e2e8f0 0%,#94a3b8 100%)', shadow:'rgba(148,163,184,.4)', border:'rgba(148,163,184,.5)', ring:'rgba(148,163,184,.2)', emoji:'🥈' },
  2: { grad:'linear-gradient(145deg,#fed7aa 0%,#c2720e 100%)', shadow:'rgba(194,114,14,.4)',  border:'rgba(194,114,14,.5)',  ring:'rgba(194,114,14,.2)',  emoji:'🥉' },
}

export default function VistaGlobal({ tabla = [], meta = {}, loading = false, user }) {
  return (
    <div className="rk-in">
      <style>{CSS}</style>

      <Banner meta={meta} loading={loading}/>

      {loading ? (
        <SkeletonContent/>
      ) : tabla.length === 0 ? (
        <SinParticipantes/>
      ) : (
        <>
          <Podio top={tabla.slice(0,3)} miId={user?.id}/>

          {!meta.esta_en_top && meta.mi_posicion && (
            <MiPosicion pos={meta.mi_posicion}/>
          )}

          {tabla.length > 3 && (
            <OtrosParticipantes tabla={tabla} user={user}/>
          )}

          <Leyenda total={meta.total}/>
        </>
      )}
    </div>
  )
}

/* ─── BANNER ─── */
function Banner({ meta, loading }) {
  return (
    <div style={{borderRadius:14,marginBottom:24,background:'linear-gradient(125deg,#202124 0%,#3b3d40 100%)',padding:'18px 22px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:-30,right:-30,width:180,height:180,borderRadius:'50%',background:'rgba(184,160,106,.08)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:-40,right:80,width:120,height:120,borderRadius:'50%',background:'rgba(184,160,106,.05)',pointerEvents:'none'}}/>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,position:'relative'}}>
        <div>
          <span style={{fontSize:9,fontWeight:800,textTransform:'uppercase',letterSpacing:'.22em',color:'rgba(184,160,106,.55)',display:'block',marginBottom:4}}>
            CLASIFICACIÓN ACUMULADA
          </span>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(22px,3vw,32px)',color:'#fff',margin:'0 0 6px',letterSpacing:'.02em',lineHeight:1}}>
            🏆 Ranking Global
          </h2>
          <span style={{fontSize:11,color:'rgba(255,255,255,.45)'}}>Suma de puntos de todas las apuestas</span>
        </div>

        {!loading && (
          <div style={{display:'flex',gap:20,flexShrink:0}}>
            {meta.total>0 && <BannerStat n={meta.total} label="Part."/>}
            {meta.mi_posicion && <BannerStat n={`#${meta.mi_posicion.posicion}`} label="Tu pos." gold/>}
          </div>
        )}
      </div>
    </div>
  )
}

function BannerStat({ n, label, gold }) {
  return (
    <div style={{textAlign:'center'}}>
      <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:gold?'#b8a06a':'rgba(255,255,255,.9)',margin:'0 0 1px',lineHeight:1}}>{n}</p>
      <p style={{fontSize:9,textTransform:'uppercase',letterSpacing:'.14em',color:'rgba(255,255,255,.35)',margin:0}}>{label}</p>
    </div>
  )
}

/* ─── PODIO ─── */
function Podio({ top, miId }) {
  if (!top.length) return null

  const orden  = top.length===1?[top[0]]:top.length===2?[top[1],top[0]]:[top[1],top[0],top[2]]
  const rankOf = u => top.findIndex(x=>x.user_id===u.user_id)

  return (
    <div style={{marginBottom:20}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:'.18em',color:'#94a3b8'}}>TOP 3</span>
        <div style={{flex:1,height:1,background:'linear-gradient(90deg,#e2ddd6,transparent)'}}/>
      </div>

      <div className="rk-podio-grid" data-count={top.length} style={{
        display:'grid',
        gridTemplateColumns:top.length===1?'1fr':top.length===2?'1fr 1fr':'1fr 1.08fr 1fr',
        gap:12, alignItems:'end',
        maxWidth:top.length===1?200:top.length===2?420:'100%',
        margin:'0 auto',
      }}>
        {orden.map(u => {
          const rank  = rankOf(u)
          const cfg   = PODIO_CFG[rank]
          const isTop = rank===0
          const me    = u.user_id===miId
          const sz    = isTop ? 60 : 48

          return (
            <div key={u.user_id} className="rk-pcard"
              style={{
                background:'#fff',
                border:`${isTop?2:1.5}px solid ${isTop?cfg.border:'#e8e3db'}`,
                padding: isTop ? '20px 14px 14px' : '16px 12px 12px',
                boxShadow: isTop
                  ? `0 0 0 4px ${cfg.ring}, 0 12px 40px ${cfg.shadow}`
                  : '0 2px 12px rgba(32,33,36,.06)',
              }}>

              {isTop && (
                <div style={{position:'absolute',top:-13,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(90deg,#8f7a45,#b8a06a)',color:'#fff',fontSize:8,fontWeight:800,letterSpacing:'.16em',textTransform:'uppercase',padding:'3px 14px',borderRadius:99,whiteSpace:'nowrap',boxShadow:'0 2px 10px rgba(184,160,106,.5)'}}>
                  ★ LÍDER
                </div>
              )}

              <div style={{fontSize:isTop?28:20,marginBottom:10,lineHeight:1}}>{cfg.emoji}</div>

              <div style={{
                width:sz, height:sz, borderRadius:'50%',
                background:cfg.grad,
                margin:'0 auto 10px',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:isTop?22:17,
                color:'#fff',
                boxShadow:`0 0 0 3px #fff, 0 0 0 ${isTop?6:5}px ${cfg.ring}, 0 6px 20px ${cfg.shadow}`,
                letterSpacing:'.04em',
              }}>{initials(u.nombre)}</div>

              <p style={{fontWeight:700,fontSize:isTop?15:13,color:'#202124',margin:'0 0 2px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {u.nombre}
                {me && <span style={{fontSize:10,color:'#94a3b8',fontWeight:400,marginLeft:4}}>(vos)</span>}
              </p>

              <p style={{fontSize:10,color:'#94a3b8',margin:'0 0 12px'}}>
                {u.predicciones} pred · {u.aciertos_exactos} exactos
              </p>

              <div style={{
                background: isTop ? 'linear-gradient(135deg,rgba(184,160,106,.12),rgba(184,160,106,.06))' : 'rgba(32,33,36,.04)',
                border: isTop ? '1px solid rgba(184,160,106,.25)' : '1px solid #dedbd4',
                borderRadius:10, padding:'8px 0',
              }}>
                <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:isTop?36:28,color:isTop?'#8f7a45':'#202124',margin:0,lineHeight:1}}>
                  {u.puntos_totales}
                </p>
                <p style={{fontSize:8,fontWeight:700,textTransform:'uppercase',letterSpacing:'.14em',color:'#94a3b8',margin:'2px 0 0'}}>puntos</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── MI POSICIÓN (sticky) ─── */
function MiPosicion({ pos }) {
  return (
    <div style={{position:'sticky',bottom:12,marginTop:12,zIndex:10}}>
      <div style={{borderRadius:13,overflow:'hidden',boxShadow:'0 8px 32px rgba(32,33,36,.28)',border:'2px solid rgba(184,160,106,.45)'}}>
        <div style={{
          display:'grid',gridTemplateColumns:'44px 1fr 100px 68px',
          padding:'10px 16px',gap:8,alignItems:'center',
          background:'linear-gradient(90deg,#202124,#3b3d40)',
        }}>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:'#b8a06a'}}>#{pos.posicion}</span>
          <div style={{display:'flex',alignItems:'center',gap:8,minWidth:0}}>
            <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#b8a06a,#8f7a45)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:'#202124',flexShrink:0}}>
              {initials(pos.nombre)}
            </div>
            <div style={{minWidth:0}}>
              <p style={{fontWeight:700,fontSize:13,color:'#fff',margin:'0 0 1px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {pos.nombre}<span style={{fontSize:10,color:'#b8a06a',fontWeight:400,marginLeft:4}}>(vos)</span>
              </p>
              <p style={{fontSize:10,color:'rgba(255,255,255,.4)',margin:0}}>{pos.predicciones} predicciones</p>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:8}}>
            {[['#22c55e',pos.aciertos_exactos],['#b8a06a',pos.aciertos_diferencia||0],['rgba(255,255,255,.45)',pos.aciertos_resultado]].map(([c,n],i)=>(
              <span key={i} style={{display:'inline-flex',alignItems:'center',gap:3,fontSize:11,fontWeight:600,color:n>0?c:'rgba(255,255,255,.2)'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:n>0?c:'rgba(255,255,255,.1)',display:'inline-block'}}/>
                {n}
              </span>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:'#b8a06a'}}>{pos.puntos_totales}</span>
            <span style={{fontSize:8,color:'rgba(255,255,255,.3)',marginLeft:2,letterSpacing:'.1em',fontWeight:700,display:'block'}}>PTS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── OTROS PARTICIPANTES ─── */
function OtrosParticipantes({ tabla, user }) {
  const [exp, setExp] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('otros_global_expanded')) ?? true }
    catch { return true }
  })

  useEffect(() => {
    sessionStorage.setItem('otros_global_expanded', JSON.stringify(exp))
  }, [exp])

  const otros = tabla.slice(3)

  return (
    <div style={{marginTop:20}}>
      <button
        onClick={() => setExp(!exp)}
        style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',background:'none',border:'none',cursor:'pointer',transition:'opacity .15s'}}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <div style={{display:'flex',alignItems:'center',gap:8,flex:1}}>
          <span style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.14em',color:'#94a3b8'}}>Otros participantes</span>
          <span style={{fontSize:8,fontWeight:700,background:'rgba(32,33,36,.05)',color:'#c8c9cc',padding:'1px 6px',borderRadius:4}}>+{otros.length}</span>
          <div style={{flex:1,height:'1px',background:'linear-gradient(90deg,#e8e3db,transparent)',marginLeft:8}}/>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{transition:'transform .2s',transform:exp?'rotate(180deg)':'rotate(0deg)',flexShrink:0,marginLeft:8}}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {exp && (
        <div style={{display:'flex',flexDirection:'column',gap:6,paddingTop:12}}>
          {otros.map((u, idx) => {
            const isMe = u.user_id === user?.id
            return (
              <div key={u.user_id} style={{
                display:'grid',
                gridTemplateColumns:'32px 1fr 64px 56px',
                gap:10,
                padding:'9px 12px',
                background: isMe ? 'rgba(184,160,106,.1)' : '#fff',
                border: isMe ? '1.5px solid #b8a06a' : '1px solid #ece9e2',
                boxShadow: isMe ? '0 0 0 1px rgba(184,160,106,.3), 0 2px 8px rgba(184,160,106,.12)' : 'none',
                borderRadius:10,
                alignItems:'center',
              }}>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:'#94a3b8',textAlign:'center'}}>#{idx+4}</span>

                <div style={{minWidth:0}}>
                  <p style={{fontWeight: isMe ? 700 : 500,fontSize:11,color: isMe ? '#b8a06a' : '#202124',margin:'0 0 1px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                    {u.nombre}
                    {isMe && (
                      <span style={{fontSize:8,color:'#b8a06a',marginLeft:6,fontWeight:700,background:'rgba(184,160,106,.15)',border:'1px solid rgba(184,160,106,.3)',padding:'1px 5px',borderRadius:3,textTransform:'uppercase',letterSpacing:'.05em'}}>(vos)</span>
                    )}
                  </p>
                  <p style={{fontSize:8,color:'#c8c9cc',margin:0}}>{u.predicciones} pred</p>
                </div>

                <div style={{display:'flex',gap:4,justifyContent:'flex-start'}}>
                  {[{v:u.aciertos_exactos,c:'#22c55e'},{v:u.aciertos_diferencia||0,c:'#b8a06a'}].map((x,i)=>(
                    x.v > 0 && (
                      <span key={i} style={{display:'flex',alignItems:'center',justifyContent:'center',width:22,height:22,borderRadius:5,background:`${x.c}12`,border:`1px solid ${x.c}25`,fontSize:9,fontWeight:600,color:x.c}}>{x.v}</span>
                    )
                  ))}
                </div>

                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,fontWeight:700,color:'#202124',textAlign:'right'}}>{u.puntos_totales}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── LEYENDA ─── */
function Leyenda({ total }) {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8,fontSize:10,color:'#94a3b8',paddingTop:12,borderTop:'1px solid #e8e3db',marginTop:12}}>
      <span>Suma total de puntos obtenidos en todas las apuestas.</span>
      {total>0 && <span>{total} participantes</span>}
    </div>
  )
}

/* ─── ESTADOS ─── */
function SinParticipantes() {
  return (
    <div style={{textAlign:'center',padding:'48px 24px',background:'#fff',borderRadius:14,border:'1.5px solid #e8e3db'}}>
      <p style={{fontWeight:700,color:'#64748b',margin:'0 0 6px',fontSize:15}}>Todavía no hay puntos cargados</p>
      <p style={{fontSize:12,color:'#94a3b8',margin:0,lineHeight:1.6}}>El ranking global aparecerá cuando se finalicen apuestas con resultados.</p>
    </div>
  )
}

function SkeletonContent() {
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.08fr 1fr',gap:12,marginBottom:24,alignItems:'end'}}>
        {[110,145,110].map((h,i)=><div key={i} className="rk-sk" style={{height:h,borderRadius:16}}/>)}
      </div>
    </div>
  )
}
