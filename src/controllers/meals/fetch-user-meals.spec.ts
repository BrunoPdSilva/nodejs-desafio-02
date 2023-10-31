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

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pastel",
        description: "Pastel da feira de domingo.",
        date_time: new Date(2023, 10, 22, 9, 47, 0),
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Pizza de Calabresa",
        date_time: new Date(2023, 10, 18, 18, 31, 0),
      })
      .set("Authorization", `Bearer ${token}`)

    await supertest(app.server)
      .post("/meals")
      .send({
        name: "Macarronada",
        date_time: new Date(2023, 10, 20, 14, 1, 47),
      })
      .set("Authorization", `Bearer ${token}`)

    const response = await supertest(app.server)
      .get("/meals/me")
      .set("Authorization", `Bearer ${token}`)

    console.log(response.body.meals)

    expect(response.status).toEqual(200)
    expect(response.body.meals).toEqual([
      expect.objectContaining({ name: "Pizza de Calabresa" }),
      expect.objectContaining({ name: "Macarronada" }),
      expect.objectContaining({ name: "Pastel" }),
    ])
  })
})
