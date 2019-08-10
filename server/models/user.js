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
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: pointSchema,
  avatar: String,

  createdAt: {
    type: Date,
    require: true,
    default: new Date()
  },
  updatedAt: Date
});

// This "pre hook" lets us arrange for a function to be called
// before a new document is saved to the db
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

userSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

// A method wrapper for bcrypt comparison operation, used by auth middleware
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
