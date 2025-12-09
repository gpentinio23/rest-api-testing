/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`CREATE SCHEMA IF NOT EXISTS molloyeats;`);
    return knex.schema
        .withSchema("molloyeats")
        .createTable("menu", (table) => {
            table.increments("keyID").primary();
            table.string("name").notNullable()
            table.string('description').nullable()
            table.decimal("price").notNullable()
        })
        .catch((err) => console.error(err))

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .withSchema("molloyeats")
        .dropTableIfExists("distributors")
        .catch((err)=> console.error(err));

};
