require('dotenv').config();

const express = require('express');

const server = express();

//This helps set the port dynamically based on the environment
const port = process.env.PORT || 8000;


//This middleware helps with parsing body of the incoming request to server.
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('API for Fetch Rewards Server is up and running 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️')
})


server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})
