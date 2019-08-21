const { Schema } = require("mongoose"),
  BaseUserModel = require("./user");



const customerSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: "This Customer has not added a description yet."
  },
  favorite: [String],
});

const CustomerModel = BaseUserModel.discriminator("Customer", customerSchema, {
  discriminatorKey: "kind"
});
module.exports = CustomerModel;
