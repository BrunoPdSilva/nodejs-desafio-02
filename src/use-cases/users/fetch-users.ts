import { TUsersRepository } from "@/repositories/users-repository"
import { UsersNotFoundError } from "../errors"

export class FetchUsers {
  constructor(private usersRepository: TUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.fetchUsers()

    if (!users) throw new UsersNotFoundError()

    return { users }
  }
}
