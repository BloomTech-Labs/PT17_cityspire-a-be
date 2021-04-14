exports.up = function (knex) {
  return knex.schema.createTable('cities', function (table) {
    table.increments();
    table.string('city');
    table.string('state');
    table.float('latitude');
    table.float('longitude');
    table.float('rental_price');
    table.string('crime');
    table.string('air_quality_index');
    table.float('population');
    table.float('diversity_index');
    table.float('walkability');
    table.float('livability');
    table.jsonb('recommendations');
    table
      .string('profile_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cities');
};
