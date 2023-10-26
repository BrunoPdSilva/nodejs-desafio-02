import { it, expect, describe, beforeEach, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import supertest from "supertest"
import { execSync } from "node:child_process"

describe("User Profile [E2E]", () => {
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

  it("should be able to get logged user profile", async () => {
    await supertest(app.server).post("/users").send({
      name: "Bruno Peres",
      email: "bruno.peres@gmail.com",
      password: "8796",
    })

    const authResponse = await supertest(app.server)
      .post("/users/authenticate")
      .send({
        email: "bruno.peres@gmail.com",
        password: "8796",
      })

    const { token } = authResponse.body

    const response = await supertest(app.server)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })
})
