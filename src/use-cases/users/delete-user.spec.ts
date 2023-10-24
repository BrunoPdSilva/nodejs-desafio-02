import { TUsersRepository } from "@/repositories/users-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { DeleteUser } from "./delete-user"
import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { UserNotFoundError } from "../errors"
import { randomUUID } from "node:crypto"

describe("Delete User [UNIT]", () => {
  let usersRepository: TUsersRepository
  let useCase: DeleteUser

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new DeleteUser(usersRepository)
  })

  it("should be able to delete a user", async () => {
    const user = await usersRepository.register({
      email: "test@example.com",
      name: "Test User",
      session_id: randomUUID(),
    })

    await useCase.execute(user.id)

    await expect(useCase.execute(user.id)).rejects.toBeInstanceOf(
      UserNotFoundError
    )
  })

  it("should trigger an error if user doesn't exists", async () => {
    await expect(useCase.execute("123456")).rejects.toBeInstanceOf(
      UserNotFoundError
    )
  })
})
