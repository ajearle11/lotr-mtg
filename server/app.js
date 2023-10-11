const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");
const mongoose = require("mongoose");
const userRouter = require("./routers/user");
const session = require("express-session");
const app = express();

app.use(
  cors({
    origin: "https://lotr-mtg-collection.onrender.com/",
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(express.json());
app.use(logRoutes);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    // genid: function (req) {
    //   return genuuid(); // use UUIDs for session IDs
    // },
    secret: "AlexAndHarry",
    cookie: {
      //if there is two days of inactivity it will time out and the use will then have to log back in, but it will add two days of time on to the cookie if there is a successful match with the token middleware

      //this is 2 days
      maxAge: 3600000 * 48,
      // maxAge: 3600000,
      // expires: new Date(Date.now() + 3600000 * 48),
      // expires: new Date(Date.now() + 10000),
      sameSite: "lax",
      // httpOnly: false,
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    greeting: "Welcome to the LOTR: Tales of Middle Earth MTG collection page.",
  });
});

app.use("/users", userRouter);

module.exports = app;
