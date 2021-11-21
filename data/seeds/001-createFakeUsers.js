
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate().insert([
    {'userName': 'User-1'},
    {'userName': 'User-2'}
  ])
};
