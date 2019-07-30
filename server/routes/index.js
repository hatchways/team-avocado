const express = require("express");
const signupRouter = require('./signup');
const app = express()
const loginRouter = require('./login');
const config = require('config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup jwtprivatekey in local environment, export chefsmenujwtprivatekey=placeholderkey
if(!config.get('jwtprivatekey')) {
    console.error("FATAL ERROR: jwtprivatekey is not defined");
    process.exit(1);
}

app.use("/signup",signupRouter);
app.use("/login",loginRouter);


const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`Listening on ${port}...`));





