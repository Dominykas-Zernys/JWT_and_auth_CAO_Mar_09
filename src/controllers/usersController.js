const { registerUserToDb, loginUserToDb } = require('../models/usersModel');
const {
  hashPass,
  failResponse,
  successResponse,
  verifyHash,
  generateJwtToken,
} = require('../utilities/helper');

async function registerUser(req, res) {
  const hashedPassword = hashPass(req.body.password);
  const userRegistered = await registerUserToDb(req.body.email, hashedPassword);
  if (!userRegistered) {
    failResponse(res);
    return;
  }
  successResponse(res, 'user registered successfully');
}

async function loginUser(req, res) {
  const userLoggedIn = await loginUserToDb(req.body.email);
  if (userLoggedIn === false) {
    return failResponse(res);
  }
  if (!userLoggedIn.length) {
    return failResponse(res, "email or password doesn't match 1");
  }
  if (!verifyHash(req.body.password, userLoggedIn[0])) {
    return failResponse(res, "email or password doesn't match 2");
  }
  const token = generateJwtToken(userLoggedIn[0]);
  successResponse(res, token);
}

module.exports = { registerUser, loginUser };
