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
      date: "2023-10-27",
      time: "10:23:57",
      user_id: "123",
    })

    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date: "2023-10-27",
        time: "10:23:57",
        in_diet: false,
        user_id: "123",
      })
    )
  })
})
