import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary:
    'bg-rust-500 text-cream-50 shadow-soft hover:bg-rust-600 hover:shadow-lift',
  secondary:
    'bg-forest-500 text-cream-50 shadow-soft hover:bg-forest-600 hover:shadow-lift',
  outline:
    'bg-transparent text-ink-600 border-2 border-ink-600/20 hover:border-rust-400 hover:text-rust-500',
  ghost: 'bg-transparent text-ink-600 hover:bg-ink-600/5',
  light: 'bg-cream-50 text-ink-700 shadow-soft hover:shadow-lift',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
