const express = require("express");
const userRouter = express.Router();
const {userController} = require("../controllers");
const {middleware} = require("../middlewares");

userRouter.get("/:id", middleware.verifyToken, userController.getUser);

module.exports = userRouter;