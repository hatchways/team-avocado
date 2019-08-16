const { User } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("config");

//handle request for /login
//check user email password and return user, jwt token and user type
router.post("/", async (req, res, next) => {
  console.log(req.body);

  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
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
