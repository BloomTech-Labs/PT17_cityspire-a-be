exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('cities'))) {
    return knex.schema.createTable('zillow', function (table) {
      table
        .string('city_name')
        .unsigned()
        .notNullable()
        .reference('city')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('city_state')
        .unsigned()
        .notNullable()
        .reference('state')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('lat');
      table.string('lon');
      table.string('street address');
      table.string('bedrooms');
      table.string('bathrooms');
      table.bool('cats allowed');
      table.bool('dogs allowed');
      table.string('list price');
      table.string('ammenities');
      table.string('photos');
      table.primary(['city.cities', 'state.cities']);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('zillow');
};
