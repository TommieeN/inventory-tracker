/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pallets", (table) => {
    table.increments("id").primary();
    table.string("pallet_code").unique().notNullable();
    table.integer("location_id").unsigned.references("id").inTable("locations").onDelete("SET NULL").index();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pallets");
};
