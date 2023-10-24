import { TUsersRepository, UserCreation } from "@/repositories/users-repository"

export class RegisterUser {
  constructor(private usersRepository: TUsersRepository) {}

  async execute(data: UserCreation) {
    const user = await this.usersRepository.register(data)

    return { user }
  }
}
