const createError = require("http-errors");
const router = require("express").Router();
const { Chef } = require("../models/index");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");
const fileUploadService = require("../services/fileUploader");

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
  const chef = await Chef.findById(userId)
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

router.post("/:userId/avatars", fileUploadService, async (req, res) => {


  const fileURL = req.file.location;

  // Add URL for uploaded photo to user document 
  await Chef.findByIdAndUpdate(req.params.userId, {avatar: fileURL});


  // Respond with 201
  res.status(201).send("Image uploaded");
})

function validateChefProfileUpdate(update) {
  const schema = {
    description: Joi.string(),
    active: Joi.bool()
  };

  return Joi.validate(update, schema);
}

module.exports = router;
