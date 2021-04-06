exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('cities'))) {
    await knex.schema.createTable('weather', (table) => {
      table.increments();
      table
        .string('city_name')
        .unsigned()
        .notNullable()
        .references('city')
        .inTable('cities.city')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('city_state')
        .unsigned()
        .notNullable()
        .references('state')
        .inTable('cities.state')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.float('temp');
      table.float('humidity');
      table.string('date');
      table.string('description');
      table.float('wind_speed');
      table.string('wind_dir');
      table.float('precip');
      table.string('real_feel');
      table.primary(['city.cities', 'state.cities']);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('weather');
};
