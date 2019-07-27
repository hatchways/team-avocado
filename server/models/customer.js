const mongoose = require("mongoose"),
  BaseUserModel = require("./user");

// TODO: Add to Customer model.
const CustomerModel = BaseUserModel.discriminator(
  "Customer",
  new mongoose.Schema(
    {
      // This is just a placeholder property
      mealsOrdered: {
        type: Number,
        default: 0
      }
    },
    { discriminatorKey: "kind" }
  )
);

module.exports = CustomerModel;
