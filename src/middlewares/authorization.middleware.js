const jwt = require('jsonwebtoken')
require('../config/env.config')

exports.verifyValidJWT = (req, res, next) => {
  // console.log(req);
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).json({
          ok: false,
          err: "Unauthorized, Need a valid token"
        });
      } else {
        req.jwt = jwt.verify(authorization[1], process.env.SEED_AUTH);
        return next();
      }
    } catch (error) {
      return res.status(401).json({
        ok: false,
        err: "Unauthorized, need a valid token -> " + error.message
      });
    }
  } else {
    return res.status(401).json({
      ok: false,
      err: "Need to recieve a valid token"
    });
  }
}