/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .index();
    table
      .integer("location_id")
      .unsigned()
      .references("id")
      .inTable("locations")
      .onDelete("SET NULL")
      .index();

    table
      .integer("pallet_id")
      .unsigned()
      .references("id")
      .inTable("pallets")
      .onDelete("SET NULL")
      .index();

    table.integer("quantity").unsigned().notNullable();
    table.string("box_code");
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
