import { TUsersRepository } from "@/repositories/users-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { AuthenticateUser } from "./authenticate-user"
import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "../errors"

describe("Authenticate User [UNIT]", () => {
  let usersRepository: TUsersRepository
  let useCase: AuthenticateUser

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new AuthenticateUser(usersRepository)
  })

  it("should be able to authenticate", async () => {
    await usersRepository.register({
      name: "Test User",
      email: "test@example",
      password: await hash("4789", 6),
      session_id: "123456",
    })

    const { user } = await useCase.execute("test@example", "4789")

    expect(user.id).toEqual(expect.any(String))
  })

  it("should trigger an error if user doesn't exist", async () => {
    await expect(
      useCase.execute("test@example", "4789")
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should trigger an error if credentials doesn't match", async () => {
    await usersRepository.register({
      name: "Test User",
      email: "test@example",
      password: await hash("4789", 6),
      session_id: "123456",
    })

    await expect(useCase.execute("test@example", "489")).rejects.toBeInstanceOf(
      InvalidCredentialsError
    )
  })
})
