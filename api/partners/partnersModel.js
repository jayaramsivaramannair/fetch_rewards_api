const db = require('../../data/dbConfig.js')

function find() {
  return db('payers')
}


function findById(id) {
  return db('payers')
    .where({'payerId' : id})
    .first()
}


function findByName(name) {
  return db('payers')
    .where({'payer': name})
    .first()
  }


async function addPayer(payer) {
  const [id] = await db('payers')
    .insert(payer);

  return id;
}


module.exports = {
  find,
  findById, 
  findByName,
  addPayer
}