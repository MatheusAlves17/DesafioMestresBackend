import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('usuarios', (table => {
        table.increments('usu_id').primary();
        table.string('usu_email').nullable();
        table.string('usu_senha').nullable();

    }))
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('usuarios');
}
