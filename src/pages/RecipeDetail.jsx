import { useParams, Link, Navigate } from 'react-router-dom'
import { getRecipeById, recipes } from '../data/recipes.js'
import { useOnboarding } from '../context/OnboardingContext.jsx'
import { dogDailyGrams } from '../lib/planEngine.js'
import Button from '../components/Button.jsx'
import { PawIcon, ShieldIcon, ArrowIcon, CheckIcon } from '../components/icons.jsx'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = getRecipeById(id)
  const { data } = useOnboarding()

  if (!recipe) return <Navigate to="/plan" replace />

  const dogName = data.dog.name || 'your dog'
  const dailyGrams = dogDailyGrams(data.dog.weight, data.dog.activityLevel)
  const dogGrams = Math.round((dailyGrams * (recipe.portionSplit.dog / 100)) / 10) * 10

  const otherRecipes = recipes.filter((r) => r.id !== recipe.id).slice(0, 3)

  return (
    <div>
      <div
        className="relative"
        style={{ background: `linear-gradient(135deg, ${recipe.palette[0]}, ${recipe.palette[1]})` }}
      >
        <div className="mx-auto max-w-5xl px-5 py-16 text-cream-50">
          <Link to="/plan" className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-cream-50/80 hover:text-cream-50">
            ← Back to plan
          </Link>
          <span className="mt-4 block font-sans text-xs font-bold uppercase tracking-wider text-cream-50/80">{recipe.day} · {recipe.prepTime}</span>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{recipe.name}</h1>
          <p className="mt-3 max-w-xl font-sans text-lg text-cream-50/90">{recipe.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12">
        {/* Portion split */}
        <div className="rounded-3xl border border-ink-600/10 bg-cream-100 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-ink-700">How this tray splits</h2>
          <div className="mt-4 flex h-6 overflow-hidden rounded-full">
            <div className="flex items-center justify-center bg-rust-400 font-sans text-xs font-bold text-cream-50" style={{ width: `${recipe.portionSplit.human}%` }}>
              {recipe.portionSplit.human}% — your plate
            </div>
            <div className="flex items-center justify-center bg-forest-500 font-sans text-xs font-bold text-cream-50" style={{ width: `${recipe.portionSplit.dog}%` }}>
              {recipe.portionSplit.dog}% — {dogName}
            </div>
          </div>
          <div className="mt-3 font-sans text-sm text-ink-500">
            Roughly <strong className="text-ink-700">{dogGrams}g</strong> for {dogName} based on their profile, portioned before any seasoning is added.
          </div>
        </div>

        {/* Shared base */}
        <div className="mt-8">
          <h2 className="font-display text-2xl font-semibold text-ink-700">Shared base ingredients</h2>
          <p className="mt-1 font-sans text-sm text-ink-500">Everything below is cooked once, plain, before the recipe forks in two.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {recipe.sharedBase.map((i) => (
              <div key={i.item} className="flex items-center justify-between rounded-xl bg-cream-100 px-4 py-3 font-sans text-sm">
                <span className="text-ink-700">{i.item}</span>
                <span className="text-ink-400">{i.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fork */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-rust-200 bg-rust-50 p-6">
            <div className="font-sans text-xs font-bold uppercase tracking-wider text-rust-500">{recipe.humanFork.title}</div>
            <ul className="mt-4 space-y-3">
              {recipe.humanFork.addIns.map((step, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm text-ink-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rust-500 text-[10px] font-bold text-cream-50">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-forest-200 bg-forest-50 p-6">
            <div className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-forest-500">
              <PawIcon className="h-3.5 w-3.5" /> {recipe.dogFork.title}
            </div>
            <ul className="mt-4 space-y-3">
              {recipe.dogFork.addIns.map((step, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm text-ink-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500 text-[10px] font-bold text-cream-50">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety note */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-forest-500 p-5 text-cream-50 shadow-soft">
          <ShieldIcon className="mt-0.5 h-6 w-6 shrink-0 text-mustard-200" />
          <div>
            <div className="font-display text-lg font-semibold">Why this is dog-safe</div>
            <p className="mt-1 font-sans text-sm text-cream-100/90">{recipe.safetyNote}</p>
          </div>
        </div>

        {/* Shopping list */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-ink-700">Shopping list</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {recipe.shoppingList.map((item) => (
              <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-600/10 bg-cream-100 px-4 py-3 font-sans text-sm text-ink-600">
                <input type="checkbox" className="peer sr-only" />
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-ink-600/20 text-cream-50 peer-checked:border-rust-500 peer-checked:bg-rust-500">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button to="/plan" variant="outline">
            ← Back to weekly plan
          </Button>
          <Button to="/onboarding">
            Personalize my own plan <ArrowIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* More recipes */}
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold text-ink-700">More from this week</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {otherRecipes.map((r) => (
              <Link key={r.id} to={`/recipe/${r.id}`} className="group rounded-2xl bg-cream-100 p-4 shadow-soft transition-transform hover:-translate-y-1">
                <div className="h-16 rounded-xl" style={{ background: `linear-gradient(135deg, ${r.palette[0]}, ${r.palette[1]})` }} />
                <div className="mt-3 font-sans text-xs font-bold uppercase tracking-wider text-forest-500">{r.day}</div>
                <div className="font-display text-base font-semibold text-ink-700 group-hover:text-rust-500">{r.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
