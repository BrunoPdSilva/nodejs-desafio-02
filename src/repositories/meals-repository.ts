export type Meal = {
  id: string
  user_id: string | null
  user_session_id: string
  name: string
  description: string | null
  in_diet: boolean
  date_time: string
}

export type MealCreation = {
  name: string
  user_session_id: string
  description?: string
  user_id?: string
  in_diet?: boolean
}

export type TMealsRepository = {
  getMealById(id: string): Promise<Meal | null>
  fetchMeals(sessionID: string, id?: string): Promise<Meal[] | null>
  registerMeal(data: MealCreation): Promise<Meal>
  updateMeal(id: string, data: Partial<Meal>): Promise<Meal>
  deleteMeal(id: string): Promise<void>
}
