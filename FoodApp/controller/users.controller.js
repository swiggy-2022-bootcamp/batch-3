var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

async function getAllUsers(req, res) {
  try {
    var userinfo = await User.find({});
    res.status(200).json(userinfo);
  } catch (err) {
    console.log(err);
    res.json({ msg: "allUsers failure" });
  }
}

async function getSingleUser(req, res) {
  try {
    const { userId } = req.params;
    console.log(userId, "userid");
    User.find({ id: userId }, function (err, docs) {
      if (err) {
        res.status(404).json("err");
      } else {
        if (docs.length == 0) {
          res.status(404).json(`Sorry user with userid ${userId} not found`);
        }
        res.status(200).json(docs[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const modifiedUser = req.body
    User.findOneAndUpdate(
      { id: userId },
      modifiedUser,
      {new: true},
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          if(docs){
            res.status(200).json(docs)
          }
          else{
            res.status(404).json(`Sorry user with userid ${userId} not found`)
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    User.findOneAndDelete({ id: userId }, function (err, docs) {
      if (err) {
        console.log(err);
        res.status(404).json(`Sorry user with ${userId} not found`);
      } else {
        res.status(200).json("User Deleted Successfully");
      }
    });
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
