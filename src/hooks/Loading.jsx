export default function Loading({ fullscreen = true, message = 'Cargando...' }) {
  const cls = fullscreen
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "absolute inset-0 z-50 flex items-center justify-center"

  return (
    <div className={cls} style={{ background: 'rgba(31, 32, 35, 0.90)', backdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col items-center gap-5">
        <div className="w-8 h-8 rounded-full border-2 border-[#b8a06a] border-t-transparent animate-spin" />
        <p className="text-sm font-body font-semibold tracking-wider uppercase"
          style={{ color: '#b8a06a', letterSpacing: '0.18em' }}>
          {message}
        </p>
      </div>
    </div>
  )
}
