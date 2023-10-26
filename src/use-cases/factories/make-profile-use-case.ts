import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { Profile } from "../users/user-profile"

export function makeProfileUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new Profile(usersRepository)
  return useCase
}
