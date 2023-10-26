import { makeUserRegisterUseCase } from "@/use-cases/factories/make-register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from "crypto"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3),
    })

    const { name, email, password } = bodySchema.parse(req.body)
    const maxAge = 1000 * 60 * 60 * 24 * 30 // Cookie age 30 days

    let { sessionID } = req.cookies

    if (!sessionID) {
      sessionID = randomUUID()
      res.cookie("sessionID", sessionID, { path: "/", maxAge })
    }

    const useCase = makeUserRegisterUseCase()

    const { user } = await useCase.execute({
      name,
      email,
      password,
      session_id: sessionID,
    })

    let { user_id } = req.cookies

    if (!user_id) {
      const user_id = user.id
      const maxAge = 1000 * 60 * 60 * 24 * 7 // 7 days
      res.cookie("user_id", user_id, { path: "/", maxAge })
    }

    return res.status(201).send({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ error: "Informe nome e email corretamente." })
    }
    throw error
  }
}
