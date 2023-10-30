import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { MealsNotFoundError, UserNotFoundError } from "@/use-cases/errors"
import { GetUserMetrics } from "@/use-cases/users/get-user-metrics"
import { FastifyReply, FastifyRequest } from "fastify"

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  try {
    const usersRepository = new KnexUsersRepository()
    const mealsRepository = new KnexMealsRepository()
    const useCase = new GetUserMetrics(usersRepository, mealsRepository)

    const metrics = await useCase.execute(req.user.sub)

    return res.status(200).send({ metrics })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ error: err.message })
    }

    if (err instanceof MealsNotFoundError) {
      return res.status(404).send({ error: err.message })
    }

    throw err
  }
}
