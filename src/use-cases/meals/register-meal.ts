import {
  TMealCreation,
  TMealsRepository,
} from "@/repositories/meals-repository"

export class RegisterMeal {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(data: TMealCreation) {
    const meal = await this.mealsRepository.registerMeal(data)

    return { meal }
  }
}
