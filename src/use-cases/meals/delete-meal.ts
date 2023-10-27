import { TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError } from "../errors"

export class DeleteMeal {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(mealId: string) {
    const meal = await this.mealsRepository.getMealById(mealId)

    if (!meal) throw new MealNotFoundError()

    await this.mealsRepository.deleteMeal(mealId)
  }
}
