
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate().insert([
    {'user-name': 'User-1'},
    {'user-name': 'User-2'}
  ])
};
