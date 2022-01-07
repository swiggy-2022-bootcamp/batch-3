const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT;
const { query } = require("./models/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input

    console.log("here", req.body);
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database

    const checkIfUserExistQuery = `
    SELECT userId 
    FROM project1.users
    WHERE email = ?
    `;

    const checkIfUserExistParams = [email];

    const oldUser = await query(checkIfUserExistQuery, checkIfUserExistParams);

    console.log("old user", oldUser);

    if (oldUser.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    // encryptedPassword = await bcrypt.hash(password, 10);

    // // Create user in our database
    // const user = await User.create({
    //   first_name,
    //   last_name,
    //   email: email.toLowerCase(), // sanitize: convert email to lowercase
    //   password: encryptedPassword,
    // });

    // // Create token
    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );
    // // save user token
    // user.token = token;

    // return new user
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
