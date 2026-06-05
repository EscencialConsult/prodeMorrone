export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="input-wrap">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input ${error ? 'input--error' : ''} focus-ring ${className}`}
        {...props}
      />
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  )
}
