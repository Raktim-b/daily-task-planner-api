const express = require("express");

const AuthCheck = require("../middleware/auth");
const authController = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/verify/:token", authController.verify);
authRouter.get("/profile", AuthCheck, authController.profile);

module.exports = authRouter;
