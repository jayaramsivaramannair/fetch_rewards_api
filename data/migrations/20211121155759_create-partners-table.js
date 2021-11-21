
exports.up = async function(knex) {
  await knex.schema.createTable('payers', tbl => {
    tbl.increments('payerId');
    tbl.string('payer').unique().notNullable();
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('payers');
};
