const express = require("express");
const authRouter = express.Router();
const {authValidator} = require("../validators");
const {authController} = require("../controllers");


authRouter.post('/signup', authValidator.validateUser, authController.signup );


module.exports = authRouter;