const { createUser, logInUser } = require("../service/user.service");
const {
  CREATED_HTTP_STATUS_CODE,
  BAD_REQUEST_HTTP_STATUS_CODE,
  UNAUTHORIZED_HTTP_STATUS_CODE,
} = require("../utils/constant");

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser(name, email, password);
    res
      .status(CREATED_HTTP_STATUS_CODE)
      .json({ success: true, userId: user.insertId, token: user.token });
  } catch (e) {
    // console.error(e);
    return res.status(BAD_REQUEST_HTTP_STATUS_CODE).json({ ...e });
  }
};

const logInUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await logInUser(email, password);
    res.status(CREATED_HTTP_STATUS_CODE).json({
      message: "Logged In Successfully!",
      userId: user.userId,
      token: user.token,
    });
  } catch (e) {
    // console.error(e);
    return res.status(UNAUTHORIZED_HTTP_STATUS_CODE).json({ ...e });
  }
};

module.exports = {
  createUserController,
  logInUserController,
};
