import { TMealsRepository } from "@/repositories/meals-repository"
import { MealsNotFoundError } from "../errors"

export class FetchMeals {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(userId: string) {
    const meals = await this.mealsRepository.fetchMeals(userId)

    if (!meals) throw new MealsNotFoundError()

    return { meals }
  }
}
