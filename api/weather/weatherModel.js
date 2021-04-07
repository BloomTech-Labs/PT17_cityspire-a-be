const db = require('../../data/db-config');

const findAll = async () => {
  return await db('weather');
};

const findBy = (filter) => {
  return db('weather').where(filter);
};

const findById = async (id) => {
  return db('weather').where({ id }).first();
};

async function add(weather) {
  const [id] = await db('weather').insert(weather, 'id');
  return db('weather').where({ id }).first();
}

const update = (id, weather) => {
  console.log(weather);
  return db('weather').where({ id: id }).first().update(weather).returning('*');
};

const remove = async (id) => {
  return await db('weather').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
};
