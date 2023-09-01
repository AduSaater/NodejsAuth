const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      unique:true
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    }
  });
    // Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  };
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;