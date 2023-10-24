import { TMealsRepository } from "@/repositories/meals-repository"
import { TUsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../errors"

export class GetUserMetrics {
  constructor(
    private usersRepository: TUsersRepository,
    private mealsRepository: TMealsRepository
  ) {}

  async get(userId: string) {
    const user = await this.usersRepository.getUserById(userId)

    if (!user) throw new UserNotFoundError()
  }
}
