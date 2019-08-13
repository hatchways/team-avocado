const mongoose = require("mongoose"),
  User = require("./user");

// mongoose.set("debug", true);

// Connect to a local Mongo instance for testing purposes

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true, // Use new url parser instead of default deprecated one
  useCreateIndex: true, //ensure index is deprecated use createindex instead.
  keepAlive: true
});

User.collection.createIndex({ location: "2dsphere" });

// Construct URI and connect to the database
// const { DB_USER, DB_PASSWORD, DB_HOSTNAME, DB_NAME } = process.env;
// mongoose.connect(
//   `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}:27017/${DB_NAME}`,
//   {
//     useNewUrlParser: true, // Use new url parser instead of default deprecated one
//     keepAlive: true
//   }
// );

// Export all schemas
module.exports.User = User;
module.exports.Chef = require("./chef");
module.exports.Customer = require("./customer");
module.exports.Dish = require("./dish");
