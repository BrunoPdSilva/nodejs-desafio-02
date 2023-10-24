import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealNotFoundError } from "@/use-cases/errors"
import { DeleteMeal } from "@/use-cases/meals/delete-meal"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteMeal(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const mealsRepository = new KnexMealsRepository()
    const useCase = new DeleteMeal(mealsRepository)

    await useCase.execute(id)

    return res.status(204).send()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send("ID inválido.")
    }

    if (error instanceof MealNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
