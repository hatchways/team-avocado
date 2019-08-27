const { Dish } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");
const fileUploadService = require("../services/fileUploader");

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
  res.status(201).send(dish);
});


/**
 *  Set a dish's fields
 */
router.put(
  "/:dishId/:userId",
  decodeToken,
  userIsAuthorized,
  async (req, res, next) => {
    const {
      params: { dishId,userId },
      body
    } = req;
    const { error } = validateDish(body);
    if (error) return next(createError(400, error.details[0].message));
    /**
     *  Attempt to apply updates
     */
    const dish = await Dish.findByIdAndUpdate(dishId, body, {
      useFindAndModify: false,
      new:true
    });
    if (!dish) {
      return next(
        createError(400, `Dish with id ${userId} could not be found.`)
      );
    }
    res.status(200).send(dish);
  }
);

router.post("/:dishId/dishImg", fileUploadService, async (req, res) => {
  const fileURL = req.file.location;
  // Add URL for uploaded photo to user document
  await Dish.findByIdAndUpdate(req.params.dishId, { dishImg: fileURL });

  // Respond with 201
  res.status(201).send(JSON.stringify(fileURL));
});

router.post("/dishImg", fileUploadService, async (req, res) => {
  const fileURL = req.file.location;
  // Add URL for uploaded photo to user document
  await Dish.findByIdAndUpdate(req.params.dishId, { dishImg: fileURL });

  // Respond with 201
  res.status(201).send(JSON.stringify(fileURL));
});

const dishSchema = Joi.compile({
  name: Joi.string().required(),
  numPeopleServed: Joi.required(),
  price: Joi.required(),
  cuisine: Joi.string(),
  chef:Joi.required(),
  ingredients: Joi.required(),
  requirements: Joi.required(),
  dishImg: Joi.string(),
});
function validateDish(dish) {
  return Joi.validate(dish, dishSchema);
}

module.exports = router;
