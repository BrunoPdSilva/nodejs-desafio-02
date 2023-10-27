import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { DeleteMeal } from "../meals/delete-meal"

export function makeDeleteMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new DeleteMeal(mealsRepository)
  return useCase
}
