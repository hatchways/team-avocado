const { Schema } = require("mongoose"),
  BaseUserModel = require("./user"),
  { getDistance, CoordPair } = require("../services/geo"),
  config = require("config");

const MAX_TRAVEL_RADIUS = config.get("MAX_TRAVEL_RADIUS");

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
  cuisine: String,
  travelRadius: Number
});

/**
 *  Retrieve all chefs within maximum travel radius from location arg.
 *  Then, filter those chefs to remove all those whose stored travelRadius
 *  is less than travel distance that would be required.
 */
chefSchema.statics.findChefsForLocation = async function(customerCoordinates) {
  // MongoDB expects coordinates in reverse of typical ordering
  // i.e. <longitude, latitude> instead of <latitude, longitude>
  // console.log(`customerCoordinates: ${customerCoordinates}`);

  console.log(`customerCoordinates: ${customerCoordinates}`);

  const chefsWithinMaxTravelDistance = await this.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          customerCoordinates.get().reverse(), // reversed for geoJson ordering
          MAX_TRAVEL_RADIUS / 3963.2
        ]
      }
    }
  });

  const chefsWillingToTravelToCustomer = Array.from(
    chefsWithinMaxTravelDistance
  ).filter(chef => {
    const chefCoordinates = CoordPair.fromGeoJsonPoint(chef.location);

    return (
      chefCoordinates.getDistanceFrom(customerCoordinates) <= chef.travelRadius
    );
  });

  return chefsWillingToTravelToCustomer;
};

const ChefModel = BaseUserModel.discriminator("Chef", chefSchema, {
  discriminatorKey: "kind"
});

module.exports = ChefModel;
