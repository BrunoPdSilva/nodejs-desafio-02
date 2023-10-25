import { randomUUID } from "crypto"
import { TUsersRepository, User, UserCreation } from "../users-repository"

export class InMemoryUsersRepository implements TUsersRepository {
  private users: User[] = []

  async deleteUserByID(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id)
    this.users.splice(userIndex, 1)
  }

  async getUserById(id: string) {
    const user = this.users.find(user => user.id === id)
    return user ?? null
  }

  async fetchUsers() {
    return this.users.length > 0 ? this.users : null
  }

  async getUserByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    return user ?? null
  }

  async register(data: UserCreation) {
    const user: User = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      password_hash: data.password,
      ...data,
    }

    this.users.push(user)

    return user
  }
}
