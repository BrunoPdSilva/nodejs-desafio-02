import { TUsersRepository } from "@/repositories/users-repository"
import { it, describe, expect, beforeEach } from "vitest"
import { FetchUsers } from "./fetch-users"
import { InMemoryUsersRepository } from "@/repositories/in-memory-repository/in-memory-users-repository"
import { UsersNotFoundError } from "../errors"
import { randomUUID } from "node:crypto"

describe("Fetch Users [UNIT]", () => {
  let usersRepository: TUsersRepository
  let useCase: FetchUsers

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new FetchUsers(usersRepository)
  })

  it("should be able to fetch users", async () => {
    await usersRepository.register({
      name: "User 1",
      email: "user1@gmail.com",
      session_id: randomUUID(),
    })

    await usersRepository.register({
      name: "User 2",
      email: "user2@gmail.com",
      session_id: randomUUID(),
    })

    const { users } = await useCase.execute()

    expect(users).toEqual([
      expect.objectContaining({
        name: "User 1",
        email: "user1@gmail.com",
      }),
      expect.objectContaining({
        name: "User 2",
        email: "user2@gmail.com",
      }),
    ])
  })

  it("should trigger an error if the list is empty", async () => {
    await expect(useCase.execute()).rejects.toBeInstanceOf(UsersNotFoundError)
  })
})
