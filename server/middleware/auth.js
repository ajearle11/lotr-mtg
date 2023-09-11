const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["Set-Cookie"];
    console.log(token);
    console.log(req.cookies);

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });

    next();
  } catch (err) {
    res.status(500).json({ auth: false, error: err.message });
  }
};

module.exports = { verifyToken };
