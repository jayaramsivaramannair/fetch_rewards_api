
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('user-id');
    tbl.string('user-name').unique().notNullable();
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
