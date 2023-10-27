import { it, describe, expect, beforeAll, afterAll, beforeEach } from "vitest"
import { app } from "@/app"
import supertest from "supertest"
import { execSync } from "node:child_process"
import { registerAndAuthenticate } from "@/utils/register-and-authenticate"

describe("Fetch User Meals [E2E]", () => {
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

  it("should be able to fetch user meals", async () => {
    const { token } = await registerAndAuthenticate(app)

    const registerResponse = await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date: "2023-10-27",
        time: "10:23",
      })
      .set("Authorization", `Bearer ${token}`)

    const meal = registerResponse.body.meal

    const response = await supertest(app.server)
      .delete(`/meals/${meal.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toEqual(204)
  })
})
