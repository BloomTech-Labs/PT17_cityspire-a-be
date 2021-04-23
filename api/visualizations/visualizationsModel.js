const db = require('../../data/db-config');

const findAll = async () => {
  return await db('visualizations');
};

const findBy = (filter) => {
  return db('visualizations').where(filter);
};

const findById = async (id) => {
  return db('visualizations').where({ id }).first();
};

async function add(vis) {
  const [id] = await db('visualizations').insert(vis, 'id');
  return db('visualizations').where({ id }).first();
}

const update = (id, visualizations) => {
  return db('visualizations')
    .where({ id: id })
    .first()
    .update(visualizations)
    .returning('*');
};

const remove = async (id) => {
  return await db('visualizations').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
};
