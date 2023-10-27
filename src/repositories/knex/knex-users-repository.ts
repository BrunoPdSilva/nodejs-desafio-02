import { knex } from "@/lib/knex"
import { TUsersRepository, UserCreation } from "../users-repository"
import { randomUUID } from "node:crypto"

export class KnexUsersRepository implements TUsersRepository {
  async register(data: UserCreation) {
    const userId = randomUUID()

    await knex("users").insert({
      ...data,
      id: userId,
    })

    const user = await knex("users").where("id", userId).first()

    if (!user) throw new Error("Falha ao recuperar o usuário após o registro.")

    return user
  }

  async getUserById(userId: string) {
    const user = await knex("users").where("id", userId).first()
    return user ?? null
  }

  async getUserByEmail(email: string) {
    const user = await knex("users").where("email", email).first()
    return user ?? null
  }
}
