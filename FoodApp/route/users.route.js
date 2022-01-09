const router = require("express").Router();
const users = require("../controller/users.controller");

/* Get all users */
router.get("/", users.getUsers);

/* Get single user by Id */
router.get("/:userId", users.getUserById);

/* Update single user by Id */
router.put("/:userId", users.updateUser);

/* Delete single user by Id */
router.delete("/:userId", users.deleteUser);

module.exports = router;
