
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('userId');
    tbl.string('userName').unique().notNullable();
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
