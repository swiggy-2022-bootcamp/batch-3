const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const UserUpvoteAnswer = require("../models/userUpvoteAnswer");
const UserDownvoteAnswer = require("../models/userDownvoteAnswer");

var router = express.Router();

// ---------------------------------ROUTES-------------------------------------------

// get answer details
router.get("/:answerID", userAuthentication, async (req, res) => {
  const answerID = req.params.answerID;
  //  check if the answer exists
  try {
    var answerExist = await Answer.findOne({ _id: answerID });
    if (!answerExist) {
      return res.status(404).json({ message: "Answer does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Answer ID Error", error });
  }

  res.json({
    answerID,
    body: answerExist.body,
    upvotes: answerExist.upvotes,
    downvotes: answerExist.downvotes,
  });
});

//
//
//
// upvote an answer
router.post("/:answerID/upvote", userAuthentication, async (req, res) => {
  const { email } = req.body;
  const answerID = req.params.answerID;
  const user = await User.findOne({ email });

  //  check if the answer exists
  try {
    var answerExist = await Answer.findOne({ _id: answerID });
    if (!answerExist) {
      return res.status(404).json({ message: "Answer does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Answer ID Error", error });
  }

  //  check if upvote exists
  try {
    var upvoteExist = await UserUpvoteAnswer.findOne({
      answerID,
      userID: user._id,
    });
    if (upvoteExist) {
      return res
        .status(200)
        .json({ message: "You have already upvoted this answer" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured", error });
  }

  try {
    //   create new upvote
    var upvote = new UserUpvoteAnswer({ userID: user._id, answerID });
    await upvote.save();
    await Answer.findByIdAndUpdate(answerID, { $inc: { upvotes: 1 } });

    // if answer was earlier downvoted by user then undo it.
    let downvote = await UserDownvoteAnswer.deleteOne({
      userID: user._id,
      answerID,
    });
    if (downvote.deletedCount)
      await Answer.findByIdAndUpdate(answerID, { $inc: { downvotes: -1 } });

    return res.status(201).json({
      message: "Answer Upvoted Successfully",
      answerID,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured", error });
  }
});

//
//
//
// downvote an answer
router.post("/:answerID/downvote", userAuthentication, async (req, res) => {
  const { email } = req.body;
  const answerID = req.params.answerID;
  const user = await User.findOne({ email });

  //  check if the answer exists
  try {
    var answerExist = await Answer.findOne({ _id: answerID });
    if (!answerExist) {
      return res.status(404).json({ message: "Answer does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Answer ID Error", error });
  }

  //  check if downvote exists
  try {
    var downvoteExist = await UserDownvoteAnswer.findOne({
      answerID,
      userID: user._id,
    });
    if (downvoteExist) {
      return res
        .status(200)
        .json({ message: "You have already downvoted this answer" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured", error });
  }

  try {
    //   create new downvote
    var downvote = new UserDownvoteAnswer({ userID: user._id, answerID });
    await downvote.save();
    await Answer.findByIdAndUpdate(answerID, { $inc: { downvotes: 1 } });

    // if answer was earlier upvoted by user then undo it.
    let upvote = await UserUpvoteAnswer.deleteOne({
      userID: user._id,
      answerID,
    });
    if (upvote.deletedCount)
      await Answer.findByIdAndUpdate(answerID, { $inc: { upvotes: -1 } });

    return res.status(201).json({
      message: "Answer Downvoted Successfully",
      answerID,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured", error });
  }
});

// --------------------------------MIDDLEWARE------------------------------------------

// this middleware handles jwt authentication
async function userAuthentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "mySecretKey", (err, result) => {
    if (result) {
      // add the email generated from jwt to req.body for further use
      req.body.email = result.email;
      next();
    } else
      res.status(401).json({ message: "Invalid Auth token. Login again." });
  });
}
module.exports = router;
