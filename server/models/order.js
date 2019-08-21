const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const orderSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  price: Number,
  bookedTime: Date,
  chef: { type: Schema.Types.ObjectId, ref:"Chef"},
  customer: { type: Schema.Types.ObjectId, ref:"Customer"},
},
{timestamp: true}
);

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
