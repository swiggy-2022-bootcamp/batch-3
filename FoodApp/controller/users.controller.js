const userQuery = require("../query/users.query");

async function getAllUsers(req, res) {
  try {
    var userinfo = await userQuery.users();
    res.status(200).json(userinfo);
  } catch (err) {
    console.log(err);
    res.json({ msg: "allUsers failure" });
  }
}

async function getSingleUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await userQuery.userById(userId);
    if (user.length == 0) {
      res.status(404).json(`Sorry user with userid ${userId} not found`);
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const modifiedUser = req.body;
    let updatedUser = await userQuery.updateUser(userId, modifiedUser);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
    res.status(404).json(`Sorry user with userid ${userId} not found`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    let user = await userQuery.removeUser(userId)
    if(user){
      res.status(200).json("User Deleted Successfully");
    }
    res.status(404).json(`Sorry user with ${userId} not found`);
  } catch (err) {
    console.log("error", err);
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
