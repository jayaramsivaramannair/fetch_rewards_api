const Rewards = require("./rewardsModel.js")

const checkRewardsExist = async (req, res, next) => {
  try {
    const balance = await Rewards.findById(req.params.id)

    if(balance.length === 0) {
      res.status(400).json({message: 'User has no rewards yet!'})
      return
    }
    //Make the balance available to middlewares downstream
    req.balance = balance
    next()
  } catch {
    next(err)
  }
}


const checkEnoughBalanceExists = async (req, res, next) => {
  try {
    const totalRewards = await Rewards.getTotalRewards(req.params.id);
    const {points} = req.body;
    if(!points) {
      res.status(400).json({message: 'Missing points information from the request body'})
      return 
    }

    if(totalRewards < points) {
      res.status(200).json({message: 'User does not have enough rewards!'})
      return
    } else {
      next()
    }
  } catch {
    next(err)
  }
}


module.exports = {
  checkRewardsExist,
  checkEnoughBalanceExists
}