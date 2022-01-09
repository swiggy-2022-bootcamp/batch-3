const User = require("../model/user.model");

exports.getUsers = async () => {
  const users = await User.find();
  return users;
};
exports.getUserById = async (userId) => {
  const user = await User.find({ userId: userId });
  return user;
};
exports.updateUser = async (userId, modifiedUser) => {
  const updatedUser = await User.findOneAndUpdate({ id: userId }, modifiedUser, {
    new: true,
  });
  return updatedUser;
};
exports.removeUser = async userId => {
    const user = await User.findOneAndDelete({ id: userId });
    return user
}
