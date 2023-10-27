import { FastifyInstance } from "fastify"
import { verifyJWT } from "@/middleware/verify-jwt"
import { fetchUserMeals } from "@/controllers/meals/fetch-user-meals"
import { deleteMeal } from "@/controllers/meals/delete-meal"
import { register } from "@/controllers/meals/register"
import { getMeal } from "@/controllers/meals/get-meal"
import { update } from "@/controllers/meals/update-meal"

export async function meals(app: FastifyInstance) {
  app.post("/", { onRequest: [verifyJWT] }, register)

  app.put("/:id", { onRequest: [verifyJWT] }, update)

  app.get("/:id", { onRequest: [verifyJWT] }, getMeal)

  app.get("/me", { onRequest: [verifyJWT] }, fetchUserMeals)

  app.delete("/:id", { onRequest: [verifyJWT] }, deleteMeal)
}
