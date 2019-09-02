const mongoose = require("mongoose"),
  validator = require("validator"),
  bcrypt = require("bcrypt"),
  pointSchema = require("./point"),
  { Schema } = mongoose;

/**
 *  The User schema contains all properties, methods, and hooks that are shared
 *  between Chef and Customer type users.
 */

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: value => {
      return validator.isEmail(value);
    }
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  location: pointSchema,
  avatar: {
    type: String,
    default: "/userplaceholder.png"
  },
  background: String,
  strlocation: String,
  createdAt: {
    type: Date,
    require: true,
    default: new Date()
  },
  updatedAt: Date
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("email")) {
      return next();
    }

    this.email = normalizeEmail(this.email);

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

// A method wrapper for bcrypt comparison operation, used by auth middleware
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  let isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

// ========================
// Helper functions
// ========================

function normalizeEmail(emailString) {
  // '.' characters and uppercase letters must be ignored,
  // so that, e.g., "John.Smith@gmail" is rejected if "johnsmith@gmail"
  // already exists in DB.

  emailString = emailString.toLowerCase();

  const split = emailString.split("@");

  return split[0].replace(".", "") + "@" + split[1];
}
