require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const User = require("./models/User");
const users = require("./database/index.js");

const app = require("./app");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
      //   User.insertMany(users);
    });
  })
  .catch((error) => console.log(`${error} did not connect.`));
