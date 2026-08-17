import { Link } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext.jsx'
import { buildWeeklyPlan, dogDailyGrams } from '../lib/planEngine.js'
import Button from '../components/Button.jsx'
import { PawIcon, ArrowIcon, ShieldIcon } from '../components/icons.jsx'

export default function Plan() {
  const { data } = useOnboarding()
  const plan = buildWeeklyPlan(data)
  const dailyGrams = dogDailyGrams(data.dog.weight, data.dog.activityLevel)
  const dogName = data.dog.name || 'Your dog'

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-sans text-sm font-bold uppercase tracking-wider text-rust-500">This week's plan</span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink-700">
            {data.completed ? `Your week, sorted — ${dogName} eats alongside you.` : 'A sample week of shared dinners'}
          </h1>
          <p className="mt-2 max-w-lg font-sans text-ink-500">
            {data.completed
              ? `Built around ${data.owner.dietaryPrefs.join(', ').toLowerCase() || 'your tastes'}, with a safe portion sized for ${dogName} — about ${dailyGrams}g/day.`
              : 'Fill out onboarding for a plan personalized to you and your dog — here\'s what one looks like.'}
          </p>
        </div>
        {!data.completed && (
          <Button to="/onboarding">
            Personalize this <ArrowIcon className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="mt-10 grid gap-6">
        {plan.map((r) => (
          <div key={r.id} className="grid gap-0 overflow-hidden rounded-3xl border border-ink-600/10 bg-cream-100 shadow-soft md:grid-cols-[220px_1fr]">
            <div
              className="flex flex-col justify-between p-6 text-cream-50"
              style={{ background: `linear-gradient(160deg, ${r.palette[0]}, ${r.palette[1]})` }}
            >
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-cream-50/80">{r.day}</span>
              <div>
                <div className="font-display text-xl font-semibold leading-tight">{r.name}</div>
                <div className="mt-1 font-sans text-xs text-cream-50/80">{r.prepTime}</div>
              </div>
            </div>

            <div className="p-6">
              <p className="font-sans text-sm text-ink-500">{r.tagline}</p>

              <div className="mt-5">
                <div className="flex justify-between font-sans text-xs font-bold uppercase tracking-wider text-ink-400">
                  <span>Your plate — {r.humanServings} servings</span>
                  <span className="flex items-center gap-1">
                    <PawIcon className="h-3.5 w-3.5" /> {dogName} — {r.dogGrams}g
                  </span>
                </div>
                <div className="mt-2 flex h-4 overflow-hidden rounded-full">
                  <div
                    className="flex items-center justify-start bg-rust-400 pl-2 font-sans text-[10px] font-bold text-cream-50"
                    style={{ width: `${r.portionSplit.human}%` }}
                  >
                    {r.portionSplit.human}%
                  </div>
                  <div
                    className="flex items-center justify-end bg-forest-500 pr-2 font-sans text-[10px] font-bold text-cream-50"
                    style={{ width: `${r.portionSplit.dog}%` }}
                  >
                    {r.portionSplit.dog}%
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-cream-50 p-3 font-sans text-xs text-ink-500">
                <ShieldIcon className="h-4 w-4 shrink-0 text-forest-500" />
                {r.safetyNote}
              </div>

              <div className="mt-5">
                <Link to={`/recipe/${r.id}`} className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-rust-500 hover:text-rust-600">
                  View full recipe & shopping list <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-forest-500 p-8 text-center shadow-soft">
        <h2 className="font-display text-2xl font-semibold text-cream-50">Want the full shopping list bundled by store aisle?</h2>
        <p className="mt-2 font-sans text-cream-100/80">That's a Plus-tier feature, along with unlimited weekly plans.</p>
        <Button to="/pricing" variant="light" className="mt-5">
          See Plus <ArrowIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
