import { FastifyReply, FastifyRequest } from "fastify"
import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { FetchMeals } from "@/use-cases/meals/fetch-meals"
import { MealNotFoundError } from "@/use-cases/errors"
import { z } from "zod"

export async function fetchMealByID(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const mealsRepository = new KnexMealsRepository()
    const findMeal = new FetchMeals(mealsRepository)
    const meal = await findMeal.fetchMealByID(id)

    return { meal }
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
