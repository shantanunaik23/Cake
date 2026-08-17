import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-ink-600/10 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `font-sans text-sm font-semibold transition-colors ${
                  isActive ? 'text-rust-500' : 'text-ink-600 hover:text-rust-500'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button to="/onboarding" size="sm">
            Build my plan
          </Button>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-600/10 bg-cream-50 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                onClick={() => setOpen(false)}
                className="font-sans text-base font-semibold text-ink-600"
              >
                {l.label}
              </NavLink>
            ))}
            <Button to="/onboarding" onClick={() => setOpen(false)}>
              Build my plan
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
