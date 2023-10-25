import fastify from "fastify"
import fastifyCookie from "@fastify/cookie"
import { users } from "./routes/users"
import { meals } from "./routes/meals"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCookie)
app.register(users, { prefix: "users" })
app.register(meals, { prefix: "meals" })

app.setErrorHandler((error, _, res) => {
  if (env.NODE_ENV !== "production") {
    console.error(error)
  }

  return res.status(500).send({ error: "Internal server error." })
})
