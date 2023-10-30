import { it, describe, expect, beforeEach, beforeAll, afterAll } from "vitest"
import { execSync } from "node:child_process"
import { app } from "@/app"
import supertest from "supertest"

describe("Metrics [E2E]", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync("npx knex migrate:rollback --all")
    execSync("npx knex migrate:latest")
  })

  it("should be able to get user metrics", async () => {
    await supertest(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "7f247ac5",
    })

    const authResponse = await supertest(app.server)
      .post("/users/authenticate")
      .send({
        email: "john.doe@gmail.com",
        password: "7f247ac5",
      })

    const { token } = authResponse.body

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pizza",
        description: "Pizza de calabresa.",
        date: "2023-10-29",
        time: "19:03",
        in_diet: false,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date: "2023-10-27",
        time: "10:23",
        in_diet: false,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Salada",
        date: "2023-10-27",
        time: "12:23",
        in_diet: true,
      })
      .set("Authorization", `Bearer ${token}`)

    const response = await supertest(app.server)
      .get("/users/me/metrics")
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.metrics).toEqual(
      expect.objectContaining({
        mealsRegistered: 3,
        inDiet: 1,
        notInDiet: 2,
      })
    )
  })
})
