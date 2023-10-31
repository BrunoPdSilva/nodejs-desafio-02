import { Knex } from "knex"

type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: string
}

type Meal = {
  id: string
  user_id: string
  name: string
  description: string | null
  date_time: string
  in_diet: boolean
}

declare module "knex/types/tables" {
  export interface Tables {
    users: User
    meals: Meal
  }
}
