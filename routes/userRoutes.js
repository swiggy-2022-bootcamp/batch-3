const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

router.post("/register", async (req, res, next) => {
  try {
    let { id, username, email, password, address } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let user = new User({
      id,
      username,
      email,
      password: hashedPassword,
      address,
    });
    var emailExist = await User.findOne({ email });
    var idExist = await User.findOne({ id });
    if (emailExist || idExist) {
      return res.status(403).json({ error: "User Already Exists!" });
    }
    var savedUser = await user.save();
    res.status(201).json({ user: savedUser });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

router.post("/authenticate", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    var emailExist = await User.findOne({ email });
    if (!emailExist) {
      res
        .status(401)
        .json({ error: "User is Not Registered! Please Register." });
    } else {
      const validpass = await bcrypt.compare(password, emailExist.password);
      if (!validpass) res.status(403).send({ error: "Invalid Password!" });
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res
        .header("auth-token", token)
        .send({ message: "User logged in successful", token: token });
    }
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    var userInfo = await User.find();
    res.status(200).json({ users: userInfo });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

router.get("/users/:userID", auth, async (req, res) => {
  try {
    const userId = req.params.userID;
    var userInfo = await User.findOne({ id: userId });
    if (!userInfo) {
      res.status(404).json({ message: `Sorry user With ${userId} not found` });
    }
    res.status(200).json({ user: userInfo });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

router.put("/users", auth, async (req, res) => {
  try {
    let { id, username, email, address } = req.body;
    var userInfo = await User.findOne({ id: id });
    if (!userInfo) {
      res.status(404).json({ message: `Sorry user With ${id} not found` });
    }
    await User.updateOne(
      { id: id },
      {
        $set: {
          username: username,
          email: email,
          address: address,
        },
      }
    );
    res.status(200).json({ message: "User Updated Succesfully!" });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

router.delete("/users/:userID", auth, async (req, res) => {
  try {
    const userId = req.params.userID;
    var userRemoved = await User.findOneAndRemove({ id: userId });
    if (!userRemoved) {
      res.status(404).json({ message: `Sorry user With ${id} not found` });
    }
    res.status(200).json({ message: "User Deleted Succesfully" });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

module.exports = router;
