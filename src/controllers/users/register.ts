import { makeRegisterUserUseCase } from "@/use-cases/factories/make-register-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3),
    })

    const { name, email, password } = bodySchema.parse(req.body)

    const useCase = makeRegisterUserUseCase()

    const { user } = await useCase.execute({ name, email, password })

    return res.status(201).send({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: "Dados inválidos para cadastro." })
    }

    throw error
  }
}
