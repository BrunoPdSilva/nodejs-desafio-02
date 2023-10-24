import { TMealsRepository } from "@/repositories/meals-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { RegisterMeal } from "./register-meal"
import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { randomUUID } from "node:crypto"

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
      user_session_id: randomUUID(),
      date_time: new Date().toISOString(),
    })

    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        user_id: null,
        user_session_id: expect.any(String),
        in_diet: false,
        date_time: expect.any(String),
      })
    )
  })
})
