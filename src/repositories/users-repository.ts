import { User } from "@/@types/knex"

export type UserCreation = {
  name: string
  email: string
  password_hash: string
}

export type TUsersRepository = {
  register(data: UserCreation): Promise<User>
  getUserById(userId: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
}
