import { TUsersRepository } from "@/repositories/users-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { GetUser } from "./get-user"
import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { UserNotFoundError } from "../errors"
import { randomUUID } from "node:crypto"

describe("Get User By ID [UNIT]", () => {
  let usersRepository: TUsersRepository
  let useCase: GetUser

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new GetUser(usersRepository)
  })

  it("should be able to retrieve a user by ID", async () => {
    const registerResponse = usersRepository.register({
      email: "test@example.com",
      name: "Test User",
      password: "test-password",
      session_id: randomUUID(),
    })

    const { user } = await useCase.execute((await registerResponse).id)

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "Test User",
        email: "test@example.com",
        session_id: expect.any(String),
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
