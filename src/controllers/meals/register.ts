import { makeRegisterMealUseCase } from "@/use-cases/factories/make-register-meal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({
      name: z.string(),
      date_time: z.coerce.date(),
      description: z.string().optional(),
      in_diet: z.boolean().optional(),
    })

    const data = bodySchema.parse(req.body)

    const useCase = makeRegisterMealUseCase()

    const { meal } = await useCase.execute({ ...data, user_id: req.user.sub })

    return res.status(201).send({ meal })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        error: "Informe os dados da refeição corretamente.",
        issues: error.format(),
      })
    }

    throw error
  }
}
