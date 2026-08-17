export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl font-semibold text-ink-700 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <circle cx="11" cy="19" r="8.5" fill="#B24A1E" />
          <circle cx="21" cy="19" r="8.5" fill="#4F7541" />
          <path d="M16 10.5c1.6 0 2.9 1.5 2.9 3.4 0 1.5-1.3 2.7-2.9 2.7s-2.9-1.2-2.9-2.7c0-1.9 1.3-3.4 2.9-3.4Z" fill="#DFA52C" />
        </svg>
      </span>
      Two Bowls
    </span>
  )
}
