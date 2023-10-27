import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { RegisterUser } from "../users/register-user"

export function makeRegisterUserUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new RegisterUser(usersRepository)
  return useCase
}
