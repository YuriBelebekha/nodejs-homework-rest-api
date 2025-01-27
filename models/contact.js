const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, { versionKey: false, timestamps: true });

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(15)
    .required(),
  email: Joi.string()
    .min(2)
    .max(20)
    .required(),
  phone: Joi.string()
    .required(),
  favorite: Joi.boolean(),
})
  .messages({
    'any.required': 'missing required {{#label}} field',
  });

const updateFavoriteSchema = Joi.object({  
  favorite: Joi.boolean().required(),
})
  .messages({
    'any.required': 'missing field favorite',
  });

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};