const knex = require('knex');

//Configurations for environment will be imported from knexfile.js
const configurations = require('../knexfile.js');


//pick up the environment variable based on where it is run
const environment = process.env.NODE_ENV || 'development';


module.exports = knex(configurations[environment]);


