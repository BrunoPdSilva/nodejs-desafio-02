import { TMealsRepository, TUpdateMeal } from "@/repositories/meals-repository"
import { MealNotFoundError, UnauthorizedAccessError } from "../errors"

export class UpdateMeal {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(mealId: string, data: TUpdateMeal, userId: string) {
    const meal = await this.mealsRepository.getMealById(mealId)

    if (!meal) throw new MealNotFoundError()
    if(meal.user_id !== userId) throw new UnauthorizedAccessError()

    const mealUpdated = await this.mealsRepository.updateMeal(mealId, data)

    return { mealUpdated }
  }
}
