import { TUsersRepository, UserCreation } from "@/repositories/users-repository"
import { EmailAlreadyExistsError } from "../errors"
import { hash } from "bcryptjs"

export class RegisterUser {
  constructor(private usersRepository: TUsersRepository) {}

  async execute(data: UserCreation) {
    const userExists = await this.usersRepository.getUserByEmail(data.email)

    if (userExists) throw new EmailAlreadyExistsError()

    const password = await hash(data.password, 6)

    const user = await this.usersRepository.register({ ...data, password })

    return {
      user: { ...user, password_hash: undefined },
    }
  }
}
