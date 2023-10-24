import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealsNotFoundError } from "@/use-cases/errors"
import { FetchMeals } from "@/use-cases/meals/fetch-meals"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchUserMeals(req: FastifyRequest, res: FastifyReply) {
  try {
    const { sessionID = "", userID = "" } = req.cookies

    const mealsRepository = new KnexMealsRepository()
    const FetchMeals = new FetchMeals(mealsRepository)

    const meals = await FetchMeals.fetchMeals(sessionID, userID)

    return { meals }
  } catch (error) {
    if (error instanceof MealsNotFoundError) {
      res.status(404).send({ error: error.message })
    }

    throw error
  }
}
