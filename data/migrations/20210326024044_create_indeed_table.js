exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('cities'))) {
    await knex.schema.createTable('indeed', function (table) {
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
      table.float('totalResults');
      table.string('jobTitle');
      table.string('jobLocation');
      table.string('postDate');
      table.string('extractDate');
      table.string('jobDescription');
      table.string('Salary');
      table.string('jobURL');
      table.primary(['city.cities', 'state.cities']);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('indeed');
};
