// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/rewards.db3'
    },
    useNullAsDefault: true,

    //Specifies the path where the database tables will be created.
    migrations: {
      directory: './data/migrations'
    },

    seeds: {
      directory: './data/seeds'
    }
  },
};
