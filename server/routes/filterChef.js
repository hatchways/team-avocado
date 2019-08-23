const createError = require("http-errors"),
router = require("express").Router(),
{ Chef } = require("../models/index");

/**
 *  Get query of chefs depend on availability
 */
router.get(
    "/",
    async (req, res, next) => {
      const {
        body
      } = req;
      const query = {}
      query[body.week_day] = true
      const chefs = await Chef.find({"available_days.Monday":true});
      let rtchefs = []
    //   const chefs = await Chef.find();
      for(let j=0;j<chefs.length;j++){
          const availability = chefs[j].availability;
          const day_availability = availability[body.week_day];
          console.log(day_availability);
          for (let i=0;i<day_availability.length;i++){
              if (body.time<=day_availability[i][1] && body.time>=day_availability[i][0]){
                rtchefs.push(chefs[j]);
                break;
              }
          }

      }
      console.log(rtchefs);
      res.status(200).send(rtchefs);
    }
  );


  module.exports = router;
