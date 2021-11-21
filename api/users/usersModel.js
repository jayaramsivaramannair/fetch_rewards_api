const db = require('../../data/dbConfig.js');

function find() {
  return db('users');
}


function findById(id) {
  return db('users')
    .where({'user-id': id })
    .first();
}

function addUser(user) {
  //Returns the id of the user that was just added
  return db('users')
    .insert(user)
    .returning('user-id');
}


module.exports = {
  find,
  findById,
  addUser
}