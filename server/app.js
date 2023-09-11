const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");
const mongoose = require("mongoose");
const userRouter = require("./routers/user");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(logRoutes);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    greeting: "Welcome to the LOTR: Tales of Middle Earth MTG card collector.",
  });
});

app.use("/users", userRouter);

module.exports = app;
