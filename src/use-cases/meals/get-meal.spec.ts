import { TMealsRepository } from "@/repositories/meals-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { GetMealById } from "./get-meal-by-id"
import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { MealNotFoundError } from "../errors"

describe("Get Meal By ID [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: GetMealById

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new GetMealById(mealsRepository)
  })

  it("should be able to get a meal by ID.", async () => {
    const registerResponse = await mealsRepository.registerMeal({
      name: "Pastel",
      user_id: "123",
      user_session_id: "456",
    })

    const { meal } = await useCase.execute(registerResponse.id)

    expect(meal).toEqual(
      expect.objectContaining({
        name: "Pastel",
        user_id: "123",
        user_session_id: "456",
      })
    )
  })

  it("should trigger an error if the meal is not found", async () => {
    await expect(useCase.execute("123456")).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })
})
