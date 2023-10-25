import { TUsersRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "../errors"
import { compare } from "bcryptjs"

export class AuthenticateUser {
  constructor(private usersRepository: TUsersRepository) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordsMatch = await compare(password, user.password_hash)

    if (!doesPasswordsMatch) throw new InvalidCredentialsError()

    return { user }
  }
}
