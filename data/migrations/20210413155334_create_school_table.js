exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('cities'))) {
    return knex.schema.createTable('schools', function (table) {
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
      table.string('school');
      table.string('score');
      table.int('rating');
      table.string('address');
      table.string('studentsPerTeacher');
      table.string('district');
      table.primary(['city.cities', 'state.cities']);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('schools');
};
