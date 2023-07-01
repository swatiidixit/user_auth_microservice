const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};



const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const validateLoggedUser = (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


module.exports.validateLoggedUser = validateLoggedUser;
module.exports.validateUser = validateUser;