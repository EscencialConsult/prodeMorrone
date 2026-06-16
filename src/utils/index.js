/* ── Utilidades Generales ───────────────────────────────────
   Funciones helper reutilizables en todo el proyecto.
   Todas las fechas viajan como ISO UTC y se muestran en hora
   local del navegador del usuario.
   ─────────────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════
   FECHAS
   ══════════════════════════════════════════════════════════ */

/** Formatea una fecha ISO a "24/11/2026 16:00" en hora local */
export function formatDate(iso, opts = {}) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleString('es-AR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    ...opts,
  })
}

/** Solo día y mes + hora: "24 nov 16:00" (separador personalizable) */
export function fmtFecha(iso, separador = ' ') {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return (
    d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }) +
    separador +
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  )
}

/**
 * Devuelve la fecha (YYYY-MM-DD) en zona LOCAL del navegador.
 * Útil para agrupar partidos por día sin que se "cambien de día"
 * al convertir a UTC. Ej: un partido 24/11 21:00 AR no debe
 * aparecer como del 25/11 solo porque en UTC lo es.
 */
export function diaLocalIso(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const pad = n => String(n).padStart(2, '0')
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

/** Solo fecha sin hora: "24/11/2026" */
export function fmtFechaSola(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

/** Solo hora: "16:00" */
export function fmtHora(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}

/** Fecha estilo "lunes 24 de noviembre" para agrupadores */
export function fmtFechaLarga(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-AR', {
    weekday: 'long', day: '2-digit', month: 'long'
  })
}

/**
 * Convierte una fecha que viene del backend (formato ISO con Z)
 * interpretándola como hora Argentina, no UTC.
 * Backend guarda "2026-04-29T13:30:00.000Z" queriendo decir 13:30 Argentina.
 * Esta función lo convierte a un timestamp correcto.
 */
function fechaArgentinaATimestamp(fechaISO) {
  if (!fechaISO) return null
  const str = String(fechaISO).trim()
  
  // Si termina en Z, asumir que es hora Argentina (no UTC)
  if (/Z$/.test(str)) {
    const sinZ = str.replace(/Z$/, '')
    const conOffset = `${sinZ}-03:00` // Argentina UTC-3
    const date = new Date(conOffset)
    if (isNaN(date.getTime())) return null
    return date.getTime()
  }
  
  // Si no tiene Z, parsearlo normalmente
  const date = new Date(str)
  if (isNaN(date.getTime())) return null
  return date.getTime()
}

/** Tiempo restante hasta una fecha límite: "2d 5h", "45m", "Cerrada" */
export function timeLeft(fechaCierre) {
  const timestamp = fechaArgentinaATimestamp(fechaCierre)
  if (!timestamp) return 'Cerrada'
  
  const diff = timestamp - Date.now()
  if (diff <= 0) return 'Cerrada'
  
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

/**
 * Convierte el valor de un <input type="datetime-local"> a ISO UTC.
 *
 * El input datetime-local devuelve "2026-11-24T16:00" sin zona.
 * Por default JavaScript lo interpreta en la zona del navegador
 * (lo cual es lo que queremos: el admin escribe en SU hora local
 * y cada usuario lo ve en la suya). El ISO resultante es UTC puro
 * y se puede guardar sin ambigüedad.
 *
 * @param {string} valorInput - valor crudo del input datetime-local
 * @returns {string} ISO UTC ej. "2026-11-24T19:00:00.000Z"
 */
export function inputLocalAIsoUtc(valorInput) {
  if (!valorInput) return ''
  const d = new Date(valorInput)
  if (isNaN(d.getTime())) return ''
  return d.toISOString()
}

/**
 * Convierte un ISO UTC a formato "YYYY-MM-DDTHH:mm" que espera un
 * <input type="datetime-local">, usando la zona local del navegador.
 * Útil para precargar inputs al editar.
 */
export function isoUtcAInputLocal(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const pad = n => String(n).padStart(2, '0')
  return (
    d.getFullYear() + '-' +
    pad(d.getMonth() + 1) + '-' +
    pad(d.getDate()) + 'T' +
    pad(d.getHours()) + ':' +
    pad(d.getMinutes())
  )
}

/* ══════════════════════════════════════════════════════════
   APUESTAS
   ══════════════════════════════════════════════════════════ */

/** Devuelve true si una apuesta está abierta */
export function isBetOpen(bet) {
  return bet.estado === 'abierta'
}

/**
 * Cierre POR PARTIDO (estilo Sogefi).
 * Un partido deja de aceptar pronósticos cuando llega su hora de inicio
 * (fecha_partido) o cuando su estado ya no es "programado".
 * `fecha_partido` viaja como ISO UTC real desde el backend, por eso se
 * compara directamente con Date.now() (sin el ajuste de timeLeft()).
 */
export function matchHasStarted(match) {
  if (!match) return true
  const estado = match.estado
  if (estado === 'en_vivo' || estado === 'finalizado' || estado === 'cancelado') return true
  if (!match.fecha_partido) return false
  const ts = new Date(match.fecha_partido).getTime()
  if (isNaN(ts)) return false
  return Date.now() >= ts
}

/** Inverso de matchHasStarted: el partido todavía acepta pronósticos */
export function isMatchOpen(match) {
  return !matchHasStarted(match)
}

/**
 * Una apuesta es EDITABLE (estilo Sogefi) si no está finalizada (ya puntuada)
 * y todavía tiene al menos un partido que no empezó. NO depende del campo
 * `estado` de la apuesta: una apuesta marcada "cerrada" vuelve a ser editable
 * si alguno de sus partidos sigue sin comenzar.
 */
export function betHasOpenMatches(bet) {
  if (!bet) return false
  if (bet.estado === 'finalizada') return false
  return (bet.partidos || []).some(p => !matchHasStarted(p))
}

/**
 * Cierre EFECTIVO de la apuesta = inicio del ÚLTIMO partido (ISO UTC real).
 * Se calcula desde los partidos, no desde bet.fecha_cierre (que puede estar
 * desactualizada en apuestas viejas). Sirve para el contador "faltan X".
 */
export function betEffectiveCloseIso(bet) {
  let maxTs = -Infinity
  for (const p of (bet?.partidos || [])) {
    if (!p.fecha_partido) continue
    const ts = new Date(p.fecha_partido).getTime()
    if (!isNaN(ts) && ts > maxTs) maxTs = ts
  }
  if (maxTs > -Infinity) return new Date(maxTs).toISOString()
  return bet?.fecha_cierre || ''
}

/**
 * Cuenta regresiva "5d 20h" / "3h 10m" / "45m" hasta una fecha ISO UTC real.
 * A diferencia de timeLeft(), NO aplica el ajuste de zona horaria argentina,
 * porque fecha_partido ya viaja como UTC real desde el backend.
 */
export function countdownTo(iso) {
  if (!iso) return ''
  const ts = new Date(iso).getTime()
  if (isNaN(ts)) return ''
  const diff = ts - Date.now()
  if (diff <= 0) return 'Cerrada'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

/** Clases CSS para el estado de una apuesta */
export function betStatusClass(estado) {
  return {
    abierta: 'text-accent',
    cerrada: 'text-muted',
    finalizada: 'text-warn',
  }[estado] ?? 'text-muted'
}

/** Clases CSS para el estado de un partido */
export function matchStateLabel(estado) {
  return {
    programado:  { label: 'Programado', class: 'text-muted' },
    en_vivo:     { label: 'EN VIVO',    class: 'text-accent animate-pulse-accent' },
    finalizado:  { label: 'Finalizado', class: 'text-warn' },
    cancelado:   { label: 'Cancelado',  class: 'text-danger' }
  }[estado] ?? { label: estado || '-', class: 'text-muted' }
}

/* ══════════════════════════════════════════════════════════
   OTROS
   ══════════════════════════════════════════════════════════ */

/** Trunca texto a n caracteres */
export function truncate(str, n = 40) {
  if (!str) return ''
  return str.length > n ? str.slice(0, n) + '…' : str
}