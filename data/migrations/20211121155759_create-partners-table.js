
exports.up = async function(knex) {
  await knex.schema.createTable('partners', tbl => {
    tbl.increments('partner-id');
    tbl.string('partner-name').unique().notNullable();
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('partners');
};
