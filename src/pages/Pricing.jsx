import Button from '../components/Button.jsx'
import { CheckIcon, PawIcon, ArrowIcon } from '../components/icons.jsx'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'Try a week of dinners you can share.',
    cta: 'Start free',
    features: [
      '3 sample paired recipes',
      'Basic weekly plan preview',
      'Manual portion guidance',
      'Community recipe library',
    ],
  },
  {
    name: 'Plus',
    price: '$19',
    period: '/month',
    tagline: 'Your full personalized plan, every week.',
    cta: 'Start 14-day trial',
    featured: true,
    features: [
      'Everything in Free',
      'Unlimited personalized weekly plans',
      'Full recipe library, updated weekly',
      'Auto-generated shopping lists by aisle',
      'Portion calculator tuned to your dog',
      'Swap or skip any recipe',
    ],
  },
  {
    name: 'Ingredient Kit',
    price: '+$39',
    period: '/week add-on',
    tagline: 'Pre-portioned ingredients, delivered.',
    cta: 'Add to Plus',
    features: [
      'Requires a Plus subscription',
      'Pre-portioned human & dog ingredients',
      'Pre-measured dog-safe seasonings',
      'Recyclable, insulated packaging',
      'Skip any week, no commitment',
    ],
  },
]

const faqs = [
  {
    q: 'Is this actual veterinary nutrition advice?',
    a: 'Two Bowls plans are built around commonly-cited dog-safe ingredients and portioning guidelines, and every plan is reviewable by our vet advisory board on Plus. It\'s a starting point for home-prepared meals, not a replacement for your vet\'s guidance on your specific dog.',
  },
  {
    q: 'What if my dog has allergies?',
    a: 'You\'ll flag known sensitivities during onboarding, and we filter them out of every dog portion across your plan — automatically, every week.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — Plus and the Ingredient Kit are both month-to-month, cancel from your account in a couple of clicks.',
  },
]

export default function Pricing() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-sans text-sm font-bold uppercase tracking-wider text-rust-500">Membership</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-700 md:text-5xl">Simple pricing for sharing dinner.</h1>
        <p className="mt-4 font-sans text-ink-500">Start free. Upgrade when you're ready for a full weekly plan, built around you first — with your dog eating safely alongside you.</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-3xl p-7 shadow-soft ${
              t.featured ? 'border-2 border-rust-500 bg-cream-100 md:-translate-y-3' : 'border border-ink-600/10 bg-cream-100'
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rust-500 px-4 py-1 font-sans text-xs font-bold uppercase tracking-wider text-cream-50">
                Most popular
              </span>
            )}
            <div className="font-sans text-sm font-bold uppercase tracking-wider text-ink-400">{t.name}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-ink-700">{t.price}</span>
              <span className="font-sans text-sm text-ink-400">{t.period}</span>
            </div>
            <p className="mt-2 font-sans text-sm text-ink-500">{t.tagline}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 font-sans text-sm text-ink-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                  {f}
                </li>
              ))}
            </ul>

            <Button to="/onboarding" variant={t.featured ? 'primary' : 'outline'} className="mt-7 w-full">
              {t.cta}
            </Button>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center font-display text-3xl font-semibold text-ink-700">Questions, answered.</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-ink-600/10 bg-cream-100 p-5">
              <div className="flex items-start gap-2 font-display text-lg font-semibold text-ink-700">
                <PawIcon className="mt-1 h-4 w-4 shrink-0 text-rust-500" /> {f.q}
              </div>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-500">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-ink-700 p-10 text-center shadow-lift">
        <h2 className="font-display text-2xl font-semibold text-cream-50">Two minutes to your first shared dinner.</h2>
        <Button to="/onboarding" className="mt-6">
          Build my plan <ArrowIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
