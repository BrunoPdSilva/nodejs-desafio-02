import { it, describe, expect, beforeEach } from "vitest"
import { TUsersRepository } from "@/repositories/users-repository"
import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { RegisterUser } from "./register-user"
import { randomUUID } from "crypto"
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
      session_id: randomUUID(),
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "test@example.com",
        name: "Test User",
        session_id: expect.any(String),
        created_at: expect.any(String),
      })
    )
  })

  it("should trigger an error if user already exists", async () => {
    await useCase.execute({
      email: "test@example.com",
      name: "Test User",
      password: "test-password",
      session_id: randomUUID(),
    })

    await expect(
      useCase.execute({
        email: "test@example.com",
        name: "Test User",
        password: "test-password",
        session_id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
