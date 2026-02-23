/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("tariffs", (table) => {
        table.increments("id").primary();
        table.date("dt_till_max").notNullable();
        table.string("warehouse_name").notNullable();

        table.decimal("box_delivery_base", 8, 2).nullable();
        table.decimal("box_delivery_coef", 8, 2).nullable();
        table.decimal("box_delivery_liter", 8, 2).nullable();

        table.decimal("box_storage_base", 8, 2).nullable();
        table.decimal("box_storage_coef", 8, 2).nullable();
        table.decimal("box_storage_liter", 8, 2).nullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.unique(['dt_till_max', 'warehouse_name'])
    })
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("tariffs");
}
