const db = require('../../data/db-config');

const findAll = async () => {
  return await db('visualizations');
};

const findBy = (filter) => {
  return db('visualizasions').where(filter);
};

const findById = async (id) => {
  return db('visualizasions').where({ id }).first();
};

async function add(visualizasions) {
  const [id] = await db('visualizasions').insert(visualizasions, 'id');
  return db('visualizasions').where({ id }).first();
}

const update = (id, visualizasions) => {
  console.log(visualizasions);
  return db('visualizasions')
    .where({ id: id })
    .first()
    .update(visualizasions)
    .returning('*');
};

const remove = async (id) => {
  return await db('visualizasions').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
};
