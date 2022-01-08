var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

async function register(req, res) {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      username,
      housenumber,
      street,
      city,
      state,
      zip,
    } = req.body;
    if (
      !(
        firstname &&
        lastname &&
        email &&
        password &&
        username &&
        housenumber &&
        street &&
        city &&
        state &&
        zip
      )
    ) {
      res.status(400).send("All input are required");
    }

    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      username,
      address: {
        housenumber,
        street,
        city,
        state,
        zip,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      
      const message="User logged in successful"

      const obj={
        username: user.username,
        message,
        token
      }

      res.status(200).json(obj);
    } else {
      res.status(403).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  register,
  login,
};
