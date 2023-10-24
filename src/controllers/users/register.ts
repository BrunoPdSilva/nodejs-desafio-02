import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from "crypto"
import { z } from "zod"
import { RegisterUser } from "@/use-cases/users/register-user"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({ name: z.string(), email: z.string().email() })
    const { name, email } = bodySchema.parse(req.body)
    const maxAge = 1000 * 60 * 60 * 24 * 30 // Cookie age 30 days
    const id = randomUUID()
    let { sessionID } = req.cookies

    if (!sessionID) {
      sessionID = randomUUID()
      res.cookie("sessionID", sessionID, { path: "/", maxAge })
    }

    const usersRepository = new KnexUsersRepository()
    const useCase = new RegisterUser(usersRepository)

    const { user } = await useCase.execute({
      name,
      email,
      session_id: sessionID,
    })

    res.cookie("userID", id, { path: "/", maxAge })

    return res.status(201).send({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ error: "Informe nome e email corretamente." })
    }
    throw error
  }

  res.status(201).send()
}
