const db = require('../../data/dbConfig.js');

function findById(id) {
  return db('rewards')
    .join('payers', 'payers.payerId', 'rewards.payerId')
    .select('payers.payer')
    .where({'userId': id}).first();
}

async function addReward(reward) {
  const [id] = await db('rewards').insert(reward);
  return id;
}

module.exports = {
  findById,
  addReward
}