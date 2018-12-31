const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const authMiddleware = {

  hasAuthorization(req, res, next) {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, config.jwtSecret, (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = decoded._doc;
        next();
      });
    } else {
      return res.sendStatus(403);
    }
  },

  isAdministrator(req, res, next) {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, config.jwtSecret, (err, decoded) => {
        if (!err && decoded._doc && decoded._doc.isAdmin) {
          req.user = decoded._doc;
          next();
          return;
        }

        return res.sendStatus(403);
      });
    } else {
      return res.sendStatus(401);
    }
  }
};

module.exports = authMiddleware;
