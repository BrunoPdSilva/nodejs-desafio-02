import { FastifyReply, FastifyRequest } from "fastify"
import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealNotFoundError } from "@/use-cases/errors"
import { z } from "zod"
import { GetMealById } from "@/use-cases/meals/get-meal-by-id"

export async function getMeal(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const mealsRepository = new KnexMealsRepository()
    const useCase = new GetMealById(mealsRepository)
    const { meal } = await useCase.execute(id)

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
