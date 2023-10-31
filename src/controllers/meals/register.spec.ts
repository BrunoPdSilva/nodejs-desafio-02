import { it, describe, expect, beforeEach, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import supertest from "supertest"
import { execSync } from "node:child_process"
import { registerAndAuthenticate } from "@/utils/register-and-authenticate"

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
    const { token } = await registerAndAuthenticate(app)

    const response = await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date_time: new Date(2023, 10, 27, 10, 23, 0),
      })
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body.meal).toEqual(
      expect.objectContaining({
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date_time: expect.any(String),
      })
    )
  })
})
