import { recipes } from '../data/recipes.js'

const activityMultiplier = {
  low: 1.2,
  moderate: 1.4,
  high: 1.7,
}

export function dogDailyGrams(weightLbs, activityLevel) {
  const w = Number(weightLbs) || 30
  const kg = w / 2.205
  const rer = 70 * Math.pow(kg, 0.75)
  const mult = activityMultiplier[activityLevel] || 1.4
  const kcal = rer * mult
  const gramsPerKcal = 1.1
  return Math.round(kcal * gramsPerKcal * 0.01) * 10
}

export function buildWeeklyPlan({ owner, dog }) {
  const dailyGrams = dogDailyGrams(dog.weight, dog.activityLevel)
  const householdScale = Math.max(1, Number(owner.householdSize) || 2) / 2

  return recipes.map((recipe) => ({
    ...recipe,
    dogGrams: Math.round((dailyGrams * (recipe.portionSplit.dog / 100)) / 10) * 10,
    humanServings: Math.max(1, Math.round(recipe.servings.human * householdScale)),
  }))
}
