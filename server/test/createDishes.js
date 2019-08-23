const { insertNewDishForChef } = require("./helpers");
const { insertNewChef } = require("./helpers");

(async function() {
  const testChef = await insertNewChef({ email: "chef@gmail.com" });

  console.dir(testChef);

  Array(10)
    .fill(0)
    .map(() => insertNewDishForChef(testChef.id));
})();
