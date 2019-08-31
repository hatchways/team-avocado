jwt = require("jsonwebtoken");
createError = require("http-errors");

module.exports.decodeToken = async function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    /**
     *  Attempt to decode the token and attach to request object
     */
    req.decoded = await jwt.decode(token);
    next();
  } catch (error) {
    return next(createError(401, "Sign in first."));
  }
};

module.exports.userIsAuthorized = function(req, res, next) {
  /**
   *  Compare id stored in JWT to id in request parameter
   */

  const {
    params: { userId },
    decoded
  } = req;
  console.log("Userid and 403",userId,decoded._id);
  if (userId !== decoded._id) {
    return next(createError(403, "Unauthorized."));
  } else return next();
};
