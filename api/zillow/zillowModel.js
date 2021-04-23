const db = require('../../data/db-config');

const findAll = async () => {
  return await db('zillow');
};

const findBy = (filter) => {
  return db('zillow').where(filter);
};

const findById = async (id) => {
  return db('zillow').where({ id }).first();
};

async function add(zillow) {
  const [id] = await db('zillow').insert(zillow, 'id');
  return db('zillow').where({ id }).first();
}

const update = (id, zillow) => {
  return db('zillow').where({ id: id }).first().update(zillow).returning('*');
};

const remove = async (id) => {
  return await db('zillow').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
};
