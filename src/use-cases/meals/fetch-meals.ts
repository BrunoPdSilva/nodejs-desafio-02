import { TMealsRepository } from "@/repositories/meals-repository"
import { MealsNotFoundError } from "../errors"

export class FetchMeals {
  constructor(private mealsRepository: TMealsRepository) {}

  async execute(sessionID: string, id?: string) {
    const meals = await this.mealsRepository.fetchMeals(sessionID, id)

    if (!meals) throw new MealsNotFoundError()

    return { meals }
  }
}
