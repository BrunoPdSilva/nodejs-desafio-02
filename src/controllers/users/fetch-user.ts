import { FastifyReply, FastifyRequest } from "fastify"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { FetchUser } from "@/use-cases/users/get-user"
import { UserNotFoundError } from "@/use-cases/errors"
import { z } from "zod"

export async function fetchUser(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const usersRepository = new KnexUsersRepository()
    const getUserService = new FetchUser(usersRepository)
    const user = await getUserService.getUserByID(id)

    return { user }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ error: "ID inválido.", issues: error.format() })
    }

    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
