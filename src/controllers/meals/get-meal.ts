import { FastifyReply, FastifyRequest } from "fastify"
import { makeGetMealByIdUseCase } from "@/use-cases/factories/make-get-meal-by-id-use-case"
import { MealNotFoundError } from "@/use-cases/errors"
import { z } from "zod"

export async function getMeal(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const useCase = makeGetMealByIdUseCase()
    const { meal } = await useCase.execute(id, req.user.sub)

    return res.status(200).send({ meal })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send("ID inválido.")
    }

    if (error instanceof MealNotFoundError) {
      res.status(404).send({ error: error.message })
    }

    throw error
  }
}
