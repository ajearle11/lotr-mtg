const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    //retrieve the cookie from the session (req.session.token)

    let token = req.session.token;

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;

      req.session.cookie.maxAge = 3600000 * 480;
      req.session.cookie.expires = 3600000 * 480;
      next();
    });
  } catch (err) {
    res.status(500).json({ auth: false, error: err.message });
  }
};

module.exports = { verifyToken };
