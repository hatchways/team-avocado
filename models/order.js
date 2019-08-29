const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const User = require("./user");

orderedItemSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: "Dish" },
  numDishes: Number,
  /**
   *  Because price of dish may change in the future,
   *  we need to record its price at the time of this order
   */
  price: Number
});

const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
    numPeopleServed: Number,
    dishes: [orderedItemSchema],
    price: Number,
    bookedTime: Date,
    chef: { type: Schema.Types.ObjectId, ref: "Chef" },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" }
  },
  { timestamps: true }
);

/**
 *   When a new order is created, append its ID to the order lists
 *   of the appropriate chef and customer documents
 */

orderSchema.pre("save", async function() {
  if (this.isNew) {
    try {
      for (let id of [this.chef, this.customer]) {
        let user = await User.findById(id);
        user.orders.push(this._id);
        user.save();
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
