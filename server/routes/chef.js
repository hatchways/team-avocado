const createError = require("http-errors"),
  router = require("express").Router(),
  { Chef } = require("../models/index"),
  Joi = require("joi"),
  { decodeToken, userIsAuthorized } = require("../middleware/auth"),
  { getCoordinates, CoordPair } = require("../services/geo"),
  fileUploadService = require("../services/fileUploader");

router.get("/", async (req, res, next) => {
  let chefs;

  try {
    if (req.query.location) {
      const normalizedLocation = await normalizeLocation(req.query.location);
      chefs = await Chef.findChefsForLocation(normalizedLocation);
    } else {
      chefs = await Chef.find().select("-password");
    }
  } catch (error) {
    console.log(error);

    next(createError(400, "Failed to retrieve chefs."));
  }

  res.status(200).send(chefs);
});

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
 * GET a Chef's availability, if its not needed, just delete this route.
 */
router.get("/:userId/availability", async (req, res, next) => {
  const {
    params: { userId }
  } = req;
  /**
   *    Attempt to retrieve Chef identified by :userId
   */
  const chef = await Chef.findById(userId);

  if (!chef) {
    return next(createError(400, `Chef with id ${userId} could not be found.`));
  }


  res.status(200).send(chef.availability);
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
      useFindAndModify: false,
      new:true
    });
    if (!chef) {
      return next(
        createError(400, `Chef with id ${userId} could not be found.`)
      );
    }
    const token = req.headers.authorization.split(" ")[1];

    res.status(200).send({token, usertype:"chef", name: chef.name, id: chef._id});
  }
);

/**
 *  Set a Chef's availability
 */
router.put(
  "/:userId/availability",
  decodeToken,
  userIsAuthorized,
  async (req, res, next) => {
    const {
      params: { userId },
      body
    } = req;

    /**
     *  Attempt to apply updates
     */
    const chef = await Chef.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new:true
    });
    if (!chef) {
      return next(
        createError(400, `Chef with id ${userId} could not be found.`)
      );
    }
    chef.availability_default = chef.availability;
    const week_days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    function setAvailable_days(week_day){
      if(chef.availability[week_day].length>0){
        chef.available_days[week_day] = true;
      }else{
        chef.available_days[week_day] = false;
      }
    }
    week_days.forEach(setAvailable_days);
    chef.save()
    const token = req.headers.authorization.split(" ")[1];
    res.status(200).send({availability:chef.availability,token, usertype:"chef", name: chef.name, id: chef._id});
  }
);



router.post("/:userId/avatar", fileUploadService, async (req, res) => {
  const fileURL = req.file.location;

  // Add URL for uploaded photo to user document
  await Chef.findByIdAndUpdate(req.params.userId, { avatar: fileURL });

  // Respond with 201
  res.status(201).send(JSON.stringify(fileURL));
});


router.post("/:userId/chef_background", fileUploadService, async (req, res) => {
  const fileURL = req.file.location;
  console.log("bg url",fileURL);
  // Add URL for uploaded photo to user document
  await Chef.findByIdAndUpdate(req.params.userId, { background: fileURL });

  // Respond with 201
  res.status(201).send(JSON.stringify(fileURL));
});



module.exports = router;

function validateChefProfileUpdate(update) {
  const schema = {
    description: Joi.string(),
    active: Joi.bool()
  };

  return Joi.validate(update, schema);
}

async function normalizeLocation(location) {
  if (!isURLEncodedCoordPair(location)) {
    return await getCoordinates(location);
  } else {
    location = location.split(" ").map(substr => Number(substr));
    return new CoordPair(location);
  }
}

function isURLEncodedCoordPair(locationInput) {
  // Check whether input is already in coordinate form (e.g. for cases when customer
  // has used geolocation browser API rather than manual address input)
  return /-?\d{1,3}(\.\d+)? -?\d{1,3}(\.\d+)?$/.test(locationInput);
}
