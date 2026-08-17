import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { PawIcon, HerbIcon, SteamIcon, ShieldIcon, ArrowIcon, CheckIcon } from '../components/icons.jsx'
import { recipes } from '../data/recipes.js'

const steps = [
  {
    title: 'Tell us about you first',
    body: 'Your cooking habits, tastes, and household — then your dog\'s breed, weight, activity level, and any sensitivities.',
    icon: PawIcon,
  },
  {
    title: 'We build your menu, with a fork for them',
    body: 'Every recipe starts as your dinner — seasoned, real cooking. It only forks off plain and portioned for your dog at the end.',
    icon: HerbIcon,
  },
  {
    title: 'Cook once, sit down together',
    body: 'One shopping list, one prep session — and dinner where you\'re both actually eating the same thing, at the same table.',
    icon: SteamIcon,
  },
]

const tiers = [
  { name: 'Free', price: '$0', tagline: 'Try the idea' },
  { name: 'Plus', price: '$19/mo', tagline: 'Full personalized plans', featured: true },
  { name: 'Kit add-on', price: '+$39/wk', tagline: 'Pre-portioned ingredients' },
]

const featured = recipes[0]

function NutrientRow({ label, amount, unit, dv, barClass }) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-sans text-sm">
        <span className="text-ink-600">{label}</span>
        <span className="text-ink-700">
          <strong className="font-semibold">{amount}{unit}</strong>
          {dv != null && <span className="ml-1.5 text-ink-400">· {dv}% DV</span>}
        </span>
      </div>
      {dv != null && (
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-600/10">
          <div className={`h-full rounded-full ${barClass}`} style={{ width: `${Math.min(100, dv)}%` }} />
        </div>
      )}
    </div>
  )
}

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
                <PawIcon className="h-4 w-4" /> A real meal plan for you, with a dog-safe portion built in
              </span>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-ink-700 md:text-6xl">
                Cook your dinner.
                <br />
                Share it <span className="text-rust-500">with them.</span>
              </h1>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-ink-500">
                Two Bowls plans your week around dinners you actually want to
                cook — then splits off a plain, portioned bowl for your dog before
                the seasoning goes in, so you both eat at the same table, from the
                same pan.
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
                Loved by 4,200+ people sharing dinner with their dog every night
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

      {/* Recipe example with nutrition */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-xl">
          <span className="font-sans text-sm font-bold uppercase tracking-wider text-rust-500">Recipe example</span>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink-700">See exactly what's on each plate.</h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink-500">
            Every recipe comes with real nutrition — for you and for your dog —
            so "cook once" isn't a guess. Here's Monday's dinner.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-ink-600/10 bg-cream-100 shadow-soft">
          <div
            className="flex items-center justify-between px-8 py-6 text-cream-50"
            style={{ background: `linear-gradient(135deg, ${featured.palette[0]}, ${featured.palette[1]})` }}
          >
            <div>
              <div className="font-display text-2xl font-semibold">{featured.name}</div>
              <div className="mt-1 font-sans text-sm text-cream-50/85">{featured.tagline}</div>
            </div>
            <span className="hidden rounded-full bg-cream-50/20 px-3 py-1 font-sans text-xs font-bold sm:block">{featured.day}</span>
          </div>

          <div className="grid gap-8 p-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink-600/10">
            {/* Human nutrition */}
            <div className="md:pr-8">
              <div className="flex items-baseline justify-between">
                <div className="font-sans text-xs font-bold uppercase tracking-wider text-rust-500">Your plate</div>
                <div className="font-sans text-xs text-ink-400">{featured.nutrition.human.perServing}</div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-ink-700">{featured.nutrition.human.calories}</span>
                <span className="font-sans text-sm text-ink-400">kcal · {featured.nutrition.human.dailyValue.calories}% of a 2,000-cal day</span>
              </div>

              <div className="mt-5 space-y-3">
                <NutrientRow label="Protein" amount={featured.nutrition.human.protein} unit="g" dv={featured.nutrition.human.dailyValue.protein} barClass="bg-rust-500" />
                <NutrientRow label="Carbohydrates" amount={featured.nutrition.human.carbs} unit="g" dv={featured.nutrition.human.dailyValue.carbs} barClass="bg-rust-500" />
                <NutrientRow label="Fat" amount={featured.nutrition.human.fat} unit="g" dv={featured.nutrition.human.dailyValue.fat} barClass="bg-rust-500" />
                <NutrientRow label="Fiber" amount={featured.nutrition.human.fiber} unit="g" dv={featured.nutrition.human.dailyValue.fiber} barClass="bg-rust-500" />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {featured.benefits.human.map((b) => (
                  <span key={b} className="rounded-full bg-rust-50 px-3 py-1 font-sans text-xs font-semibold text-rust-500">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Dog nutrition */}
            <div className="pt-8 md:pt-0 md:pl-8">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-forest-500">
                  <PawIcon className="h-3.5 w-3.5" /> Bramble's bowl
                </div>
                <div className="font-sans text-xs text-ink-400">{featured.nutrition.dog.perServing}</div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-ink-700">{featured.nutrition.dog.calories}</span>
                <span className="font-sans text-sm text-ink-400">kcal · {featured.nutrition.dog.dailyValue.calories}% of a 30lb dog's day</span>
              </div>

              <div className="mt-5 space-y-3">
                <NutrientRow label="Protein" amount={featured.nutrition.dog.protein} unit="g" dv={featured.nutrition.dog.dailyValue.protein} barClass="bg-forest-500" />
                <NutrientRow label="Fat" amount={featured.nutrition.dog.fat} unit="g" dv={featured.nutrition.dog.dailyValue.fat} barClass="bg-forest-500" />
                <NutrientRow label="Fiber" amount={featured.nutrition.dog.fiber} unit="g" dv={null} barClass="bg-forest-500" />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {featured.benefits.dog.map((b) => (
                  <span key={b} className="rounded-full bg-forest-50 px-3 py-1 font-sans text-xs font-semibold text-forest-600">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-ink-600/10 bg-cream-50 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-sans text-xs leading-relaxed text-ink-400">
              % Daily Value shown against a 2,000-calorie human diet and a ~30lb,
              moderately active dog, for comparison only — not veterinary or
              medical advice.
            </p>
            <Button to={`/recipe/${featured.id}`} variant="outline" size="sm" className="shrink-0">
              See the full recipe <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sample recipe preview */}
      <section className="bg-forest-500">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="font-sans text-sm font-bold uppercase tracking-wider text-mustard-200">This week's menu</span>
              <h2 className="mt-3 font-display text-4xl font-semibold text-cream-50">
                Real dinners, made to share.
              </h2>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-cream-100/85">
                Every plan is a full week of dinners you'd actually cook for
                yourself — each one splitting off a plain, dog-safe portion at
                exactly the right moment, so you're never eating something
                different from your dog.
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
            <h2 className="font-display text-4xl font-semibold text-cream-50 md:text-5xl">Ready to share dinner tonight?</h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-base text-cream-100/80">
              Takes about two minutes. Comes back with a full week of dinners built for you, safe for your dog.
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
