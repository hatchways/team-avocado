const { dropUsers, populateDB } = require("./helpers");

dropUsers().then(() => populateDB(2));
