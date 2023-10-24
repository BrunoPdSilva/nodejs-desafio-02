import { TUsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../errors"

export class GetUser {
  constructor(private usersRepository: TUsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.getUserById(id)

    if (!user) throw new UserNotFoundError()

    return { user }
  }
}
