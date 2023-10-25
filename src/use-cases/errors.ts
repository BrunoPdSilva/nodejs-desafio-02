export class UsersNotFoundError extends Error {
  constructor() {
    super("Nenhum usuário cadastrado.")
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("Usuário não encontrado.")
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("E-mail ou senha incorretos.")
  }
}

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Este e-mail já está cadastrado.")
  }
}

export class MealNotFoundError extends Error {
  constructor() {
    super("Nenhuma refeição registrada com esse ID.")
  }
}

export class MealsNotFoundError extends Error {
  constructor() {
    super("Nenhuma refeição registrada com esse ID.")
  }
}

export class MealNotUpdated extends Error {
  constructor() {
    super("Nenhuma refeição atualizada.")
  }
}
