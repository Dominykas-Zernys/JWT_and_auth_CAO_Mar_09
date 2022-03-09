const express = require('express');
const articleIndex = require('../controllers/articlesController');
const { validateToken } = require('../utilities/helper');

const articleRouter = express.Router();

articleRouter.get('/', validateToken, articleIndex);

module.exports = articleRouter;
