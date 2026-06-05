export default function Card({ children, className = '', glow = false, interactive = false, ...props }) {
  return (
    <div
      className={`card ${glow ? 'card--glow' : ''} ${interactive ? 'card--interactive' : ''} focus-ring ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
