const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const Question = require('../../models/questionModel')

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
  // Connect to mongodb Atlas database
  mongoose.connect(DB).then(() => console.log('DB connection successful!'));
  
const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
const userOne = {
    _id: userOneId,
    name: 'test',
    email: 'test@example.com',
    password: 'test5678',
}
const userTwo = {
  _id: userTwoId,
  name: 'test1',
  email: 'test1@example.com',
  password: 'test5678',
}
const token = signToken(userOne._id)
const token2=signToken(userTwo._id)
const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}
const setupDatabase2 = async () => {
  await User.deleteMany()
  await Question.deleteMany()
  await new User(userTwo).save()
}
module.exports = {
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    token2,
    setupDatabase,
    setupDatabase2,
    token
}