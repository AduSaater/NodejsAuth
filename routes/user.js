const _ = require('lodash');
const {User, validate} = require('../models/user'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const auth = require('../middleware/auth');
//CREATE ACCOUNT
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
   let user = await User.findOne({ email: req.body.email});
   if(user)  return res.status(400).json({message:'User already registered'});
  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'phone', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  
 res.status(200).json({
    success: true,
    message:"You have successfully created account.",
   data: _.pick(user,['_id','firstName', 'lastName', 'email', 'phone'])});
});
//GET CURRENT USER
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
        success: true,
        user,
    });
});

//UPDATE ACCOUNT
router.put('/:id', auth, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: _.pick(user,['_id','firstName', 'lastName', 'email', 'phone'])});
  });
module.exports = router;