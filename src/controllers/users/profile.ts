import { FastifyReply, FastifyRequest } from "fastify"
import { UserNotFoundError } from "@/use-cases/errors"
import { makeProfileUseCase } from "@/use-cases/factories/make-profile-use-case"

export async function profile(req: FastifyRequest, res: FastifyReply) {
  try {
    const useCase = makeProfileUseCase()
    const { user } = await useCase.execute(req.user.sub)

    return res.status(200).send({ user })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
