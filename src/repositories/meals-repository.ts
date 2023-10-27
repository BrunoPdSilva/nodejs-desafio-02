import { Meal } from "@/@types/knex"

export type TMealCreation = {
  user_id: string
  name: string
  date: string
  time: string
  description?: string
  in_diet?: boolean
}

export type TUpdateMeal = {
  name?: string
  description?: string | null
  date?: string
  time?: string
  in_diet?: boolean
}

export type TMealsRepository = {
  registerMeal(data: TMealCreation): Promise<Meal>
  fetchMeals(userId: string): Promise<Meal[] | null>
  getMealById(mealId: string): Promise<Meal | null>
  updateMeal(mealId: string, data: TUpdateMeal): Promise<Meal>
  deleteMeal(mealId: string): Promise<void>
}
