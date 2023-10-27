import { TUsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../errors"

export class Profile {
  constructor(private usersRepository: TUsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.getUserById(userId)

    if (!user) throw new UserNotFoundError()

    return { user }
  }
}
