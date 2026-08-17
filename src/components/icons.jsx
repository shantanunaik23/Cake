export function PawIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <ellipse cx="12" cy="16" rx="6.2" ry="5.2" />
      <ellipse cx="4.6" cy="9.2" rx="2.3" ry="2.9" transform="rotate(-18 4.6 9.2)" />
      <ellipse cx="9.6" cy="5.4" rx="2.1" ry="2.9" transform="rotate(-6 9.6 5.4)" />
      <ellipse cx="14.6" cy="5.4" rx="2.1" ry="2.9" transform="rotate(6 14.6 5.4)" />
      <ellipse cx="19.4" cy="9.2" rx="2.3" ry="2.9" transform="rotate(18 19.4 9.2)" />
    </svg>
  )
}

export function HerbIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className}>
      <path d="M12 21V9" />
      <path d="M12 13c0-4 3-6 7-6-1 4-3 6-7 6Z" />
      <path d="M12 9C12 5 9 3 5 3c1 4 3 6 7 6Z" />
    </svg>
  )
}

export function SteamIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className}>
      <path d="M7 21c1.5-2 1.5-3.5 0-5.5S5.5 12 7 9" />
      <path d="M12 21c1.5-2 1.5-3.5 0-5.5S10.5 12 12 9" />
      <path d="M17 21c1.5-2 1.5-3.5 0-5.5S15.5 12 17 9" />
    </svg>
  )
}

export function BowlIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11h18a9 8 0 0 1-18 0Z" />
      <path d="M8 11a4 3.2 0 0 1 8 0" />
    </svg>
  )
}

export function CheckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  )
}

export function ShieldIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function ArrowIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}
