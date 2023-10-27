import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { TUsersRepository } from "@/repositories/users-repository"
import { Profile } from "./user-profile"
import { it, describe, expect, beforeEach } from "vitest"
import { UserNotFoundError } from "../errors"

describe("User Profile [UNIT]", () => {
  let usersRepository: TUsersRepository
  let useCase: Profile

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new Profile(usersRepository)
  })

  it("should be able to retrieve a user by ID", async () => {
    const userRegistered = await usersRepository.register({
      email: "test@example.com",
      name: "Test User",
      password: "test-password",
    })

    const { user } = await useCase.execute(userRegistered.id)

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "Test User",
        email: "test@example.com",
        created_at: expect.any(String),
      })
    )
  })

  it("should trigger an error if the user does not exist", async () => {
    await expect(useCase.execute("123456")).rejects.toBeInstanceOf(
      UserNotFoundError
    )
  })
})
