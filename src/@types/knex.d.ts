import { Knex } from "knex"

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string
      session_id: string
      name: string
      email: string
      password_hash: string
      created_at: string
    }
    meals: {
      id: string
      user_id: string | null
      user_session_id: string
      name: string
      description: string | null
      in_diet: boolean
      date_time: string
    }
  }
}
