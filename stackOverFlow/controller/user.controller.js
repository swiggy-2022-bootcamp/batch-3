const { createUser, logInUser } = require("../service/user.service");

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser(name, email, password);
    res
      .status(201)
      .json({ success: true, userId: user.insertId, token: user.token });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

const logInUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await logInUser(email, password);
    res.status(201).json({
      message: "Logged In Successfully!",
      userId: user.userId,
      token: user.token,
    });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

module.exports = {
  createUserController,
  logInUserController,
};
