const db = require('../../data/dbConfig.js')

function find() {
  return db('partners')
}


function findById(id) {
  return db('partners')
    .where({'partner-id' : id})
    .first()
}


function findByName(name) {
  return db('partners')
    .where({'partner-name': name})
    .first()
  }


function addPartner(partner) {
  return db('partners')
    .insert(partner)
    .returning('partner-id')
}


module.exports = {
  find,
  findById, 
  findByName,
  addPartner
}