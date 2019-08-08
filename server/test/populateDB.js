const { Chef, Customer, Dish } = require("../models");
const faker = require("faker");
const _ = require("lodash");

const SAN_FRAN_COORDS = [-122.43849, 37.765517];

// Generates coordinate pairs in the vicinity of San
const generatePoint = (function getRandomNearbyCoordinates(referenceLocation) {
  return function() {
    const newLong = referenceLocation[0] + _.random(-0.01, 0.1);
    const newLat = referenceLocation[1] + _.random(-0.01, 0.1);

    return { type: "Point", coordinates: [newLong, newLat] };
  };
})(SAN_FRAN_COORDS);

function generateFullName() {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}
function createUniqueUser() {
  let uniqueUser = {
    username: generateFullName(),
    email: faker.internet.email(),
    password: "password",
    location: generatePoint(),
    avatar: faker.internet.avatar()
  };

  return uniqueUser;
}

function createChef() {
  return {
    ...userGenerator.next().value,
    travelRadius: _.random(10, 100),
    description: faker.lorem.sentence()
  };
}

console.dir(createChef());

(async function() {
  await Chef.create(createChef());
})();
