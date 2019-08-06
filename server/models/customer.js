const mongoose = require("mongoose"),
  BaseUserModel = require("./user");

const CustomerModel = BaseUserModel.discriminator(
  "Customer",
  new mongoose.Schema(
    {
      location: String
    },
    { discriminatorKey: "kind" }
  )
);

module.exports = CustomerModel;
