import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { InvalidCredentialsError } from "@/use-cases/errors"
import { AuthenticateUser } from "@/use-cases/users/authenticate-user"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  try {
    const authenticateSchema = z.object({
      email: z.string().email(),
      password: z.string().min(3),
    })

    const { email, password } = authenticateSchema.parse(req.body)

    const usersRepository = new KnexUsersRepository()
    const useCase = new AuthenticateUser(usersRepository)

    const { user } = await useCase.execute(email, password)

    const token = await res.jwtSign({}, { sign: { sub: user.id } })

    return res.status(200).send({ token })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).send({
        error:
          "Erro de validação: Certifique-se de que o email seja válido e a senha tenha pelo menos 3 caracteres.",
      })
    }

    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ error: err.message })
    }

    throw err
  }
}
