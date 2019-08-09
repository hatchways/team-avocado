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
    username: generateFullName(),
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

function generateCustomer() {
  return {
    ...generateUser()
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

function writeToMockDataDirectory(data) {
  fs.writeFileSync("./mockData.json", data, { flag: "w" });
}

module.exports.generateMockDataJSON = function() {
  const mockUsers = [];

  _.times(100, () => {
    const mockUser = generateChef();

    mockUsers.push(mockUser);

    // mockUsers += generate
  });
  console.log("writing...\n", mockUsers);

  writeToMockDataDirectory(JSON.stringify(mockUsers));
};

module.exports.populateDB = async function(count) {
  for (let i of _.range(count)) {
    await insertNewChef();
    await insertNewCustomer();
  }
};

module.exports.dropUsers = async function() {
  await User.collection.drop();
};
module.exports.generateRelativeCoordinates = generateRelativeCoordinates;
module.exports.insertNewChef = insertNewChef;
module.exports.insertNewCustomer = insertNewCustomer;
