const { Chef } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");


router.get("/", async (req,res,next) => {
  let chefs;
  
  try {
    if (req.query.location){
      chefs = await Chef.findChefsForLocation(req.query.location);
    } else{
      chefs = await Chef.find();
    }
  } catch (error) {
    next(createError(400, "Failed to retrieve chefs."));
  }

  res.status(200).send(chefs);
})


/**
 * GET a Chef
 */
router.get("/:userId", async (req, res, next) => {
  const {
    params: { userId }
  } = req;

  /**
   *    Attempt to retrieve Chef identified by :userId
   */
  const chef =await Chef.findById(userId)
    .select("-password")
    .populate("dishes");

  if (!chef) {
    return next(createError(400, `Chef with id ${userId} could not be found.`));
  }

  /**
   *    Return JSON containing: Chef's name, description, and populated array of dishes.
   */
  res.status(200).send(chef);
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
    const chef =await Chef.findByIdAndUpdate(userId, body, {
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

function validateChefProfileUpdate(update) {
  const schema = {
    description: Joi.string(),
    active: Joi.bool()
  };

  return Joi.validate(update, schema);
}

module.exports = router;
