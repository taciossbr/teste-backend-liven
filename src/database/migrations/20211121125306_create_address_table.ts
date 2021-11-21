import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('addresses', table => {
        table.increments('id')
        table.string('country', 40).notNullable()
        table.string('state', 60).notNullable()
        table.string('city', 80).notNullable()
        table.string('neighbourhood', 80)
        table.string('street', 80).notNullable()
        table.string('zipCode', 12).notNullable()
        table.string('houseNumber', 12).notNullable()
        table.string('complement', 120)
        table.integer('userId').notNullable().references('id').inTable('users')

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('addresses')
}

