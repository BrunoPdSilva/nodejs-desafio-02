import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { GetMealById } from "./get-meal-by-id"
import { it, describe, expect, beforeEach } from "vitest"
import { MealNotFoundError } from "../errors"

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
      date: "2023-10-27",
      time: "10:23:57",
      user_id: "123",
    })

    const { meal } = await useCase.execute(registeredMeal.id)

    expect(meal).toEqual(
      expect.objectContaining({
        name: "Pastel",
        date: "2023-10-27",
        time: "10:23:57",
        user_id: "123",
      })
    )
  })

  it("should trigger an error if the meal is not found", async () => {
    await expect(useCase.execute("123456")).rejects.toBeInstanceOf(
      MealNotFoundError
    )
  })
})
