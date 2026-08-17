import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-ink-600/10 bg-cream-100">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink-500">
              A personalized weekly meal plan for you, with a dog-safe portion
              built in — so dinner is something you and your dog actually share.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="font-sans text-xs font-bold uppercase tracking-wider text-ink-400">Product</div>
              <ul className="mt-3 space-y-2 font-sans text-sm text-ink-500">
                <li>How it works</li>
                <li>Pricing</li>
                <li>Ingredient kits</li>
              </ul>
            </div>
            <div>
              <div className="font-sans text-xs font-bold uppercase tracking-wider text-ink-400">Company</div>
              <ul className="mt-3 space-y-2 font-sans text-sm text-ink-500">
                <li>About</li>
                <li>Vet advisory board</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-ink-600/10 pt-6 font-sans text-xs text-ink-400">
          Two Bowls is a concept demo — recipes and plans shown are illustrative, not veterinary advice. © {new Date().getFullYear()} Two Bowls.
        </div>
      </div>
    </footer>
  )
}
