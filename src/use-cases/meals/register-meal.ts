import { MealCreation, TMealsRepository } from "@/repositories/meals-repository"

export class RegisterMeal {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(data: MealCreation) {
    const meal = await this.mealsRepository.registerMeal(data)

    return { meal }
  }
}
