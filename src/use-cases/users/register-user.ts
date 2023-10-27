import { TUsersRepository } from "@/repositories/users-repository"
import { EmailAlreadyExistsError } from "../errors"
import { hash } from "bcryptjs"

type RegisterRequest = {
  name: string
  email: string
  password: string
}

export class RegisterUser {
  constructor(private usersRepository: TUsersRepository) {}

  async execute({ name, email, password }: RegisterRequest) {
    const userExists = await this.usersRepository.getUserByEmail(email)

    if (userExists) throw new EmailAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.register({
      name,
      email,
      password_hash,
    })

    return {
      user: { ...user, password_hash: undefined },
    }
  }
}
