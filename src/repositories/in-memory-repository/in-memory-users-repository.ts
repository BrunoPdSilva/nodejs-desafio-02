import { randomUUID } from "node:crypto"
import { TUsersRepository, UserCreation } from "../users-repository"
import { User } from "@/@types/knex"

export class InMemoryUsersRepository implements TUsersRepository {
  private users: User[] = []

  async register(data: UserCreation) {
    const user: User = {
      ...data,
      id: randomUUID(),
      created_at: new Date().toISOString(),
    }

    this.users.push(user)

    return user
  }

  async getUserById(userId: string) {
    const user = this.users.find(user => user.id === userId)
    return user ?? null
  }

  async getUserByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    return user ?? null
  }
}
