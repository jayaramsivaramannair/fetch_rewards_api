const rewards = require('./rewardsModel.js');
const payers = require('../partners/partnersModel.js')
const users = require('../users/usersModel.js');
const router = require('express').Router();

//Get the reward balance for a specific user
router.get('/:id', async (req, res, next) => {
  try {
    //First check if the user exists or not
    const user = await users.findById(req.params.id);
    const totalRewards = await rewards.getTotalRewards(req.params.id);
    console.log(totalRewards);
    if(!user) {
      res.status(404).json({message: 'User not found!'})
      return 
    }

    const balance = await rewards.findById(req.params.id)

    if(balance.length === 0) {
      res.status(200).json({message: 'User has no rewards yet!'})
      return
    }

    
    const modifiedBalanceObj = {}
    for (let element of balance) {
      if(element.payer in modifiedBalanceObj) {
        modifiedBalanceObj[element.payer] += element.points
      } else {
        modifiedBalanceObj[element.payer] = element.points
      }
    }
    

    res.status(200).json(modifiedBalanceObj);

  } catch (err) {
    console.log(err.stack)
    next(err) 
  }
})

//Add transactions to add points to users' available balance
router.post('/:id', async (req, res, next) => {
  try {

    //First check if the user exists or not
    const user = await users.findById(req.params.id);
    if(!user) {
      res.status(404).json({message: 'User not found!'})
      return 
    }

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
    next(err)
  }
})


//Update the points in rewards table after they have been spent
router.put('/:id', async (req, res, next) => {
  try {
    //First check if the user exists or not
    const user = await users.findById(req.params.id);
    if(!user) {
      res.status(404).json({message: 'User not found!'})
      return 
    }


    //Keeps track of negative reward points in the user accounts
    let payerCredits = {};
    //Keeps track of spending by each payer
    let spentObj = {};
    let spentArray = [];
    //Fetches the balance of rewards in user's account
    const balance = await rewards.findById(req.params.id)
    console.log(balance)

    let {points} = req.body;
    let  updatedPoints = 0;
    let spentPoints = 0;
    let i = 0;
    let updatedId = 0

    if(balance.length === 0) {
      res.status(200).json({message: 'User has no rewards yet!'})
      return
    }

    //Creates a new object with the credit points for each payer
    for(let reward of balance) {
      if(reward.points < 0 ) {
        if(reward.payer in payerCredits) {
          payerCredits[reward.payer].push({rewardId: reward.rewardId, points: reward.points})
        } else {
          payerCredits[reward.payer] = [{rewardId: reward.rewardId, points: reward.points}]
        }
      }
    }

    console.log(payerCredits)

    while (true) {
      if(!points || i === balance.length) {
        break;
      }

      if(balance[i].payer in payerCredits && balance[i].points > 0) {
        for(let credit of payerCredits[balance[i].payer]) {
          //Points are enough to cover the negative balance
          if(balance[i].points > Math.abs(credit.points)) {
            await rewards.updatePoints(credit.rewardId, 0);
            //Balance which can still be utilized by user
            updatedPoints = balance[i].points + credit.points;
            spentPoints = updatedPoints * -1;
            updatedId = await rewards.updatePoints(balance[i].rewardId, 0);
            points = points + spentPoints;
            credit = {};
            //Points are not enough to cover the negative balance
          } else if (balance[i].points < Math.abs(credit.points)) {
            await rewards.updatePoints(balance[i].rewardId, 0);
            updatedPoints = credit.points + balance[i].points;
            udpatedId = await rewards.updatePoints(credit.rewardId, updatedPoints);
            spentPoints = 0 * -1;
            credit = {};
            points = points + spentPoints;
            //Points are just enough to cover the negative balance
          } else if (balance[i].points === Math.abs(credit.points)) {
            await rewards.updatePoints(balance[i].rewardId, 0);
            await rewards.updatePoints(credit.rewardId, 0);
            spentPoints = 0 * -1;
            credit = {};
            points = points + spentPoints;
          }
        }
       } else if (balance[i].points > 0 && balance[i].points >= points) {
          updatedPoints = balance[i].points - points;
          spentPoints = (balance[i].points - updatedPoints) * -1;
          updatedId = await rewards.updatePoints(balance[i].rewardId, updatedPoints);
          //Get the revised point balance to be spent
          points = points + spentPoints;
      } else if (balance[i].points > 0 && balance[i].points < points) {
          updatedPoints = 0;
          spentPoints = balance[i].points * -1;
          updatedId = await rewards.updatePoints(balance[i].rewardId, updatedPoints);
          console.log(updatedId)
          points = points - balance[i].points;
      }

      if(balance[i].payer in spentObj && balance[i].points > 0){
        spentObj[balance[i].payer] += spentPoints;
      } else if (spentPoints) {
        spentObj[balance[i].payer] = spentPoints;
      }
      //Reset the spent points back to zero
      spentPoints = 0;
      console.log(spentObj);
      i += 1;
    }

    //Converts the object back into an array
    for(let record in spentObj) {
      spentArray.push({
        payer: record,
        points: spentObj[record]
      })
    }

  res.status(200).json(spentArray);

  } catch (err) {
    console.log(err.stack)
    next(err);
  }

})


module.exports = router;

