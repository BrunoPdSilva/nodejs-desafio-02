export type User = {
  id: string
  session_id: string
  name: string
  email: string
  created_at: string
}

export type UserCreation = {
  session_id: string,
  name: string
  email: string
}

export type TUsersRepository = {
  deleteUserByID(id: string): Promise<void>
  getUserById(id: string): Promise<User | null>
  fetchUsers(): Promise<User[] | null>
  register(data: UserCreation): Promise<User>
}
