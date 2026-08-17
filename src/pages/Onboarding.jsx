import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext.jsx'
import Button from '../components/Button.jsx'
import { PawIcon, ArrowIcon, CheckIcon } from '../components/icons.jsx'

const dietaryOptions = ['Omnivore', 'Vegetarian-leaning', 'Low-carb', 'Dairy-free', 'Gluten-free']
const skillOptions = [
  { id: 'beginner', label: 'Kitchen newbie', body: 'Simple steps, minimal chopping' },
  { id: 'confident', label: 'Comfortable cook', body: 'Happy to follow a real recipe' },
  { id: 'chef', label: 'Could run a pop-up', body: 'Give me the full technique' },
]
const activityOptions = [
  { id: 'low', label: 'Low-key', body: 'Short walks, lots of naps' },
  { id: 'moderate', label: 'Everyday active', body: 'Daily walks, some play' },
  { id: 'high', label: 'High energy', body: 'Runs, hikes, never sits still' },
]
const allergyOptions = ['Chicken', 'Beef', 'Dairy', 'Grain', 'None known']
const avatarOptions = [
  { id: 'retriever', emoji: '🐕', label: 'Retriever type' },
  { id: 'terrier', emoji: '🐩', label: 'Terrier / curly' },
  { id: 'shepherd', emoji: '🐺', label: 'Shepherd type' },
  { id: 'smallbreed', emoji: '🐕‍🦺', label: 'Small breed' },
  { id: 'bulldog', emoji: '🐶', label: 'Bulldog type' },
  { id: 'mixed', emoji: '🦴', label: 'Happy mix' },
]

function toggleInArray(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 font-sans text-sm font-semibold transition-all ${
        selected
          ? 'border-rust-500 bg-rust-500 text-cream-50 shadow-soft'
          : 'border-ink-600/15 bg-cream-50 text-ink-600 hover:border-rust-300'
      }`}
    >
      {children}
    </button>
  )
}

function OptionCard({ selected, onClick, title, body }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
        selected ? 'border-rust-500 bg-rust-50 shadow-soft' : 'border-ink-600/10 bg-cream-50 hover:border-rust-200'
      }`}
    >
      {selected && (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-rust-500 text-cream-50">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
      )}
      <div className="font-display text-lg font-semibold text-ink-700">{title}</div>
      <div className="mt-1 font-sans text-sm text-ink-500">{body}</div>
    </button>
  )
}

const totalSteps = 6

export default function Onboarding() {
  const { data, updateOwner, updateDog, markComplete } = useOnboarding()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const next = () => setStep((s) => Math.min(totalSteps, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const finish = () => {
    markComplete()
    setLoading(true)
    setTimeout(() => navigate('/plan'), 1900)
  }

  const canAdvance = () => {
    if (step === 1) return data.owner.dietaryPrefs.length > 0
    if (step === 2) return !!data.owner.cookingSkill
    if (step === 3) return !!data.dog.name
    if (step === 4) return !!data.dog.breed && !!data.dog.weight
    if (step === 5) return !!data.dog.activityLevel
    return true
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-32 text-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-rust-500 shadow-lift">
          <PawIcon className="h-12 w-12 animate-wag text-cream-50" />
        </div>
        <h2 className="mt-8 font-display text-3xl font-semibold text-ink-700">
          Setting a place for {data.dog.name || 'them'} at your table…
        </h2>
        <p className="mt-3 font-sans text-ink-500">
          Building your week around {data.owner.dietaryPrefs.join(', ').toLowerCase() || 'your'} tastes, with a safe portion for a{' '}
          {data.dog.activityLevel || 'balanced'}-energy pup.
        </p>
        <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-ink-600/10">
          <div className="h-full w-full animate-[floatUp_1.8s_ease-in-out] bg-gradient-to-r from-rust-500 via-mustard-300 to-forest-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <div className="mb-10">
        <div className="flex items-center justify-between font-sans text-xs font-bold uppercase tracking-wider text-ink-400">
          <span>Step {step} of {totalSteps}</span>
          <span>{step <= 2 ? 'About you' : step <= 5 ? 'About your dog' : 'Ready'}</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-600/10">
          <div
            className="h-full rounded-full bg-rust-500 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div key={step} className="animate-floatUp">
        {step === 1 && (
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-700">What do you like to eat?</h1>
            <p className="mt-2 font-sans text-ink-500">Pick everything that fits — we'll build human portions around it.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {dietaryOptions.map((d) => (
                <Chip
                  key={d}
                  selected={data.owner.dietaryPrefs.includes(d)}
                  onClick={() => updateOwner({ dietaryPrefs: toggleInArray(data.owner.dietaryPrefs, d) })}
                >
                  {d}
                </Chip>
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold text-ink-700">How many are you feeding?</h2>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateOwner({ householdSize: Math.max(1, data.owner.householdSize - 1) })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-600/10 text-xl font-bold text-ink-600"
              >
                −
              </button>
              <span className="w-10 text-center font-display text-2xl font-semibold text-ink-700">{data.owner.householdSize}</span>
              <button
                type="button"
                onClick={() => updateOwner({ householdSize: data.owner.householdSize + 1 })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-600/10 text-xl font-bold text-ink-600"
              >
                +
              </button>
              <span className="font-sans text-sm text-ink-400">people at the table</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-700">How do you feel about cooking?</h1>
            <p className="mt-2 font-sans text-ink-500">Be honest — we'll match the instructions to it.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {skillOptions.map((o) => (
                <OptionCard
                  key={o.id}
                  title={o.label}
                  body={o.body}
                  selected={data.owner.cookingSkill === o.id}
                  onClick={() => updateOwner({ cookingSkill: o.id })}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-700">Now, who's joining you at the table?</h1>
            <p className="mt-2 font-sans text-ink-500">What's their name, and which look suits them best?</p>
            <input
              value={data.dog.name}
              onChange={(e) => updateDog({ name: e.target.value })}
              placeholder="e.g. Bramble"
              className="mt-6 w-full rounded-2xl border-2 border-ink-600/10 bg-cream-50 px-5 py-4 font-sans text-lg text-ink-700 outline-none transition-colors focus:border-rust-400"
            />
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {avatarOptions.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => updateDog({ avatar: a.id })}
                  className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-3 transition-all ${
                    data.dog.avatar === a.id ? 'border-rust-500 bg-rust-50 shadow-soft' : 'border-ink-600/10 bg-cream-50'
                  }`}
                >
                  <span className="text-3xl">{a.emoji}</span>
                  <span className="text-center font-sans text-[11px] font-semibold text-ink-500">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-700">
              A little more about {data.dog.name || 'them'}.
            </h1>
            <p className="mt-2 font-sans text-ink-500">This helps us get portions right, down to the gram.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="font-sans text-sm font-semibold text-ink-600">Breed (or best guess)</span>
                <input
                  value={data.dog.breed}
                  onChange={(e) => updateDog({ breed: e.target.value })}
                  placeholder="e.g. Labrador mix"
                  className="mt-2 w-full rounded-xl border-2 border-ink-600/10 bg-cream-50 px-4 py-3 font-sans text-ink-700 outline-none focus:border-rust-400"
                />
              </label>
              <label className="block">
                <span className="font-sans text-sm font-semibold text-ink-600">Weight (lbs)</span>
                <input
                  type="number"
                  value={data.dog.weight}
                  onChange={(e) => updateDog({ weight: e.target.value })}
                  placeholder="e.g. 52"
                  className="mt-2 w-full rounded-xl border-2 border-ink-600/10 bg-cream-50 px-4 py-3 font-sans text-ink-700 outline-none focus:border-rust-400"
                />
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-700">How active are they?</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {activityOptions.map((o) => (
                <OptionCard
                  key={o.id}
                  title={o.label}
                  body={o.body}
                  selected={data.dog.activityLevel === o.id}
                  onClick={() => updateDog({ activityLevel: o.id })}
                />
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold text-ink-700">Any known sensitivities?</h2>
            <p className="mt-1 font-sans text-sm text-ink-500">We'll keep these out of every dog portion.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {allergyOptions.map((a) => (
                <Chip
                  key={a}
                  selected={data.dog.allergies.includes(a)}
                  onClick={() => updateDog({ allergies: toggleInArray(data.dog.allergies, a) })}
                >
                  {a}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-500 text-cream-50 shadow-soft">
              <PawIcon className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-ink-700">
              Ready to plan your week — together?
            </h1>
            <p className="mx-auto mt-2 max-w-sm font-sans text-ink-500">
              We've got everything we need — dinner for {data.owner.householdSize} at
              your table, with {data.dog.name || 'your dog'} eating safely alongside you.
            </p>
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-ink-600/10 bg-cream-100 p-5 text-left font-sans text-sm text-ink-500">
              <div className="flex justify-between py-1"><span>Household</span><span className="font-semibold text-ink-700">{data.owner.householdSize} people</span></div>
              <div className="flex justify-between py-1"><span>Cooking level</span><span className="font-semibold capitalize text-ink-700">{data.owner.cookingSkill}</span></div>
              <div className="flex justify-between py-1"><span>Dog</span><span className="font-semibold text-ink-700">{data.dog.name}, {data.dog.weight}lb</span></div>
              <div className="flex justify-between py-1"><span>Sensitivities</span><span className="font-semibold text-ink-700">{data.dog.allergies.join(', ') || 'None known'}</span></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 1}>
          Back
        </Button>
        {step < totalSteps ? (
          <Button onClick={next} disabled={!canAdvance()}>
            Continue <ArrowIcon className="h-5 w-5" />
          </Button>
        ) : (
          <Button onClick={finish}>
            Build my plan <ArrowIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
