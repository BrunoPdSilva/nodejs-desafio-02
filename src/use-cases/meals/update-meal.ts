import { Meal, TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError, MealNotUpdated } from "../errors"

export class UpdateMeal {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(id: string, data: Partial<Meal>) {
    const meal = await this.mealsRepository.getMealById(id)

    if (!meal) throw new MealNotFoundError()

    const mealUpdated = await this.mealsRepository.updateMeal(id, data)

    return { mealUpdated }
  }
}
