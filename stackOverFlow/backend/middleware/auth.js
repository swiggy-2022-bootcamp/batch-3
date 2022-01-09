const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  if (!token) {
    return await res
      .status(403)
      .json({ data: req.body, message: "Token not provided!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return await res
      .status(401)
      .json({ data: req.body, message: "Invalid credentials!" });
  }
  return next();
};

module.exports = { verifyToken };
