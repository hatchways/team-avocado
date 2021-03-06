const { Customer } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");
const fileUploadService = require("../services/fileUploader");

/**
 * GET a Customer
 *
 * Only the customers themselves and chefs whom they
 * have messaged with are able to view customer profile.
 */
router.get(
  "/:userId",
  decodeToken,
  userIsAuthorized,
  async (req, res, next) => {
    const {
      params: { userId }
    } = req;

    /**
     *    Attempt to retrieve Customer identified by :userId
     */
    const customer = await Customer.findById(userId).select("-password");

    if (!customer) {
      return next(
        createError(400, `Customer with id ${userId} could not be found.`)
      );
    }

    /**
     *    Return JSON containing: Customer's name, location,
     */
    res.status(200).send(customer);
  }
);

/**
 *  Set a Customer's profile fields
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

    if (!validateCustomerProfileUpdate(body)) {
      return next(createError(400, "Invalid profile update."));
    }

    /**
     *  Attempt to apply updates
     */
    const customer = await Customer.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new:true
    });
    if (!customer) {
      return next(
        createError(400, `Customer with id ${userId} could not be found.`)
      );
    }

    res.status(200).send(customer);
  }
);

router.post("/:userId/avatar", fileUploadService, async (req, res) => {
  const fileURL = req.file.location;

  // Add URL for uploaded photo to user document
  await Customer.findByIdAndUpdate(req.params.userId, { avatar: fileURL });

  // Respond with 201
  res.status(201).send(JSON.stringify(fileURL));
});


const customerUpdateSchema = Joi.compile({
  avatar: Joi.string()
});
function validateCustomerProfileUpdate(update) {
  return Joi.validate(update, customerUpdateSchema);
}

module.exports = router;
