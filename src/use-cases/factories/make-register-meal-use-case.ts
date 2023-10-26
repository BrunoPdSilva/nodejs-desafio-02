import { RegisterMeal } from "../meals/register-meal"
import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"

export function makeRegisterMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new RegisterMeal(mealsRepository)
  return useCase
}
