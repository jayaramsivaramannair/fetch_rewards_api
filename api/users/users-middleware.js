const Users = require("./usersModel.js")

const checkUserExists = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    } 

    next();
  } catch (err) {
    next(err)
  }
}


module.exports = {
  checkUserExists,
}