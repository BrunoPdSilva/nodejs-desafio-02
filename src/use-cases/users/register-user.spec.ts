import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { TUsersRepository } from "@/repositories/users-repository"
import { RegisterUser } from "./register-user"
import { it, describe, expect, beforeEach } from "vitest"
import { EmailAlreadyExistsError } from "../errors"

describe("Register User [UNIT]", () => {
  let usersRepository: TUsersRepository
  let useCase: RegisterUser

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new RegisterUser(usersRepository)
  })

  it("should be able to register a user", async () => {
    const { user } = await useCase.execute({
      email: "test@example.com",
      name: "Test User",
      password: "test-password",
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "test@example.com",
        name: "Test User",
        created_at: expect.any(String),
      })
    )
  })

  it("should trigger an error if user already exists", async () => {
    await useCase.execute({
      email: "test@example.com",
      name: "Test User",
      password: "test-password",
    })

    await expect(
      useCase.execute({
        email: "test@example.com",
        name: "Test User",
        password: "test-password",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
