import { knex } from "@/lib/knex"
import { TUsersRepository, UserCreation } from "../users-repository"
import { randomUUID } from "node:crypto"

export class KnexUsersRepository implements TUsersRepository {
  async deleteUserByID(id: string) {
    await knex("users").where("id", id).del()
  }

  async getUserById(id: string) {
    const user = await knex("users").where("id", id).first()
    return user ? user : null
  }

  async fetchUsers() {
    const users = await knex("users").select("*")
    return users.length > 0 ? users : null
  }

  async register(data: UserCreation) {
    const user = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      ...data,
    }

    await knex("users").insert(user)

    return user
  }
}
