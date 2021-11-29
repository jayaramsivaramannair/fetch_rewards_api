# Fetch Rewards API Endpoints

## About

- This is a test backend API for the [Fetch Rewards](https://www.fetchrewards.com/) platform.
- The server has been implemented using Node.js and Express.js.
- The data has been persisted using SQLite and Knex.js is used as the ORM to interact with the database.
- The database is already seeded with two test user acccounts - User-1 and User-2 however the rewards have not been seeded with any rewards for the users.
- The base url for the API is `http://localhost:3000`. The port number will be different based on where the server ends up running
- These test user account can thus be used to test the GET, POST and PUT endpoints.

### This test API currently features the following three endpoints:

| Method | Endpoint             | Description                                           | Parameters | Body                                  | Response                                                                                                               |
| ------ | -------------------- | ----------------------------------------------------- | ---------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/points/{userId} | Access the current reward balance in a user's account | userId     | -                                     | Success[200] : JSON object containing the current reward balance of the user broken down by each payer.                |
|        |                      |                                                       |            | -                                     | Error [404] : If the userId is not found in the database                                                               |
|        |                      |                                                       |            | -                                     | Error [400] : if the user does not have any rewards.                                                                   |
| POST   | /api/points/{userId} | Add points to a user's account                        | userId     | {"payer" : "Dannon", "points" : 500 } | Success[200] : Message confirming that the points with a reward ID have been successfully added to the user's account. |
|        |                      |                                                       |            | -                                     | Error [404] : If the userId is not found in the database                                                               |
| PUT    | /api/points/{userId} | Update points in a user's account                     | userId     | {"points" : 500 }                     | Success[200] : JSON object containing a breakdown of points utilized and broken down by each payer.                    |
|        |                      |                                                       |            | -                                     | Error [404] : If the userId is not found in the database                                                               |
|        |                      |                                                       |            | -                                     | Error [400] : if the user does not have enough rewards to spend                                                        |

## Instructions

- Clone the repository to your local machine or download the zip file and extract it to your local machine.
- Repository can be cloned by navigating to the appropriate location on the terminal and typing `git clone https://github.com/jayaramsivaramannair/fetch_rewards_api.git`
- cd into the project folder.
- Run npm install to install all the required dependencies.
- Run npm server or npm start to run the server locally.
