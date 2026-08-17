import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'two-bowls-onboarding'

const defaultData = {
  owner: {
    dietaryPrefs: [],
    cookingSkill: '',
    householdSize: 2,
  },
  dog: {
    name: '',
    breed: '',
    weight: '',
    activityLevel: '',
    allergies: [],
    avatar: 'retriever',
  },
  completed: false,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    return { ...defaultData, ...JSON.parse(raw) }
  } catch {
    return defaultData
  }
}

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateOwner = (patch) => setData((d) => ({ ...d, owner: { ...d.owner, ...patch } }))
  const updateDog = (patch) => setData((d) => ({ ...d, dog: { ...d.dog, ...patch } }))
  const markComplete = () => setData((d) => ({ ...d, completed: true }))
  const reset = () => setData(defaultData)

  return (
    <OnboardingContext.Provider value={{ data, updateOwner, updateDog, markComplete, reset }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
