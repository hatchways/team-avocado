const { Schema } = require("mongoose"),
  BaseUserModel = require("./user"),
  { getDistance, getCoordinates } = require("../services/geo");

const chefSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  description: {
    type: String,
    default: "This Chef has not added a description yet."
  },
  avatar: String,
  location: String,
  travelRadius: Number
});

/**
 *  Retrieve all chefs within maximum travel radius from location arg.
 *  Then, filter those chefs to remove all those whose stored travelRadius
 *  is too short.
 */
chefSchema.methods.findChefsForLocation = function(customerLocation) {
  function isCoords(input) {
    //TODO: check whether input is already in coordinate form (e.g. for cases when customer
    // has used geolocation browser API rather than manual address input)

    return false;
  }

  if (!isCoords(customerLocation)) {
    customerLocation = getCoordinates(customerLocation);

    //TODO: store result on Customer document to avoid unnecessary recalculation
  }

  const chefsWillingToTravelToLocation = this.model("Chef")
    .find({})
    .filter(chef => {});
};

const ChefModel = BaseUserModel.discriminator("Chef", chefSchema, {
  discriminatorKey: "kind"
});

module.exports = ChefModel;
