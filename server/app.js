const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { signupRouter, loginRouter, chefRouter } = require("./routes");
const config = require("config");

const app = express();

//setup jwtprivatekey in local environment, export chefsmenujwtprivatekey=placeholderkey
if (!config.get("jwtprivatekey")) {
  console.error("FATAL ERROR: jwtprivatekey is not defined");
  process.exit(1);
}

app.use(cors());
app.options("*", cors()); // For "complex" CORS requests that require preflighting

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res) => console.dir(req.body));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/chef", chefRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on ${port}...`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Log error
  console.error(err);

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
