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

    console.log(req.session);

    res.status(200).send({
      auth: true,
      id: user._id,
      username: user.username,
      cards: user.cards,
      token: req.session.token,
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
        res.send("successful logout");
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    console.log(req.user);
    res.send({ auth: true, user: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneByUsername(username);
    console.log(user);
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

    if (user.cards.includes(newCard)) {
      user.cards = user.cards.filter((id) => id !== newCard);
    } else {
      user.cards.push(newCard);
    }
    await user.save();
    res.status(200).send(user.cards);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = { register, login, checkAuth, getUser, logout, updateCards };
