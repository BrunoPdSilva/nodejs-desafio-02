import { FastifyInstance } from "fastify"
import { register } from "@/controllers/users/register"
import { getUser } from "@/controllers/users/get-user"
import { fetchUsers } from "@/controllers/users/fetch-users"
import { deleteUser } from "@/controllers/users/delete-user"
import { authenticate } from "@/controllers/users/authenticate"

export async function users(app: FastifyInstance) {
  app.post("/", register)
  app.post("/authenticate", authenticate)
  app.get("/", fetchUsers)
  app.get("/:id", getUser)
  app.delete("/:id", deleteUser)
}
