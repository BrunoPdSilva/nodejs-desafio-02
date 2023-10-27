import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { UpdateMeal } from "./update-meal"
import { it, describe, expect, beforeEach } from "vitest"
import { MealNotFoundError } from "../errors"

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
      date: "2023-10-27",
      time: "10:23:57",
      user_id: "123",
    })

    const { mealUpdated } = await useCase.execute(meal.id, {
      name: "Pastel Especial",
    })

    expect(mealUpdated.name).toEqual("Pastel Especial")
  })

  it("should trigger an error if meal is not found", async () => {
    await expect(
      useCase.execute("123", { name: "Test 3" })
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
