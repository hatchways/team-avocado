const apiRouter = require("express").Router();

const signupRouter = require("./signup"),
  loginRouter = require("./login"),
  customerRouter = require("./customer"),
  chefRouter = require("./chef"),
  dishRouter = require("./dish"),
  orderRouter = require("./order"),
  paymentRouter = require("./payment"),
  filterChefRouter = require("./filterChef"),
  getEnvRouter = require("./getEnv");

apiRouter.use("/signup", signupRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/customer", customerRouter);
apiRouter.use("/chef", chefRouter);
apiRouter.use("/dish", dishRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/available_chef", filterChefRouter);
apiRouter.use("/getenv", getEnvRouter);

module.exports = apiRouter;
