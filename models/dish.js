const mongoose = require("mongoose");

const cuisinesArray = [
  "American",
  "British",
  "Caribbean",
  "Chinese",
  "French",
  "Greek",
  "Indian",
  "Italian",
  "Japanese",
  "Mediterranean",
  "Mexican",
  "Morrocan",
  "Spanish",
  "Thai",
  "Turkish",
  "Vietnamese"
];

const DishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef",
    required: true
  },

  numPeopleServed: {
    type: Number,
    required: true,
    max: 25
  },

  price: {
    type: Number,
    required: true,
    min: 10
  },

  cuisine: {
    type: String,
    require: true,
    enum: cuisinesArray
  },

  ingredients: {
    type: [String],
    required: true
  },

  requirements: {
    type: [String],
    requried: true
  },

  dishImg: String
});

/**
 *  Whenever a dish is saved, its _id property must be stored on the corresponding Chef document.
 */

DishSchema.pre("save", async function(next) {
  if (this.isNew) {
    try {
      console.dir(this);

      const Chef = mongoose.model("Chef");

      let chef = await Chef.findById(this.chef);
      chef.dishes.push(this._id);

      chef.save();

      next();
    } catch (err) {
      next(err);
    }
  }
});

/**
 *  When a dish is removed, its _id property must be removed from the corresponding Chef document.
 */

DishSchema.post("remove", async () => {
  const chef = await Chef.findById(this.chef);

  chef.dishes = chef.dishes.filter(dishId => dishId !== this._id);

  chef.save();
});

DishModel = mongoose.model("Dish", DishSchema);

module.exports = DishModel;
