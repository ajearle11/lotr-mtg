const mongoose = require("mongoose");

const userIds = [new mongoose.Types.ObjectId()];

const users = [
  {
    _id: userIds[0],
    username: "stinkyAl",
    password: "hello",
    cards: [0, 1, 2, 3],
  },
];
module.exports = users;
