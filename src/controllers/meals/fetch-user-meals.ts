import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealsNotFoundError } from "@/use-cases/errors"
import { makeFetchMealsUseCase } from "@/use-cases/factories/make-fetch-meals-use-case"
import { FetchMeals } from "@/use-cases/meals/fetch-meals"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchUserMeals(req: FastifyRequest, res: FastifyReply) {
  try {
    const useCase = makeFetchMealsUseCase()

    const { meals } = await useCase.execute(req.user.sub)

    return res.status(200).send({ meals })
  } catch (error) {
    if (error instanceof MealsNotFoundError) {
      res.status(404).send({ error: error.message })
    }

    throw error
  }
}
