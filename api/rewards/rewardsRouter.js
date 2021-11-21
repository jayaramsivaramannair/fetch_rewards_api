const rewards = require('./rewardsModel.js');
const payers = require('../partners/partnersModel.js')
const users = require('../users/usersModel.js');
const router = require('express').Router();

//Get the reward balance for a specific user
router.get('/:id', async (req, res, next) => {
  try {
    //First check if the user exists or not
    const user = await users.findById(req.params.id);
    if(!user) {
      res.status(404).json({message: 'User not found!'})
    }

    const balance = await rewards.findById(req.params.id)
    res.status(200).json(balance);

  } catch (err) {
    console.log(err.stack)
    next(err);
  }
})

//Add transactions to add points to users' available balance
router.post('/:id', async (req, res, next) => {
  try {
    //Destructure to get payer and points from the request body
    const {payer, points} = req.body;
    let payerObj = await payers.findByName(payer.toUpperCase());
    let payerId = payerObj ? payerObj.payerId : null;
    
    //If the payer does not already exist in the payers table, then create the payer by adding it to the table.
    if(!payerId) {
      payerId = await payers.addPayer({payer: payer.toUpperCase()});
    }
    console.log(payerId)
    //The object needed while adding the reward to the rewards table
    let pointsObj = {
      points: points,
      'userId': req.params.id,
      'payerId': payerId,
    }

    let rewardID = await rewards.addReward(pointsObj);
    res.status(201).json({message: `Transaction with ID : ${rewardID} successfully added!`});

  } catch (err) {
    console.log(err.stack)
    next(err);
  }
})


module.exports = router;

