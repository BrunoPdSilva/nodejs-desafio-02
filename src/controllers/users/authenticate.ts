import { InvalidCredentialsError } from "@/use-cases/errors"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  try {
    const authenticateSchema = z.object({
      email: z.string().email(),
      password: z.string().min(3),
    })

    const { email, password } = authenticateSchema.parse(req.body)
    const useCase = makeAuthenticateUseCase()
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
