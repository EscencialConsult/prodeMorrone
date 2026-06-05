import { useEffect } from 'react'
// import ManualBetGate from '../pronósticomanual/ManualBetGate'
// import Manual from './Manual'

export default function AdminTabs({
  tab,
  setTab,
  pendingCount = 0,
  activeBetsCount = 0,
}) {
  const tabs = [
    {
      key: 'NuevaApuesta',
      label: 'Nuevo pronóstico',
    },
    {
      key: 'PronósticosCreadas',
      label: 'Pronósticos creados',
      count: activeBetsCount,
    },
    {
      key: 'Usuarios',
      label: 'Usuarios',
      count: pendingCount,
    },
  ]

  return (
    <>
      <div
        className="mb-6 flex items-center gap-2 rounded-xl p-1"
        style={{
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        }}
      >
        {tabs.map(item => {
          const active = tab === item.key

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-body font-bold uppercase tracking-wider transition-all"
              style={{
                background: active ? '#191a1d' : 'transparent',
                color: active ? '#b8a06a' : '#6B7280',
                border: active ? '1px solid rgba(184,160,106,0.45)' : '1px solid transparent',
              }}
            >
              <span>{item.label}</span>

              {item.count > 0 && (
                <span
                  className="inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px]"
                  style={{
                    background: active ? 'rgba(184,160,106,0.18)' : 'rgba(7,26,58,0.08)',
                    color: active ? '#b8a06a' : '#191a1d',
                  }}
                >
                  {item.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* {tab === 'ApuestaManual' && (
        <ManualBetGate
          fallback={
            <div className="rounded-xl p-8 text-center" style={{
              background: 'rgba(255,193,7,0.1)',
              border: '1px solid rgba(255,193,7,0.3)',
            }}>
              <p className="mb-2 text-lg font-bold text-yellow-700">
                â³ Pronósticos manuales deshabilitadas
              </p>
              <p className="text-sm text-yellow-600">
                Esta funcionalidad estará disponible en una fecha específica
              </p>
            </div>
          }
        >
          <Manual />
        </ManualBetGate>
      )} */}
    </>
  )
}

