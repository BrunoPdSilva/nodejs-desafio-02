import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { FetchMeals } from "../meals/fetch-meals"

export function makeFetchMealsUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new FetchMeals(mealsRepository)
  return useCase
}
