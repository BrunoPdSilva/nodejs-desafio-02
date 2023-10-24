import { FastifyReply, FastifyRequest } from "fastify"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { GetUser } from "@/use-cases/users/get-user"
import { UserNotFoundError } from "@/use-cases/errors"
import { z } from "zod"

export async function getUser(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const usersRepository = new KnexUsersRepository()
    const useCase = new GetUser(usersRepository)
    const { user } = await useCase.execute(id)

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
