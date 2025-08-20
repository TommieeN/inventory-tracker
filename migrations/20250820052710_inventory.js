/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("upc").unique().index();
    table.string("sku").index();
    table.string("category").notNullable().index();
    table.string("location").index();
    table.integer("quantity").unsigned().notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("inventory");
};
