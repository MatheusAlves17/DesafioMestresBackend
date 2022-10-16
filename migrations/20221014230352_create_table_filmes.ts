import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('filmes', table => {
        table.increments('fil_id').primary();
        table.string('fil_titulo').nullable();
        table.string('fil_diretor').nullable();
        table.string('fil_descricao').nullable();
        table.string('fil_genero').nullable();
        table.string('fil_poster').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('filmes')
}

