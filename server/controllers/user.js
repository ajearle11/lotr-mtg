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
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 600 }
    );

    const dataToSecure = {
      dataToSecure: accessToken,
    };

    res.cookie("AuthCookieLogin", JSON.stringify(dataToSecure), {
      // secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/users",
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
    });

    res.status(200).send({
      auth: true,
      token: accessToken,
      user: user,
      // refreshToken: refreshToken,
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

module.exports = { register, login, checkAuth };
