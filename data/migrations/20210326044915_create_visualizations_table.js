exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('cities'))) {
    await knex.schema.createTable('visualizations', (table) => {
      table.increments();
      table
        .string('city_name')
        .unsigned()
        .notNullable()
        .references('city')
        .inTable('cities.city')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('city_state')
        .unsigned()
        .notNullable()
        .references('state')
        .inTable('cities.state')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('crime_data');
      table.string('industries');
      table.string('demographic');
      table.jsonb('crime_graph');
      table.string('air_quality');
      table.jsonb('employment_graph');
      table.primary(['city.cities', 'state.cities']);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('visualizations');
};
