const {Chef, Customer} = require('../models/index')
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

//console.log(Customer);
//handle request for /signup
//check if user exist and store new user info in db, return jwt token and user.
router.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.type === 'chef'){
        usermodel = Chef;
    }else if (req.body.type === "customer"){
        usermodel = Customer;
    }

    return await storeUser(usermodel,req,res);
});


function validate(user){
    const schema = {
        username: Joi.string().max(255).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        type: Joi.string().required()
    };
  
    return Joi.validate(user,schema);
}

//store user in db depends on user type. return bad request or token and user.
async function storeUser(usermodel,req,res){
    
    let chefEmail = await Chef.findOne({ email:req.body.email });
    let customerEmail = await Customer.findOne({ email:req.body.email });

    if (chefEmail || customerEmail) return res.status(400).send('Email is already registered.');

    let chefName = await Chef.findOne({ username:req.body.username });
    let customerName = await Customer.findOne({ username:req.body.username });

    if (chefName || customerName) return res.status(400).send('This username is used.');

    user = new usermodel(_.pick(req.body,['username','email','password']));
    await user.save();
    const token = jwt.sign({_id:user._id}, config.get('jwtprivatekey'));
    return res.status(201).send({token,user});
    
}


module.exports = router;
