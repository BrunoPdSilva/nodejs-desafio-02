import { it, describe, expect, beforeEach, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import supertest from "supertest"
import { execSync } from "node:child_process"

describe("Register Meal [E2E]", () => {
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

  it("should be able to register a meal even if the user is not logged.", async () => {
    const response = await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pizza de Mussarela",
        in_diet: true,
        date_time: new Date(2023, 9, 26, 13, 24).toISOString(),
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.meal).toEqual(
      expect.objectContaining({
        name: "Pizza de Mussarela",
      })
    )
  })

  it("should be able to register a meal logged in", async () => {
    const registerResponse = await supertest(app.server).post("/users").send({
      name: "Bruno Peres",
      email: "brunoperes@gmail.com",
      password: "password123",
    })

    const cookies = registerResponse.get("Set-Cookie")

    await supertest(app.server).post("/users/authenticate").send({
      email: "brunoperes@gmail.com",
      password: "password123",
    })

    const response = await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pizza de Mussarela",
        in_diet: true,
        date_time: new Date(2023, 9, 26, 13, 24).toISOString(),
      })
      .set("Cookie", cookies)

    expect(response.status).toEqual(201)
    expect(response.body.meal).toEqual(
      expect.objectContaining({
        name: "Pizza de Mussarela",
        user_id: expect.any(String),
        user_session_id: expect.any(String),
      })
    )
  })
})
