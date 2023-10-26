import { makeRegisterMealUseCase } from "@/use-cases/factories/make-register-meal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from "crypto"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({
      name: z.string(),
      date_time: z.string(),
      description: z.string().optional(),
      in_diet: z.boolean().optional(),
    })

    const data = bodySchema.parse(req.body)

    let { sessionID } = req.cookies

    if (!sessionID) {
      sessionID = randomUUID()
      const maxAge = 1000 * 60 * 60 * 24 * 7 // 7 days
      res.cookie("sessionID", sessionID, { path: "/", maxAge })
    }

    const useCase = makeRegisterMealUseCase()

    const { user_id } = req.cookies

    const { meal } = await useCase.execute({
      ...data,
      user_id: user_id ?? undefined,
      user_session_id: sessionID,
    })

    return res.status(201).send({ meal })
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return res.status(400).send({
        error: "Informe os dados da refeição corretamente.",
        issues: error.format(),
      })
    }

    throw error
  }
}
