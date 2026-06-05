import CreateBetForm from './CreateBetForm.jsx'

export default function CreateBetTab({ createBet, loading, matches }) {
  return (
    <div className="animate-fade-in delay-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(184,160,106,.12)', border: '1px solid rgba(184,160,106,.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f7a45" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <h2 className="font-display text-2xl" style={{ color: '#202124', letterSpacing: '.02em' }}>
          NUEVA APUESTA
        </h2>
      </div>

      {/* Form - SIN max-width */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: '#fff',
          border: '1px solid #dedbd4',
          boxShadow: '0 4px 16px rgba(32,33,36,.06)',
        }}
      >
        <CreateBetForm onSubmit={createBet} loading={loading} matches={matches} />
      </div>
    </div>
  )
}