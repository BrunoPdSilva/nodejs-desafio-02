import { knex } from "@/lib/knex"
import { Meal, MealCreation, TMealsRepository } from "../meals-repository"
import { randomUUID } from "node:crypto"

export class KnexMealsRepository implements TMealsRepository {
  async registerMeal(data: MealCreation) {
    const meal: Meal = {
      id: randomUUID(),
      user_id: data.user_id ?? null,
      description: data.description ?? null,
      in_diet: data.in_diet ?? false,
      ...data,
    }

    await knex("meals").insert(meal)

    return meal
  }

  async fetchMeals(sessionID: string, id = ""): Promise<Meal[] | null> {
    const meals = await knex("meals").where(function (this: any) {
      this.where("user_id", id).orWhere("user_session_id", sessionID)
    })

    return meals.length > 0 ? meals : null
  }

  async getMealById(id: string) {
    const meal = await knex("meals").where("id", id).first()
    return meal ? meal : null
  }

  async updateMeal(id: string, data: Partial<Meal>) {
    await knex("meals").where("id", id).update(data)
    const meal = await knex("meals").where("id", id).first()
    return meal!
  }

  async deleteMeal(id: string) {
    await knex("meals").where("id", id).del()
  }
}
