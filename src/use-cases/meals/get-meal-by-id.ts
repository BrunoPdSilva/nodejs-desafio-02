import { TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError, UnauthorizedAccessError } from "../errors"

export class GetMealById {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(mealId: string, userId: string) {
    const meal = await this.mealsRepository.getMealById(mealId)

    if (!meal) throw new MealNotFoundError()

    if (meal.user_id !== userId) throw new UnauthorizedAccessError()

    return { meal }
  }
}
