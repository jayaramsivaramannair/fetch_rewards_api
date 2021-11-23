const db = require('../../data/dbConfig.js');

function findById(id) {
  return db('rewards')
    .join('payers', 'payers.payerId', 'rewards.payerId')
    .select('rewards.rewardId', 'payers.payer', 'rewards.points', 'rewards.timestamp')
    .where({'userId': id})
    .orderBy('rewards.rewardID', 'asc')
}

async function addReward(reward) {
  const [id] = await db('rewards').insert(reward);
  return id;
}

async function updatePoints(id, points) {
  const updatedId = await db('rewards').where({'rewardId': id}).update({'points': points});
  return updatedId;

}

module.exports = {
  findById,
  addReward,
  updatePoints
}