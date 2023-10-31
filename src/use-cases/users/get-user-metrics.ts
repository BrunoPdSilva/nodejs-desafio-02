import { TMealsRepository } from "@/repositories/meals-repository"
import { TUsersRepository } from "@/repositories/users-repository"
import { MealsNotFoundError, UserNotFoundError } from "../errors"
import { getBetterSequence } from "@/utils/get-better-sequence"

export class GetUserMetrics {
  constructor(
    private usersRepository: TUsersRepository,
    private mealsRepository: TMealsRepository
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.getUserById(userId)

    if (!user) throw new UserNotFoundError()

    const meals = await this.mealsRepository.fetchMeals(userId)

    if (!meals) throw new MealsNotFoundError()

    const inDiet = meals.filter(meal => Boolean(meal.in_diet))
    const notInDiet = meals.filter(meal => !Boolean(meal.in_diet))
    const mealStreak = getBetterSequence(meals)

    return {
      mealsRegistered: meals.length,
      inDiet: inDiet.length,
      notInDiet: notInDiet.length,
      mealStreak
    }
  }
}
