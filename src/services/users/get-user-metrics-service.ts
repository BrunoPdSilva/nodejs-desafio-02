import { TMealsRepository } from "@/repositories/meals-repository";
import { TUsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "../errors";

export class GetUserMetricsService {
  constructor(
    private usersRepository: TUsersRepository,
    private mealsRepository: TMealsRepository
  ) {}

  async get(userId: string) {
    const user = await this.usersRepository.findUserByID(userId)

    if (!user) throw new UserNotFoundError()

    
  }
}