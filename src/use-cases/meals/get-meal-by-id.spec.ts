import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { GetMealById } from "./get-meal-by-id"
import { it, describe, expect, beforeEach } from "vitest"
import { MealNotFoundError, UnauthorizedAccessError } from "../errors"

describe("Get Meal By ID [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: GetMealById

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new GetMealById(mealsRepository)
  })

  it("should be able to get a meal by ID.", async () => {
    const registeredMeal = await mealsRepository.registerMeal({
      name: "Pastel",
      date_time: new Date(2023, 10, 26, 14, 2, 1),
      user_id: "123",
    })

    const { meal } = await useCase.execute(registeredMeal.id, "123")

    expect(meal).toEqual(
      expect.objectContaining({
        name: "Pastel",
        date_time: expect.any(String),
        user_id: "123",
      })
    )
  })

  it("should trigger an error if the meal is not found", async () => {
    await expect(useCase.execute("123456", "123")).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })

  it("should trigger an error if the user is trying to access other users meals.", async () => {
    const registeredMeal = await mealsRepository.registerMeal({
      name: "Pastel",
      date_time: new Date(2023, 10, 26, 14, 2, 1),
      user_id: "123",
    })

    await expect(
      useCase.execute(registeredMeal.id, "127")
    ).rejects.toBeInstanceOf(UnauthorizedAccessError)
  })
})
