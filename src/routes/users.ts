import { FastifyInstance } from "fastify"
import { RegisterUser } from "@/controllers/users/create-user"
import { fetchUser } from "@/controllers/users/fetch-user"
import { fetchUsers } from "@/controllers/users/fetch-users"
import { deleteUser } from "@/controllers/users/delete-user"

export async function users(app: FastifyInstance) {
  app.get("/", fetchUsers)

  app.get("/:id", fetchUser)

  app.post("/", RegisterUser)

  app.delete("/:id", deleteUser)
}
