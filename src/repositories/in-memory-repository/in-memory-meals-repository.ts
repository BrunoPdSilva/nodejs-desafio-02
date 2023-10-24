import { randomUUID } from "node:crypto"
import { Meal, MealCreation, TMealsRepository } from "../meals-repository"

export class InMemoryMealsRepository implements TMealsRepository {
  private meals: Meal[] = []

  async getMealById(id: string) {
    const meal = this.meals.find(meal => meal.id === id)
    return meal ? meal : null
  }

  async fetchMeals(sessionID: string, id = "") {
    const meals = this.meals.filter(
      meal => meal.user_id === id || meal.user_session_id === sessionID
    )
    return meals.length > 0 ? meals : null
  }

  async registerMeal(data: MealCreation) {
    const meal: Meal = {
      id: randomUUID(),
      user_id: data.user_id ?? null,
      description: data.description ?? null,
      in_diet: data.in_diet ?? false,
      ...data,
    }

    this.meals.push(meal)

    return meal
  }

  async updateMeal(id: string, data: Partial<Meal>) {
    const mealIndex = this.meals.findIndex(meal => meal.id === id)

    this.meals[mealIndex] = { ...this.meals[mealIndex], ...data }

    return this.meals[mealIndex]
  }

  async deleteMeal(id: string) {
    const mealIndex = this.meals.findIndex(meal => meal.id === id)
    this.meals.splice(mealIndex, 1)
  }
}
