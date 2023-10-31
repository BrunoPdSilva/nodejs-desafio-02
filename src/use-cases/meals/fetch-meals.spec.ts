import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { TMealsRepository } from "@/repositories/meals-repository"
import { FetchMeals } from "./fetch-meals"
import { it, describe, expect, beforeEach } from "vitest"
import { MealsNotFoundError } from "../errors"

describe("Fetch Meals [UNIT]", () => {
  let mealsRepository: TMealsRepository
  let useCase: FetchMeals

  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    useCase = new FetchMeals(mealsRepository)
  })

  it("should be able to fetch user meals.", async () => {
    await mealsRepository.registerMeal({
      name: "Pizza de Calabresa",
      date_time: new Date(2023, 10, 28, 17, 2, 1),
      user_id: "9487",
    })

    await mealsRepository.registerMeal({
      name: "Pastel",
      description: "Pastel da feira de domingo.",
      date_time: new Date(2023, 10, 27, 17, 2, 1),
      user_id: "9487",
    })

    const { meals } = await useCase.execute("9487")

    expect(meals).toEqual([
      expect.objectContaining({ name: "Pizza de Calabresa" }),
      expect.objectContaining({ name: "Pastel" }),
    ])
  })

  it("should trigger an error if there is no meals found.", async () => {
    await expect(useCase.execute("2849")).rejects.toBeInstanceOf(
      MealsNotFoundError
    )
  })
})
