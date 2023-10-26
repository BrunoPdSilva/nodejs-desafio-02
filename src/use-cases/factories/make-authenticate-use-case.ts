import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { AuthenticateUser } from "../users/authenticate-user"

export function makeAuthenticationUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new AuthenticateUser(usersRepository)
  return useCase
}
