import { TMealsRepository } from "@/repositories/meals-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { FetchMeals } from "./fetch-meals"
import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { MealsNotFoundError } from "../errors"

describe("Fetch Meals [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: FetchMeals

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new FetchMeals(mealsRepository)
  })

  it("should be able to fetch meals by id or session id", async () => {
    await mealsRepository.registerMeal({
      name: "Pastel",
      user_id: "3945",
      user_session_id: "2849",
      date_time: new Date().toISOString(),
    })

    await mealsRepository.registerMeal({
      name: "Pizza",
      user_id: "3945",
      user_session_id: "2843",
      date_time: new Date().toISOString(),
    })

    const { meals } = await useCase.execute("2849", "3945")

    expect(meals).toEqual([
      expect.objectContaining({ name: "Pastel" }),
      expect.objectContaining({ name: "Pizza" }),
    ])
  })

  it("should be able to fetch meals by session id", async () => {
    await mealsRepository.registerMeal({
      name: "Pastel",
      user_session_id: "2849",
      date_time: new Date().toISOString(),
    })

    await mealsRepository.registerMeal({
      name: "Pizza",
      user_session_id: "2843",
      date_time: new Date().toISOString(),
    })

    const { meals } = await useCase.execute("2849")

    expect(meals).toEqual([expect.objectContaining({ name: "Pastel" })])
  })

  it("should trigger an error if there is no meals found.", async () => {
    await expect(useCase.execute("2849")).rejects.toBeInstanceOf(
      MealsNotFoundError
    )
  })
})
