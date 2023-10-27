import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { GetMealById } from "../meals/get-meal-by-id"

export function makeGetMealByIdUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new GetMealById(mealsRepository)
  return useCase
}
