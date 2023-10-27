import { TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError } from "../errors"

export class GetMealById {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(mealId: string) {
    const meal = await this.mealsRepository.getMealById(mealId)

    if (!meal) throw new MealNotFoundError()

    return { meal }
  }
}
