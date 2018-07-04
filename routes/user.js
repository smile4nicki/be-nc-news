const userRouter = require("express").Router();
const { getAllUsers, getUserById } = require("../controllers/user");

userRouter.route("/").get(getAllUsers);
userRouter.route("/:user_id").get(getUserById);

module.exports = { userRouter };
