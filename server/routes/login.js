const { Chef, Customer } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
var createError = require("http-errors");
const config = require("config");

//handle request for /login
//check user email password and return user, jwt token and user type
router.post("/", async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Chef.findOne({ email: req.body.email });
  let usertype = "chef";
  if (!user) {
    user = await Customer.findOne({ email: req.body.email });
    usertype = "customer";
    if (!user) {
      return next(createError(400, "Invalid email or password"));
    }
  }
  console.log("in login");
  const isvalidpassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isvalidpassword)
    return next(createError(400, "Invalid email or password"));

  const token = jwt.sign({ _id: user._id }, config.get("jwtprivatekey"));
  res.status(200).send({ token, user, usertype });
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
