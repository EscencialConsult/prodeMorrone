export default function Badge({ children, variant = 'accent', className = '', ...props }) {
  return (
    <span className={`badge badge--${variant} ${className}`} {...props}>
      {children}
    </span>
  )
}
