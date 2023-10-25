export type User = {
  id: string
  session_id: string
  name: string
  email: string
  password_hash: string
  created_at: string
}

export type UserCreation = {
  session_id: string
  name: string
  email: string
  password: string
}

export type TUsersRepository = {
  register(data: UserCreation): Promise<User>
  getUserById(id: string): Promise<User | null>
  fetchUsers(): Promise<User[] | null>
  deleteUserByID(id: string): Promise<void>
  getUserByEmail(email: string): Promise<User | null>
}
