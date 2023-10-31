import { Meal } from "@/@types/knex"

export function getBetterSequence(array: Meal[]) {
  let maxStreak = 0
  let currentStreak = 0

  array.forEach(meal => {
    if (Boolean(meal.in_diet)) currentStreak += 1
    if (!Boolean(meal.in_diet)) currentStreak = 0
    if (currentStreak > maxStreak) maxStreak = currentStreak
  })

  return maxStreak
}
