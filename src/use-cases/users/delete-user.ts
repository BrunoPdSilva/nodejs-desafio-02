import { TUsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../errors"

export class DeleteUser {
  constructor(private usersRepository: TUsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.getUserById(id)

    if (!user) throw new UserNotFoundError()

    await this.usersRepository.deleteUserByID(id)
  }
}
