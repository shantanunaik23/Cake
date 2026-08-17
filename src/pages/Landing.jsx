import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { PawIcon, HerbIcon, SteamIcon, ShieldIcon, ArrowIcon, CheckIcon } from '../components/icons.jsx'
import { recipes } from '../data/recipes.js'

const steps = [
  {
    title: 'Tell us about you both',
    body: 'Your cooking habits, tastes, and household. Your dog\'s breed, weight, activity level, and any sensitivities.',
    icon: PawIcon,
  },
  {
    title: 'We build one shared menu',
    body: 'Every recipe starts from the same base ingredients, then forks: seasoned for you, plain and portioned for them.',
    icon: HerbIcon,
  },
  {
    title: 'Cook once, serve two bowls',
    body: 'One shopping list, one prep session, dinner sorted for the whole household — including the one with four legs.',
    icon: SteamIcon,
  },
]

const tiers = [
  { name: 'Free', price: '$0', tagline: 'Try the idea' },
  { name: 'Plus', price: '$19/mo', tagline: 'Full personalized plans', featured: true },
  { name: 'Kit add-on', price: '+$39/wk', tagline: 'Pre-portioned ingredients' },
]

const featured = recipes[0]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mustard-200/50 blur-3xl" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-forest-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pt-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-floatUp">
              <span className="inline-flex items-center gap-2 rounded-full bg-rust-50 px-4 py-1.5 font-sans text-sm font-semibold text-rust-500">
                <PawIcon className="h-4 w-4" /> A subscription meal plan for households of two species
              </span>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-ink-700 md:text-6xl">
                Cook once.
                <br />
                Feed you <span className="text-rust-500">both.</span>
              </h1>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-ink-500">
                Two Bowls plans your week around ingredients you already share with your
                dog — one prep session forks into a seasoned dinner for you and a
                plain, portioned bowl for them.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/onboarding" size="lg">
                  Build my plan <ArrowIcon className="h-5 w-5" />
                </Button>
                <Button to="/pricing" variant="outline" size="lg">
                  See pricing
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3 font-sans text-sm text-ink-400">
                <div className="flex -space-x-2">
                  {['#DC8354', '#4F7541', '#DFA52C'].map((c) => (
                    <span key={c} className="h-7 w-7 rounded-full border-2 border-cream-50" style={{ backgroundColor: c }} />
                  ))}
                </div>
                Loved by 4,200+ households cooking for two species
              </div>
            </div>

            <div className="relative animate-popIn">
              <div className="rounded-3xl border border-ink-600/10 bg-cream-100 p-6 shadow-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-xl font-semibold text-ink-700">{featured.name}</div>
                    <div className="font-sans text-sm text-ink-400">{featured.tagline}</div>
                  </div>
                  <span className="rounded-full bg-forest-500/10 px-3 py-1 font-sans text-xs font-bold text-forest-500">Monday</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div
                    className="rounded-2xl p-4 text-cream-50 shadow-soft"
                    style={{ background: `linear-gradient(135deg, ${featured.palette[0]}, ${featured.palette[1]})` }}
                  >
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-cream-50/80">Your plate</div>
                    <div className="mt-2 font-display text-lg font-semibold">Seasoned &amp; roasted</div>
                    <div className="mt-1 font-sans text-xs text-cream-50/80">{featured.portionSplit.human}% of the tray</div>
                  </div>
                  <div className="rounded-2xl bg-forest-500 p-4 text-cream-50 shadow-soft">
                    <div className="flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-cream-50/80">
                      <PawIcon className="h-3.5 w-3.5 animate-wag" /> Bramble's bowl
                    </div>
                    <div className="mt-2 font-display text-lg font-semibold">Plain &amp; portioned</div>
                    <div className="mt-1 font-sans text-xs text-cream-50/80">{featured.portionSplit.dog}% of the tray</div>
                  </div>
                </div>

                <div className="mt-5 flex h-3 overflow-hidden rounded-full">
                  <div className="bg-rust-400" style={{ width: `${featured.portionSplit.human}%` }} />
                  <div className="bg-forest-400" style={{ width: `${featured.portionSplit.dog}%` }} />
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-cream-50 p-3 font-sans text-xs text-ink-500">
                  <ShieldIcon className="h-4 w-4 shrink-0 text-forest-500" />
                  No onion, garlic, or added salt in Bramble's portion — pulled aside before seasoning.
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-mustard-300 px-4 py-3 shadow-soft sm:block">
                <span className="font-display text-sm font-semibold text-ink-700">One shopping list. One prep.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-xl">
          <span className="font-sans text-sm font-bold uppercase tracking-wider text-rust-500">How it works</span>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink-700">Three steps to dinner, sorted.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl border border-ink-600/10 bg-cream-100 p-7 shadow-soft transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rust-500 text-cream-50">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-5 font-sans text-xs font-bold uppercase tracking-wider text-ink-400">Step {i + 1}</div>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink-700">{s.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-500">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample recipe preview */}
      <section className="bg-forest-500">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="font-sans text-sm font-bold uppercase tracking-wider text-mustard-200">This week's menu</span>
              <h2 className="mt-3 font-display text-4xl font-semibold text-cream-50">
                Real recipes, forked for two bowls.
              </h2>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-cream-100/85">
                Every plan comes with a full week of dinners that share a base and
                split at the exact right moment — before the seasoning goes in.
              </p>
              <Button to="/plan" variant="light" size="lg" className="mt-8">
                Preview a sample plan <ArrowIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recipes.slice(0, 4).map((r) => (
                <Link
                  key={r.id}
                  to={`/recipe/${r.id}`}
                  className="group rounded-2xl bg-cream-50/95 p-4 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <div
                    className="h-20 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${r.palette[0]}, ${r.palette[1]})` }}
                  />
                  <div className="mt-3 font-sans text-xs font-bold uppercase tracking-wider text-forest-500">{r.day}</div>
                  <div className="font-display text-base font-semibold text-ink-700 group-hover:text-rust-500">{r.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-xl">
          <span className="font-sans text-sm font-bold uppercase tracking-wider text-rust-500">Membership</span>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink-700">Start free, upgrade when it clicks.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-7 shadow-soft ${
                t.featured ? 'bg-rust-500 text-cream-50' : 'border border-ink-600/10 bg-cream-100 text-ink-700'
              }`}
            >
              <div className={`font-sans text-sm font-bold uppercase tracking-wider ${t.featured ? 'text-cream-50/80' : 'text-ink-400'}`}>
                {t.name}
              </div>
              <div className="mt-2 font-display text-3xl font-semibold">{t.price}</div>
              <div className={`mt-1 font-sans text-sm ${t.featured ? 'text-cream-50/85' : 'text-ink-500'}`}>{t.tagline}</div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button to="/pricing" variant="outline">
            Compare full plans <ArrowIcon className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink-700 px-8 py-16 text-center shadow-lift">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rust-500/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-forest-500/30 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl font-semibold text-cream-50 md:text-5xl">Ready to cook once tonight?</h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-base text-cream-100/80">
              Takes about two minutes. Comes back with a full week of two-bowl dinners.
            </p>
            <Button to="/onboarding" size="lg" className="mt-8">
              Build my plan <ArrowIcon className="h-5 w-5" />
            </Button>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-cream-100/70">
              {['No credit card required', 'Cancel anytime', 'Vet-reviewed recipes'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-mustard-300" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
