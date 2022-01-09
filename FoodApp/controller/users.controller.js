const userQuery = require("../query/users.query");

/* Get all the registered users */
async function getUsers(req, res) {
  try {
    var userinfo = await userQuery.getUsers();
    res.status(200).json(userinfo);
  } catch (err) {
    console.log(err);
    res.json({ error:err });
  }
}

/* Get single user by id */
async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await userQuery.getUserById(userId);
    if (user.length == 0) {
      res.status(404).json(`Sorry user with userid ${userId} not found`);
    }
    else{
      res.status(404).json(`Sorry user with userid ${userId} not found`);
    }
  } catch (err) {
    res.json({error:err})
  }
}

/* Update the user details */
async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const modifiedUser = req.body;
    let updatedUser = await userQuery.updateUser(userId, modifiedUser);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
    else{
      res.status(404).json(`Sorry user with userid ${userId} not found`);
    }
  } catch (err) {
    res.json({error:err})
  }
}

/* Remove user */
async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    let user = await userQuery.removeUser(userId)
    if(user){
      res.status(200).json("User Deleted Successfully");
    }
    else{
      res.status(404).json(`Sorry user with ${userId} not found`);
    }
  } catch (err) {
    res.json({error:err})
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
