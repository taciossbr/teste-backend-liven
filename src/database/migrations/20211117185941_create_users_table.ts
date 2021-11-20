import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('username', 40).notNullable()
        table.string('name', 120).notNullable()
        table.string('email', 120).notNullable()
        table.string('password', 60).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

