const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dayjs = require("dayjs");

/* REGISTER USER */
const register = async (req, res) => {
  try {
    const { body } = req;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const passwordHash = await bcrypt.hash(body.password, salt);

    const newUser = await User.createUser(body, passwordHash);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOneByUsername(username);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 6000 }
    );

    req.session.token = accessToken;
    req.session.name = username;

    res.status(200).send({
      auth: true,
      id: user._id,
      username: user.username,
      cards: user.cards,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("unable to log out");
      } else {
        res.json({ success: "successful logout" });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.send({ auth: true, user: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneByUsername(username);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const updateCards = async (req, res) => {
  try {
    const { username } = req.params;
    const { newCard } = req.body;
    const user = await User.findOneByUsername(username);

    if (typeof newCard == "number") {
      if (user.cards.includes(newCard)) {
        user.cards = user.cards.filter((id) => id !== newCard);
      } else {
        user.cards.push(newCard);
      }
    } else if (newCard.length === undefined) {
      res.status(404).send({ message: error.message });
    } else {
      for (let i = 0; i < newCard.length; i++) {
        if (user.cards.includes(newCard[i])) {
          user.cards = user.cards.filter((id) => id !== newCard[i]);
        } else {
          user.cards.push(newCard[i]);
        }
      }
    }

    await user.save();
    res.status(200).send(user.cards);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = { register, login, checkAuth, getUser, logout, updateCards };
