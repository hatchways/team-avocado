const mongoose = require("mongoose"),
  BaseUserModel = require("./user");

// TODO: Flesh out Chef model.

const ChefModel = BaseUserModel.discriminator(
  "Chef",
  new mongoose.Schema(
    {
      // This is just a placeholder property
      active: {
        type: Boolean,
        default: true
      }
    },
    { discriminatorKey: "kind" }
  )
);

module.exports = ChefModel;
