import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", table => {
    table.uuid("id").primary()
    table.uuid("user_id").after("id").notNullable(),
      table.string("name").notNullable()
    table.string("description").defaultTo(null)
    table.string("date").notNullable(),
      table.string("time").notNullable(),
      table.boolean("in_diet").defaultTo(false).notNullable()

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals")
}
