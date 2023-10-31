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
        date_time: new Date(2023, 10, 29, 19, 3, 0),
        in_diet: false,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Omelete",
        date_time: new Date(2023, 10, 30, 19, 3, 0),
        in_diet: true,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Tapioca",
        date_time: new Date(2023, 10, 31, 19, 3, 0),
        in_diet: true,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Macarronada",
        date_time: new Date(2023, 10, 28, 10, 23, 0),
        in_diet: true,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date_time: new Date(2023, 10, 27, 10, 23, 0),
        in_diet: false,
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Salada",
        date_time: new Date(2023, 10, 11, 17, 23, 0),
        in_diet: true,
      })
      .set("Authorization", `Bearer ${token}`)

    const response = await supertest(app.server)
      .get("/users/me/metrics")
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.metrics).toEqual(
      expect.objectContaining({
        mealsRegistered: 6,
        inDiet: 4,
        notInDiet: 2,
        mealStreak: 2,
      })
    )
  })
})
