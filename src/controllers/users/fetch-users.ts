import { FastifyReply, FastifyRequest } from "fastify"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { FetchUsers } from "@/use-cases/users/fetch-users"
import { UsersNotFoundError } from "@/use-cases/errors"

export async function fetchUsers(_: FastifyRequest, res: FastifyReply) {
  try {
    const usersRepository = new KnexUsersRepository()
    const FetchUsers = new FetchUsers(usersRepository)
    const users = await FetchUsers.fetchUsers()

    return { users }
  } catch (error) {
    if (error instanceof UsersNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
