const { Chef, Customer, Order, User } = require("../models/index");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const createError = require("http-errors");
const { decodeToken, userIsAuthorized } = require("../middleware/auth");

/**
 * GET an individual order by its ID
 */
router.get("/:order_id", async (req, res, next) => {
  const order = await Order.findById(req.params.order_id)
    .populate("chef")
    .populate("customer")
    .populate("dishes");

  res.status(200).send(order);
});

/**
 * GET all of a chef's or customer's orders
 */
router.get("/:user_id", async (req, res, next) => {
  // Get list of all user's orders
  const orders = await User.findById(req.params.user_id).orders;

  // For each order, populate chef, customer, and dishes fields with corresponding
  // documents
  const populatedOrders = await Promise.all(
    orders.map(orderId =>
      Order.findById(orderId)
        .populate("chef")
        .populate("customer")
        .populate("dishes")
    )
  );

  res.status(200).send(populatedOrders);
});

/**
 * POST to /order/:chef_id/:customer_id to create new order
 *  and push order_id to chef's and customer's orders
 */
router.post("/:chef_id/:customer_id", async (req, res, next) => {
  const { error } = validateOrder({
    ...req.body,
  });
  if (error) return next(createError(400, error.details[0].message));

  const order = await Order.create({
    ...req.body,
    chef_id: req.params.chef_id,
    customer_id: req.params.customer_id,
  });

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
  chef_name: Joi.required(),
  customer_name: Joi.required(),
  dishes: Joi.required(),
  bookedTime: Joi.required(),
  numPeopleServed: Joi.required()
});
function validateOrder(order) {
  return Joi.validate(order, orderSchema);
}

module.exports = router;
