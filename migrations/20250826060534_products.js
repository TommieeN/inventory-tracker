/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("upc").unique().notNullable();
    table.string("name").notNullable();
    table.float("power").notNullable();
    table.float("base_curve").notNullable();
    table.float("cylinder").nullable();
    table.integer("axis").nullable();
    table.enum("multifocal", ["low", "medium", "high"]).nullable;
    table.string("color").nullable();
    table.integer("pack_size");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
