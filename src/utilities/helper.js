require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function hashPass(passwordFromUser) {
  return bcrypt.hashSync(passwordFromUser, 10);
}

function verifyHash(enteredPassword, userObj) {
  return bcrypt.compareSync(enteredPassword, userObj.password);
}

function successResponse(res, data, status = 200) {
  res.status(status).json({
    success: true,
    message: data,
  });
}

function failResponse(res, error = 'something went wrong', status = 200) {
  res.status(status).json({
    success: false,
    message: error,
  });
}

function generateJwtToken(userObj) {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '1h' });
}

function validateToken(req, res, next) {
  if (!req.headers.authorization) {
    return failResponse(res, 'no token');
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return failResponse(res, 'token not valid', 403);
    }
    next();
  });
}

module.exports = {
  hashPass,
  verifyHash,
  successResponse,
  failResponse,
  generateJwtToken,
  validateToken,
};
