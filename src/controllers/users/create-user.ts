import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { RegisterUser } from "@/use-cases/users/register-user"
import { FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from "crypto"
import { z } from "zod"

export async function RegisterUser(req: FastifyRequest, res: FastifyReply) {
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
    const RegisterUser = new RegisterUser(usersRepository)

    await RegisterUser.create({ id, name, email, session_id: sessionID })

    res.cookie("userID", id, { path: "/", maxAge })
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
