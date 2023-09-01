const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const _ = require('lodash');
const {User} = require('../models/user'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
dotenv.config();
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
   let user = await User.findOne({ email: req.body.email});
   if(!user)  return res.status(400).json({
    
    message:'Invalid email or password'});
 const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).json({message:'Invalid email or password'});
  const token = user.getSignedJwtToken();
   res
   .json({
     success: true,
     token,
    user: _.pick(user,['_id','firstName', 'lastName', 'email', 'phone'])
   });
});

function validate(req) {
    const schema = Joi.object({
      email: Joi.string().min(2).max(50).required(),
      password: Joi.string().min(2).max(255).required(),
    });
  
    return schema.validate(req);
  }

module.exports = router;