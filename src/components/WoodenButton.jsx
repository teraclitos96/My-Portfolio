const variantClassNames = {
  navigation: 'py-3 d-flex justify-content-center',
  compact: 'wooden-button-cv',
  project: 'project-action links-book'
}

const WoodenButton = ({
  children,
  className = '',
  href,
  rel,
  target,
  type = 'button',
  variant = 'navigation',
  ...props
}) => {
  const classes = [
    'wooden-button',
    'letter-title-book',
    variantClassNames[variant],
    className
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a
        {...props}
        className={classes}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noreferrer' : undefined)}
      >
        {children}
      </a>
    )
  }

  return (
    <button {...props} className={classes} type={type}>
      {children}
    </button>
  )
}

export default WoodenButton
