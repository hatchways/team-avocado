const { Chef,Customer,Order, User } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");

/**
 * GET chef's or customer's orders
 */
router.get("/:user_id", async (req, res, next) => {

    const user = await User.findById(req.params.user_id).populate("orders");

  res.status(200).send(user.orders);
});

/**
 * POST to /order/:chef_id/:customer_id to create new order 
 *  and push order_id to chef's and customer's orders
 */
router.post("/:chef_id/:customer_id", async (req, res, next) => {
    const { error } = validateOrder(req.body);
    if (error) return next(createError(400, error.details[0].message));

    const order = await Order.create(req.body);
    const chef = await Chef.findById(req.params.chef_id);
    const customer = await Customer.findById(req.params.customer_id);
    chef.orders.push(order._id);
    customer.orders.push(order._id);
    chef.save();
    customer.save();
  res.status(200).send(order);
});

/**
 * PUT chef's or customer's orders, and change the order status
 */
router.put("/:order_id", async (req, res, next) => {

    const order = await Order.findById(req.params.order_id);
    order.status = req.body.status;
    order.save();
  res.status(200).send(order);
});


const orderSchema = Joi.compile({
  price: Joi.required(),
  chef:Joi.required(),
  customer:Joi.required(),
  dishes: Joi.required(),
  bookedTime: Joi.required(),
});
function validateOrder(order) {
  return Joi.validate(order, orderSchema);
}

module.exports = router;
