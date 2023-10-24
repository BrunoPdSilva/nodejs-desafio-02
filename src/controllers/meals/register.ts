import { FastifyReply, FastifyRequest } from "fastify"
import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { RegisterMeal } from "@/use-cases/meals/register-meal"
import { randomUUID } from "crypto"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      date_time: z.string().optional(),
      in_diet: z.boolean().optional(),
    })

    const data = bodySchema.parse(req.body)

    const user_id = req.cookies.userID
    let { sessionID } = req.cookies

    if (!sessionID) {
      sessionID = randomUUID()
      const maxAge = 1000 * 60 * 60 * 24 * 7 // 7 days
      res.cookie("sessionID", sessionID, { path: "/", maxAge })
    }

    const mealsRepository = new KnexMealsRepository()
    const useCase = new RegisterMeal(mealsRepository)

    const { meal } = await useCase.execute({
      user_id,
      user_session_id: sessionID,
      ...data,
    })

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

  res.status(201).send()
}
