const { Chef, Dish } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken } = require("../middleware/auth");

/**
 * GET all dishes
 */
router.get("/", async (req, res, next) => {
  /**
   *    Retrieve all dishes
   */

  const dishes = await Dish.find();

  /**
   *    Return array containing all dishes
   */
  res.status(200).send(dishes);
});

/**
 * POST to /dish to create a new dish
 */
router.post("/", decodeToken, async (req, res, next) => {
  const { body, decoded } = req;

  const { error } = validateDish(body);
  if (error) return next(createError(400, error.details[0].message));

  /**
   *    Attempt to create the dish
   */

  const dish = await Dish.create({ ...body, chef: decoded._id });

  /**
   *    Return success message
   */
  res.status(201).send("Dish created successfully");
});

const dishSchema = Joi.compile({
  name: Joi.string().required(),
  numPeopleServed: Joi.number().required(),
  price: Joi.number().required(),
  cuisine: Joi.string().required(),
  ingredients: Joi.array()
    .items(Joi.string())
    .required()
});
function validateDish(dish) {
  return Joi.validate(dish, dishSchema);
}

module.exports = router;
