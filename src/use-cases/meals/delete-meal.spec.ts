import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { DeleteMeal } from "./delete-meal"
import { it, describe, expect, beforeEach } from "vitest"
import { MealNotFoundError, UnauthorizedAccessError } from "../errors"

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
      date_time: new Date(2023, 10, 31, 13, 0, 1),
      user_id: "123",
    })

    await useCase.execute(meal.id, "123")

    await expect(useCase.execute(meal.id, "123")).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })

  it("should trigger an error if the user trying to delete a meal isn't the owner", async () => {
    const meal = await mealsRepository.registerMeal({
      name: "Pastel",
      date_time: new Date(2023, 10, 31, 13, 0, 1),
      user_id: "123",
    })

    await expect(useCase.execute(meal.id, "126")).rejects.toBeInstanceOf(
      UnauthorizedAccessError
    )
  })

  it("should trigger an error if the meal doesn't exists", async () => {
    await expect(useCase.execute("123456", "123")).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })
})
