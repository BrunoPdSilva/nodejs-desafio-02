import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { UpdateMeal } from "./update-meal"
import { it, describe, expect, beforeEach } from "vitest"
import { MealNotFoundError, UnauthorizedAccessError } from "../errors"

describe("Update Meal [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: UpdateMeal

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new UpdateMeal(mealsRepository)
  })

  it("should be able to update a meal", async () => {
    const meal = await mealsRepository.registerMeal({
      name: "Pastel",
      date_time: new Date(2023, 10, 31, 13, 0, 1),
      user_id: "123",
    })

    const { mealUpdated } = await useCase.execute(
      meal.id,
      {
        name: "Pastel Especial",
      },
      "123"
    )

    expect(mealUpdated.name).toEqual("Pastel Especial")
  })

  it("should trigger an error if the user is trying to update another user meal", async () => {
    const registeredMeal = await mealsRepository.registerMeal({
      name: "Pastel",
      date_time: new Date(2023, 10, 31, 13, 0, 1),
      user_id: "123",
    })

    await expect(
      useCase.execute(registeredMeal.id, { name: "Pizza" }, "124")
    ).rejects.toBeInstanceOf(UnauthorizedAccessError)
  })

  it("should trigger an error if meal is not found", async () => {
    await expect(
      useCase.execute("321", { name: "Test 3" }, "123")
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
