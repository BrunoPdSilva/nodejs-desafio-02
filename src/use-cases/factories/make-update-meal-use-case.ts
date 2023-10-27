import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { UpdateMeal } from "../meals/update-meal"

export function makeUpdateMealMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new UpdateMeal(mealsRepository)
  return useCase
}
