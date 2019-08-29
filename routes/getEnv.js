const createError = require("http-errors"),
router = require("express").Router(),
{ Chef } = require("../models/index");

/**
 *  Get query of chefs depend on availability
 */
router.get(
    "/CHEF_MENU_GOOGLE_MAP",
    async (req, res, next) => {
        // const {
        //     params: { variable }
        //   } = req;
        // console.log("Variable:",variable);
        // if(variable === "CHEF_MENU_GOOGLE_MAP"){
        res.status(200).send(JSON.stringify(process.env.CHEF_MENU_GOOGLE_MAP));
      
    }
  );


  module.exports = router;
