import { TMealsRepository, TUpdateMeal } from "@/repositories/meals-repository"
import { MealNotFoundError } from "../errors"

export class UpdateMeal {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(mealId: string, data: TUpdateMeal) {
    const meal = await this.mealsRepository.getMealById(mealId)

    if (!meal) throw new MealNotFoundError()

    const mealUpdated = await this.mealsRepository.updateMeal(mealId, data)

    return { mealUpdated }
  }
}
