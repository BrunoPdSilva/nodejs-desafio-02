import { TMealsRepository } from "@/repositories/meals-repository"
import { TUsersRepository } from "@/repositories/users-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { GetUserMetrics } from "./get-user-metrics"
import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { InMemoryMealsRepository } from "@/repositories/in-memory-repository/in-memory-meals-repository"
import { hash } from "bcryptjs"
import { MealsNotFoundError, UserNotFoundError } from "../errors"

describe("Metrics [UNIT]", () => {
  let usersRepository: TUsersRepository
  let mealsRepository: TMealsRepository
  let useCase: GetUserMetrics

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    useCase = new GetUserMetrics(usersRepository, mealsRepository)
  })

  it("should be able to get user metrics", async () => {
    const { id } = await usersRepository.register({
      name: "Bruno Peres",
      email: "bruno@peres.com",
      password_hash: await hash("1234", 6),
    })

    await mealsRepository.registerMeal({
      user_id: id,
      name: "Pastel",
      description: "Pastel da feira de domingo.",
      date_time: new Date(2023, 10, 18, 17, 8, 1),
      in_diet: false,
    })

    await mealsRepository.registerMeal({
      user_id: id,
      name: "Pizza",
      description: "Pizza de calabresa.",
      date_time: new Date(2023, 10, 29, 19, 3, 1),
      in_diet: false,
    })

    await mealsRepository.registerMeal({
      user_id: id,
      name: "Salada",
      date_time: new Date(2023, 10, 27, 12, 23, 0),
      in_diet: true,
    })

    const metrics = await useCase.execute(id)

    expect(metrics).toEqual(
      expect.objectContaining({
        mealsRegistered: 3,
        inDiet: 1,
        notInDiet: 2,
        mealStreak: 1,
      })
    )
  })

  it("should trigger an error if user doesn't exists", async () => {
    await expect(useCase.execute("1478")).rejects.toBeInstanceOf(
      UserNotFoundError
    )
  })

  it("should trigger an error if there is no meals registered", async () => {
    const { id } = await usersRepository.register({
      name: "Bruno Peres",
      email: "bruno@peres.com",
      password_hash: await hash("1234", 6),
    })

    await expect(useCase.execute(id)).rejects.toBeInstanceOf(MealsNotFoundError)
  })
})
