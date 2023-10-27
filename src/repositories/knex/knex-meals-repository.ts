import { knex } from "@/lib/knex"
import { randomUUID } from "node:crypto"
import { Meal } from "@/@types/knex"
import {
  TMealCreation,
  TMealsRepository,
  TUpdateMeal,
} from "../meals-repository"

export class KnexMealsRepository implements TMealsRepository {
  async registerMeal(data: TMealCreation) {
    const meal: Meal = {
      ...data,
      id: randomUUID(),
      description: data.description ?? null,
      in_diet: data.in_diet ?? false,
    }

    await knex("meals").insert(meal)

    return meal
  }

  async fetchMeals(userId: string): Promise<Meal[] | null> {
    const meals = await knex("meals").where("user_id", userId)

    return meals.length > 0 ? meals : null
  }

  async getMealById(mealId: string) {
    const meal = await knex("meals").where("id", mealId).first()
    return meal ?? null
  }

  async updateMeal(mealId: string, data: TUpdateMeal) {
    await knex("meals").where("id", mealId).update(data)
    const meal = await knex("meals").where("id", mealId).first()
    return meal!
  }

  async deleteMeal(mealId: string) {
    await knex("meals").where("id", mealId).del()
  }
}
