require('dotenv').config();

const express = require('express');

const server = express();

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const rewardRoutes = require('./api/rewards/rewardsRouter');

//This helps set the port dynamically based on the environment
const port = process.env.PORT || 8000;


//This middleware helps with parsing body of the incoming request to server.
server.use(express.json());
server.use('/api/points', rewardRoutes); 

//Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fetch Rewards API',
      version: '1.0.0',
      description: 'Test API for accessing, updating and adding rewards to an individual users\'s account.',
    },

    servers: [
      {
        url: `http://localhost:${port}`,
      }
    ]
  },
  apis: ['./api/rewards/rewardsRouter.js']
}

const specs = swaggerJsDoc(options);
server.use('/', swaggerUI.serve, swaggerUI.setup(specs));

/*

server.get('/', (req, res) => {
  res.status(200).send('API for Fetch Rewards Server is up and running 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️')
})

*/

server.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })

})


server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})
