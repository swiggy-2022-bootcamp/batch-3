const User = require("../model/user.model");

/* Fetches all registered users */
exports.getUsers = async () => {
  const users = await User.find();
  return users;
};

/* Fetches single user by his id */
exports.getUserById = async (userId) => {
  const user = await User.find({ userId: userId });
  return user;
};

/* Updates user details */
exports.updateUser = async (userId, modifiedUser) => {
  const updatedUser = await User.findOneAndUpdate({ id: userId }, modifiedUser, {
    new: true,
  });
  return updatedUser;
};

/* deletes user details */
exports.removeUser = async userId => {
    const user = await User.findOneAndDelete({ id: userId });
    return user
}
