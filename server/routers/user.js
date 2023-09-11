const { Router } = require("express");

const userController = require("../controllers/user.js");
const { verifyToken } = require("../middleware/auth");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/isUserAuth", verifyToken, userController.checkAuth);

module.exports = userRouter;
