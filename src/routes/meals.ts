import { FastifyInstance } from "fastify"
import { checkSessionID } from "../middleware/check-session-id"
import { register } from "@/controllers/meals/register"
import { deleteMeal } from "@/controllers/meals/delete-meal"
import { getMeal } from "@/controllers/meals/get-meal"
import { fetchUserMeals } from "@/controllers/meals/fetch-user-meals"
import { update } from "@/controllers/meals/update-meal"

export async function meals(app: FastifyInstance) {
  app.post("/", register)

  app.put("/:id", update)

  app.get("/:id", { preHandler: checkSessionID }, getMeal)

  app.get("/", { preHandler: checkSessionID }, fetchUserMeals)

  app.delete("/:id", { preHandler: checkSessionID }, deleteMeal)
}
