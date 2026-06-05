export default function MorroneLogo({
  size = 52,
  variant = 'light',
  markOnly = false,
  textOnly = false,
  className = '',
  style,
  ...props
}) {
  const isLight = variant === 'light'
  const markDark = isLight ? '#f1f3f5' : '#565656'
  const markMid = isLight ? '#c9cdd1' : '#969696'
  const textColor = isLight ? '#f4f6f8' : '#2f3337'
  const mutedColor = isLight ? '#c9cdd1' : '#6b7280'

  const markSize = size * (markOnly ? 1.18 : 1.48)
  const wordSize = size * 0.46

  return (
    <span
      className={className}
      aria-label="Morrone Rucker Embden & Asociados"
      role="img"
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: markOnly ? 0 : size * 0.14,
        height: size,
        maxWidth: '100%',
        overflow: 'visible',
        lineHeight: 1,
        color: textColor,
        fontWeight: 900,
        letterSpacing: '-0.08em',
        textTransform: 'lowercase',
        fontFamily: 'Inter',
        ...style,
      }}
    >
      {!textOnly && (<span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: size,
          overflow: 'visible',
          fontSize: markSize,
          lineHeight: 0.78,
          fontWeight: 900,
          letterSpacing: `-${size * 0.06}px`,
          transform: 'translateY(-1px)',
        }}
      >
        <span style={{ color: markDark }}>m</span>
        <span style={{ color: markMid, marginLeft: -size * 0.06 }}>r</span>
        <span style={{ color: markDark, marginLeft: -size * 0.055 }}>e</span>
      </span>
      )}
      {!markOnly && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: size,
            minWidth: 0,
            transform: 'translateY(1px)',
          }}
        >
          <span
            style={{
              color: textColor,
              fontSize: wordSize * 1.18,
              fontWeight: 850,
              letterSpacing: '-0.045em',
              lineHeight: 0.95,
              whiteSpace: 'nowrap',
              textTransform: 'lowercase',
            }}
          >
            morrone
          </span>

          <span
            style={{
              color: textColor,
              fontSize: wordSize,
              fontWeight: 750,
              letterSpacing: '-0.035em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              textTransform: 'lowercase',
            }}
          >
            rucker embden
          </span>

          <span
            style={{
              color: mutedColor,
              fontSize: wordSize * 0.78,
              fontWeight: 650,
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              textTransform: 'lowercase',
            }}
          >
            &amp; asociados
          </span>
        </span>
      )}
    </span>
  )
}
