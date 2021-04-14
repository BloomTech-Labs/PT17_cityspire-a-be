const db = require('../../data/db-config');

const findAll = async () => {
  return await db('schools');
};

const findBy = (filter) => {
  return db('schools').where(filter);
};

const findById = async (id) => {
  return db('schools').where({ id }).first();
};

async function add(schools) {
  const [id] = await db('schools').insert(schools, 'id');
  return db('schools').where({ id }).first();
}

const update = (id, schools) => {
  return db('schools').where({ id: id }).first().update(schools).returning('*');
};

const remove = async (id) => {
  return await db('cities').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
};
