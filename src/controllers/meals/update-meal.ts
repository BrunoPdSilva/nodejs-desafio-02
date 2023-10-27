import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealNotFoundError, MealNotUpdated } from "@/use-cases/errors"
import { UpdateMeal } from "@/use-cases/meals/update-meal"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date: z.string().optional(),
      time: z.string().optional(),
      in_diet: z.boolean().optional(),
    })

    const { id } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const mealsRepository = new KnexMealsRepository()
    const useCase = new UpdateMeal(mealsRepository)
    const { mealUpdated } = await useCase.execute(id, data)

    res.status(200).send({ mealUpdated })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send("Informe os dados da refeição corretamente.")
    }

    if (error instanceof MealNotFoundError) {
      res.status(404).send({ error: error.message })
    }

    if (error instanceof MealNotUpdated) {
      res.status(204).send({ error: error.message })
    }

    throw error
  }
}
