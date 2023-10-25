import { knex } from "@/lib/knex"
import { TUsersRepository, UserCreation } from "../users-repository"
import { randomUUID } from "node:crypto"

export class KnexUsersRepository implements TUsersRepository {
  async getUserByEmail(email: string) {
    const user = await knex("users").where("email", email).first()
    return user ?? null
  }

  async deleteUserByID(id: string) {
    await knex("users").where("id", id).del()
  }

  async getUserById(id: string) {
    const user = await knex("users").where("id", id).first()
    return user ?? null
  }

  async fetchUsers() {
    const users = await knex("users").select("*")
    return users.length > 0 ? users : null
  }

  async register({ name, email, password, session_id }: UserCreation) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash: password,
      created_at: new Date().toISOString(),
      session_id,
    }

    await knex("users").insert(user)

    return user
  }
}
