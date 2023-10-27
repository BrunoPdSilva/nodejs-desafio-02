import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { DeleteMeal } from "./delete-meal"
import { it, describe, expect, beforeEach } from "vitest"
import { MealNotFoundError } from "../errors"

describe("Delete Meal [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: DeleteMeal

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new DeleteMeal(mealsRepository)
  })

  it("should be able to delete a meal", async () => {
    const meal = await mealsRepository.registerMeal({
      name: "Pastel",
      date: "2023-10-26",
      time: "12:00:00",
      user_id: "123",
    })

    await useCase.execute(meal.id)

    await expect(useCase.execute(meal.id)).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })

  it("should trigger an error if the meal doesn't exists", async () => {
    await expect(useCase.execute("123456")).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })
})
