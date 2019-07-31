const {Chef, Customer} = require('../models/index')
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

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
    
    try{
        user = new usermodel(_.pick(req.body,['username','email','password']));
        await user.save();
        const token = jwt.sign({_id:user._id}, config.get('jwtprivatekey'));
        return res.status(201).send({token,user});
    }catch (err){
        return res.status(400).send(err.errmsg);
    }
    
}


module.exports = router;
