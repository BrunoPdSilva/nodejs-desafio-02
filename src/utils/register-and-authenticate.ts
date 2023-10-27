import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import supertest from "supertest"

export async function registerAndAuthenticate(app: FastifyInstance) {
  const usersRepository = new KnexUsersRepository()

  await usersRepository.register({
    name: "John Doe",
    email: "john@doe.com",
    password_hash: await hash("john-doe", 6),
  })

  const response = await supertest(app.server)
    .post("/users/authenticate")
    .send({
      email: "john@doe.com",
      password: "john-doe",
    })

  const { token } = response.body

  return { token }
}
