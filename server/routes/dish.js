const { Chef, Dish } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");

/**
 * GET all dishes
 */
router.get("/", async (req, res, next) => {
  /**
   *    Retrieve all dishes
   */

  const dishes = await Dish.find();

  /**
   *    Return success message
   */
  res.status(200).send(dishes);
});

/**
 * POST to /dishes to create a new dish
 */
router.post("/", decodeToken, async (req, res, next) => {
  const { body, decoded } = req;

  const { error } = validateDish(body);
  if (error) return next(createError(400, error.details[0].message));

  /**
   *    Attempt to create the dish
   */

  const dish = await Dish.create({ ...body, chef: decoded._id });
  dish.save();
  /**
   *    Return success message
   */
  res.status(201).send("Dish created successfully");
});

/**
 *  Set a Chef's profile fields
 */
router.put(
  "/:userId",
  decodeToken,
  userIsAuthorized,
  async (req, res, next) => {
    const {
      params: { userId },
      body
    } = req;

    if (!validateChefProfileUpdate(body)) {
      return next(createError(400, "Invalid profile update."));
    }

    /**
     *  Attempt to apply updates
     */
    const chef = await Chef.findByIdAndUpdate(userId, body, {
      useFindAndModify: false
    });
    if (!chef) {
      return next(
        createError(400, `Chef with id ${userId} could not be found.`)
      );
    }

    res.status(200).send("Update successful");
  }
);

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
