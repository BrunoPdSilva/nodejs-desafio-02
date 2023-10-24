import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealsNotFoundError } from "@/use-cases/errors"
import { FetchMeals } from "@/use-cases/meals/fetch-meals"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchUserMeals(req: FastifyRequest, res: FastifyReply) {
  try {
    const { sessionID, userID } = req.cookies

    const mealsRepository = new KnexMealsRepository()
    const useCase = new FetchMeals(mealsRepository)

    const { meals } = await useCase.execute(sessionID!, userID)

    return res.status(200).send({ meals })
  } catch (error) {
    if (error instanceof MealsNotFoundError) {
      res.status(404).send({ error: error.message })
    }

    throw error
  }
}
