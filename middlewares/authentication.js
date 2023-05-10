const { User } = require("../models");
const { verifyToken } = require("../hellpers/jwt");

function auth(req, res, next) {
  try {
    const token = req.get("token");
    const userDecoded = verifyToken(token);
    User.findOne({
      where: {
        id: userDecoded.id,
        email: userDecoded.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            name: "Authentication Error",
            devMessage: "JSON Web Token is not valid",
          });
        }
        res.locals.user = user;
        return next();
      })
      .catch((err) => {
        return res.status(401).json(err);
      });
  } catch (err) {
    return res.status(401).json(err);
  }
}

module.exports = auth;
