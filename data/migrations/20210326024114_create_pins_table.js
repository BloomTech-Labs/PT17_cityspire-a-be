exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('cities'))) {
    return knex.schema('pins', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .nonNullable()
        .references('id')
        .inTable('profiles.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('city_id')
        .unsigned()
        .nonNullable()
        .references('id')
        .inTable('cities.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.primary(['user_id', 'city_id']);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('pins');
};
