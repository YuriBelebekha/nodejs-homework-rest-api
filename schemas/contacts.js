const Joi = require('joi');

const contactSchema = Joi.object({
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
})
  .messages({
    'any.required': 'missing required {{#label}} field',
  });

module.exports = {
  contactSchema,
};