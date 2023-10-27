import { randomUUID } from "node:crypto"
import { Meal } from "@/@types/knex"
import {
  TMealCreation,
  TMealsRepository,
  TUpdateMeal,
} from "../meals-repository"

export class InMemoryMealsRepository implements TMealsRepository {
  private meals: Meal[] = []

  async registerMeal(data: TMealCreation) {
    const meal: Meal = {
      ...data,
      id: randomUUID(),
      description: data.description ?? null,
      in_diet: data.in_diet ?? false,
    }

    this.meals.push(meal)

    return meal
  }

  async getMealById(mealId: string) {
    const meal = this.meals.find(meal => meal.id === mealId)
    return meal ?? null
  }

  async fetchMeals(userId: string) {
    const meals = this.meals.filter(meal => meal.user_id === userId)
    return meals.length > 0 ? meals : null
  }

  async updateMeal(mealId: string, data: TUpdateMeal) {
    const mealIndex = this.meals.findIndex(meal => meal.id === mealId)

    this.meals[mealIndex] = { ...this.meals[mealIndex], ...data }

    return this.meals[mealIndex]
  }

  async deleteMeal(mealId: string) {
    const mealIndex = this.meals.findIndex(meal => meal.id === mealId)
    this.meals.splice(mealIndex, 1)
  }
}
