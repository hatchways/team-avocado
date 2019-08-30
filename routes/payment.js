const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require("../models/index");
const router = require("express").Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");

/**
 *  Using stripe sdk, attempt to create a charge; then return
 *  the result status to the client
 *
 *  source: 'https://stripe.com/docs/recipes/elements-react'
 */

router.post("/", async (req, res, next) => {
  console.dir(req.body);

  try {
    let { status } = await stripe.charges.create({
      amount: req.body.totalPrice,
      currency: "usd",
      description: "An example charge",
      source: req.body.tokenId
    });
    console.log("Status",status);
    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
