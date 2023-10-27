import { it, describe, expect, beforeAll, afterAll, beforeEach } from "vitest"
import { execSync } from "node:child_process"
import { app } from "@/app"
import supertest from "supertest"

describe("Register User [E2E]", () => {
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

  it("should be able to authenticate.", async () => {
    await supertest(app.server).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "john123",
    })

    const response = await supertest(app.server)
      .post("/users/authenticate")
      .send({
        email: "john@example.com",
        password: "john123",
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
