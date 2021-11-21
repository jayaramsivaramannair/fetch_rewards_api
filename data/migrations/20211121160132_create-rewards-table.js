
exports.up = async function(knex) {
  await knex.schema.createTable('rewards', tbl => {
    tbl.increments('reward-id');
    tbl.integer('points').notNullable();
    tbl.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
    tbl.integer('user-id').references('user-id').inTable('users').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer('payer-id').references('payer-id').inTable('payers').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = async function(knex) {
  //Since the rewards table has references to users and partners, we need to drop these tables first before drop rewards table
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('payers');
  await knex.schema.dropTableIfExists('rewards');
};
