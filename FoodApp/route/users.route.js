const router = require("express").Router();
const users = require("../controller/users.controller");

router.get("/", users.getAllUsers);

router.get("/:userId", users.getSingleUser);

router.put("/:userId", users.updateUser);

router.delete("/:userId", users.deleteUser);

module.exports = router;
