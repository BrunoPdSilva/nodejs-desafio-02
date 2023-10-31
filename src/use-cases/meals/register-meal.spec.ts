import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { RegisterMeal } from "./register-meal"
import { it, describe, expect, beforeEach } from "vitest"

describe("Register Meal [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: RegisterMeal

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new RegisterMeal(mealsRepository)
  })

  it("should be able to register a meal", async () => {
    const { meal } = await useCase.execute({
      name: "Pastel",
      description: "Pastel da feira de domingo.",
      date_time: new Date(2023, 10, 31, 13, 0, 1),
      user_id: "123",
    })

    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date_time: expect.any(String),
        in_diet: false,
        user_id: "123",
      })
    )
  })
})
