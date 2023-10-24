import { TMealsRepository } from "@/repositories/meals-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { UpdateMeal } from "./update-meal"
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
      name: "Test 1",
      user_session_id: "123456",
      date_time: new Date().toISOString(),
    })

    const { mealUpdated } = await useCase.execute(meal.id, {
      name: "Test 2",
    })

    expect(mealUpdated.name).toEqual("Test 2")
  })

  it("should trigger an error if meal is not found", async () => {
    await expect(
      useCase.execute("123", { name: "Test 3" })
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
