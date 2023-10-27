import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { AuthenticateUser } from "../users/authenticate-user"

export function makeAuthenticateUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new AuthenticateUser(usersRepository)
  return useCase
}
