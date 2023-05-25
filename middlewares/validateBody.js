const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const hasBody = Object.keys(req.body).length;
    if (!hasBody) {      
      throw HttpError(400, 'missing fields');
    };

    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    };
    next();
  };
  return func;
};

module.exports = validateBody;