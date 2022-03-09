/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
}

module.exports = validateUser;
