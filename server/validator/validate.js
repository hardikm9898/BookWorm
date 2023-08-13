const joi = require('joi');

const schema = {
  bookSchema: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().min(5).required(),
    price: joi.number().required(),
    imageUrl: joi.string().min(2).required(),
  }),
  loginSchema: joi.object().keys({
    email: joi.string().min(3).required().email(),
    password: joi.string().min(6).required(),
  }),
  signUpSchema: joi.object().keys({
    userName: joi.string().min(1).required(),
    email: joi.string().required().email(),
    phone: joi.number().min(10).required(),
    password: joi.string().alphanum().min(6).required(),
  }),
};
module.exports = schema;
