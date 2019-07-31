const {User} = require('../models/index')
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

//handle request for /login
//check user email password and return user, jwt token and user type
router.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email:req.body.email });
    if (!user) {
        return res.status(400).send("Invalid email or password");
    }
    const isvalidpassword = await user.comparePassword(req.body.password);
    if (!isvalidpassword) return res.status(400).send("Invalid email or password");
    const usertype = user.__t;
    const token = jwt.sign({_id:user._id}, config.get('jwtprivatekey'));
    res.status(200).send({token,user,usertype});
});

function validate(user){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };
  
    return Joi.validate(user,schema);
  }

module.exports = router;
