const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const subscription = ["starter", "pro", "business"];

const userSchema = new Schema({
  password: {
    type: String,    
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,       
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscription,
    default: "starter"
  },
  token: String,  
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({  
  email: Joi
    .string()
    .email()    
    .required()
    .messages({'any.required': 'Email is required'}),
  password: Joi
    .string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)    
    .required()
    .messages({
      "string.pattern.base": `Password should be between 6 to 30 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi
    .string()    
    .required()
    .messages({'any.required': `Email is required`}),
  password: Joi
    .string()
    .min(6)
    .required()
    .messages({'any.required': `Password is required`}),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};