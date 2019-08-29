const { User } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("config");

/**
 * Search DB for document matching body.email. If found return JSON of the following structure:
 *
 *  {
 *    token: <token string>
 *    name: <name>
 *    id: <user id>
 *    userType: "Customer" || "Chef"
 *  }
 *
 */

router.post("/", async (req, res, next) => {

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(createError(400, "Invalid email or password"));
  }
  const isvalidpassword = await user.comparePassword(req.body.password);
  if (!isvalidpassword)
    return next(createError(400, "Invalid email or password"));

  const usertype = user.__t;
  const token = jwt.sign({ _id: user._id }, config.get("jwtprivatekey"));

  res.status(200).send({ token, usertype, name: user.name, id: user._id });
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;
