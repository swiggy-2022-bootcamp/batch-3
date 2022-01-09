const router = require("express").Router();
const users = require("../controller/users.controller");

router.get("/", users.getUsers);

router.get("/:userId", users.getUserById);

router.put("/:userId", users.updateUser);

router.delete("/:userId", users.deleteUser);

module.exports = router;
