const { Schema } = require("mongoose"),
  BaseUserModel = require("./user");

const ChefModel = BaseUserModel.discriminator(
  "Chef",
  new Schema(
    {
      active: {
        type: Boolean,
        default: true
      },
      dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
      description: {
        type: String,
        default: "This Chef has not added a description yet."
      },
      avatar: String
    },
    { discriminatorKey: "kind" }
  )
);

module.exports = ChefModel;
