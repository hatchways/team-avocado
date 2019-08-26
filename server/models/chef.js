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
  travelRadius: Number,
  //will changed as order submit.
  availability: {
    Monday: [{ type: Array }],
    Tuesday: [{ type: Array }],
    Wednesday: [{ type: Array }],
    Thursday: [{ type: Array }],
    Friday: [{ type: Array }],
    Saturday: [{ type: Array }],
    Sunday: [{ type: Array }]
  },
  //will changed only if chef changed it. And it will go forward
  availability_default: {
    Monday: [{ type: Array }],
    Tuesday: [{ type: Array }],
    Wednesday: [{ type: Array }],
    Thursday: [{ type: Array }],
    Friday: [{ type: Array }],
    Saturday: [{ type: Array }],
    Sunday: [{ type: Array }]
  },
  //data structures to reduce time complexity.
  available_days: {
    Monday: { type: Boolean, default: false },
    Tuesday: { type: Boolean, default: false },
    Wednesday: { type: Boolean, default: false },
    Thursday: { type: Boolean, default: false },
    Friday: { type: Boolean, default: false },
    Saturday: { type: Boolean, default: false },
    Sunday: { type: Boolean, default: false }
  }
});

/**
 *  Retrieve all chefs within maximum travel radius from location arg.
 *  Then, filter those chefs to remove all those whose stored travelRadius
 *  is less than travel distance that would be required.
 */
chefSchema.statics.findChefsForLocation = async function(customerCoordinates) {
  // MongoDB expects coordinates in reverse of typical ordering
  // i.e. <longitude, latitude> instead of <latitude, longitude>

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
