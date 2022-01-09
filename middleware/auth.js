const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let jwtToken = req.headers.authorization.split(" ")[1];
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, result) => {
      if (result) {
        next();
      } else {
        res.json({ msg: "Login Failed ....." });
      }
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
