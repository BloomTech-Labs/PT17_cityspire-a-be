const db = require('../../data/db-config');

const findAll = async () => {
  return await db('cities');
};

const findBy = (filter) => {
  return db('indeed').where(filter);
};

const findById = async (id) => {
  return db('indeed').where({ id }).first();
};

async function add(indeed) {
  const [id] = await db('indeed').insert(indeed, 'id');
  return db('indeed').where({ id }).first();
}

const update = (id, indeed) => {
  console.log(indeed);
  return db('indeed').where({ id: id }).first().update(indeed).returning('*');
};

const remove = async (id) => {
  return await db('indeed').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
};
