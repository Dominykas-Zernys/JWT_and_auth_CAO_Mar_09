const getAllArticles = require('../models/articlesModel');
const { failResponse, successResponse } = require('../utilities/helper');

async function articleIndex(req, res) {
  const allArticles = await getAllArticles();
  if (!allArticles) {
    return failResponse(res, 'something went wrong(articleIndex)');
  }
  successResponse(res, allArticles);
}

module.exports = articleIndex;
