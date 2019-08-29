const _ = require("lodash");

const {
  insertNewDishForChef,
  insertNewChef,
  insertNewCustomer,
  dropUsers
} = require("./helpers");

dropUsers();

const newChefs = [];

try {
  (async function() {
    for (let n of _.range(10)) {
      await insertNewCustomer({ email: `customer${n}@gmail.com` });

      newChefs.push(await insertNewChef({ email: `chef${n}@gmail.com` }));
    }

    console.log("Done with chefs!");

    await new Promise((resolve, reject) =>
      setTimeout(() => resolve("done"), 2000)
    );

    for (let chef of newChefs) {
      console.log("creating dishs for chef with id ", chef._id);

      await insertNewDishForChef(chef._id);
      await insertNewDishForChef(chef._id);
      await insertNewDishForChef(chef._id);
    }

    process.exit(0);
  })();
} catch (error) {
  console.log(error);
}
