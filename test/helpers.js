require("dotenv").config();

const { User, Chef, Customer, Dish } = require("../models");
const faker = require("faker");
const fs = require("fs");
const _ = require("lodash");
const { getRandomCoordPair, CoordPair } = require("../services/geo");

const SAN_FRAN_COORDS = new CoordPair(37.765517, -122.43849);
const cuisinesArray = [
  "American",
  "British",
  "Caribbean",
  "Chinese",
  "French",
  "Greek",
  "Indian",
  "Italian",
  "Mediterranean",
  "Mexican",
  "Morrocan",
  "Spanish",
  "Thai",
  "Turkish",
  "Vietnamese"
];

// Generates coordinate pairs defined in relation to referenceLocation
function generateRelativeCoordinates(referenceLocation) {
  return {
    generateNearbyPoint: function() {
      return referenceLocation
        .delta(_.random(-0.1, 0.1), _.random(-0.1, 0.1))
        .toGeoJsonPoint();
    },
    generateDistantPoint: function() {
      return referenceLocation
        .delta(_.random(-1, 1), _.random(-1, 1))
        .toGeoJsonPoint();
    }
  };
}

const {
  generateNearbyPoint,
  generateDistantPoint
} = generateRelativeCoordinates(SAN_FRAN_COORDS);

function generateFullName() {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}
function generateUser() {
  let uniqueUser = {
    name: generateFullName(),
    email: faker.internet.email(),
    password: "password",
    location: generateNearbyPoint(),
    avatar: faker.internet.avatar()
  };

  return uniqueUser;
}

function generateChef() {
  return {
    ...generateUser(),
    travelRadius: _.random(10, 100),
    description: faker.lorem.sentence(),
    cuisine: _.sample(cuisinesArray)
  };
}

function generateNChefs(n) {
  returnArr = [];

  _.times(() => returnArr.push(generateChef()), n);
  return returnArr;
}
function generateNCustomers(n) {
  returnArr = [];

  _.times(() => returnArr.push(generateCustomer()), n);

  return returnArr;
}

function generateCustomer() {
  return {
    ...generateUser()
  };
}

function generateDish(chefId) {
  return {
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    numPeopleServed: _.random(1, 25),
    chef: chefId,
    cuisine: _.sample(cuisinesArray),
    ingredients: faker.random.words(),
    requirements: faker.random.words(),
    dishImg: faker.image.food()
  };
}

async function insertNewChef(override = {}) {
  const newChef = { ...generateChef(), ...override };

  return await Chef.create(newChef);
}

async function insertNewCustomer(override = {}) {
  const newCustomer = { ...generateCustomer(), ...override };

  return await Customer.create(newCustomer);
}

async function insertNewDishForChef(chefId) {
  return await Dish.create(generateDish(chefId));
}

function writeToMockDataDirectory(data, filename) {
  fs.writeFileSync(`./${filename}.json`, data, { flag: "w" });
}

module.exports.generateMockDataJSON = function() {
  const chefs = generateNChefs(20),
    customers = generateNCustomers(20);

  const dishes = chefs.reduce((accum, chef) => {
    const newDishes = _.times(() => generateDish(chef.id), _.random(5, 15));
    accum.concat(newDishes);

    return accum;
  }, []);

  writeToMockDataDirectory(JSON.stringify(chefs), "./test/chefs");
  writeToMockDataDirectory(JSON.stringify(customers), "./test/customers");
  writeToMockDataDirectory(JSON.stringify(dishes), "./test/dishes");
};

module.exports.populateDB = async function(count) {
  const createdChefs = [];
  const createdCustomers = [];

  for (let i of _.range(count)) {
    createdChefs.push(await insertNewChef({ email: `chef${i}@email.com` }));
    createdCustomers.push(await insertNewCustomer());
  }
  for (let i of _.range(count)) {
    _.times(() => insertNewDishForChef(createdChefs[i]._id), _.random(5, 15));
  }
};

module.exports.dropUsers = async function() {
  await User.collection.drop();
};
module.exports.generateRelativeCoordinates = generateRelativeCoordinates;
module.exports.insertNewChef = insertNewChef;
module.exports.insertNewCustomer = insertNewCustomer;
module.exports.insertNewDishForChef = insertNewDishForChef;
