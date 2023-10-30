import { FastifyInstance } from "fastify"
import { register } from "@/controllers/users/register"
import { profile } from "@/controllers/users/profile"
import { authenticate } from "@/controllers/users/authenticate"
import { verifyJWT } from "@/middleware/verify-jwt"
import { metrics } from "@/controllers/users/metrics"

export async function users(app: FastifyInstance) {
  app.post("/", register)
  app.post("/authenticate", authenticate)

  // -> Authenticated *
  app.get("/me", { onRequest: [verifyJWT] }, profile)
  app.get("/me/metrics", { onRequest: [verifyJWT] }, metrics)

}
