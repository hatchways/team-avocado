const mongoose = require("mongoose");

mongoose.set("debug", true);

// Construct URI and connect to the database
const { DB_USER, DB_PASSWORD, DB_HOSTNAME, DB_NAME } = process.env;
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}:27017/${DB_NAME}`,
  {
    useNewUrlParser: true, // Use new url parser instead of default deprecated one
    keepAlive: true
  }
);

// Export all schemas
module.exports.User = require("./user");
module.exports.Chef = require("./chef");
module.exports.Customer = require("./customer");
