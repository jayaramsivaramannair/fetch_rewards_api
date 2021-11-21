const db = require('../../data/dbConfig.js');

function find() {
  return db('users');
}


function findById(id) {
  return db('users')
    .where({'userId': id })
    .first();
}

async function addUser(user) {
  //Returns the id of the user that was just added
  const [id] = await db('users')
    .insert(user);

  return id;
}


module.exports = {
  find,
  findById,
  addUser
}